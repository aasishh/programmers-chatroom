import React, { useState } from 'react'
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';

function ChatInput({ sendMessage }) {

    const [input, setInput] = useState("");

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const send = (event) => {
        event.preventDefault();
        if (input) {
            sendMessage(input);
            setInput("");
        } else {
            return;
        }
    }

    return (
        <Container>
            <InputContainer>
                <form>
                    <input onChange={onInputChange} value={input} type="text" placeholder="Type your message..." />
                    <SendButton type="submit" onClick={send}>
                        <Send />
                    </SendButton>
                </form>
            </InputContainer>
        </Container>
    )
}

export default ChatInput;

const Container = styled.div`
    padding: 15px 20px;
`
const InputContainer = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #8D8D8E;
    border-radius: 4px;
   
    form {
        display: flex;
        align-items: center;
        height: 42px;
        padding-left: 10px;
        
        input {
           flex: 1;
           border: none;
           font-size: 13px;

           :focus {
                outline: none; 
            }
        }
    }
`
const SendButton = styled.button`
    background: #007A5A;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    border: none;

    .MuiSvgIcon-root {
        width: 18px;
    }

    :hover {
        background: #148567;
    }
`
const Send = styled(SendIcon)`
    color: #D9D9D9;
`

