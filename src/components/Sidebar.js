import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment"
import InboxIcon from "@material-ui/icons/Inbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import BookMarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"
import AppsIcon from "@material-ui/icons/Apps"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add" ;
import {db,auth} from "../firebase/firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';



function Sidebar() {

    const[channels,loading,error] = useCollection(db.collection("Rooms"));
    const[user] =useAuthState(auth);

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Barath FAM</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>
            <SidebarOption Title="Thread" Icon={InsertCommentIcon} />
            <SidebarOption Title="Mentions & Reactions" Icon={InboxIcon} />
            <SidebarOption Title="Saved Items" Icon={DraftsIcon} />
            <SidebarOption Title="Channel Browser" Icon={BookMarkBorderIcon} />
            <SidebarOption Title="People & user Groups" Icon={PeopleAltIcon} />
            <SidebarOption Title="Apps" Icon={AppsIcon} />
            <SidebarOption Title="File browser" Icon={FileCopyIcon} />
            <SidebarOption Title="Show less" Icon={ExpandLessIcon} />
            <hr/>
            <SidebarOption Title="Channels" Icon={ExpandMoreIcon} />
            <hr />
            <SidebarOption Title="Add Channel" Icon={AddIcon} addChannelOption />
            {channels?.docs.map(doc => (
                <SidebarOption key={doc.id} id={doc.id} Title={doc.data().name}  />
            ))
            }
        
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    background-color : var(--slack-color);
    color:#fff;
    flex:0.3;
    max-width:260px;
    margin-top:40px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display :  none;
    }
    >hr{
        margin-top : 10px;
        margin-bottom : 10px;
        border : 1px  solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display:flex;
    border-bottom : 1px solid #49274b;
    padding: 13px;
    >.MuiSvgIcon-root{
        padding : 8px;
        color:#49274b;
        font-size:18px;
        background-color : #fff;
        border-radius : 50%;

}
`;

const SidebarInfo = styled.div`
    flex:1;
    >h2{
        font-size:15px;
        font-weight : 500;
        margin-bottom : 5px;
    }
    >h3{
        display:flex;
        align-items : center;
        font-size:13px;
        font-weight:400;
    }
    h3 > .MuiSvgIcon-root{
        font-size : 12px;
        margin-top:4px;
        margin-right:2px;
        color:green;
    }

`;