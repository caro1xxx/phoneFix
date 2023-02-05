import React, { useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider, Input } from "antd";

const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .list {
    margin: 20px 0px;
    font-size: 14px;
    height: calc(100vh - 150px);
    overflow: scroll;
  }
  .item {
    border-bottom: 0.5px solid #b7b7b781;
    padding: 20px 0px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    .span-col-2 {
      grid-column: span 2 / auto;
    }
    .itemTitle {
      color: #939393;
      margin: 10px 0px;
      font-size: 13px;
    }
    .itemContent {
      font-size: 16px;
      font-weight: 600;
    }
    .checkMore {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      color: #7d7d7d;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

type Props = {};

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const WaitFix = (props: Props) => {
  const [fixList, setFixList] = useState([
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
    {
      id: "WX282812937283",
      brand: "苹果",
      model: "12 pro max",
      create: "2022/01/01",
    },
  ]);

  return (
    <Wrap>
      <Divider className="title">待维修订单</Divider>
      <Back></Back>
      <Search
        placeholder="搜索订单"
        onSearch={onSearch}
        style={{ width: 300, float: "right" }}
      />
      <div className="list">
        {fixList.map((item) => {
          return (
            <div className="item">
              <div className="span-col-2">
                <div className="itemTitle">维修单号</div>
                <div className="itemContent" style={{ position: "relative" }}>
                  {item.id}
                  <svg
                    style={{ position: "absolute", marginLeft: "10px" }}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11445"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M768 256a85.333333 85.333333 0 0 1 85.333333 85.333333v512a85.333333 85.333333 0 0 1-85.333333 85.333334h-341.333333a85.333333 85.333333 0 0 1-85.333334-85.333334V341.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h341.333333z m0 85.333333h-341.333333v512h341.333333V341.333333z m-128-256a42.666667 42.666667 0 0 1 42.666667 42.666667l-0.042667 42.666667H256l-0.042667 597.333333H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h384z"
                      fill="#000000"
                      p-id="11446"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderLeft: "0.5px solid #b7b7b781",
                }}
              >
                <div className="itemTitle">品牌</div>
                <div className="itemContent">{item.brand}</div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderLeft: "0.5px solid #b7b7b781",
                }}
              >
                <div className="itemTitle">型号</div>
                <div className="itemContent">{item.model}</div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderLeft: "0.5px solid #b7b7b781",
                }}
              >
                <div className="itemTitle">送修时间</div>
                <div className="itemContent">{item.create}</div>
              </div>
              <div
                className="checkMore"
                style={{
                  textAlign: "center",
                  borderLeft: "0.5px solid #b7b7b781",
                }}
              >
                详情
              </div>
            </div>
          );
        })}
      </div>
    </Wrap>
  );
};

export default WaitFix;
