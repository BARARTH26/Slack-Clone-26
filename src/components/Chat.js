import React,{useRef,useEffect} from 'react';
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {useSelector} from "react-redux";
import {selectRoom} from "../features/appSlice";
import ChatInput from "../components/ChatInput";
import {db} from "../firebase/firebase";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import Message from "./Message";
import firebase from "firebase";



function Chat() {

    const roomId = useSelector(selectRoom);

    const chatRef = useRef();

    const[roomDetails] = useDocument(roomId && db.collection("Rooms").doc(roomId));

    const[roomMessage,loading] = useCollection(roomId && db.collection("Rooms").doc(roomId).collection("Messages").orderBy("timestamp","asc"));
    
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behaviour : "smooth",
        });
    }, [loading,roomId])
    
    return (
        <ChatContainer>
            {roomDetails && roomMessage && (
                <>
                    <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#{roomDetails?.data().name}</strong>
                    </h4>
                    <StarBorderOutlinedIcon/>
                </HeaderLeft>
                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </HeaderRight>
            </Header>
            <ChatMessage>
                {roomMessage?.docs.map((doc)=> {
                    const {user,message,timestamp,photo} = doc.data();
                    console.log(doc.data())
                    return (
                        <Message
                            key = {doc.id}
                            user={user}
                            photo = {photo}
                            timeStamp = {timestamp}
                            message = {message}
                        />
                    )
                })}
                <ChatBottom ref={chatRef}/>
            </ChatMessage >
            <ChatInput chatRef={chatRef} channelId={roomId} channelName={roomDetails?.data().name}/>
                </>
            )}
            
        </ChatContainer>
    )
}

export default Chat

const ChatMessage = styled.div``;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
const ChatContainer = styled.div`
    flex : 0.7;
    flex-grow : 1;
    overflow-y: scroll;
    margin-top:6vh;
    color:#111;
    ::-webkit-scrollbar{
        display : none;
    }
`;
const Header = styled.div`
    display : flex;
    justify-content: space-between;
    padding: 20px;
    border : 1px solid lightgray; 
`;
const HeaderLeft = styled.div`
    display : flex;
    align-items: center;
    >h4{
        display :flex;
        text-transform: lowercase;
    }
    >.MuiSvgIcon-root{
        font-size : 18px;
        margin-left:10px;
    }
`;
const HeaderRight = styled.div`
    >p{
        display : flex;
        align-items: center;
        font-size : 14px
    }
    >.MuiSvgIcon-root{
        margin-right: 5px;
        font-size : 16px;
    }
    
    
`;
