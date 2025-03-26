import { Button } from '@/components/Button'
import { Row } from '@/components/StyledComponents'
import { ToggleButton } from '@/components/ToggleButton'
import { breakpoints } from '@/configs/ui.configs'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import styled from '@emotion/styled'

type Props = {
  handleCancelVote: () => void
  handleVote: () => void
  walletState: {
    status: WalletConnectionStatusEnum
  }
  openWalletPanel: () => void
  userName: string
  isAnonymous: boolean
  setIsAnonymous: (isAnonymous: boolean) => void
}

const UserVote = ({
  handleCancelVote,
  handleVote,
  walletState,
  openWalletPanel,
  userName,
  isAnonymous,
  setIsAnonymous,
}: Props) => {
  return (
    <SelectContainer>
      <Row gap={0}>
        <ActionButton variant="filled" onClick={handleCancelVote}>
          Cancel
        </ActionButton>
        <ActionButton variant="filledPrimary" onClick={handleVote}>
          Send
        </ActionButton>
      </Row>
      <div className="connect-wallet">
        {walletState.status !== WalletConnectionStatusEnum.Connected ? (
          <WalletNotConnectedActions>
            Voting as Anonymous.
            <TextButton onClick={openWalletPanel}>Connect Wallet</TextButton>
          </WalletNotConnectedActions>
        ) : (
          <WalletConnectedActions>
            <span>Voting as {userName}</span>
            <div>
              <ToggleButton isOn={isAnonymous} onChange={setIsAnonymous} />
              <span>Vote Anonymously</span>
            </div>
          </WalletConnectedActions>
        )}
      </div>
    </SelectContainer>
  )
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  width: 100%;
  margin: 32px 0;

  .connect-wallet {
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);
    color: var(--white);
  }

  @media (max-width: ${breakpoints.sm}px) {
    margin: 0;

    & > div:first-of-type {
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`

const ActionButton = styled(Button)`
  width: 100px;
  height: 32px;
`

const TextButton = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  color: inherit;
  font: inherit;
`

const WalletNotConnectedActions = styled.div`
  opacity: 0.7;
  display: flex;
  gap: 6px;
`

const WalletConnectedActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  span {
    opacity: 0.7;
    word-break: break-all;
  }

  @media (max-width: ${breakpoints.sm}px) {
    gap: 16px;
  }
`

export default UserVote
