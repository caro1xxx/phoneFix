import React from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider } from "antd";
const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
`;

type Props = {};

const BrandManage = (props: Props) => {
  return (
    <Wrap>
      <Divider className="title">品牌型号管理</Divider>
      <Back></Back>
    </Wrap>
  );
};

export default BrandManage;
