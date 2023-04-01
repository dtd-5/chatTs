import { useState } from 'react'
import socket from '../../axios/websocket'
import PubSub from 'pubsub-js';
import axios from '../../axios';
interface MessageboxProps {

}

const Messagebox = () => {
    const [friendId, putfriendId] = useState()
    PubSub.subscribe('clickFriends', (msg, data: any) => {
        putfriendId(data.id);
    })
    const [sendmessage, putsendmessage] = useState("")
    function handleinput(e: any) {
        putsendmessage(e.target.value)
    }
    function handlemessage(data: any) {
        socket.send(JSON.stringify({
            "to": parseInt(friendId),
            "content": sendmessage,
            "message_type": 1,
            "content_type": 1
        }))
        putsendmessage('')
    }

    return (<>
        <textarea
            value={sendmessage} onChange={handleinput}
            style={{ resize: "none" }}
            name=""
            id=""
            cols={90}
            rows={3}
            minLength={90}
        ></textarea>
        <button onClick={handlemessage}>发送</button>
    </>);
}

export default Messagebox;