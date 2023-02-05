import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Divider, Input } from "antd";

const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .back {
    background-color: #f7f6fc;
    border-radius: 5px;
    height: 30px;
    width: 30px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
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
  let navigate = useNavigate();

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
      <div
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10111"
          width="17"
          height="17"
        >
          <path
            d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
            fill="#2c2c2c"
            p-id="10112"
          ></path>
        </svg>
      </div>
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
