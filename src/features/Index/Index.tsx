import style from "./Index.module.css";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from "react";
import {Info,Updata,Password,Friends,Groups} from './indexApi'
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const Index = () => {
  const [info,putinfo] =useState({
    "avatar": "",
    "email": "1842501760@qq.com",
    "gender": "",
    "id": "5",
    "name": "devildyw",
    "nickname": "6b69d7de526f41ccae4dd7b0f3b9135a",
    "signature": "",
    "uuid": "6b69d7de526f41ccae4dd7b0f3b9135a"
  })
  const [friends,putfriends] =useState([])
  const [groups,putgroups] =useState([])
    const items: MenuProps['items'] = [
    {label:'好友',key:'friends',children:friends},
    {label:'群聊',key:'friends',children:[]},
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ])
  ];
  useEffect(()=>{
    Info().then(res=>putinfo(res.data.user))
    Friends().then(res=>{
      let ans=[]
      for(let x of res.data.list){
        ans.push({label:x.name,icon:x.avatar})
      }
      putfriends(ans)
    })
    Groups().then(res=>{
      let ans=[]
      for(let x of res.data.list){
        ans.push({label:x.name,icon:x.avatar})
      }
      putgroups(ans)
    })
    
  },[])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        <div
          style={{
            height: 50,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <img src="src/assets/face.webp" height={50} alt="头像" />
          <span className={style.myname}>{info.name}</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                )
              )
            }
          </div>
        </Content>
        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            width: '100%',
            // textAlign: "center"
          }}
        >
          <textarea style={{ resize: 'none' }} name="" id="" cols={90} rows={3} minLength={90} ></textarea>
          <button>发送</button>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Index;
