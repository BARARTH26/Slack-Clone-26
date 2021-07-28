import React,{useRef,useState} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import firebase from "firebase";
import {db,auth} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";



function ChatInput({channelId,channelName,chatRef}) {
    const [input,setInput] =  useState(null);

    const[user] = useAuthState(auth);

    const sendMessage = (e)=>{
        e.preventDefault();

        if(!channelId){
            return false;
        }else {
            db.collection('Rooms').doc(channelId).collection('Messages').add({
                message : input,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                user : user.displayName,
                photo : user.photoURL,
            })
        }
        chatRef.current.scrollIntoView({
            behaviour : "smooth",
        })
        setInput(null);
    }
    return (
        <ChatInputContainer>
            <form>
                <input placeholder={`Send Message to ${channelName}`} onChange={e => setInput(e.target.value)}/>
                <Button hidden type="submit" onClick={sendMessage}>SEND</Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius :20px;
    >form {
        position: relative;
        display : flex;
        justify-content: center;
    }
    >form >input{
        position : fixed;
        bottom : 30px;
        width : 60%;
        border : 1px solid lightgray;
        border-radius : 3px;
        padding : 20px;
        outline : none;
    }
    >form >button {
        display : none !important;
    }
`;