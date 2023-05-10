import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useRef } from 'react';
import AlbumRowContainer from 'components/pages/gallery/AlbumRowContainer';
import FloatingButton from 'components/pages/gallery/FloatingButton';
import PhotoContainer from 'components/pages/gallery/PhotoContainer';
import GalleryTitle from 'components/pages/gallery/GalleryTitle';
import Icon from 'components/common/Icon/Icon';
import { useCreatePhotosMutation, useGalleryList } from 'hooks/queries/gallery.queries';
import { useAlbumsList } from 'hooks/queries/album.queries';
import store from 'stores/RootStore';
import useToast from 'hooks/common/useToast';

const Container = styled.div`
  position: relative;
  overflow-y: scroll;
`;

const FixedContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 780px;
  height: calc(100vh - 43px - 176px - 81px);
`;

function GalleryMainPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const touchPositionX = useRef<number | null>(null);
  const touchPositionY = useRef<number | null>(null);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: photos } = useGalleryList({ coupleId });
  const { data: albums } = useAlbumsList({ coupleId });
  const { mutate: upLoadPhotos } = useCreatePhotosMutation({ coupleId });

  const upLoadHandler = (files: FileList) => {
    upLoadPhotos(files, {
      onSuccess: () => addToast('사진이 업로드 되었습니다.'),
    });
  };

  return (
    <Container
      className="page-container with-navbar hidden-scrollbar"
      onScroll={() => navigate('photo')}
    >
      <GalleryTitle
        title="ALBUM"
        plusBtn
        onPlusBtnClick={() => navigate('new-album')}
        rightNode={(albums ?? []).length > 0 && <Icon icon="IconCheck" />}
        onRightClick={() =>
          navigate('album', { state: { selectingAvailable: true } })
        }
      />
      <AlbumRowContainer
        albums={albums ?? []}
        onClick={() => {}}
        onTouchStart={(e) => {
          touchPositionX.current = e.touches[0].clientX;
        }}
        onTouchMove={(e) => {
          if (!touchPositionX.current) return;

          if (touchPositionX.current - e.touches[0].clientX > 200)
            navigate('album');
        }}
      />
      <GalleryTitle
        title="PHOTO"
        rightNode={(photos ?? []).length > 0 && <Icon icon="IconCheck" />}
        onRightClick={() =>
          navigate('photo', { state: { selectingAvailable: true } })
        }
      />
      <FixedContainer
        onTouchStart={(e) => {
          touchPositionY.current = e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          if (!touchPositionY.current) return;

          if (touchPositionY.current - e.touches[0].clientY > 10)
            navigate('photo');
        }}
      >
        <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
      </FixedContainer>
      <FloatingButton onUpLoad={upLoadHandler} />
    </Container>
  );
}

export default observer(GalleryMainPage);
