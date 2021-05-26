import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import db from './firebase';

function App() {

  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState();

  const getChannels = () => {
    db.collection('rooms').onSnapshot((snapshot) => {
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
        if (!user) {
          <Login />
        } else {
          <Container>
            <Header />
            <Main>
              <Sidebar rooms={rooms} />
              <Switch>
                <Route path="/">
                  <Chat />
                </Route>
                <Route path="/room">
                  <Login />
                </Route>
              </Switch>
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
  grid-template-rows: 38px auto; 
`
//grid-template-row will define the area of rows applied under specific div component.

const Main = styled.div`
display: grid;
grid-template-columns: 260px auto;
`