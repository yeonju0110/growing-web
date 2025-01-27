import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import store from 'stores/RootStore';
import changeEmojiToSpan from 'utils/Text';
import preventScroll from 'utils/utils';
import useToast from 'hooks/common/useToast';
import { usePetNameMutation } from 'hooks/queries';
import queryKeys from 'libs/react-query/queryKeys';
import MENT_HOME from 'constants/ments';
import { PetDto } from 'models/pet';
import { PetFormValues, petSchema } from 'libs/react-hook-form';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import PetNameInput from 'pages/home/components/PetNameInput/PetNameInput';
import Pet3D from 'pages/home/components/Pet3D';
import Waves from 'assets/image/HomeWaves.png';
import * as S from './PetNamingPage.styled';

export default function PetNamingPage() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { userStore } = store;
  const { addToast } = useToast();

  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: pet } = queryClient.getQueryData(
    queryKeys.petKeys.all
  ) as AxiosResponse<PetDto>;

  const methods = useForm<PetFormValues>({ resolver: yupResolver(petSchema) });

  const { mutate: nameMyPet } = usePetNameMutation({
    coupleId: userStore.user?.coupleId,
    petId: userStore.petId,
    options: {
      onSuccess() {
        // TODO: 동시에 바꿨을 때
        navigation(-1);
        addToast(MENT_HOME.PET_NAMING_SUCCESS);
        queryClient.invalidateQueries(queryKeys.petKeys.all);
      },
      onError() {
        // TODO: api error
        setOnModal(true);
      },
    },
  });

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          nameMyPet({ nickName: data.name })
        )}
      >
        <S.PetRenameContainer className="page-container with-topbar">
          <TopBar
            mode="PURPLE50"
            leftNode={<Icon icon="IconArrowLeft" />}
            onLeftClick={() => navigation(-1)}
            rightMainNode={<button type="submit">수정</button>}
            border={false}
          />

          <PetNameInput />

          <S.SubTitle
            className="text-gradient400"
            dangerouslySetInnerHTML={changeEmojiToSpan(
              MENT_HOME.PET_NAMING_HELP
            )}
          />

          <Pet3D url={pet.imageUrl} size={240} />

          <S.WaveWrapper>
            <S.Wave src={Waves} />
          </S.WaveWrapper>

          <Modal
            onModal={onModal}
            setOnModal={setOnModal}
            description={MENT_HOME.PET_NAMIMG_FAIL}
            mainActionLabel="이름 확인하기"
            onMainAction={() => navigation(-1)}
          />
        </S.PetRenameContainer>
      </form>
    </FormProvider>
  );
}
