import axios from "../../axios";
import { useEffect, useState } from "react";

const SystemMsg= () => {
    const [list,putlist]=useState([
        {
            "apply_msg": "我是阿丁",
            "friend_id": "000000000000",
            "id": "63",
            "user_id": "7"
        }
    ])
    useEffect(()=>{
         axios.get('/friend/list').then( res=>{
            putlist(res.data.list)
        })
    },[])
    function agreefri(e:any){
        axios.post('/friend/agree',{friend_id:parseInt(e.target.getAttribute('data-key')),agree:true}).then(()=>{alert('成功')},(err)=>{alert(err)})
    }
    return (<>
    {list.map(value=>{return <div style={{}}>
        {value.apply_msg}
        <button data-key={value.friend_id} onClick={agreefri}>同意</button>
        <button>拒绝</button>
    </div>})}
   </>);
}
 
export default SystemMsg;