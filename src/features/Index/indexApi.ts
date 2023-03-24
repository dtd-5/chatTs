import axios from "../../axios";
export function Info() {
    return axios.get('/user/info', {
        headers: {
            token: `Bear ${localStorage.getItem('token')}`
        }
    })
}
export function Updata(
    avatar: string,
    gender: string,
    nick_name: string,
    signature: string) {
    return axios.post('/user/update', {
        avatar,
        gender,
        nick_name,
        signature
    }, {
        headers: {
            token: `Bear ${localStorage.getItem('token')}`
        }
    })
}

export function Password(old_pwd:string,new_pwd:string){
    return axios.post('/user/change/password',{old_pwd,new_pwd},{
        headers: {
            token: `Bear ${localStorage.getItem('token')}`
        }
    })
}

export function Friends() {
    return axios.get('/user/friends', {
        headers: {
            token: `Bear ${localStorage.getItem('token')}`
        }
    })
}
export function Groups() {
    return axios.get('/user/groups', {
        headers: {
            token: `Bear ${localStorage.getItem('token')}`
        }
    })
}