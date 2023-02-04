import React from "react";
import styled from "styled-components";
const Wrap = styled.div`
  background-color: #fafafa;
  height: calc(100vh);
  width: 100%;
  display: inline-block;
  border-left: 0.5px solid #e2e2e2;
`;

type Props = {};

const State = (props: Props) => {
  return <Wrap></Wrap>;
};

export default State;
