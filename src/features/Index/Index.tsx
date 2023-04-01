import style from "./Index.module.css";
import { Layout, Menu, theme, Modal } from "antd";
import type { MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { Info, Friends, Groups } from "./indexApi";
import axios from "../../axios/index";
import type { User } from "./Indexd";
import Dialog from "../Dialog/Dialog";
import Messagebox from "../MessageBox/Messagebox";
import Slidermenu from "../SiderMenu/SilderMenu";
import SystemMsg from "../SystemMsg/SystemMsg";
const { Header, Content, Footer, Sider } = Layout;
const Index = () => {
  console.log('Index被执行了');
  const [systemmessage, putsystemmessage] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isaddFmodel, setaddFmodel] = useState(false);
  function addfriend() {
    setaddFmodel(true);
  }
  function handleCanceladdF() {
    setaddFmodel(false);
  }
  function handleOkaddF() {
    axios
      .post("/friend/add", {
        friend_id: parseInt((document.getElementById("friend_id") as HTMLInputElement)
          .value),
        apply_msg: (document.getElementById("apply_msg") as HTMLInputElement)
          .value,
      })
      .then(
        (res) => {
          setaddFmodel(false);
        },
        (err) => {
          alert(err)
        }
      );
  }
  const [header, setheader] = useState("欢迎");
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Slidermenu setheader={setheader} addfriend={addfriend} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          height: '100vh',
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center",
          }}
        >
          {header}
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "scroll",
          }}
        >
          {
            header === '系统消息' ? <SystemMsg /> : header==='欢迎'?'':<Dialog />
          }
        </Content><Footer
          style={{
            position: "sticky",
            bottom: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          {
            (header !== '系统消息' && header !== '欢迎') ? <Messagebox /> : ''
          }
        </Footer>
      </Layout>
      <Modal
        title="Basic Modal"
        open={isaddFmodel}
        onOk={handleOkaddF}
        onCancel={handleCanceladdF}
      >
        <div>
          账号id:
          <input
            type="text"
            id="friend_id"
            pattern="^123$"
            required
            title="输入格式不正确" />
        </div>
        <div>
          申请信息:
          <input type="text" id="apply_msg" required title="输入格式不正确" />
        </div>
      </Modal>
    </Layout>
  );
};
export default Index;
