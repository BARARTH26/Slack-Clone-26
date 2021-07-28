import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {db} from "../firebase/firebase";
import {enterRoom,selectRoom} from "../features/appSlice";
import {useDispatch,useSelector} from "react-redux";


function SidebarOption({Title,Icon,addChannelOption,id}) {
    const dispatch = useDispatch();
    const room = useSelector(selectRoom);

    const addChannel = ()=>{
        const channelName = prompt("Enter Your Channel Name");
        if(channelName)
        {
            db.collection("Rooms").add({
                name : channelName
            })
        }
    }
    const selectChannel  = ()=> {
        dispatch(enterRoom({
            roomId : id
        })
        )   
    }

    return (
        <SidebarOptionContainer 
            onClick = {addChannelOption ? addChannel : selectChannel}
        >

            {Icon && <Icon fontSize="small" style={{padding : 10}} />}
            {Icon ? (
                <h3>{Title}</h3>
            ):(
                <SidebarOptionChannel>
                    <span>#</span>{Title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display:flex;
    font-size : 12px;
    align-items : center;
    padding-left:2px;
    cursor:pointer;
     :hover{
         opacity:0.9;
         background-color : #340e36;
     }
     >h3{
         font-weight:500;
     }
     >h3 > span{
         padding :15px;
     }
`;


const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;