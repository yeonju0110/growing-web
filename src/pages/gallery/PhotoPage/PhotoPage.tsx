import { useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import FloatingButton from 'pages/gallery/components/FloatingButton/FloatingButton';
import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import Icon from 'components/common/Icon/Icon';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import { useDeletePhotosMutation, useInfiniteGalleryList } from 'hooks/queries';
import store from '../../../stores/RootStore';
import Modal from '../../../components/common/Modal/Modal';
import useToast from '../../../hooks/common/useToast';
import { MENT_GALLERY } from '../../../constants/ments';
import DataContext from '../context';
import * as S from './PhotoPage.styled';

function PhotoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const selectedPhotos = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState(
    location.state?.selectingAvailable ?? false
  );
  const [onModal, setOnModal] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: photos, fetchNextPage } = useInfiniteGalleryList({ coupleId });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId,
  });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (photoId: string) => {
        selectedPhotos.current.push(photoId);
      },
      removeFromList: (photoId: string) => {
        const idx = selectedPhotos.current.findIndex((id) => id === photoId);
        selectedPhotos.current.splice(idx, 1);
        if (selectedPhotos.current.length === 0) {
          setSelectingAvailable(true);
        }
      },
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedPhotos.current = [];
    setSelectingAvailable(false);
  };
  const clickCheck = () => setSelectingAvailable(true);

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => {
        setSelectingAvailable(false);
        addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS);
      },
    });
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <S.Container className="page-container with-navbar">
        <GalleryTitle
          title="PHOTO"
          backBtn
          onBackBtnClick={() => navigate('/gallery')}
          rightNode={
            !selectingAvailable ? (
              <Icon icon="IconCheck" />
            ) : (
              <S.Cancel className="text-gradient400">취소</S.Cancel>
            )
          }
          onRightClick={selectingAvailable ? clearList : clickCheck}
          rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
          onRightSubClick={() => {
            if (selectedPhotos.current.length <= 0) {
              addToast(MENT_GALLERY.PHOTO_DELETE_FAIL_NO_SELECTED);
              return;
            }
            setOnModal(true);
          }}
        />
        <S.PaddingContainer className="hidden-scrollbar">
          <PhotoContainer
            photoObjects={photos?.pages.flatMap((res) => res) ?? []}
            type="UPLOADED"
            fetchNextPage={fetchNextPage}
          />
        </S.PaddingContainer>
        <FloatingButton />
        {onModal && (
          <Modal
            onModal={onModal}
            setOnModal={setOnModal}
            description={MENT_GALLERY.PHOTO_DELETE_CONFIRM}
            mainActionLabel="확인"
            onMainAction={deletePhotos}
            subActionLabel="취소"
            onSubAction={() => {
              setOnModal(false);
            }}
          />
        )}
      </S.Container>
    </DataContext.Provider>
  );
}
export default observer(PhotoPage);
