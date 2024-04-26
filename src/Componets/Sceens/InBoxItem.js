import React from "react";
import SideNav from "../NavBar/SideNav";
import './InBoxItem.css';
import {useSelector} from  'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {Button} from 'react-bootstrap';

const InBoxItem = () => {
    const email = useSelector((store) => store.auth.token);
    const item = useSelector(state => state.inbox.selectedItem);
    const { from, text } = item;

    const history = useHistory();
    console.log(item);

    const backHandle = () =>{
       history.replace('/inbox');
    }

    return(
        <>
            <div className="inbox-item"><header></header>
                <div className="inbox-container">
                    {/* <h2>Email Inbox</h2> */}
                    <div className="sideNav">
                        <SideNav  />
                    </div>
                    
                    <div className="inbox">
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
                                    <div>From: {from}</div>
                                    <div>To: {email}</div>
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

export default InBoxItem;