

import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled';
import { API } from '../../service/api';
import { DataContext } from '../../context/dataprovider';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;


const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValue = {
    name: '',
    username: '',
    password: ''
}

const loginInitialValue = {
    username: "",
    password: ""
}
const Login = ({ isUserAuthenticated }) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account, toggleAccount] = useState('login')

    const [signup, setSignup] = useState(signupInitialValue)

    const [login, setLogin] = useState(loginInitialValue)

    const [error, setError] = useState("")
    //using context

    const { setAccount } = useContext(DataContext)




    const signupuser = () => {
        toggleAccount('signup')
    }

    const loginuser = () => {
        toggleAccount('login')
    }


    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });

    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })

    }

    const signupUserApi = async () => {
        // from the config file

        let response = await API.userSignup(signup)
        //   console.log('responce is ',responce);
        if (response.isSuccess) {
            setSignup(signupInitialValue);
            toggleAccount('login')
            alert("signup successfully, kindly login")
            setError('')
        }
        else {
            setError('something went wrong please try letter')
        }

    }

    const navigate = useNavigate()
    const loginUserApi = async () => {
        const response = await API.userLogin(login)
        if (response.isSuccess) {
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
            setAccount({ username: response.data.username, name: response.data.name })
            setError('')
            isUserAuthenticated(true)
            alert('login successfully')
            navigate('/')


        } else {
            alert("please login/ sign-up with correct credentials")
        }

    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="" />

                {account === 'login' ? <Wrapper>
                    <TextField onChange={(e) => onValueChange(e)} name='username' TextField label='enter username' variant='standard'></TextField>
                    <TextField onChange={(e) => onValueChange(e)} name='password' label='password' variant='standard'></TextField>
                    {error && <Error>{error}</Error>}

                    <LoginButton onClick={() => loginUserApi()} variant='contained'>Login</LoginButton>
                    <Text style={{ textAlign: "center" }}>OR</Text>
                    <SignupButton onClick={signupuser} >Create An Account</SignupButton>
                </Wrapper>
                    :
                    <Wrapper >
                        <TextField name='name' onChange={(e) => onInputChange(e)} label='enter name' variant='standard'></TextField>
                        <TextField name='username' onChange={(e) => onInputChange(e)} label='enter username' variant='standard'></TextField>
                        <TextField name='password' onChange={(e) => onInputChange(e)} label='enter password' variant='standard'></TextField>
                        {error && <Error>{error}</Error>}
                        <LoginButton variant='contained' onClick={() => signupUserApi()}>Sign up</LoginButton>
                        <Text style={{ textAlign: "center" }}>OR</Text>
                        <SignupButton onClick={loginuser}>Already have an Account</SignupButton>
                    </Wrapper>}
            </Box>
        </Component>


    )
}

export default Login
