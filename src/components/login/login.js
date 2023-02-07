import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { Dna } from  'react-loader-spinner';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url(images/cricket-stadium.jpg);
  /* filter: backdrop-blur(100px); */
  background-size: cover;
  flex-wrap: wrap;
  /* background-repeat: no-repeat; */
  background-position: center;
  /* font-family: 'Itim', cursive; */
`

const LoginDiv = styled.div`
  /* background-color: rgba(2, 243, 247, 0.5); */
  /* display: flex; */
  /* flex-wrap: wrap; */
  justify-content: center;
  text-align: center;
  width: 30%;
  height: 50%;
`

const Input = styled.input`
  border-radius: 25px;
  border: 2px solid #dddfe2;
  outline: none;
  color: #1d2129;
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
  width:75%;
  height: 52px;
  font-size: 1.2rem;
  /* font-family: 'Itim', cursive; */
`
const Button = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove border */
  color: white; /* White text */
  padding: 15px 32px; /* Add padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline */
  font-size: 16px; /* Set font size */
  margin: 4px 2px; /* Add margin */
  border-radius: 50px; /* Round the corners */

  @media (max-width: 286px) {
    width: 75px;
    text-align: center;
    padding: 10px 15px;
  }
`

const Login = () => {
  const userNavigateHook = useNavigate();

  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const login = () => {
    setLoading(true);
    Axios.post("https://ultimate-cricket.onrender.com/user/login", {
      email: user.email,
      password: user.password,
    }).then(res => {
      setLoading(false);
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
          text: errorString1 + errorString2 + errorString3 + errorString4
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
        userNavigateHook("/home");
      }
    })
  }
  return (
    <>
      <Wrapper>
        { loading ?  <LoginDiv> <Dna visible={true} height="80" color="#4fa94d" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/> </LoginDiv> :
          <LoginDiv>
            <h1>LOGIN</h1>
            <Input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></Input><br></br>
            <Input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></Input><br></br>
            <Button onClick={login}> Login </Button>
          </LoginDiv>
        }
      </Wrapper>
    </>  
  )
}

export default Login;
