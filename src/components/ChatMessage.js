import React from 'react';
import styled from 'styled-components';

function ChatMessage({ text, name, image, timestamp }) {
    return (
        <Container>
            <UserAvator>
                <img alt="" src={image} />
            </UserAvator>
            <MessageContent>
                <Name>
                    {name}
                    <span>{new Date(timestamp.toDate()).toUTCString()}</span>
                    {/* .toDate() converts timestamp object as date object and .toUTCString() converts object to string */}
                </Name>
                <Text>
                    {text}
                </Text>
            </MessageContent>
        </Container>
    )
}

export default ChatMessage;


const Container = styled.div`
    padding:8px 20px;
    display: flex;
    align-items: center;
`
const UserAvator = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 8px;

    img {
        width: 100%;
    }
`
// border radius of div is 2px. in order to apply it to the image inside div, we define overflow = hidden
// to resize image we define size of div and give width of 100% to an image inside that div 

const MessageContent = styled.div`
    display: flex;
    flex-direction: column;

`
// display flex will display every content from left to right in row
// to display Name and Text div in a column, we define flex-direction

const Name = styled.span`
    font-weight: 900;
    font-size: 15px;
    line-height: 1.4;
    span {
        margin-left: 8px;
        font-weight: 400;
        color: rgb(97, 96, 97)
    }
`
const Text = styled.span`

`