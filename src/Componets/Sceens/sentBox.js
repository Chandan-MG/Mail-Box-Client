import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './sentBox.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SideNav from "../NavBar/SideNav";
import { sentboxActions } from "../../Store";
import { BsFillTrashFill } from "react-icons/bs";

//https://react-icons.github.io/react-icons/icons/bs/   => link for icons


const SentBox = () => {
    const email = useSelector((store) => store.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const [sentboxItems, setSentboxItems] = useState([]);

    useEffect(() => {
        const fetchSentboxItems = async () => {
            const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
            // console.log(dummyEmail);
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/sent/${dummyEmail}/sentMails.json`);
                if (response.ok) {
                    const sentboxItemsObject = await response.json();
                    if (sentboxItemsObject) {
                        const sentboxItemsArray = Object.keys(sentboxItemsObject).map(key => ({
                            id: key,
                            ...sentboxItemsObject[key]
                        }));
                        setSentboxItems(sentboxItemsArray);
                        // const totalUnreadMessages = inboxItems.filter(item => !item.isRead).length;
                        // dispatch(inboxActions.inBoxCount(totalUnreadMessages));

                    } else {
                        console.log('No items found.');
                        setSentboxItems([]);
                    }
                } else {
                    console.error('Error fetching sent items:', response.status, response.statusText);
                    setSentboxItems([]); // Clear the inbox items in case of an error
                }
                
            } catch (error) {
                console.error('Error fetching:', error);
                setSentboxItems([]); // Clear the inbox items in case of an error
            }
        };
    
        fetchSentboxItems();
    }, [email, sentboxItems]); // dependency array should contain only 'email'

    // const totalUnreadMessages = inboxItems.filter(item => !item.read).length;
    // dispatch(inboxActions.inBoxCount(totalUnreadMessages));

    const handleItemClick =(item)=>{
        // console.log(item);
        const { content, to, id, subject } = item;
        const text = content.map(contentItem => contentItem.text).join(" ");

        const value = {
            text: text,
            to:  to, 
            subject : subject,
            id: id
        }

        dispatch(sentboxActions.SentBoxItem(value));

        history.replace('/sentboxitem')
    }

    const deleteEmail = async(id)=>{
        // console.log(id);
        const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
        try {
            const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/sent/${dummyEmail}/sentMails/${id}.json`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Email successfully deleted");
                console.log("Email successfully deleted");
            } else {
                alert('Failed to delete Email:', response.statusText);
            }
        } catch (error) {
            alert('Error deleting Email:', error);
        }
    }
    
    return (
        <>
            <header></header>
            <div className="sentbox-container">
                {/* <h2>Email Inbox</h2> */}
                <div className="sideNav" data-testid='sidenavtest'>
                    <SideNav  />
                </div>
                
                <div className="sentbox">
                    {sentboxItems.map(item => (
                        <div className="email-header" key={item.id}>
                            <div className="email" onClick={() => handleItemClick(item)}>
                                <div className="email-header-second">
                                    {/* { !item.isRead && (<div className="email-dot"> 
                                        <div className='blue-dot' data-testid='blueDot'></div>
                                    </div>)} */}
                                    <div className="email-to">{item.to}</div>
                                    <div className="email-subject">{item.subject}</div>
                                </div>
                            </div>
                            <div className="email-delete">
                                <BsFillTrashFill color="red" onClick={() => deleteEmail(item.id)} />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default SentBox;
