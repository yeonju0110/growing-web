import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';

const ButtonStyle = styled.div`
  position: absolute;
  right: 15px;
  bottom: 90px;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;

function FloatingButton() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    inputFileRef.current?.click();
  };

  const upLoadFile = () => {};

  return (
    <ButtonStyle onClick={onClickHandler}>
      <Wrapper>
        <Icon icon="IconPlus" size={32} />
      </Wrapper>
      <input
        type="file"
        multiple
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={upLoadFile}
      />
    </ButtonStyle>
  );
}

export default FloatingButton;