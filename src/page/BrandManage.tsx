import React, { useRef, useState } from "react";
import styled from "styled-components";
import Back from "../components/Back";
import { Divider, Collapse, theme, Switch, Input } from "antd";
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
  showInput: boolean;
  child: {
    model: string;
    pk: number;
    fields: { name: string; state: string };
    showInput: boolean;
  }[];
};

const BrandManage = (props: Props) => {
  const { token } = theme.useToken();
  const [brandList, setBrandList] = useState<model[]>();
  const oldBrandOrModelName = useRef("");
  //折叠板样式
  const panelStyle = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  // 品牌开关变化
  const onSwitchChange = (name: String) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      if (old[i].fields.name === name) {
        fetch(`${HOST}/api/v1/brand_model_change/`, {
          method: "POST",
          body: JSON.stringify({
            origin: "brand",
            name: old[i].fields.name,
            state: old[i].fields.state === "1" ? "0" : "1",
          }),
          headers: { "Content-Type": "applicat ion/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.code === 200) {
              old[i].fields.state = old[i].fields.state === "1" ? "0" : "1";
              setBrandList(old);
            }
          });
        break;
      }
    }
  };

  //型号开关变化
  const onSubSwitchChange = (name: string) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      let brand = old[i].fields.name;
      if (old[i].child === undefined) continue;
      for (let j = 0; j < old[i].child.length; j++) {
        if (old[i].child[j].fields.name === name) {
          fetch(`${HOST}/api/v1/brand_model_change/`, {
            method: "POST",
            body: JSON.stringify({
              origin: "model",
              name: old[i].child[j].fields.name,
              state: old[i].child[j].fields.state === "1" ? "0" : "1",
              brand: brand,
            }),
            headers: { "Content-Type": "applicat ion/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.code === 200) {
                old[i].child[j].fields.state =
                  old[i].child[j].fields.state === "1" ? "0" : "1";
                setBrandList(old);
              }
            });
          break;
        }
      }
    }
  };

  // 折叠变化
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

  // 显示为可编辑
  const onPanelEdit = (name: string) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      if (old[i].fields.name === name) {
        oldBrandOrModelName.current = old[i].fields.name;
        old[i].showInput = true;
        setBrandList(old);
      } else {
        old[i].showInput = false;
      }
    }
  };

  // 编辑
  const onChangeInputContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: String
  ) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      if (old[i].fields.name === name) {
        old[i].fields.name = e.target.value;
        setBrandList(old);
        break;
      }
    }
  };

  // 删除
  const onDeleteBrand = (name: string, model = false) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      if (model) {
        if (old[i].child === undefined) continue;
        for (let j = 0; j < old[i].child.length; j++) {
          if (old[i].child[j].fields.name === name) {
            fetch(`${HOST}/api/v1/brand_model_delete/`, {
              method: "post",
              body: JSON.stringify({
                origin: "model",
                name: old[i].child[j].fields.name,
                brand: old[i].fields.name,
              }),
              headers: { "Content-Type": "applicat ion/json" },
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                old[i].child.splice(j, 1);
                setBrandList(old);
              });
            break;
          }
        }
      } else {
        if (old[i].fields.name === name) {
          fetch(`${HOST}/api/v1/brand_model_delete/`, {
            method: "post",
            body: JSON.stringify({
              origin: "brand",
              name: old[i].fields.name,
            }),
            headers: { "Content-Type": "applicat ion/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              old.splice(1, i);
              setBrandList(old);
            });
          break;
        }
      }
    }
  };

  // 回车保存
  const onInputCenterEnter = (name: string) => {
    if (!brandList) return;
    let old = [...brandList];
    for (let i = 0; i < old.length; i++) {
      if (old[i].fields.name === name) {
        old[i].showInput = false;
        setBrandList(old);
        fetch(`${HOST}/api/v1/brand_model_edit/`, {
          method: "post",
          body: JSON.stringify({
            origin: "brand",
            oldname: oldBrandOrModelName.current,
            value: old[i].fields.name,
          }),
          headers: { "Content-Type": "applicat ion/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
        break;
      }
    }
  };

  // fetcher
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let newData: model[] = [...JSON.parse(data.list)];
        newData.forEach((item) => {
          item.showInput = false;
          item.child?.forEach((item) => {
            item.showInput = false;
          });
        });
        setBrandList(newData);
      });

  // swr
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
            {/* 品牌 */}
            <Panel
              style={panelStyle}
              key={item.pk}
              header={
                <div>
                  {item.showInput ? (
                    <span>
                      <Input
                        value={item.fields.name}
                        onChange={(e) => {
                          onChangeInputContent(e, item.fields.name);
                        }}
                        size="small"
                        style={{ width: "100px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                        }}
                        onPressEnter={(e) => {
                          onInputCenterEnter(item.fields.name);
                        }}
                      />
                      <span>(按下回车保存)</span>
                    </span>
                  ) : (
                    <span id="brandEdit">{item.fields.name}</span>
                  )}
                  <DeleteOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onDeleteBrand(item.fields.name);
                    }}
                    style={{ color: "red", float: "right" }}
                  />
                  <EditOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onPanelEdit(item.fields.name);
                    }}
                    style={{ float: "right", marginRight: "10px" }}
                  />
                  <Switch
                    style={{ float: "right", margin: "0px 10px" }}
                    // defaultChecked
                    checked={item.fields.state === "1" ? true : false}
                    size="small"
                    onClick={(checked, e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onSwitchChange(item.fields.name);
                    }}
                  />
                </div>
              }
            >
              {/* 子型号 */}
              <SubWrap>
                {item.child === null ? (
                  <></>
                ) : (
                  item.child?.map((item, index) => {
                    return (
                      <p>
                        <HeadNum>#{index}</HeadNum>
                        <span id="brandEdit">{item.fields.name}</span>
                        <DeleteOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            onDeleteBrand(item.fields.name, true);
                          }}
                          style={{ color: "red", float: "right" }}
                        />
                        <Switch
                          style={{ float: "right", margin: "0px 10px" }}
                          checked={item.fields.state === "1" ? true : false}
                          size="small"
                          onClick={(checked, e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            onSubSwitchChange(item.fields.name);
                          }}
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
      <div
        style={{
          backgroundColor: "rgb(249,249,249)",
          width: "100%",
          height: "30px",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "30px",
          textAlign: "center",
        }}
      >
        添加
      </div>
    </Wrap>
  );
};

export default BrandManage;
