import { FunctionComponent, useEffect, useRef } from "react";
import { Carousel } from "antd";
import style from './Login.module.css'

import { loginapi, registerapi, getCodeapi } from './loginApi'
import { useNavigate } from "react-router-dom";
const contentStyle = {
    height: "100%",
    color: "#fff",
    lineHeight: "160px",
    TextAlign: "center",
    background: "#364d79",
};
interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    let countdownInterval: NodeJS.Timer, countdownElem: HTMLButtonElement;
    let countdown = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate()
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        countdownElem = countdown.current;
    }, []); // 监听 DOM 元素的变化
    function startCountdown() {
        if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/.exec((document.getElementById('email') as HTMLInputElement).value))) {
            alert("请输入正确的邮箱")
            return
        }
        getCodeapi((document.getElementById('email') as HTMLInputElement).value)
        let seconds = 60;
        // 禁用按钮
        countdownElem.setAttribute('disabled', "")
        // 设置定时器，每秒更新倒计时
        countdownInterval = setInterval(function () {
            seconds--;
            countdownElem.innerText = seconds + '';
            if (seconds <= 0) {
                // 倒计时结束，清除定时器
                clearInterval(countdownInterval);
                countdownElem.removeAttribute('disabled')
                countdownElem.innerText = "确认";
            }
        }, 1000);
    }
    function turnregister() {
        document.getElementById("login").style.opacity = "0";
        document.getElementById("register").style.display = "flex";
        document.getElementById("register").style.opacity = "0.8";
    }
    function turnlogin() {
        clearInterval(countdownInterval);
        countdownElem.removeAttribute('disabled')
        countdownElem.innerText = "确认";
        document.getElementById("login").style.opacity = "0.8";
        document.getElementById("register").style.opacity = "0";
        document.getElementById("register").style.display = "none";

    }
    function login() {
        loginapi((document.getElementById('name1') as HTMLInputElement).value, (document.getElementById('password1') as HTMLInputElement).value).then(res => {
            navigate('/index')
            localStorage.setItem('token',res.data.token)
        },err=>{navigate('/index')})
    }
    function register(e: any) {
        registerapi((document.getElementById('name2') as HTMLInputElement).value,
            (document.getElementById('password2') as HTMLInputElement).value,
            (document.getElementById('email') as HTMLInputElement).value,
            (document.getElementById('code') as HTMLInputElement).value)
            .then(res => {
                turnlogin()
            })
    }
    return (
        <div>
            <Carousel autoplay>
                <div className={style.carousel}>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div className={style.carousel}>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div className={style.carousel}>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div className={style.carousel}>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <div className={style.logincard} id="login">
                <div>
                    <label className={style.block} htmlFor="name1" >
                        用户名:
                    </label>
                    <label className={style.block} htmlFor="password1" >
                        密码:
                    </label>
                </div>
                <div>
                    <input className={style.block} type="text" id="name1" />
                    <input className={style.block} type="password" id="password1" />
                </div>
                <div style={{ width: "100%" }}></div>
                <div className={style.login} onClick={login}>登录</div>
                <div style={{ width: "100%" }}></div>
                <div className={style.login} onClick={turnregister}>
                    注册
                </div>
            </div>
            <div className={style.registercard} id="register">
                <div>
                    <label className={style.block} htmlFor="name2" >
                        用户名:
                    </label>
                    <label className={style.block} htmlFor="password2">
                        密码:
                    </label>
                    <label className={style.block} htmlFor="email">
                        邮箱:
                    </label>
                    <label className={style.block} htmlFor="code">
                        验证码:
                    </label>
                </div>
                <div>
                    <input className={style.block} type="text" id="name2" />
                    <input className={style.block} type="password" id="password2" />
                    <div>
                        <input type="text" id="email" />
                        <button
                            id="countdown"
                            onClick={startCountdown}
                            style={{ paddingLeft: "10px", cursor: "pointer" }}
                            ref={countdown}
                        >
                            确认
                        </button>
                    </div>
                    <input className={style.block} type="password" id="code" />
                </div>
                <div style={{ width: "100%" }}></div>
                <div onClick={register} className={style.login}>注册</div>
                <div style={{ width: "100%" }}></div>
                <div onClick={turnlogin} className={style.login}>
                    返回
                </div>
            </div>
        </div>
    );
}

export default Login;