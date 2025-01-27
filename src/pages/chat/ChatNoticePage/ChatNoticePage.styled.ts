import styled from 'styled-components';

export const ChatNoticePageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
`;

export const ChatWrapper = styled.div`
  padding: 16px 32px;

  font-size: 16px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 32px;
  padding: 16px 0px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};

  > p {
    font-size: 14px;
  }
`;
