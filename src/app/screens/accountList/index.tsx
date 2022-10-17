import AccountRow from '@components/accountRow';
import TopRow from '@components/topRow';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Plus from '@assets/img/dashboard/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountRequestAction, selectAccount } from '@stores/wallet/actions/actionCreators';
import Seperator from '@components/seperator';
import { StoreState } from '@stores/index';
import { Account } from '@stores/wallet/actions/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const RowContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: props.theme.spacing(8),
}));

const AccountContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: props.theme.spacing(11),
  paddingRight: props.theme.spacing(11),
  marginBottom: props.theme.spacing(11),
}));

const AddAccountContainer = styled.button((props) => ({
  display: 'flex',
  height: 48,
  width: 48,
  borderRadius: props.theme.radius(5),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.theme.colors.background.elevation1,
  marginRight: props.theme.spacing(8),
}));

const ButtonImage = styled.img((props) => ({
  alignSelf: 'center',
  transform: 'all',
}));

const AddAccountText = styled.h1((props) => ({
  ...props.theme.body_m,
  opacity: 0.8,
}));

function AccountList(): JSX.Element {
  const { t } = useTranslation('translation', { keyPrefix: 'ACCOUNT_SCREEN' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { network, accountsList, seedPhrase, selectedAccount } = useSelector(
    (state: StoreState) => state.walletState
  );

  function handleAccountSelect(account: Account) {
    dispatch(
      selectAccount(
        account,
        account.stxAddress,
        account.btcAddress,
        account.masterPubKey,
        account.stxPublicKey,
        account.btcPublicKey,
        network
      )
    );
    navigate('/');
  }

  function isAccountSelected(account: Account): boolean {
    return account.id === selectedAccount?.id;
  }

  function handleBackButtonClick() {
    navigate('/');
  }

  function onCreateAccount() {
    dispatch(addAccountRequestAction(seedPhrase, network ?? 'Mainnet', accountsList));
  }

  return (
    <Container>
      <TopRow title={t('CHANGE_ACCOUNT')} onClick={handleBackButtonClick} />
      <AccountContainer>
        {accountsList.map((account) => {
          return (
            <>
              <AccountRow
                key={account.id}
                account={account}
                isSelected={isAccountSelected(account)}
                onAccountSelected={handleAccountSelect}
              />
              <Seperator />
            </>
          );
        })}
        <RowContainer>
          <AddAccountContainer onClick={onCreateAccount}>
            <ButtonImage src={Plus} />
          </AddAccountContainer>
          <AddAccountText>{t('NEW_ACCOUNT')}</AddAccountText>
        </RowContainer>
      </AccountContainer>
    </Container>
  );
}

export default AccountList;
