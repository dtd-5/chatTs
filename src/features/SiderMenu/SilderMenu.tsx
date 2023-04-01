import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { User } from "../Index/Indexd";

interface SlidermenuProps {
    setheader: Function,
    addfriend: Function
}

const Slidermenu = ({ setheader, addfriend }: SlidermenuProps) => {
    console.log('slidermenu被执行了');
    const [info, putinfo] = useState({} as User);
    const [friends, putfriends] = useState([]);
    const [groups, putgroups] = useState([]);
    const items: MenuProps["items"] = [

        {
            label: "系统消息",
            key: "system"
        },
        { label: "好友", key: "friends", children: friends },
        { label: "群聊", key: "groups", children: groups },
        { label: '添加好友', key: 'addfriend' }

    ];
    useEffect(() => {
        axios.get('/user/info').then((res) => {
            putinfo(res.data.user)
            localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        })
        axios.get('/user/friends').then((res) => {
            let ans = [];
            for (let x of res.data.list) {
                ans.push({
                    label: x.name + ' id:' + x.id,
                    // icon: x.avatar,
                    key: [x.name, x.id],
                });
            }
            putfriends(ans);
        });
        axios.get('/user/groups').then((res) => {
            let ans = [];
            for (let x of res.data.list) {
                ans.push({ label: x.name, icon: x.avatar, key: [x.name, x.id] });
            }
            putgroups(ans);
        });
        axios.get("/friend/list").then((res) => { });
    }, []);
    function clickmenu(doc: any) {
        if (doc.key === "system") {
            setheader("系统消息");
        } else if (doc.key === 'addfriend') {
            addfriend()
        } else if (doc.keyPath[1] === 'friends') {
            setheader(doc.key.split(',')[0]);
            PubSub.publish('clickFriends', { id: doc.key.split(',')[1] })
        } else {
            setheader(doc.key.split(',')[0]);
            PubSub.publish('clickGroups', { id: doc.key.split(',')[1] })
        }

    }
    return (<>
        <div id="context-menu" style={{ "display": "none", color: 'white', backgroundColor: 'orange' }}>
            <ul>
                <li>发送消息</li>
                <li>邀请好友</li>
                <li>删除聊天</li>
            </ul>
        </div>
        <div
            style={{
                height: 50,
                margin: 16,
                background: "rgba(255, 255, 255, 0.2)",
            }}
        >
            <img src={info.avatar} height={50} alt="头像" />
            <span style={{
                display: 'inline-block',
                textAlign: 'center',
                verticalAlign: '150%',
                color: 'white',
                width: 'max-content',
                transform: 'translate(50%,0)'
            }}>{info.name + ' id:' + info.id}</span>
        </div>
        <Menu
            onClick={clickmenu}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
        />
    </>);
}

export default Slidermenu;