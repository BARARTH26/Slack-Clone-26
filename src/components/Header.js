import React from 'react';
import styled from "styled-components";
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../firebase/firebase";



function Header() {

    const[user] = useAuthState(auth);
    console.log(user);
    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvater 
                    onClick={()=> auth.signOut()}
                    src={user?.photoURL}
                    alt={user?.dispplayName}
                />
                <AccessTimeIcon />
            
            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon/>
                <input placeholder="Search Barath FAM"  />
            </HeaderSearch>
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer =  styled.div`
    display : flex;
    position:fixed;
    width:100%;
    align-items : center;
    justify-content :space-between;
    background-color: var(--slack-color);
    color:#fff;
`;
const HeaderLeft = styled.div`
    flex:0.3;
    display: flex;
    align-items: center;
    margin-left : 20px;
    >.MuiSvgIcon-root{
        margin-left : auto;
        margin-right : 20px;
    }
`;

const HeaderAvater = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity:0.8;
    }
`

const HeaderSearch = styled.div`
    flex:0.4;
    opacity:1;
    background-color: #421f44;
    text-align:center;
    display:flex;
    align-items:center;
    padding:0 50px;
    border :1px solid lightgray;
    >input{
        background-color:transparent;
        text-align:center;
        border:none;
        outline:0;
        min-width:30vw;
        color:#fff;
    }

`
const HeaderRight = styled.div`
    flex:0.3;
    display:flex;
    align-items: flex-end;
    >.MuiSvgIcon-root{
        margin-left : auto;
        margin-right:20px;
    }
`