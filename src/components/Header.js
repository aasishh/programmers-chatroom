import React from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import logo from '../image/logo-nobg.png';

function Header({ user, signOut, toggleSidebar }) {
    return (
        <Container>
            <LogoContainer>
                <MobileMenuIcon onClick={toggleSidebar}>
                    <VerticalSplitIcon />
                </MobileMenuIcon>          
                <Logo src={logo} />
            </LogoContainer>
            <Main>
                <AccessTimeIcon />
                <SearchContainer>
                    <Search>
                        <SearchIcon />
                        <input type="text" placeholder="Search here ..." alt="Search"></input>
                    </Search>
                </SearchContainer>
                <HelpOutlineIcon />
            </Main>
            <UserContainer>
                <Name>
                    {user.name}
                </Name>
                <UserImage onClick={signOut}>
                    <img src={user.photo ? user.photo : "https://i.imgur.com/6VBx3io.png"} alt="" />
                </UserImage>
            </UserContainer>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #161a38;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset;
    color: white;
    position: relative;
    border-radius: 15px;
    margin: 0.625rem 0.5rem 0.25rem 0.5rem;
    /*width: 100vw;*/
`

const MobileMenuIcon = styled.div`

    display: none;
    
    @media screen and (max-width: 760px) {    
        display: flex;
        
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        cursor: pointer;
        padding-left: 0.5em;
    }
`

const LogoContainer = styled.div`
    display: flex;
    
    @media screen and (max-width: 760px) {
        
    }
`

const Logo = styled.img`
    width: 6.25rem;
    height: auto;

    @media screen and (max-width: 600px) {
        display: none;
    }
`

const Main = styled.div`
    display: flex;
    
    justify-content: center;
    overflow: hidden;

    @media screen and (max-width: 760px) {
        margin-left: 0.8rem;
    }
`

const SearchContainer = styled.div`
    width: 25rem;
    min-width: 6.25rem;
    margin-left: 1rem;
    margin-right: 1rem;

    @media screen and (max-width: 1190px) {
        width: 15rem;
    }

    @media screen and (max-width: 600px) {
        width: 4rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }
`

const Search = styled.div`
    display: flex;
    align-items: center;
    color: gray;
    height: 1.65rem;
    box-shadow: inset 0 0 0 1.3px rgb(104 74 104);
    border-radius: 12px;
    padding: 0 0.625em 0 0.625rem;
    input {
        background-color: transparent;
        border: none;
        padding: 0.25em 0.5em 0.25em 0.5em;
        color: white;
        width: 100%;
        font-size: 0.8125rem;

        :focus {
            outline: none;
        }
    }
    
    .MuiSvgIcon-root {
        height: 1.125rem;
    }
    
`

const UserContainer = styled.div`
    display: flex;
    
    align-items: center;
    padding-right: 1.25em;
    padding-left: 1em;
   

    @media screen and (max-width: 760px) {
        
    }
`
// position: absolute keeps container at fixed position while we can make other container relative.

const Name = styled.div`
    padding-right: 1em;

    @media screen and (max-width: 760px) {
        display: none;
    }
`

const UserImage = styled.div`
    width: 28px;
    height: 28px;
    border: 2px solid white;
    border-radius: 3px;
    
    img {
        width: 100%;
    }
`



