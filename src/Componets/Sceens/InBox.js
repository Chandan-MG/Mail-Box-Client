import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import './InBox.css';
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SideNav from "../NavBar/SideNav";

const InBox = () => {
    const email = useSelector((store) => store.auth.token);
    // const history = useHistory();
    const [inboxItems, setInboxItems] = useState([]);
    useEffect(() => {
        const fetchInboxItems = async () => {
            const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
            console.log(dummyEmail);
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/recieved/${dummyEmail}/Inbox.json`);
                if (response.ok) {
                    const inboxItemsObject = await response.json();
                    if (inboxItemsObject) {
                        const inboxItemsArray = Object.keys(inboxItemsObject).map(key => ({
                            id: key,
                            ...inboxItemsObject[key]
                        }));
                        setInboxItems(inboxItemsArray);
                    } else {
                        console.log('No inbox items found.');
                        setInboxItems([]);
                    }
                } else {
                    console.error('Error fetching inbox items:', response.status, response.statusText);
                    setInboxItems([]); // Clear the inbox items in case of an error
                }
                
            } catch (error) {
                console.error('Error fetching:', error);
                setInboxItems([]); // Clear the inbox items in case of an error
            }
        };
    
        fetchInboxItems();
    }, [email]); // dependency array should contain only 'email'
    

    
    return (
        <>
            <header></header>
            <div className="inbox-container">
                {/* <h2>Email Inbox</h2> */}
                <div className="sideNav">
                    <SideNav  />
                </div>
                
                <div className="inbox">
                    {inboxItems.map(item => (
                        <div className="email" key={item.id}>
                            <div className="email-header">
                                <div className="email-from">{item.from}</div>
                                <div className="email-subject">{item.subject}</div>
                            </div>
                            {/* <div className="email-body">
                                {item.content && (
                                    <div>
                                        {item.content
                                            .filter(contentItem => contentItem.text) // Filter out content items without text
                                            .map((contentItem, index) => (
                                                <span key={index}>{contentItem.text}</span> // Render text in a span element
                                            ))}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default InBox;
