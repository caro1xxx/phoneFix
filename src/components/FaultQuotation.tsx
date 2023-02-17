import React, { useState } from "react";
import styled from "styled-components";
import { Select, Button, InputNumber } from "antd";
import { HOST } from "../ENV";
import { nanoid } from "nanoid";
import useSWR from "swr";

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
  position: relative;
  background-color: white;
  height: 40vh;
  width: 25vw;
  border-radius: 3px;
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin: 20px 25px 0px 25px;
  }
  .body {
    margin: 0px 15px 15px 15px;
    border-bottom: 0.5px solid #e8e8e8;
    padding-top: 5px;
    font-size: 14px;
  }
  .select {
    margin: 5px 10px;
  }
  .existFault {
    margin: 25px;
    margin-top: 0px;
    .item {
      border: 0.5px solid #f0f0f0;
      border-radius: 5px;
      padding: 5px;
      font-size: 12px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      margin: 5px 0px;
    }
  }
`;

type Props = {
  change: (type: string) => void;
  order: string;
};

interface faultList {
  model: string;
  pk: number;
  fields: { name: string; state: boolean };
}

type faultOrderType = {
  pk: number;
  fields: {
    fixer: string;
    group: string;
    name: string;
    price: number;
    warranty: number;
  };
  models: string;
};

const FaultQuotation = (props: Props) => {
  const [fault, setFault] = useState([
    { value: "", lable: "", disabled: false },
  ]);

  const [data, setData] = useState({
    fixer: [
      { value: "周渝", label: "周渝", disabled: false },
      { value: "刘毅", label: "刘毅", disabled: false },
      { value: "喻小娟", label: "喻小娟", disabled: false },
      { value: "唐洁", label: "唐洁", disabled: false },
    ],
    curentOrderFault: [
      { fixer: "", group: "", name: "", price: 0, warranty: 0 },
    ],
    currentFixer: "",
    currentFault: "",
    price: 0,
    warranty: 30,
  });

  // 保存该订单故障
  const saveFaultOrder = () => {
    if (data.currentFault === "" || data.currentFixer === "") {
      alert("请填写完整");
    } else {
      fetch(`${HOST}/api/v1/submit_fault/`, {
        method: "post",
        body: JSON.stringify({
          fault: data.currentFault,
          fixer: data.currentFixer,
          group: props.order,
          price: data.price,
          warranty: data.warranty,
        }),
        headers: { "Content-Type": "applicat ion/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          if (d.code === 200) {
            let old = { ...data };
            old.curentOrderFault.unshift({
              fixer: data.currentFixer,
              group: props.order,
              name: data.currentFault,
              price: data.price,
              warranty: data.warranty,
            });
            setData(old);
          }
        });
    }
  };

  // 删除该订单故障
  const deleteFaultOrder = (faultName: string) => {
    fetch(`${HOST}/api/v1/delete_fault_order/`, {
      method: "post",
      body: JSON.stringify({
        fault: faultName,
        group: props.order,
      }),
      headers: { "Content-Type": "applicat ion/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        if (d.code === 200) {
          let old = { ...data };
          for (let i = 0; i < old.curentOrderFault.length; i++) {
            if (old.curentOrderFault[i].name === faultName) {
              old.curentOrderFault.splice(i, 1);
            }
          }
          setData(old);
        }
      });
  };

  // 选择框变化
  const selectChangeHandle = (value: string, type: string) => {
    let old = { ...data };
    switch (type) {
      case "fault":
        console.log(value);
        old.currentFault = value;
        setData(old);
        break;
      case "fixer":
        old.currentFixer = value;
        setData(old);
        break;
    }
  };

  // 数值输入框变化
  const numberInputChangeHandle = (value: number | null, type: string) => {
    let old = { ...data };
    switch (type) {
      case "price":
        old.price = value as number;
        setData(old);
        break;
      case "warranty":
        old.warranty = value as number;
        setData(old);
        break;
    }
  };

  // 获取该订单故障列表
  const getFault = () => {
    if (fault[0].value !== "") return;
    fetch(`${HOST}/api/v1/get_fault/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          let result = JSON.parse(data.list);
          let newFault = [{ value: "1", lable: "", disabled: false }];
          newFault.splice(0, 1);
          result.forEach((item: faultList) => {
            newFault.push({
              value: item.fields.name,
              lable: item.fields.name,
              disabled: !item.fields.state,
            });
          });
          setFault(newFault);
        }
      });
  };

  // fetcher
  const fetcher = (url: string) => {
    if (data.curentOrderFault[0].name !== "") return;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        if (d.code === 200) {
          let result = JSON.parse(d.list);
          let old = { ...data };
          old.curentOrderFault.splice(0, 1);
          result.forEach((item: faultOrderType) => {
            old.curentOrderFault.push({ ...item.fields });
          });
          setData(old);
        }
      });
  };

  // swr
  const { error, isLoading } = useSWR(
    `${HOST}/api/v1/all_fault_order/?group=${props.order}`,
    fetcher
  );

  if (error) return <div>error</div>;

  return (
    <Wrap>
      <Body>
        <svg
          onClick={() => {
            props.change("fault");
          }}
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
        <div className="title">故障报价</div>
        <div className="body">
          <Select
            defaultValue="请选择故障"
            className="select"
            style={{ width: 140 }}
            onChange={(value) => {
              selectChangeHandle(value, "fault");
            }}
            onClick={getFault}
            options={fault}
          />
          <Select
            defaultValue="请选择维修员"
            className="select"
            onChange={(value) => {
              selectChangeHandle(value, "fixer");
            }}
            style={{ width: 140 }}
            options={data.fixer}
          />
          <InputNumber
            className="select"
            min={0}
            max={10000}
            onChange={(value) => {
              numberInputChangeHandle(value, "price");
            }}
            placeholder="报价"
          />
          <InputNumber
            className="select"
            min={0}
            max={10000}
            onChange={(value) => {
              numberInputChangeHandle(value, "warranty");
            }}
            defaultValue={30}
            placeholder="保修期"
          />
          <Button
            type="primary"
            onClick={saveFaultOrder}
            style={{ margin: "10px", width: "90%" }}
          >
            保存
          </Button>
        </div>
        <div className="existFault">
          <div style={{ textAlign: "center", fontSize: "10px" }}>
            已存在故障
          </div>
          <div style={{ overflow: "scroll", height: "80px" }}>
            {data.curentOrderFault.map((item) => {
              return (
                <div className="item" key={nanoid()}>
                  <span>故障:{item.name}</span>
                  <span>报价:{item.price}</span>
                  <span
                    onClick={() => {
                      deleteFaultOrder(item.name);
                    }}
                    style={{
                      textAlign: "end",
                      color: "#1677ff",
                    }}
                  >
                    删除
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Body>
    </Wrap>
  );
};

export default FaultQuotation;
