import React, { useRef, useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider, Input } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { HOST } from "../ENV";
import useSWR from "swr";
import Popup from "../components/Popup";

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

const WaitFix = (props: Props) => {
  const [fixList, setFixList] = useState<List[]>([]);
  const [popupProps, setPopupProps] = useState<{
    data: List | null;
    state: boolean;
  }>({ data: null, state: false });

  const changeClose = () => {
    let old = { ...popupProps };
    old.state = false;
    setPopupProps(old);
  };

  const columns: ColumnsType<UserInfo> = [
    {
      title: "单号",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "型号",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "备注",
      key: "mask",
      dataIndex: "mask",
    },
    {
      title: "送修时间",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              checkdetail(record);
            }}
          >
            详情
          </a>
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

  // fetcher
  const fetcher = (url: string) =>
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

  // swr
  const { error, isLoading } = useSWR(`${HOST}/api/v1/order/`, fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;
  if (!fixList) return <div>error1</div>;

  return (
    <Wrap>
      {popupProps.state ? (
        <Popup data={popupProps.data} change={changeClose}></Popup>
      ) : (
        <></>
      )}
      <Divider className="title">待维修订单</Divider>
      <Back></Back>
      <Search
        placeholder="搜索订单"
        onSearch={onSearch}
        style={{ width: 300, float: "right" }}
      />
      <div className="list">
        <Table columns={columns} dataSource={fixList} />
      </div>
    </Wrap>
  );
};

export default WaitFix;
