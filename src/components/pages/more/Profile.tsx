import styled from 'styled-components';

const Circle = styled.div<{ imgUrl: string; border: boolean }>`
  width: ${({ border }) => (border ? '164px' : '138px')};
  height: ${({ border }) => (border ? '164px' : '138px')};

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  border: ${({ border }) => (border ? '2px' : '0px')} solid
    ${({ theme }) => theme.color.white};
  filter: drop-shadow(0px 4px 8px ${({ theme }) => theme.color.black}33);
  border-radius: 100px;
`;

type ProfileProps = {
  imgUrl: string;
  border: boolean;
};

function Profile({ imgUrl, border }: ProfileProps) {
  return <Circle imgUrl={imgUrl} border={border} />;
}

export default Profile;