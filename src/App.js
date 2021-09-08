import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import db from './firebase';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function App() {

  const [rooms, setRooms] = useState([]);
  const [state, dispatch] = useStateValue();
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); //getting local stored data from browser by replacing default useState(). this allows to save user info even get page is refreshed
  
  const [isMobileClicked, setIsMobileClicked] = useState(false);

  const toggleSidebar = () => {
    setIsMobileClicked(!isMobileClicked);
  }

  // on triggred signOut() function will erase user data saved on local storage of browser 
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      dispatch({
        type: actionTypes.SET_USER,
        user: null
    });
      // setUser(null);
    })
  }

  // getting all the ids and name of the channel inside rooms db from firestore
  const getChannels = () => { //onSnapshot() method from firebase will return data of selected db i.e. rooms.its basically a snapshot of the current database and returns data
    db.collection('rooms')
      .onSnapshot((snapshot) => {
        setRooms(snapshot.docs.map((doc) => {
          return {
            id: doc.id, name: doc.data().name
          }
        }))
      })
  }

  useEffect(() => {
    getChannels();
  }, [])

  const updateMobileClickedOnChat = () => {
    setIsMobileClicked(false);
  }

  return (
    <div className="App">
      <Router>
        {
          !state.user ?
            <Login />
            :
            <Container>
              <Header signOut={signOut} toggleSidebar={toggleSidebar} />
              <Main>
                <SidebarWrapper>
                  <Sidebar rooms={rooms} />
                </SidebarWrapper>
                <MainContent>
                  <MobileSidebar isMobileClicked={isMobileClicked}>
                    <Sidebar rooms={rooms} updateMobileClickedOnChat={updateMobileClickedOnChat}/>
                  </MobileSidebar>
                  <MobileSidebarBackground isMobileClicked={isMobileClicked} onClick={updateMobileClickedOnChat} />
                  <ChatContentContainer >
                    <Switch>
                      <Route path="/room/:channelId">
                        <Chat rooms={rooms}/>
                      </Route>
                      <Route path="/">
                        <InitialText>                        
                          Please select or create new channel
                        </InitialText>
                      </Route>
                    </Switch>
                  </ChatContentContainer>                 
                </MainContent>
              </Main>
            </Container>
        }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px minmax(0, 1fr); 
  background: linear-gradient(45deg, rgb(77, 101, 205,1) 0%, rgb(449, 95, 56,1) 100%);
  overflow: hidden;
`
//grid-template-row will define the area of rows applied under specific div component.
// minmax is to fix the textbar at the buttom i.e. min space is 0 and max is 1 free space


const Main = styled.div`
  display: flex;
`

const SidebarWrapper = styled.div`
  display: flex;
  
  @media screen and (max-width: 760px) {
    display: none;
  }
`

const MainContent = styled.div`
  position: relative;
  display: flex;
  flex: auto;
  margin: 8px;
`

const MobileSidebarBackground = styled.aside`
  display: none;

  @media screen and (max-width: 760px) {
    position: absolute;
    display: ${({ isMobileClicked }) => ( isMobileClicked ? 'flex' : 'none' )};
    width: 100%;
    height: 100%;
    transition: 0.25s ease-in-out;
    background: black;
    opacity: ${({ isMobileClicked }) => ( isMobileClicked ? '0.3' : '0' )};
    z-index: 100;
    border-radius: 15px;
  }
`

const MobileSidebar = styled.aside`
    display: none;

    @media screen and (max-width: 760px) {
      position: absolute;
      transition: 0.25s ease-in-out;
      opacity: ${({ isMobileClicked }) => ( isMobileClicked ? '0.985' : '0' )};
      left: ${({ isMobileClicked }) => ( isMobileClicked ? '0' : '-100%')};
      top: 0;
      border-radius: 15px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      width: 269px;
      height: 100%;
      display: flex;
      z-index: 999;
      overflow: hidden;
    } 
`

const ChatContentContainer = styled.div`
  display: flex;
  flex: auto;
`

const InitialText = styled.div`
  display: flex;
  flex: auto;
  justify-content: center;
  align-items: center;
  background: #e8e9ed;
  border-radius: 15px;
  
  
`