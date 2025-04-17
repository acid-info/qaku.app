import { QnAType, QuestionType } from '@/types/qna.types'
import { wakuPeerExchangeDiscovery } from '@waku/discovery'
import { IWaku, LightNode, Protocols, createLightNode } from '@waku/sdk'
import { derivePubsubTopicsFromNetworkConfig } from '@waku/utils'
import { HistoryTypes, Qaku, QakuState } from 'qakulib'
import { ApiResponse } from '../types'

const bootstrapNodes: string[] = [
  '/dns4/waku-test.bloxy.one/tcp/8095/wss/p2p/16Uiu2HAmSZbDB7CusdRhgkD81VssRjQV5ZH13FbzCGcdnbbh6VwZ',
  '/dns4/node-01.do-ams3.waku.sandbox.status.im/tcp/8000/wss/p2p/16Uiu2HAmNaeL4p3WEYzC9mgXBmBWSgWjPHRvatZTXnp8Jgv3iKsb',
]

const wakuClusterId = 42
const wakuShardId = 0

let qaku: Qaku | undefined = undefined
let node: IWaku | undefined = undefined
export let initialized: boolean = false
let initializing = false

let qakuPromise: Promise<Qaku>

export const initializeQaku = async (): Promise<Qaku> => {
  if (initializing) {
    return qakuPromise
  }
  if (!initializing && !qaku) {
    initializing = true

    qakuPromise = new Promise(async (resolve, reject) => {
      const networkConfig = { clusterId: wakuClusterId, shards: [wakuShardId] }

      const libp2p = {
        peerDiscovery: [
          wakuPeerExchangeDiscovery(
            derivePubsubTopicsFromNetworkConfig(networkConfig),
          ),
        ],
      }
      node = await createLightNode({
        networkConfig: networkConfig,
        defaultBootstrap: false,
        bootstrapPeers: bootstrapNodes,
        numPeersToUse: 3,
        libp2p: libp2p,
      })

      await node.start()
      await node.waitForPeers(
        [Protocols.LightPush, Protocols.Filter, Protocols.Store],
        10000,
      )
      qaku = new Qaku(node as LightNode) //FIXME
      await qaku.init()
      resolve(qaku)
    })
  }

  return qakuPromise
}

export const initQA = async (id: string, password?: string) => {
  const qaku = await initializeQaku()
  if (!qaku) {
    console.debug('Qakulib not initialized')
    return
  }
  if (qaku.state == QakuState.INIT_PROTOCOL) {
    console.debug('Q&A already initialized')
    return
  }

  await qaku.initQA(id, password)
}

const getOrInitQA = async (id: string, password?: string) => {
  const qaku = await initializeQaku()
  if (!qaku) {
    console.debug('Qakulib not initialized')
    return
  }

  const qa = qaku.qas.get(id)
  if (!qa) await qaku.initQA(id)

  return qaku.qas.get(id)
}

// TODO-vaclav init each active qnas from the user in this function
export const getQnAs = async (): Promise<
  ApiResponse<Record<string, QnAType>>
> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }
  try {
    const qas = qaku.history.getAll()
    const result = {} as Record<string, QnAType>

    for (const qa of qas) {
      if (qa.id == 'undefined') continue
      result[qa.id] = {
        id: qa.id,
        description: qa.description,
        questionsIds: [],
        isActive: qa.isActive,
        owner: '', //FIXME
        startDate: new Date(qa.createdAt),
        allowsParticipantsReplies: false,
        hasAdmins: false,
        admins: [],
        hash: qa.id,
        title: qa.title!,
      }

      if (qa.type == HistoryTypes.CREATED || qa.type == HistoryTypes.ADMIN) {
        qaku.initQA(qa.id, qa.password)
      }
    }
    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getQnA = async (id: string): Promise<ApiResponse<QnAType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }
  try {
    const qa = await getOrInitQA(id)
    if (!qa) return { success: false, error: 'QnA not found' }
    if (!qa.controlState)
      return { success: false, error: 'QnA control state not loaded' }
    return {
      success: true,
      data: {
        id: id,
        hash: qa.controlState.id,
        title: qa.controlState.title,
        description: qa.controlState.description,
        isActive: qa.controlState.enabled,
        owner: qa.controlState.owner,
        startDate: new Date(qa.controlState.timestamp),
        allowsParticipantsReplies: false, //fixme
        hasAdmins: qa.controlState.admins.length > 0,
        admins: qa.controlState.admins ?? [],
        questionsIds: [...qa.questions.keys()],
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Question-related functions
export const getQuestionsByQnaId = async (
  qnaId: string,
): Promise<ApiResponse<Record<string, QuestionType>>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }
  try {
    const qa = await getOrInitQA(qnaId)
    if (!qa)
      return { success: false, error: `Question with ID ${qnaId} not found` }

    const result: Record<string, QuestionType> = {}

    for (const q of qa.questions.values()) {
      result[q.hash] = {
        id: q.hash,
        author: q.signer || '',
        content: q.question,
        isAnswered: q.answered,
        likesCount: q.upvotes,
        likers: q.upvoters,
        qnaId: qnaId,
        timestamp: new Date(q.timestamp),
      }
    }

    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addQnA = async (
  qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
): Promise<ApiResponse<QnAType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }
  try {
    const id = await qaku.newQA(
      qnaData.title,
      qnaData.description,
      qnaData.isActive,
      qnaData.admins || [],
      true,
      undefined,
    )
    return { success: true, data: { ...qnaData, id, questionsIds: [] } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Q&A',
    }
  }
}
