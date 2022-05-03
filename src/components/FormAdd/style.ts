import { Link } from "react-router-dom";
import styled from "styled-components";

const SCForm = styled.form`
  width: 696px;
  height: 80vh;
  margin-top: 79px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SCButton = styled.button`
  width: 100%;
  padding: 11px;
  background-color: #1976d2;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

export { SCForm, SCButton };
