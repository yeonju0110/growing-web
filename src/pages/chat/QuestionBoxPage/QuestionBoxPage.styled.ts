import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  padding: 0 16px;
`;

export const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px 0;
`;

export const EmptyCase = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  font-family: 'PretendardMedium';
  font-size: 19px;
`;
