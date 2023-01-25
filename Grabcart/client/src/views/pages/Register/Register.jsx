import React from 'react'
import styled from 'styled-components'
import './Register.css'
import { useState } from 'react'
import { host } from '../../../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  
    const [uname, setuname] = useState();
    const [email, setemail] = useState();
    const [pswrd, setpswrd] = useState();
    const navigate = useNavigate();

  const handleUser = async (e) => {
    e.preventDefault();
      const form = document.querySelector('form');
      const data = new FormData(form);
      setuname('');
      setemail('');
      setpswrd('');
      const result = await fetch(`${host}/register` , { method:'post',body:data})
      const response = await result.json();
      const msg = response['msg'];
      if(msg === 'success')
      {
        alert('user registered');
        navigate('/');
      }else{
        alert(msg);
        navigate('/register');
      }
  }
  return (
    <>
    <div>
        <button className="register"><a href="/login">LOGIN</a></button>
        <button className="login"><a href="/register">REGISTER</a></button>
    </div>
    <Container>
        <form onSubmit={(e) => handleUser(e)}>
            <input onChange={(e) => setuname(e.target.value)} type="text" name="uname"  className="input" required placeholder='      Username'/>
            <input onChange={(e) => setemail(e.target.value)} type="text" name="email" className="input" required placeholder='      Email'/>
            <input onChange={(e) => setpswrd(e.target.value)} type="text" name="password" className="input" required placeholder='      Password'/>
            <button  type="submit" id="submit" className="input">SUBMIT</button>
        </form>
    </Container>
    </>
  )
}

const Container = styled.div`
position: absolute;
width: 324px;
height: 350px;
left: 27px;
top: 268px;
left: calc(50% - 324px/2 + 0.5px);
top: calc(50% - 287.44px/2 - 0.28px);
background: #94BDE3;
border-radius: 20px;
`