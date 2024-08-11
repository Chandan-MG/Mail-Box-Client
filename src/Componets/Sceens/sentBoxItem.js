import React from "react";
import SideNav from "../NavBar/SideNav";
import './SentBoxItem.css';
import {useSelector} from  'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {Button} from 'react-bootstrap';

const SentBoxItem = () => {
    const email = useSelector((store) => store.auth.token);
    const item = useSelector(state => state.sentbox.selectedItem);
    const { to, text } = item;

    const history = useHistory();

    const backHandle = () =>{
       history.replace('/sentbox');
    }

    return(
        <>
            <div className="sentbox-item"><header></header>
                <div className="sentbox-container">
                    {/* <h2>Email Inbox</h2> */}
                    <div className="sideNav">
                        <SideNav  />
                    </div>
                    
                    <div className="sentbox">
                        <div className="topbar">
                            <Button variant="outline-secondary" onClick={backHandle}>Back</Button>
                        </div>
                        <div className="secondmsg">
                            <span>Text message</span>
                        </div>
                        <div>
                            <div className="email-detail">
                                <div className="dot" > 
                                    <div className='plain-dot'></div>
                                </div>
                                <div  className="info">
                                    <div>To: {to}</div>
                                    <div>From: {email}</div>
                                </div>
                            </div>
                            <div className="email-text">
                                <p>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SentBoxItem;