import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'
import { wakuPeerExchangeDiscovery } from '@waku/discovery'
import { IWaku, LightNode, Protocols, createLightNode } from '@waku/sdk'
import { derivePubsubTopicsFromNetworkConfig } from '@waku/utils'
import {
  EnhancedQuestionMessage,
  HistoryTypes,
  LocalPoll,
  Poll,
  Qaku,
  AnswerType as QakuAnswerType,
  QakuEvents,
  QakuState,
  UpvoteType,
} from 'qakulib'
import { ApiResponse, SubscriptionCallback, SubscriptionFilter } from '../types'

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
  if (!id || id == 'undefined') return
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
  try {
    if (!qa) await qaku.initQA(id)
  } catch (e) {
    console.error(`failed to initialized QA ${id}`, e)
  }

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
      if (qa.type !== HistoryTypes.CREATED && qa.type !== HistoryTypes.ADMIN)
        continue

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

      qaku.initQA(qa.id, qa.password)
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
      result[q.hash] = ToQuestionType(qnaId, q)
    }

    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const likeQuestion = async (
  qnaId: string,
  questionId: string,
): Promise<ApiResponse<QuestionType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }

  try {
    const result = await qaku.upvote(qnaId, questionId, UpvoteType.QUESTION)
    if (result) {
      return { success: true, data: undefined }
    } else {
      return { success: false, error: 'Failed to submit new answer' }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getAnswersByQnaId = async (
  qnaId: string,
): Promise<ApiResponse<Record<string, AnswerType>>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }
  try {
    const qa = await getOrInitQA(qnaId)
    if (!qa)
      return { success: false, error: `Question with ID ${qnaId} not found` }

    const result: Record<string, AnswerType> = {}

    for (const q of qa.questions.values()) {
      for (const a of q.answers) {
        result[a.id] = ToAnswerType(qnaId, a)
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

export const addAnswer = async (
  questionId: string,
  qnaId: string,
  content: string,
  author: string,
): Promise<ApiResponse<AnswerType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }

  try {
    const result = await qaku.answer(qnaId, questionId, content)
    if (result) {
      return { success: true, data: undefined }
    } else {
      return { success: false, error: 'Failed to submit new answer' }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const likeAnswer = async (
  qnaId: string,
  questionId: string,
  answerId: string,
): Promise<ApiResponse<AnswerType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }

  try {
    const result = await qaku.upvote(
      qnaId,
      answerId,
      UpvoteType.ANSWER,
      questionId,
    )
    if (result) {
      return { success: true, data: undefined }
    } else {
      return { success: false, error: 'Failed to submit new answer' }
    }
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

//Polls

export const addPoll = async (
  pollData: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
  pollOptions: { title: string; isCorrectAnswer?: boolean }[] = [],
): Promise<ApiResponse<PollType>> => {
  const qaku = await initializeQaku()
  if (!qaku)
    return { success: false, error: 'Qakulib not initialized properly' }

  try {
    const result = await qaku.newPoll(pollData.qnaId, {
      title: pollData.title,
      question: pollData.question,
      active: pollData.isActive,
      options: pollOptions,
      id: '',
    })
    if (result) {
      return { success: true, data: undefined }
    } else {
      return { success: false, error: 'Failed to publish a new poll' }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create a poll',
    }
  }
}

export const votePoll = async (
  qnaId: string,
  pollId: string,
  optionId: number,
): Promise<ApiResponse<PollOptionType[]>> => {
  try {
    // Validate inputs
    if (pollId === undefined || pollId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const qaku = await initializeQaku()
    if (!qaku)
      return { success: false, error: 'Qakulib not initialized properly' }

    const result = await qaku.pollVote(qnaId, pollId, optionId) //fixme
    if (result) {
      return { success: true, data: undefined }
    } else {
      return { success: false, error: 'Failed to vote on the poll' }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPoll = async (
  qnaId: string,
  id: string,
): Promise<ApiResponse<PollType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const qaku = await initializeQaku()
    if (!qaku)
      return { success: false, error: 'Qakulib not initialized properly' }

    const qa = await getOrInitQA(qnaId)
    if (!qa)
      return { success: false, error: `Question with ID ${qnaId} not found` }

    for (const poll of qa.polls) {
      if (poll.id == id) {
        return { success: true, data: ToPollType(qnaId, poll) }
      }
    }

    return { success: false, error: 'Could not find the poll' }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPollsByQnaId = async (
  qnaId: string,
): Promise<ApiResponse<Record<string, PollType>>> => {
  try {
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const qaku = await initializeQaku()
    if (!qaku)
      return { success: false, error: 'Qakulib not initialized properly' }

    const qa = await getOrInitQA(qnaId)
    if (!qa)
      return { success: false, error: `Question with ID ${qnaId} not found` }

    const result: Record<string, PollType> = {}
    for (const poll of qa.polls) {
      result[poll.id] = ToPollType(qnaId, poll)
    }

    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPollOptionsByPollId = async (
  qnaId: string,
  pollId: string,
): Promise<ApiResponse<Record<string, PollOptionType>>> => {
  try {
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const qaku = await initializeQaku()
    if (!qaku)
      return { success: false, error: 'Qakulib not initialized properly' }

    const qa = await getOrInitQA(qnaId)
    if (!qa)
      return { success: false, error: `Question with ID ${qnaId} not found` }

    for (const poll of qa.polls) {
      if (poll.id == pollId) {
        return { success: true, data: ToPollVoteTypeRecord(poll) }
      }
    }

    return {
      success: false,
      error: 'Poll not found',
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const subscribe = async <T>(
  messageType: QakuEvents,
  callback: SubscriptionCallback<T>,
  filter?: SubscriptionFilter,
): Promise<() => void> => {
  const qaku = await initializeQaku()
  if (!qaku) return () => {}

  qaku.on(messageType, async (id, data) => {
    if (messageType == QakuEvents.NEW_QUESTION) {
      callback(id, ToQuestionType(id, data) as T)
      return
    }

    if (messageType == QakuEvents.NEW_ANSWER) {
      callback(id, ToAnswerType(id, data) as T)
      return
    }

    if (messageType == QakuEvents.NEW_UPVOTE) {
      if ('questionId' in data) {
        callback(id, ToAnswerType(id, data) as T)
        return
      }

      callback(id, ToQuestionType(id, data) as T)
      return
    }

    if (
      messageType == QakuEvents.NEW_POLL ||
      messageType == QakuEvents.POLL_STATE_CHANGE
    ) {
      callback(id, ToPollType(id, data) as T)
      return
    }

    if (messageType == QakuEvents.NEW_POLL_VOTE) {
      callback(id, ToPollVoteTypeRecord(data) as T)
      return
    }

    const qa = await getQnA(id)
    callback(id, qa.data as T)
  })
  return () => {
    qaku.off(messageType, callback)
  }
}

export const ToQuestionType = (
  qnaId: string,
  q: EnhancedQuestionMessage,
): QuestionType => {
  return {
    id: q.hash,
    author: q.signer || '',
    content: q.content,
    isAnswered: q.answers.length > 0,
    likesCount: q.upvotes,
    likers: q.upvoters,
    qnaId: qnaId,
    timestamp: new Date(q.timestamp) || new Date(),
  }
}

export const ToAnswerType = (qnaId: string, a: QakuAnswerType): AnswerType => {
  let ts = new Date(a.timestamp)
  if (ts.toString() == 'Invalid Date') ts = new Date()
  return {
    id: a.id,
    author: a.author,
    content: a.content,
    likesCount: a.likesCount,
    likers: a.likers,
    qnaId: qnaId,
    timestamp: ts,
    questionId: a.questionId,
  }
}

export const ToPollType = (qnaId: string, poll: Poll): PollType => {
  return {
    id: poll.id,
    isActive: poll.active,
    qnaId: qnaId,
    title: poll.title || '',
    question: poll.question,
    optionsIds: poll.options ? poll.options.map((o, i) => i.toString()) : [],
    isResultVisible: true,
    hasCorrectAnswers: false,
    hasMultipleOptionsSelect: false,
  }
}

export const ToPollVoteTypeRecord = (
  poll: LocalPoll,
): Record<string, PollOptionType> => {
  const result: Record<string, PollOptionType> = {}
  let v: any = 0
  for (v in poll.options) {
    result[v.toString()] = {
      id: v.toString(),
      pollId: poll.id,
      title: poll.options[v].title,
      voteCount:
        poll.votes?.length && poll.votes.length > v
          ? poll.votes[v].voters.length
          : 0,
      voters:
        poll.votes?.length && poll.votes?.length > v
          ? poll.votes[v].voters
          : [],
    }
  }
  return result
}
