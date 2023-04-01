import Pubsub from 'pubsub-js'
let token=`${localStorage.getItem('token')}`
let socket=new WebSocket('ws://47.108.66.104:8088/chat/ws',[token])
socket.addEventListener('error',(err)=>{console.log(err);
})
socket.addEventListener('message',(e)=>{
    let msg=e.data    
    Pubsub.publish('RecMes',msg)
    
})
Pubsub.subscribe('SendMes',(data)=>{
    socket.send(data)
})
socket.addEventListener('error',(err)=>alert(err))
socket.addEventListener('close',()=>{alert('socket连接已关闭')})
export default socket
