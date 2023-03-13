import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useQueryClient } from '@tanstack/react-query';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import {
  useChatNoticeData,
  useFoldNoticeMutate,
  useInvisibleNoticeMutate,
} from '../../../hooks/queries/chat-notice.queries';
import queryKeys from '../../../constants/queryKeys';

const FoldenContainer = styled.div`
  z-index: 1;

  position: absolute;
  top: 65px;
  right: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  z-index: 1;

  position: fixed;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);

  padding: 0 16px;

  width: 100%;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0 0 20px 20px;
`;

const NoticeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 0;
`;

const Contents = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;

  font-family: 'PretendardLight';
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray900};
  > p {
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray500};
  }
`;

const Buttons = styled.div`
  display: flex;

  padding: 12px 0;

  border-top: 0.8px solid ${({ theme }) => theme.color.gray200};
`;

const StyledButton = styled.button`
  flex: 1;
`;

const StyledButtonBorder = styled(StyledButton)`
  border-left: 0.8px solid ${({ theme }) => theme.color.gray200};
`;

function ChatNotice() {
  const queryClient = useQueryClient();
  const { userStore } = store;

  const [onToggle, setOnToggle] = useState<boolean>(false);

  const { data: notice } = useChatNoticeData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const { mutate: foldNotice } = useFoldNoticeMutate({
    coupleId: userStore.user?.coupleId ?? '',
    noticeId: notice?.id ?? '',
    options: {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.chatKeys.notice),
    },
  });

  const { mutate: invisibleNotice } = useInvisibleNoticeMutate({
    coupleId: userStore.user?.coupleId ?? '',
    noticeId: notice?.id ?? '',
    options: {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.chatKeys.notice),
    },
  });

  if (!notice) {
    return null;
  }

  if (notice?.isFolden) {
    return (
      <FoldenContainer onClick={foldNotice}>
        <Icon icon="IconBell" size={18} />
      </FoldenContainer>
    );
  }

  return (
    <Container>
      <NoticeContainer>
        <Icon icon="IconBell" />
        <Contents>
          {notice.content}
          <p>{notice.announcer} 등록</p>
        </Contents>
        <Icon
          icon={!onToggle ? 'IconArrowDown' : 'IconArrowUp'}
          onClick={() => setOnToggle(!onToggle)}
        />
      </NoticeContainer>
      {onToggle && (
        <Buttons>
          <StyledButton onClick={invisibleNotice}>다시 열지 않음</StyledButton>
          <StyledButtonBorder onClick={foldNotice}>접어두기</StyledButtonBorder>
        </Buttons>
      )}
    </Container>
  );
}

export default observer(ChatNotice);
