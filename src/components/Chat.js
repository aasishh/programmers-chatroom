import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';

function Chat({ rooms }) {

    const [{user}] = useStateValue();
    
    // using useParams() method to get channelId link address define in Route path
    let { channelId } = useParams();
    
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);

    // let filteringChannel = rooms.filter(value => (channelId === value.id ? value : false))
   
    // console.log("this is it",filteringChannel)
    // for (let item of rooms) {
    //     if (item.id === channelId){
    //     console.log(item.id)
    //     console.log(item.name)}
    //   }

    

    

    const getMessages = () => {
        db.collection('rooms')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                let messages = snapshot.docs.map((doc) => doc.data());
                setMessages(messages);
            })
    }

    const getChannel = () => { //hirerchy of db defined on firestore: collection(rooms)>doc(id)>data(name)
        db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot) => {
                setChannel(snapshot.data()); // channel state is update with channel name got from firebase and passed down to show channel name dynamically as channel.name 
            })
    }

    const sendMessage = (text) => {
        if (channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }
            db.collection('rooms').doc(channelId).collection('messages').add(payload);
        }
    }

    useEffect(() => {
        getChannel();
        getMessages();
    }, [channelId]) // whenever channelId value changes it triggers useEffect() hook to run

    return (
        <Container>
            <ChatContent>
                <Header>
                    <Channel>
                        <ChannelName>
                            # {channel && channel.name}  {/*other way is: channel?.name ,using optional chaining */}
                            {/*using channel && to ensure to load default channel if channel.name from database is not finished loading */}
                        </ChannelName>
                        <ChannelInfo>
                            Ultimate guideline to ace programming
                        </ChannelInfo>
                    </Channel>
                    <ChannelDetails>
                        <div>
                            Details
                        </div>
                        <Info />
                    </ChannelDetails>
                </Header>
                <MessageContainer>
                    {
                        messages.length > 0 && messages.map((data, index) => (
                            <ChatMessage
                                text={data.text}
                                name={data.user}
                                image={data.userImage}
                                timestamp={data.timestamp}
                            />
                        ))
                    }
                </MessageContainer>
                <ChatInput sendMessage={sendMessage} />
            </ChatContent>          
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    position: relative;
    min-height: 0;
    background: #e8e9ed;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset;
    border-radius: 15px;
    width: 100%;
`

const ChatContent = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
    height: 100%;
`

const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(83, 39, 83, 0.13);
    justify-content: space-between;
`
const Channel = styled.div`

`
const ChannelName = styled.div`
    font-weight: 700;
    text-transform: lowercase;
`
const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`
const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    color: #606060;
`
const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px;
`
const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`
