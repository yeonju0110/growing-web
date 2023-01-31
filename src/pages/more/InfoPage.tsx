import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar/TopBar';
import MenuBox from '../../components/pages/more/MenuBox';
import WhiteContainer from '../../components/pages/more/WhiteContainer';
import Icon from '../../components/common/Icon/Icon';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -1;
  background-color: ${({ theme }) => theme.color.purple50};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 10px 5px;
  gap: 10px;
`;

function InfoPage() {
  const navigate = useNavigate();
  return (
    <Background>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="도움말"
      />
      <WhiteContainer top="89px">
        <Row>
          <MenuBox title="공지사항" icon="IconPet" onClick={() => {}} />
          <MenuBox title="이용방법" icon="IconPet" onClick={() => {}} />
        </Row>
        <Row>
          <MenuBox title="카톡문의" icon="IconPet" onClick={() => {}} />
        </Row>
      </WhiteContainer>
    </Background>
  );
}
export default InfoPage;