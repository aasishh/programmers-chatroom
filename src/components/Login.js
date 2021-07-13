import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import logo from '../image/logo.jpeg';


function Login(props) {

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    photo: result.user.photoURL
                }
                localStorage.setItem('user', JSON.stringify(newUser)); // saving logged in user data in local storage of browser to create session for not logging off user while page refresh.
                props.setUser(newUser); // saving logged in user data in user state defined on app.js
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <Container>
            <Content>
                <SlackImage src={logo} />
                <h1>Sign in Programmer's Chatroom</h1>
                <SigninButton onClick={() => signIn()}>
                    Signin with Google
                </SigninButton>
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg, rgb(77, 101, 205,1) 0%, rgb(449, 95, 56,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`
const Content = styled.div`
    background: white;
    padding: 4em 8em;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-top: 10px;
    }

    :hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`
const SlackImage = styled.img`
    height: 10em;    
`
const SigninButton = styled.button`
    margin-top: 50px;
    background-image: linear-gradient(to right, #2196f3 0%, #f44336  51%, #2196f3  100%);
    padding: 18px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 1px 2px 4px #000;
    border-radius: 10px;
    border: none;
    display: block;
 

    :hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
`
