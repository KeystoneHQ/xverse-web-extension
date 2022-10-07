import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ActionButton from '@components/button';
import Copy from '@assets/img/dashboard/Copy.svg';
import ArrowSquareOut from '@assets/img/send/arrow_square_out.svg';
import Success from '@assets/img/send/check_circle.svg';
import Failure from '@assets/img/send/x_circle.svg';
import { CurrencyTypes } from '@utils/constant';
import { getBtcTransactionStatusUrl, getTransactionStatusUrl } from '@utils/envUtils';

const Container = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const OuterContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: props.theme.spacing(50),
  flex: 1,
}));

const TransactionIDContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: props.theme.spacing(15),
  marginLeft: props.theme.spacing(8),
  marginRight: props.theme.spacing(8),
}));

const ButtonContainer = styled.div((props) => ({
  marginTop: props.theme.spacing(15),
  marginBottom: props.theme.spacing(15),
  marginLeft: props.theme.spacing(8),
  marginRight: props.theme.spacing(8),
}));

const RowContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: props.theme.spacing(16),
}));

const TxIDContainer = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}));

const Image = styled.img((props) => ({
  alignSelf: 'center',
  transform: 'all',
}));

const HeadingText = styled.h1((props) => ({
  ...props.theme.headline_s,
  color: props.theme.colors.white['0'],
  textAlign: 'center',
  marginTop: props.theme.spacing(8),
}));

const BodyText = styled.h1((props) => ({
  ...props.theme.body_m,
  color: props.theme.colors.white['400'],
  marginTop: props.theme.spacing(8),
  textAlign: 'center',
  marginLeft: props.theme.spacing(3),
  marginRight: props.theme.spacing(3),
}));

const BeforeButtonText = styled.h1((props) => ({
  ...props.theme.body_m,
  color: props.theme.colors.white['400'],
}));

const IDText = styled.h1((props) => ({
  ...props.theme.body_m,
  color: props.theme.colors.white['0'],
  marginTop: props.theme.spacing(8),
  wordBreak: 'break-all',
}));

const ButtonText = styled.h1((props) => ({
  ...props.theme.body_m,
  color: props.theme.colors.white['0'],
}));

const ButtonImage = styled.img((props) => ({
  marginRight: props.theme.spacing(3),
  alignSelf: 'center',
  transform: 'all',
}));

const Button = styled.button((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  marginLeft: props.theme.spacing(3),
}));

interface Props {
  txid: string | null;
  currency: CurrencyTypes;
  error: string;
}

function TransactionStatus({ txid, currency, error }: Props) {
  txid = 'e8ac27dca63acf4693c25a1817b031b42e7cac9865166c13d9464e1983dbd4e2';
  currency = 'STX';
  error = 'Xverse Wallet Router : ERROR_TYPE_LOREM_TIMEOUT';
  const { t } = useTranslation('translation', { keyPrefix: 'TRANSACTION_STATUS' });
  const navigate = useNavigate();
  function renderTransactionStatus() {
    if (txid) {
      return (
        <Container>
          <Image src={Success} />
          <HeadingText>{t('BROADCASTED')}</HeadingText>
          <BodyText>{t('SUCCESS_MSG')}</BodyText>
        </Container>
      );
    } else {
      return (
        <Container>
          <Image src={Failure} />
          <HeadingText>{t('FAILED')}</HeadingText>
          <BodyText>{error}</BodyText>
        </Container>
      );
    }
  }

  function renderLink() {
    return (
      <RowContainer>
        <BeforeButtonText>{t('SEE_ON')}</BeforeButtonText>
        <Button onClick={openTransactionInBrowser}>
          <ButtonText>
            {currency === 'BTC' ? t('BITCOIN_EXPLORER') : t('STACKS_EXPLORER')}
          </ButtonText>
          <ButtonImage src={ArrowSquareOut} />
        </Button>
      </RowContainer>
    );
  }

  function renderTransactionID() {
    return (
      <TransactionIDContainer>
        <BodyText>{t('TRANSACTION_ID')}</BodyText>
        <TxIDContainer>
          <IDText>{txid}</IDText>
          <Button onClick={onCopyClick}>
            <ButtonImage src={Copy} />
          </Button>
        </TxIDContainer>
      </TransactionIDContainer>
    );
  }

  const onCloseClick = () => {
    navigate('/');
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(txid!);
  };

  function openTransactionInBrowser() {
    if (txid) {
      if (currency === 'BTC') {
        window.open(`${getBtcTransactionStatusUrl()}${txid}`, "_blank", "noopener,noreferrer");
      } else {
        window.open(`${getTransactionStatusUrl()}${txid}`, "_blank", "noopener,noreferrer");
      }
    }
  }

  return (
    <>
      <OuterContainer>
        {renderTransactionStatus()}
        {renderLink()}
        {txid && renderTransactionID()}
      </OuterContainer>
      <ButtonContainer>
        <ActionButton text={t('CLOSE')} onPress={onCloseClick} />
      </ButtonContainer>
    </>
  );
}

export default TransactionStatus;
