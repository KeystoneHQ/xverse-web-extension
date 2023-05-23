/* eslint-disable no-nested-ternary */
import { Suspense } from 'react';
import styled from 'styled-components';
import { MoonLoader } from 'react-spinners';
import OrdinalsIcon from '@assets/img/nftDashboard/white_ordinals_icon.svg';
import Image from 'rc-image';
import { getFetchableUrl } from '@utils/helper';
import PlaceholderImage from '@assets/img/nftDashboard/nft_fallback.svg';
import { useTranslation } from 'react-i18next';
import { Inscription } from '@secretkeylabs/xverse-core';
import useTextOrdinalContent from '@hooks/useTextOrdinalContent';
import stc from 'string-to-color';
import { NumericFormat } from 'react-number-format';

interface ContainerProps {
  isGalleryOpen: boolean;
  inNftDetail?: boolean;
  isSmallImage?: boolean;
}

const ImageContainer = styled.div<ContainerProps>((props) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: props.inNftDetail ? props.theme.spacing(8) : 0,
  alignItems: 'center',
  width: '100%',
  height: props.isGalleryOpen ? props.inNftDetail ? 540 : 300 : props.isSmallImage ? 50 : 150,
  minHeight: props.isGalleryOpen ? 300 : props.isSmallImage ? 50 : 150,
  maxHeight: props.isGalleryOpen ? props.inNftDetail ? 450 : 300 : props.isSmallImage ? 50 : 150,
  overflow: 'hidden',
  position: 'relative',
  fontSize: '3em',
  wordWrap: 'break-word',
  backgroundColor: '#1b1e2b',
  borderRadius: 8,
}));

const ButtonIcon = styled.img({
  width: 12,
  height: 12,
});

const BRC20Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const OrdinalsTag = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(39, 42, 68, 0.6)',
  borderRadius: 40,
  width: 79,
  height: 22,
  left: 12,
  bottom: 12,
  zIndex: 1000,
  position: 'absolute',
  padding: '3px 6px',
});

const LoaderContainer = styled.div<ContainerProps>((props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  height: props.isGalleryOpen ? 300 : 150,
  minHeight: props.isGalleryOpen ? 300 : 150,
  maxHeight: props.isGalleryOpen ? 300 : 150,
  left: 0,
  bottom: 0,
  right: 0,
  top: 0,
}));

const Text = styled.h1((props) => ({
  ...props.theme.body_bold_m,
  textTransform: 'uppercase',
  color: props.theme.colors.white[0],
  fontSize: 10,
  marginLeft: props.theme.spacing(4),
}));

interface TextProps {
  inNftSend?: boolean;
}

const OrdinalContentText = styled.h1<TextProps>((props) => ({
  ...props.theme.body_medium_m,
  color: props.theme.colors.white[0],
  fontSize: props.inNftSend ? 15 : 'calc(0.8vw + 2vh)',
  overflow: 'hidden',
  textAlign: 'center',
}));

const BRC20Text = styled.h1<TextProps>((props) => ({
  ...props.theme.body_bold_l,
  color: props.theme.colors.white[0],
  fontSize: props.inNftSend ? 16 : 'calc(0.8vw + 2vh)',
  textAlign: 'center',
  marginTop: 8,
}));

const StyledImg = styled(Image)`
  border-radius: 8px;
  object-fit: contain;
  image-rendering: pixelated;
`;

interface TickerProps {
  enlargeTicker? : boolean;
}

const TickerIconContainer = styled.div<TickerProps>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: props.enlargeTicker ? 50 : 34.65,
  width: props.enlargeTicker ? 50 : 34.65,
  marginTop: 3,
  marginBottom: 3,
  borderRadius: 50,
  backgroundColor: props.color,
}));

const TickerIconText = styled.h1((props) => ({
  ...props.theme.body_bold_m,
  color: props.theme.colors.white['0'],
  textAlign: 'center',
  wordBreak: 'break-all',
  fontSize: 10,
}));

interface Props {
  ordinal: Inscription;
  isNftDashboard?: boolean;
  inNftDetail?: boolean;
  inNftSend?: boolean;
  isSmallImage?: boolean;
}

function OrdinalImage({
  ordinal,
  isNftDashboard = false,
  inNftDetail = false,
  inNftSend = false,
  isSmallImage = false,
}: Props) {
  const isGalleryOpen: boolean = document.documentElement.clientWidth > 360;
  const textContent = useTextOrdinalContent(ordinal);
  const { t } = useTranslation('translation', { keyPrefix: 'NFT_DASHBOARD_SCREEN' });

  function renderFTIcon(ticker: string) {
    const background = stc(ticker);
    ticker = ticker && ticker.substring(0, 4);
    return (
      <TickerIconContainer color={background} enlargeTicker={isGalleryOpen}>
        <TickerIconText>{ticker}</TickerIconText>
      </TickerIconContainer>
    );
  }

  if (ordinal?.content_type.includes('image')) {
    return (
      <ImageContainer isSmallImage={isSmallImage} isGalleryOpen={isGalleryOpen}>
        <Suspense>
          <StyledImg
            width="100%"
            placeholder={(
              <LoaderContainer isGalleryOpen={isGalleryOpen}>
                <MoonLoader color="white" size={20} />
              </LoaderContainer>
              )}
            src={getFetchableUrl(`https://api.hiro.so/ordinals/v1/inscriptions/${ordinal.id}/content`, 'http')}
            fallback={PlaceholderImage}
          />
        </Suspense>
        {isNftDashboard && (
          <OrdinalsTag>
            <ButtonIcon src={OrdinalsIcon} />
            <Text>{t('ORDINAL')}</Text>
          </OrdinalsTag>
        )}
      </ImageContainer>
    );
  }
  if (ordinal?.content_type.includes('text')) {
    if (!textContent) {
      return (
        <ImageContainer isSmallImage={isSmallImage} isGalleryOpen={isGalleryOpen}>
          <MoonLoader color="white" size={30} />
        </ImageContainer>
      );
    }

    if (textContent.includes('brc-20')) {
      const content = JSON.parse(textContent);
      if (content?.op === 'mint') {
        return (
          <ImageContainer isSmallImage={isSmallImage} inNftDetail={inNftDetail} isGalleryOpen={isGalleryOpen}>
            <BRC20Container>
              <BRC20Text>{t('MINT')}</BRC20Text>
              {renderFTIcon(content?.tick)}
              <NumericFormat
                value={content?.amt}
                displayType="text"
                thousandSeparator
                renderText={(text) => <BRC20Text>{text}</BRC20Text>}
              />
              {isNftDashboard && (
              <OrdinalsTag>
                <ButtonIcon src={OrdinalsIcon} />
                <Text>{t('ORDINAL')}</Text>
              </OrdinalsTag>
              )}
            </BRC20Container>
          </ImageContainer>
        );
      }
      if (content?.op === 'transfer') {
        return (
          <ImageContainer isSmallImage={isSmallImage} inNftDetail={inNftDetail} isGalleryOpen={isGalleryOpen}>
            <BRC20Container>
              <BRC20Text>{t('TRANSFER')}</BRC20Text>
              {renderFTIcon(content?.tick)}
              <NumericFormat
                value={content?.amt}
                displayType="text"
                thousandSeparator
                renderText={(text) => <BRC20Text>{text}</BRC20Text>}
              />
              {isNftDashboard && (
              <OrdinalsTag>
                <ButtonIcon src={OrdinalsIcon} />
                <Text>{t('ORDINAL')}</Text>
              </OrdinalsTag>
              )}
            </BRC20Container>
          </ImageContainer>
        );
      }
      if (content?.op === 'deploy') {
        return (
          <ImageContainer isSmallImage={isSmallImage} inNftDetail={inNftDetail} isGalleryOpen={isGalleryOpen}>
            <BRC20Container>
              <BRC20Text>{t('DEPLOY')}</BRC20Text>
              {renderFTIcon(content?.tick)}
              {isNftDashboard && (
              <OrdinalsTag>
                <ButtonIcon src={OrdinalsIcon} />
                <Text>{t('ORDINAL')}</Text>
              </OrdinalsTag>
              )}
            </BRC20Container>
          </ImageContainer>
        );
      }
    }
    return (
      <ImageContainer isSmallImage={isSmallImage} inNftDetail={inNftDetail} isGalleryOpen={isGalleryOpen}>
        <OrdinalContentText inNftSend={inNftSend}>{textContent}</OrdinalContentText>
        {isNftDashboard && (
        <OrdinalsTag>
          <ButtonIcon src={OrdinalsIcon} />
          <Text>{t('ORDINAL')}</Text>
        </OrdinalsTag>
        )}
      </ImageContainer>
    );
  }

  return (
    <ImageContainer isSmallImage={isSmallImage} isGalleryOpen={isGalleryOpen}>
      <img src={PlaceholderImage} alt="ordinal" />
    </ImageContainer>
  );
}

export default OrdinalImage;
