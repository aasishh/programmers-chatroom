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

function App() {

  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); //getting local stored data from browser by replacing default useState(). this allows to save user info even get page is refreshed
  
  const [isMobileClicked, setIsMobileClicked] = useState(false);

  const toggleSidebar = () => {
    setIsMobileClicked(!isMobileClicked);
  }

  // on triggred signOut() function will erase user data saved on local storage of browser 
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      setUser(null);
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

  return (
    <div className="App">
      <Router>
        {
          !user ?
            <Login setUser={setUser} />
            :
            <Container>
              <Header user={user} signOut={signOut} toggleSidebar={toggleSidebar} />
              <Main>
                <SidebarWrapper>
                  <Sidebar rooms={rooms} user={user} />
                </SidebarWrapper>
                <MainContent>
                  <Switch>
                    <Route path="/room/:channelId">
                      <Chat user={user} rooms={rooms} isMobileClicked={isMobileClicked} setIsMobileClicked={setIsMobileClicked} Sidebar={Sidebar} />
                    </Route>
                    <Route path="/">
                      <InitialText>
                        Please select or create new channel
                      </InitialText>
                    </Route>
                  </Switch>
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
  margin: 8px;
  
`