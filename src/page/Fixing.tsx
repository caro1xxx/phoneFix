import React, { useRef, useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider, Input } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { HOST } from "../ENV";
import useSWR from "swr";
import FixingPopup from "../components/FixingPopup";
import FaultQuotation from "../components/FaultQuotation";

const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .list {
    margin-top: 20px;
  }
`;

type UserInfo = {
  key: string;
  brand: string;
  model: string;
  date: string;
};

type Result = {
  pk: number;
  model: string;
  fields: {
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
  };
};

type List = {
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
};

type Props = {};

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const Fixing = (props: Props) => {
  const [fixList, setFixList] = useState<List[]>([]);
  const [popupProps, setPopupProps] = useState<{
    data: List | null;
    state: boolean;
  }>({ data: null, state: false });

  const [Fault, setFault] = useState<{
    state: boolean;
    key: string;
  }>({ state: false, key: "" });

  const reduceFixlist = (orderid: string) => {
    let old = [...fixList];
    for (let i = 0; i < old.length; i++) {
      if (old[i].key === orderid) {
        old.splice(i, 1);
        break;
      }
    }
    setFixList(old);
  };

  const changeClose = (type: string) => {
    if (type === "popup") {
      let old = { ...popupProps };
      old.state = false;
      setPopupProps(old);
    } else {
      let old = { ...Fault };
      old.state = false;
      setFault(old);
    }
  };

  const columns: ColumnsType<UserInfo> = [
    {
      title: "??????",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "??????",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "??????",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "??????",
      key: "mask",
      dataIndex: "mask",
    },
    {
      title: "????????????",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "??????",
      key: "action",
      render: (_, record) => (
        <Space>
          <Space size="middle">
            <a
              onClick={() => {
                checkdetail(record);
              }}
            >
              ??????
            </a>
          </Space>
          <Space size="middle">
            <a
              onClick={() => {
                fillinFaultRason(record);
              }}
            >
              ????????????
            </a>
          </Space>
        </Space>
      ),
    },
  ];

  const checkdetail = (record: UserInfo) => {
    fixList.forEach((item) => {
      if (item.key === record.key) {
        setPopupProps({ data: item, state: true });
      }
    });
  };

  const fillinFaultRason = (record: UserInfo) => {
    fixList.forEach((item) => {
      if (item.key === record.key) {
        setFault({ state: true, key: record.key });
      }
    });
  };

  // fetcher
  const fetcher = (url: string) => {
    if (fixList.length >= 1) return;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let result: Result[] = JSON.parse(data.list);
        let old = [...fixList];
        result.forEach((item) => {
          old.push({ ...item.fields });
        });
        setFixList(old);
      });
  };

  // swr
  const { error, isLoading } = useSWR(`${HOST}/api/v1/order/?state=2`, fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;
  if (!fixList) return <div>error1</div>;

  return (
    <Wrap>
      {popupProps.state ? (
        <FixingPopup
          data={popupProps.data}
          reduce={reduceFixlist}
          change={changeClose}
        ></FixingPopup>
      ) : (
        <></>
      )}
      {Fault.state ? (
        <FaultQuotation change={changeClose} order={Fault.key}></FaultQuotation>
      ) : (
        <></>
      )}

      <Divider className="title">???????????????</Divider>
      <Back></Back>
      <Search
        placeholder="????????????"
        onSearch={onSearch}
        style={{ width: 300, float: "right" }}
      />
      <div className="list">
        <Table columns={columns} dataSource={fixList} />
      </div>
    </Wrap>
  );
};

export default Fixing;
