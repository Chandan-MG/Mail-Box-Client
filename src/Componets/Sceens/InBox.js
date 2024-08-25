// import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './InBox.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SideNav from "../NavBar/SideNav";
import { inboxActions } from "../../Store";
import { BsFillTrashFill } from "react-icons/bs";
import useFetchInboxItems from "../CustomHook/InboxCustom";

//https://react-icons.github.io/react-icons/icons/bs/   => link for icons


const InBox = () => {
    const email = useSelector((store) => store.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();
    
    //calling custom hook
    const { inboxItems } = useFetchInboxItems(email, dispatch);

    const handleItemClick =(item)=>{
        // console.log(item);
        const { content, from, id, subject } = item;
        const text = content.map(contentItem => contentItem.text).join(" ");

        const value = {
            text: text,
            from:  from, 
            subject : subject,
            id: id
        }

        dispatch(inboxActions.InBoxItem(value));

        const updatedItem = {
            from:  from, 
            subject : subject,
            id: id,
            isRead: true,
            content:content
        }
        handleApiPut(updatedItem);
        history.replace('/inboxitem')
    }
    const handleApiPut = async (updatedItem) => {
        const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
        try {
            // Perform PUT request to the API endpoint
            const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/recieved/${dummyEmail}/Inbox/${updatedItem.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItem) // Update the isRead field to true
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            // Handle successful update response if needed
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }

    const deleteEmail = async(id)=>{
        // console.log(id);
        const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
        try {
            const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/recieved/${dummyEmail}/Inbox/${id}.json`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Expense successfully deleted");
                console.log("Expense successfully deleted");
            } else {
                alert('Failed to delete expense:', response.statusText);
            }
        } catch (error) {
            alert('Error deleting expense:', error);
        }
    }
    
    return (
        <>
            <header></header>
            <div className="inbox-container">
                
            </div>
        </>
    );
};

export default InBox;
