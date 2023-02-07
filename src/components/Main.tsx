import React, { useState } from "react";
import styled from "styled-components";
import Upload from "./Upload";
import {
  Divider,
  Button,
  Dropdown,
  DatePicker,
  Input,
  Cascader,
  Select,
} from "antd";
import type { MenuProps, DatePickerProps } from "antd";
import { useNavigate } from "react-router-dom";
import { HOST } from "../ENV";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
const options: Option[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const Wrap = styled.div`
  background-color: white;
  height: calc(100vh);
  width: 100%;
  display: inline-block;
`;
const FixOrder = styled.div`
  margin-top: 15px;
  .title {
    font-size: 15px;
    font-weight: 700;
  }
`;
const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 0px 10px;
  div {
    background-color: #f7f6fc;
    padding: 10px;
    font-size: 25px;
    font-weight: 700;

    .logo {
      display: inline-block;
      width: 40%;
      float: right;
      text-align: end;
    }
    .num {
      display: inline-block;
      width: 40%;
    }
    .discription {
      font-size: 14px;
      width: 100%;
    }
  }
`;

const Fixbilling = styled.div`
  .title {
    font-size: 15px;
    font-weight: 700;
  }
  .fields {
    font-size: 13px;
  }
`;
const BaseInfo = styled.div`
  font-size: 12px;
  background-color: #f7f6fc;
  width: 40%;
  display: inline-block;
  margin: 5px 10px;
  padding: 10px;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .itmes {
    margin: 5px 5px;
    display: inline-block;
  }
`;
const MoreInfo = styled.div`
  font-size: 12px;
  background-color: #f7f6fc;
  float: right;
  width: 55%;
  display: inline-block;
  margin: 5px 10px;
  padding: 10px;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .itmes {
    margin: 5px 5px;
    display: inline-block;
  }
`;

type Props = {};

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

type brand = {
  model: string;
  pk: number;
  fields: {
    name: string;
    state: string;
  };
};

type UserList = {
  model: string;
  pk: number;
  fields: {
    name: string;
    create: string;
    mask: string;
    tel: string;
  };
};

const { TextArea } = Input;

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const onSeriesChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};

const Main = (props: Props) => {
  let navigate = useNavigate();

  const [info, setInfo] = useState({
    brand: [{ value: "", label: "", disabled: false }],
    model: [{ value: "", label: "", disabled: false }],
    currentSelectBrand: "",
    currentSelectModel: "",
    userList: [{ value: "", label: "", disabled: false }],
  });

  // 选择品牌
  const handleBrandChange = (value: string) => {
    let old = { ...info };
    old.currentSelectBrand = value;
    setInfo(old);
  };

  // 选择型号
  const handleModelChange = (value: string) => {
    let old = { ...info };
    old.currentSelectModel = value;
    setInfo(old);
  };

  // 请求品牌
  const onSelectBrand = () => {
    if (info.brand[0].value !== "") return;
    fetch(`${HOST}/api/v1/get_brand/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let old = { ...info };
        let result: brand[] = JSON.parse(data.list);
        if (old.brand[0].value === "") old.brand = [];
        result.forEach((item) => {
          old.brand.push({
            value: item.fields.name,
            label: item.fields.name,
            disabled: item.fields.state === "1" ? false : true,
          });
        });
        setInfo(old);
      });
  };

  // 请求型号
  const onSelectModel = () => {
    if (info.currentSelectBrand === "") return;
    fetch(`${HOST}/api/v1/get_brand/`, {
      method: "post",
      body: JSON.stringify({ brand: info.currentSelectBrand }),
      headers: { "Content-Type": "applicat ion/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let old = { ...info };
        let result: brand[] = JSON.parse(data.list);
        old.model = [];
        result.forEach((item) => {
          old.model.push({
            value: item.fields.name,
            label: item.fields.name,
            disabled: item.fields.state === "1" ? false : true,
          });
        });
        setInfo(old);
      });
  };

  // 获取用户列表
  const getUserlist = () => {
    fetch(`${HOST}/api/v1/user/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let result: UserList[] = JSON.parse(data.list);
        let old = { ...info };
        old.userList = [];
        result.forEach((item) => {
          old.userList.push({
            value: `${item.fields.name}|${item.fields.tel}`,
            label: `${item.fields.name}|${item.fields.tel}`,
            disabled: false,
          });
        });
        setInfo(old);
      });
  };

  return (
    <Wrap>
      <FixOrder>
        <Divider orientation="left" className="title">
          概括
        </Divider>
        <Overview>
          <div
            onClick={() => {
              navigate("/waitfix");
            }}
          >
            <div className="num">9</div>
            <div className="logo">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2228"
                width="30"
                height="30"
              >
                <path
                  d="M802.986 199.956c17.234 16.07 18.177 43.069 2.106 60.303-16.07 17.234-43.07 18.176-60.303 2.106C606.919 133.799 390.93 141.34 262.365 279.21 133.799 417.081 141.34 633.07 279.21 761.635 417.081 890.201 633.07 882.66 761.635 744.79c91.374-97.986 116.156-238.752 66.87-360.835-8.822-21.85 1.74-46.715 23.592-55.537 21.85-8.82 46.715 1.742 55.536 23.592 61.586 152.55 30.607 328.517-83.589 450.977-160.707 172.337-430.693 181.765-603.03 21.058s-181.765-430.693-21.058-603.03 430.693-181.765 603.03-21.058z m-89.353 377.933c21.21 10.268 30.08 35.785 19.812 56.994-10.268 21.21-35.786 30.08-56.995 19.812L503.283 570.86a42.667 42.667 0 0 1-24.075-38.403V312.625c0-23.564 19.103-42.667 42.667-42.667s42.667 19.103 42.667 42.667V505.71l149.091 72.179z"
                  fill="#000000"
                  p-id="2229"
                ></path>
              </svg>
            </div>
            <div className="discription">待维修</div>
          </div>
          <div>
            <div className="num">25</div>
            <div className="logo">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1452"
                width="30"
                height="30"
              >
                <path
                  d="M814.788 210.212c16.695 16.695 16.695 43.763 0 60.457-16.695 16.695-43.763 16.695-60.457 0-133.56-133.559-350.102-133.559-483.662 0-133.559 133.56-133.559 350.102 0 483.662 133.56 133.559 350.102 133.559 483.662 0 94.922-94.923 124.66-235.01 79.576-358.981-8.069-22.189 3.377-46.718 25.566-54.787 22.188-8.069 46.717 3.377 54.786 25.566 56.334 154.908 19.16 330.028-99.47 448.66-166.95 166.948-437.628 166.948-604.577 0-166.95-166.95-166.95-437.628 0-604.577 166.949-166.95 437.627-166.95 604.576 0zM639.084 392.92c15.893-17.46 42.931-18.73 60.391-2.836 17.46 15.893 18.73 42.93 2.837 60.39L503.48 668.905c-16.582 18.216-45.087 18.687-62.261 1.028l-112.4-115.576c-16.46-16.925-16.084-43.99 0.842-60.451s43.99-16.084 60.452 0.842l80.723 83.004L639.084 392.92z"
                  fill="#000000"
                  p-id="1453"
                ></path>
              </svg>
            </div>
            <div className="discription">维修中</div>
          </div>
          <div>
            <div className="num">128</div>
            <div className="logo">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4172"
                width="30"
                height="30"
              >
                <path
                  d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 64C311.701333 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333z m-181.333333 469.333334a32 32 0 0 1 27.84 16.213333h0.042666a170.56 170.56 0 0 0 145.642667 81.664 170.56 170.56 0 0 0 145.664-81.685333 32 32 0 1 1 54.613333 33.408h-0.021333a234.517333 234.517333 0 0 1-200.256 112.277333 234.517333 234.517333 0 0 1-200.256-112.277333A32 32 0 0 1 330.666667 618.666667zM362.666667 362.666667a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m298.666666 0a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
                  fill="#000000"
                  p-id="4173"
                ></path>
              </svg>
            </div>
            <div className="discription">售后中</div>
          </div>
        </Overview>
      </FixOrder>
      <Fixbilling>
        <Divider orientation="left" className="title">
          维修开单
        </Divider>
        <BaseInfo>
          <div className="title">基础信息</div>
          <span className="itmes">
            客户:
            <Select
              defaultValue="请选择用户"
              style={{ width: 120 }}
              onChange={handleModelChange}
              onClick={getUserlist}
              options={info.userList}
            />
          </span>
          <span className="itmes">
            送修日期:
            <DatePicker onChange={onChange} style={{ width: "100px" }} />
          </span>
          <span className="itmes">
            品牌:
            <Select
              defaultValue="请选择品牌"
              style={{ width: 120 }}
              onChange={handleBrandChange}
              onClick={onSelectBrand}
              options={info.brand}
            />
          </span>
          <span className="itmes">
            型号:
            <Select
              defaultValue="请选择型号"
              style={{ width: 120 }}
              onChange={handleModelChange}
              onClick={onSelectModel}
              options={info.model}
            />
          </span>
          <span className="itmes">
            序列号:
            <Input showCount maxLength={20} onChange={onSeriesChange} />
          </span>
          <span className="itmes">
            密码:
            <Input placeholder="密码" />
          </span>
          <span className="itmes" style={{ width: "95%" }}>
            备注:
            <TextArea
              placeholder="备注"
              autoSize={{ minRows: 1, maxRows: 6 }}
            />
          </span>
        </BaseInfo>

        <MoreInfo>
          <div className="title">更多信息</div>
          <span className="itmes">
            付款方式:
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button>选择付款方式</Button>
            </Dropdown>
          </span>
          <span className="itmes">
            开单员:
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button>选择开单员</Button>
            </Dropdown>
          </span>
          <span className="itmes">
            检查员:
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button>选择检测员</Button>
            </Dropdown>
          </span>
          <span className="itmes">
            服务方式:
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button>选择服务方式</Button>
            </Dropdown>
          </span>
          <span className="itmes" style={{ width: "95%" }}>
            地址:
            <Cascader options={options} placeholder="Please select" />
          </span>
          <span className="itmes" style={{ width: "95%" }}>
            <Input placeholder="详细地址" />
          </span>
          <span className="itmes" style={{ width: "95%" }}>
            <Upload></Upload>
          </span>
        </MoreInfo>
        <Button
          type="primary"
          style={{
            width: "40%",
            marginLeft: "10px",
            marginTop: "5px",
            height: "30px",
          }}
        >
          保存
        </Button>
      </Fixbilling>
      <Divider
        orientation="right"
        style={{ fontSize: "15px", fontWeight: "700" }}
      >
        备忘录
      </Divider>
      <div style={{ padding: "0px 10px" }}>
        <TextArea
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
    </Wrap>
  );
};

export default Main;
