import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Lottie from "lottie-react";
import * as testJson from '../../lotties-data/home-screen-data.json';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// import './register.css';

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
const AnimationLogo = styled.div`
    width: 20rem;
    height: 20rem;
    
`
const Register = () => {
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    });

    const userNavigateHook = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    }

    const register = () => {
            Axios.post("https://ultimate-cricket.onrender.com/user/register", {
              email: user.email,
              name: user.name,
              password: user.password,
              repeat_password: user.reEnterPassword
            })
            .then( res => {
              let result = res.data;
              console.log(result, 'register');
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
              } else if (result.response_code === 202) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'email already exist try to login'
                }) 
              } else if (result.response_code === 500) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'something went wrong'
                }) 
              } else {
                localStorage.setItem('access_token', res.data.response_data.access_token);
                userNavigateHook("/home");
              }
            })
        
    }
    return (
        <>
        <Wrapper>
            <h1 style={{"text-align": "center"}}>REGISTER</h1>
                    <Input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></Input><br></br>
                    {/* {Object.keys(error.name_param).length > 0 && Object.keys(error.name_param).includes("error") ?  error.name_param.error : ''} */}
                    <Input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></Input><br></br>
                    {/* {error != null && Object.keys(error).length > 0 ? error.email_param.error : ''} */}
                    <Input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></Input><br></br>
                    {/* {Object.keys(error).length > 0 ? Object.keys(error.password_param) : ''} */}
                    <Input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></Input><br></br>
                    {/* {Object.keys(error).length > 0 ? Object.keys(error.repeat_password_param) : ''} */}
                    <Button onClick={register}> Register </Button> <Button onClick={() => { userNavigateHook("/login")}}> Login </Button>
                  <AnimationLogo><Lottie animationData={testJson} loop={true}/></AnimationLogo>  
        </Wrapper>
        </>        
    )
}

export default Register
