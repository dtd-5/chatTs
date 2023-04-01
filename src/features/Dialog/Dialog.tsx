import { useCallback, useEffect, useState } from 'react';
import style from './Dialog.module.css'
import PubSub from 'pubsub-js';
import axios from '../../axios';

const Dialog = (props: any) => {
    console.log('dialog被执行了');
    const [message, putmessage] = useState([])
    const [myid, putmyid] = useState()
    useEffect(() => {
        PubSub.subscribe('RecMes', (msg, data) => {
            putmessage([...message, data])
        })
        PubSub.subscribe('clickFriends', (msg, data: any) => {
            axios.post('/chat/user/history',
                {
                    limit: 1,
                    offset: 0,
                    other_id: parseInt(data.id),
                    // other_id:,
                    pagination: true
                }
            ).then(res => {
                putmessage(res.data.list) 
            })
        })
        PubSub.subscribe('clickGroups',(msg,data:any)=>{
            axios.post('',{}).then(res=>{})
        })
        if (localStorage.getItem('userInfo') !== null) {
            console.log(222);
            putmyid(JSON.parse(localStorage.getItem('userInfo')).id)
        }
    }, [])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {
                message.map((value: string) => {
                    let res = JSON.parse(value.replaceAll("/\\/g", " "))
                    if (res.to == myid) { return <><div className={style.other}>22222</div></> }
                    else { return <div className={style.myth}>111</div> }
                })
            }
        </div>
    );
}

export default Dialog;