import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import useSignUp from 'pages/login/hooks/useSignUp';
import Wave from 'pages/login/components/Wave/Wave';
import Egg from 'pages/login/components/Egg/Egg';
import LoginButton from 'pages/login/components/LoginButton/LoginButton';
import { SignUpFormValues, signUpSchema } from 'libs/react-hook-form';
import * as S from './LoginCreatePage.styled';

function LoginCreatePage() {
  const { userStore } = store;

  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema.pick(['nickname'])),
  });

  const { getStringByType, patchUser } = useSignUp({
    userId: userStore.user?.id ?? '',
    partnerId: userStore.partnerId,
    formState,
  });

  return (
    <S.PageContainer className="page-container">
      <S.StyledForm onSubmit={handleSubmit((data) => patchUser(data))}>
        <LoginButton disabled ment={getStringByType().ment} />

        <S.StyledInput
          className="text-gradient400"
          type={getStringByType().inputType}
          {...register(getStringByType().inputSchema)}
        />
        <p className="text-gradient300">{getStringByType().errMsg ?? ''}</p>

        <Egg onClick={() => {}} />

        <div style={{ height: '100px' }} />
      </S.StyledForm>

      <Wave />
    </S.PageContainer>
  );
}

export default observer(LoginCreatePage);
