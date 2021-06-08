import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

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
                <SlackImage src="https://cdn.dribbble.com/users/4930498/screenshots/10585845/media/798cbdb50e5df19297d4f2a9e75364eb.jpg?compress=1&resize=1600x1200" />
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
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Content = styled.div`
    background: white;
    padding: 100px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-top: 10px;
    }
`
const SlackImage = styled.img`
    height: 100px;    
`
const SigninButton = styled.button`
    margin-top: 50px;
    background-color: #0a8d48;
    color: white;
    border: none;
    height: 40px;
    border-eadius: 4px;
    cursor: pointer;
    font-size: 15px;
`
