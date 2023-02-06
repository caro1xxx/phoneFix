import React, { useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider, Collapse, theme, Switch } from "antd";
import { HOST } from "../ENV";
import useSWR from "swr";
import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const Wrap = styled.div`
  background-color: white;
  padding: 10px 10px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
`;
const SubWrap = styled.div`
  padding-left: 30px;
`;
const HeadNum = styled.span`
  color: #a8a8a8;
  font-style: italic;
  margin: 10px;
`;

const { Panel } = Collapse;

type Props = {};

type model = {
  model: string;
  pk: number;
  fields: { name: string; state: string };
  child?: {
    model: string;
    pk: number;
    fields: { name: string; state: string };
  }[];
};

const BrandManage = (props: Props) => {
  const { token } = theme.useToken();
  const [brandList, setBrandList] = useState<model[]>();
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const onSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const onCollapseChange = (key: number) => {
    if (!brandList) return;
    let old = [...brandList];
    old.forEach((item) => {
      if (item.pk === key) {
        fetch(`${HOST}/api/v1/brand_model_manage/`, {
          method: "POST",
          body: JSON.stringify({ brand: item.fields.name }),
          headers: { "Content-Type": "applicat ion/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            item.child = JSON.parse(data.list);
            setBrandList(old);
          });
      }
    });
  };

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBrandList(JSON.parse(data.list));
      });

  const { error, isLoading } = useSWR(
    `${HOST}/api/v1/brand_model_manage/`,
    fetcher
  );

  if (error) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;
  if (!brandList) return <div>error1</div>;

  return (
    <Wrap>
      <Divider className="title">品牌型号管理</Divider>
      <Back></Back>
      <div style={{ marginBottom: "20px" }}></div>

      {brandList.map((item, index) => {
        return (
          <Collapse
            onChange={() => {
              onCollapseChange(item.pk);
            }}
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ background: token.colorBgContainer }}
          >
            <Panel
              style={panelStyle}
              key={item.pk}
              header={
                <div>
                  <span>{item.fields.name}</span>
                  <DeleteOutlined style={{ color: "red", float: "right" }} />
                  <EditOutlined
                    style={{ float: "right", marginRight: "10px" }}
                  />
                  <Switch
                    style={{ float: "right", margin: "0px 10px" }}
                    // defaultChecked
                    checked={item.fields.state === "1" ? true : false}
                    onChange={onSwitchChange}
                    size="small"
                  />
                </div>
              }
            >
              <SubWrap>
                {item.child === null ? (
                  <></>
                ) : (
                  item.child?.map((item) => {
                    return (
                      <p>
                        <HeadNum>#1</HeadNum>
                        <span>{item.fields.name}</span>
                        <DeleteOutlined
                          style={{ color: "red", float: "right" }}
                        />
                        <EditOutlined
                          style={{ float: "right", marginRight: "10px" }}
                        />
                        <Switch
                          style={{ float: "right", margin: "0px 10px" }}
                          defaultChecked
                          onChange={onSwitchChange}
                          size="small"
                        />
                      </p>
                    );
                  })
                )}
              </SubWrap>
            </Panel>
          </Collapse>
        );
      })}
    </Wrap>
  );
};

export default BrandManage;
