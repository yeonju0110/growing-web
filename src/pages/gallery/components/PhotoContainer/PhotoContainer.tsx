import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Icon from 'components/common/Icon/Icon';
import { PhotoLineDto } from 'models/gallery';
import Photo from 'pages/gallery/components/Photo/Photo';
import * as S from './PhotoContainer.styled';

type PhotoContainerProps = {
  type: 'UPLOADED' | 'UPLOAD';
  photoObjects: PhotoLineDto[];
  // for infinite scroll
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
};

function PhotoContainer({
  photoObjects,
  type,
  fetchNextPage,
}: PhotoContainerProps) {
  const lastPhotoRow = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!fetchNextPage || !lastPhotoRow.current) return;
    const photoObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      fetchNextPage();
    });
    photoObserver.observe(lastPhotoRow.current);

    // eslint-disable-next-line consistent-return
    return () => {
      photoObserver.disconnect();
    };
  }, [fetchNextPage, lastPhotoRow]);

  return (
    <>
      {type === 'UPLOADED' && photoObjects.length === 0 && (
        <S.Container>
          <S.Logo>
            <Icon icon="IconLogo" size={60} />
          </S.Logo>
          <S.Message>사진을 업로드 해주세요!</S.Message>
        </S.Container>
      )}
      {photoObjects.length > 0 && (
        <S.Photos>
          {photoObjects.map((photo) => (
            <Photo photoInfo={photo} key={photo.i} />
          ))}
          <div ref={lastPhotoRow} style={{ width: '100%' }} />
        </S.Photos>
      )}
    </>
  );
}

export default PhotoContainer;
