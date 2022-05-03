import styled from "styled-components";

const SCInput = styled.input`
  padding: 18px 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  outline: none;

  ::placeholder {
    color: #000000;
  }
`;

const SCSelect = styled.select`
  background-color: #ffffff;
  padding: 18px 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  outline: none;
  width: 100%;
`;

const SCOption = styled.option`
  padding: 18px 15px;
`;

export { SCInput, SCSelect, SCOption };
