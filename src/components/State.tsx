import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
const Wrap = styled.div`
  background-color: #fafafa;
  height: calc(100vh);
  width: 100%;
  display: inline-block;
  border-left: 0.5px solid #e2e2e2;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const OrderItem = styled.div`
  font-size: 13px;
  margin: 10px 0px;
  border-left: 3px solid #0d6efd;
  :hover {
    color: #8e8e8e;
  }
  span {
    margin-left: 50px;
  }
`;

type Props = {};

const State = (props: Props) => {
  const [recentOrder, setRecentOrder] = useState([
    { id: "WX282812937283", state: "已完成" },
    { id: "WX282812337283", state: "维修中" },
    { id: "WX282812937213", state: "已完成" },
    { id: "WX282812937283", state: "已完成" },
  ]);

  return (
    <Wrap>
      <div style={{ padding: "20px" }}>
        <Title>近期订单</Title>
        {recentOrder.map((item) => {
          return (
            <OrderItem key={nanoid()}>
              &nbsp;&nbsp;{item.id}
              <span>{item.state}</span>
            </OrderItem>
          );
        })}
      </div>
    </Wrap>
  );
};

export default State;
