import React from 'react'
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { sidebarItems } from '../data/SidebarData';
import db from '../firebase';
import { useHistory } from 'react-router-dom';

function Sidebar(props) {

    // using useHistory() method from react router dom to switch different channels programatically (like going bak or forward in the browser)
    const history = useHistory();

    // function to switch to different channel
    const goToChannel = (id) => {
        if (id) {
            history.push(`/room/${id}`)
        }
    }
    // let channelArray = props.rooms.filter(i => (i.name));
    // console.log(channelArray);
    // function to add new channels
    const addChannel = () => {  
        const newChannel = prompt("Enter Name");
        // if (newChannel !== channelArray.includes(newChannel)) {
        if (newChannel) {
            db.collection('rooms').add({
                name: newChannel
            })
        }
    }

    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    <h2>
                        Programmer's Chat Room
                    </h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {props.user.name}
                    </h3>
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItems.map(item => (
                        <MainChannelItem>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>
                    ))
                }
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        Channels
                    </div>
                    <AddIcon onClick={addChannel} /> {/* same as () => addChannel(), since props is empty*/}
                </NewChannelContainer>
                <ChannelsList onClick={props.updateMobileClickedOnChat}>
                    {
                        props.rooms.map(item => (
                            <Channel onClick={() => goToChannel(item.id)}> { /*passing the id that came from firestore to the function to switch to the specific channel for chat details. */}
                                # {item.name}
                            </Channel>
                        ))
                    }
                </ChannelsList>
            </ChannelsContainer>
        </Container>
    )
}

export default Sidebar;


const Container = styled.div`
    background: #181c35;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset;
    border-radius: 15px;
    margin: 8px;
    padding: 6px;
    width: 265px;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;   /* Firefox */
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
    
    @media screen and (max-width: 760px) {
        margin: 0px;
        overflow-y: scroll;
    }
`

const WorkspaceContainer = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: 1px solid #3E4248;
`

const Name = styled.div`
    display: flex;
    flex-direction: column;

    h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    h3 {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 400;

        .MuiSvgIcon-root {
            font-size: 14px;
            margin-right: 3px;
            margin-top: 1px;
            color: green;
        }
    }
`

const NewMessage = styled.div`
    width: 36px;
    height: 36px;
    background: white;
    color: #3F0E40;
    fill: #3F0E40;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
`

const MainChannels = styled.div`
    padding-top: 20px;
`

const MainChannelItem = styled.div`
    color: rgb(188, 171,188);
    display: grid;
    grid-template-columns: 15% auto;
    height: 32px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    
    :hover {
        background: #21253F;
        opacity: 0.9;
    }
`

const ChannelsContainer = styled.div`
    color: rgb(188, 171,188);
    margin-top: 12px;
`

const NewChannelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 29px;
    padding: 8px 12px 8px 19px;
    margin: 12px 0px 12px 0px;
    border-top: 1px solid #3E4248;
    border-bottom: 1px solid #3E4248;
`

const ChannelsList = styled.div`

`

const Channel = styled.div`
    height: 29px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    
    :hover {
        background: #21253F;
    }
`