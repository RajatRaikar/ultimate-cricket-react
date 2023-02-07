import React, { useState } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

// import './login.css';

const Wrapper = styled.div`
width: 25%;
  height: 500px;
  position: fixed;
  margin: auto;
  top: 19%;
  left: 38%;
`

const Input = styled.input`
border-radius: 8px;
  border: 2px solid #dddfe2;
  outline: none;
  color: #1d2129;
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
  width: 92%;
  font-size: 1rem;
`
const Button = styled.button`
background: #1877f2;
  border: 1px solid #1877f2;
  color: #fff;
  font-size: 1.25rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  text-align: center;
`

const Login = () => {
    const userNavigateHook = useNavigate()

    const [ user, setUser] = useState({
        email:"",
        password:"",
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const login = () => {
        Axios.post("https://ultimate-cricket.onrender.com/user/login", {
              email: user.email,
              password: user.password,
            })
            .then( res => {
              let result = res.data;
              if(result.response_code === 201) {
                result = res.data.response_data;
                const errorString1 = result.errorObj.email_param !== undefined ? `${result.errorObj.email_param.error}\n` : '';
                const errorString2 = result.errorObj.name_param !== undefined ? `${result.errorObj.name_param.error}\n` : '' ;
                const errorString3 = result.errorObj.password_param !== undefined ? `${result.errorObj.password_param.error}\n` : '' ;

                const errorString4 =  result.errorObj.repeat_password_param !== undefined ? `${result.errorObj.repeat_password_param.error}\n` : '';
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: errorString1+ errorString2+errorString3+ errorString4
                })
              } else if (result.response_code === 203) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'user doesnt exist'
                }) 
              } else if (result.response_code === 500) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'something went wrong'
                }) 
              } else {
                localStorage.setItem('access_token', res.data.response_data.access_token);
                userNavigateHook("/home")
              }
            })
    }
    return (
        <>
        <Wrapper>
            <h1 style={{"text-align": "center"}}>LOGIN</h1>
                    <Input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></Input><br></br>
                    <Input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></Input><br></br>
                    <Button onClick={login}> Login </Button>
        </Wrapper>
        </>  
    )
}

export default Login;
