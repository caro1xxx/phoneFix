import React, { useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: absolute;
  background-color: #cecece2f;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  background-color: white;
  height: 60vh;
  width: 60vw;
  border-radius: 3px;
  position: relative;
  .main {
    margin: 40px;
    .user {
      font-size: 25px;
    }
    .grid {
      border-bottom: 0.5px solid #e4e4e4af;
      padding: 20px 0px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 10px;
      .span-col-2 {
        grid-column: span 2 / auto;
      }
      .title {
        font-size: 12px;
        color: #afafaf;
        margin-bottom: 10px;
        font-weight: 300;
      }
      .titlecontent {
        font-size: 20px;
        font-weight: 700;
      }
      .item {
        border-left: 0.5px solid #e4e4e4af;
        text-align: center;
      }
    }
  }
`;

type Props = {
  data: {
    key: string;
    brand: string;
    model: string;
    mask: string;
    date: string;
    fixway: string;
    open: string;
    password: string;
    series: string;
    user: string;
    checker: string;
    payway: string;
  } | null;
  change: () => void;
};

const Popup = (props: Props) => {
  return (
    <Wrap>
      <Body>
        <svg
          onClick={props.change}
          style={{ position: "absolute", right: "10px", top: "10px" }}
          className="icon close"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="15188"
          width="30"
          height="30"
        >
          <path
            d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z"
            fill="#e61f1f"
            p-id="15189"
          ></path>
          <path
            d="M927.846568 511.997953c0-229.315756-186.567139-415.839917-415.838893-415.839917-229.329059 0-415.85322 186.524161-415.85322 415.839917 0 229.300406 186.524161 415.84094 415.85322 415.84094C741.278405 927.838893 927.846568 741.29836 927.846568 511.997953M512.007675 868.171955c-196.375529 0-356.172979-159.827125-356.172979-356.174002 0-196.374506 159.797449-356.157629 356.172979-356.157629 196.34483 0 356.144326 159.783123 356.144326 356.157629C868.152001 708.34483 708.352505 868.171955 512.007675 868.171955"
            fill="#e61f1f"
            p-id="15190"
          ></path>
          <path
            d="M682.378947 642.227993 553.797453 513.264806 682.261267 386.229528c11.661597-11.514241 11.749602-30.332842 0.234337-41.995463-11.514241-11.676947-30.362518-11.765975-42.026162-0.222057L511.888971 471.195665 385.223107 344.130711c-11.602246-11.603269-30.393217-11.661597-42.025139-0.059352-11.603269 11.618619-11.603269 30.407544-0.059352 42.011836l126.518508 126.887922L342.137823 639.104863c-11.662621 11.543917-11.780301 30.305213-0.23536 41.96988 5.830799 5.89015 13.429871 8.833179 21.086248 8.833179 7.53972 0 15.136745-2.8847 20.910239-8.569166l127.695311-126.311801L640.293433 684.195827c5.802146 5.8001 13.428847 8.717546 21.056572 8.717546 7.599072 0 15.165398-2.917446 20.968567-8.659217C693.922864 672.681586 693.950494 653.889591 682.378947 642.227993"
            fill="#e61f1f"
            p-id="15191"
          ></path>
        </svg>
        <div className="main">
          <div className="user">{props.data?.user}</div>
          <div className="grid">
            <div className="span-col-2">
              <div className="title">单号</div>
              <div className="content">{props.data?.key}</div>
            </div>
            <div className="item">
              <div className="title">品牌</div>
              <div className="content">{props.data?.brand}</div>
            </div>
            <div className="item">
              <div className="title">型号</div>
              <div className="content">{props.data?.model}</div>
            </div>
            <div className="item">
              <div className="title">送修时间</div>
              <div className="content">{props.data?.date}</div>
            </div>
          </div>
          <div className="grid">
            <div>
              <div className="title">序列号</div>
              <div className="content">{props.data?.series}</div>
            </div>
            <div className="item">
              <div className="title">密码</div>
              <div className="content">{props.data?.password}</div>
            </div>
            <div className="item">
              <div className="title">备注</div>
              <div className="content">{props.data?.mask}</div>
            </div>
            <div className="item">
              <div className="title">服务方式</div>
              <div className="content">{props.data?.fixway}</div>
            </div>
            <div className="item">
              <div className="title">支付方式</div>
              <div className="content">{props.data?.payway}</div>
            </div>
          </div>
          <div className="grid">
            <div>
              <div className="title">开单员</div>
              <div className="content">{props.data?.open}</div>
            </div>
            <div className="item">
              <div className="title">检测员</div>
              <div className="content">{props.data?.checker}</div>
            </div>
          </div>
        </div>
      </Body>
    </Wrap>
  );
};

export default Popup;
