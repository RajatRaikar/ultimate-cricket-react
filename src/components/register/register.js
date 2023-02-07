import React, { useState } from 'react';
import Axios from 'axios';
import styled, {keyframes} from 'styled-components';
import Lottie from "lottie-react";
import * as testJson from '../../lotties-data/home-screen-data.json';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Dna } from  'react-loader-spinner';



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

const RegisterDiv = styled.div`
  /* background-color: rgba(2, 243, 247, 0.5); */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

  const [loading, setLoading] = useState(false);

  const userNavigateHook = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const register = () => {
    setLoading(true);
    Axios.post("https://ultimate-cricket.onrender.com/user/register", {
      email: user.email,
      name: user.name,
      password: user.password,
      repeat_password: user.reEnterPassword
    }).then(res => {
      setLoading(false);
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
    });
  }
  return (
    <>
    <Wrapper>
      {
        loading ?  <RegisterDiv> <Dna visible={true} height="80" color="#4fa94d" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/> </RegisterDiv>:
        <RegisterDiv>
          <h1>REGISTER</h1>
          <Input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></Input><br></br>
          <Input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></Input><br></br>
          <Input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></Input><br></br>
          <Input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></Input><br></br>
          <Button onClick={register}> Register </Button> <Button onClick={() => { userNavigateHook("/login")}}> Login </Button> 
          {/* <AnimationLogo><Lottie animationData={testJson} loop={true}/></AnimationLogo>   */}
        </RegisterDiv>
      }     
    </Wrapper>
    </>        
  )
}

export default Register;
