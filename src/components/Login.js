import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import logo from '../image/logo.jpeg';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';


function Login() {

    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    photo: result.user.photoURL
                }
                // localStorage.setItem('user', JSON.stringify(newUser)); // saving logged in user data in local storage of browser to create session for not logging off user while page refresh.
                dispatch({
                    type: actionTypes.SET_USER,
                    user: newUser
                });
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <Container>
            <Content>
                <SlackImage src={logo} />
                <h1>Sign in to Programmer's Chatroom</h1>
                <SigninButton onClick={() => signIn()}>
                    Signin with Google
                </SigninButton>
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg, rgb(77, 101, 205,1) 0%, rgb(449, 95, 56,1) 100%);
    overflow: hidden;
`
const Content = styled.div`
    width: 35%;
    height: min-content;
    background: white;
    padding: 1em 4em 3em 4em;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    h1 {
        margin-top: 0.625rem;
        text-align: center;
        font-size: 2rem;
    }

    :hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    @media screen and (max-width: 992px) {
        padding: 1em 3em 2.5em 3em;
        h1 {
            font-size: 1.5rem;
        }
    }
    
`
const SlackImage = styled.img`
    height: 8em;
    @media screen and (max-width: 992px) {
        height: 6em;
    }
    @media screen and (max-width: 420px) {
        height: 4.8em;
    }    
`
const SigninButton = styled.button`
    margin-top: 2.5rem;
    background-image: linear-gradient(to right, #2196f3 0%, #f44336  51%, #2196f3  100%);
    padding: 1.125em 2.2em;
    font-size: 0.8rem;
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

    @media screen and (max-width: 992px) {
        font-size: 0.6rem;
        margin-top: 2rem;
        border-radius: 6px;
    }

    @media screen and (max-width: 420px) {
        font-size: 0.45rem;
        border-radius: 4px;
    }
`
