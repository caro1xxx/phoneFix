import React, { useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Divider, Input } from "antd";
import { HOST } from "../ENV";
import useSWR from "swr";

const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
`;

type UserInfo = {
  key: number;
  name: string;
  mask: string;
  create: string;
  tel: number;
};

type OldInfo = {
  fields: {
    name: string;
    mask: string;
    create: string;
    tel: number;
  };
  pk: number;
  model: string;
};

type Props = {};
const { Search } = Input;

const User = (props: Props) => {
  const [user, setUser] = useState<UserInfo[]>([
    {
      name: "",
      key: 1,
      tel: 123,
      create: "123",
      mask: "123",
    },
  ]);

  const deleteUser = (username: string) => {
    fetch(`${HOST}/api/v1/user/`, {
      method: "post",
      body: JSON.stringify({ username: username }),
      headers: { "Content-Type": "applicat ion/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          let old = [...user];
          old.forEach((item, index) => {
            if (item.name === username) {
              old.splice(index, 1);
            }
          });
          setUser(old);
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
        let old: OldInfo[] = JSON.parse(data.list);
        let result = [...user];
        result = [];
        old.forEach((item) => {
          result.push({
            name: item.fields.name,
            mask: item.fields.mask,
            tel: item.fields.tel,
            key: item.pk,
            create: item.fields.create,
          });
        });
        setUser(result);
      });

  const columns: ColumnsType<UserInfo> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "电话",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "创建时间",
      dataIndex: "create",
      key: "create",
    },
    {
      title: "备注",
      key: "mask",
      dataIndex: "mask",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              deleteUser(record.name);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  // swr
  const { error, isLoading } = useSWR(`${HOST}/api/v1/user/`, fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;
  if (!user) return <div>error</div>;

  return (
    <Wrap>
      <Divider className="title">用户管理</Divider>
      <Back></Back>
      <svg
        style={{ margin: "0px 14px" }}
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="14262"
        width="30"
        height="30"
      >
        <path
          d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m32 170.666667h-64v159.978667L320 480v64l160-0.021333V704h64v-160H704v-64h-160V320z"
          fill="#007FFC"
          p-id="14263"
        ></path>
      </svg>
      <Search placeholder="搜索订单" style={{ width: 300, float: "right" }} />
      <div style={{ marginTop: "15px" }}>
        <Table columns={columns} dataSource={user} />
      </div>
    </Wrap>
  );
};

export default User;
