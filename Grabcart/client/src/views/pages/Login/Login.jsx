import { useState } from "react";
import styled from 'styled-components'
import { host } from "../../../utils/APIRoutes";
import {Navigate, useNavigate} from 'react-router-dom'
//import '../../../styles/log.css'

 function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('Email....');
  const [pswrd, setpswrd] = useState('Password....');


  const handleUser = async (e) => {
    e.preventDefault();
    setemail('Email...');
    setpswrd('Password...');
    
    const username = localStorage.getItem('username');
    console.log(" in login " ,username , 'name ');
    if(username === 'null')
    {
      const form = document.querySelector('form');
      const data = new FormData(form);

      const result = await fetch(`${host}/login` , { method:'post',body:data})
      const response = await result.json();
      const msg = response['msg'];
      if(msg === 'success')
      {
        localStorage.setItem('username',response['username']);
        localStorage.setItem('uid' ,response['uid'] );
        alert('user logged in');
        navigate('/');
      }else{
        alert(msg);
        return;
      }
    }else{
      console.log('user set already')
      navigate('/');
    }
  }

  return (
    <>
    <div>
        <button className="login"><a href="/login">LOGIN</a></button>
        <button className="register"><a href="/register">REGISTER</a></button>
    </div>
    <Container>
        <form onSubmit={(e) => handleUser(e)} >
          <input type="text" className="input" value={email} onChange={(e) => setemail(e.target.value)}  name="email"  placeholder='Email'/>
          <input type="text" className="input" value={pswrd} onChange={(e) => setpswrd(e.target.value)}  name="password" placeholder='Password'/>
          <button type="submit" id="submit"  className="input">SUBMIT</button>
      </form>   
    </Container>
    </>
  )
}

const Container = styled.div`
position: absolute;
width: 324px;
height: 284px;
left: 27px;
top: 268px;
left: calc(50% - 324px/2 + 0.5px);
top: calc(50% - 287.44px/2 - 0.28px);
background: #94BDE3;
border-radius: 20px;
`
export default Login;