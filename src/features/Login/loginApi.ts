import axios from '../../axios/index'
export function getCodeapi(email:string) {
    return axios.get(`/user/email/${email}`)
}
export function registerapi(name: string, password: string, email: string, code: string) {
    return axios.post('/user/register', { name, password, email, code })
}
export function loginapi(name: string, password: string) {
    return axios.post('/user/login', { name, password })
}
