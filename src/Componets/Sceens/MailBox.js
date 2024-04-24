import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Button} from 'react-bootstrap';
import './MailBox.css';
import {useSelector} from 'react-redux';

const MailBox = () =>{
    
    const [editorState, setEditorState] = useState("");
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const email = useSelector((store) => store.auth.token);

    const handleSendBtn =()=>{
        mailSendFrom();
        mailSendTo();
        setTo("");
        setSubject("");
        setEditorState("");
    }

    const mailSendFrom = async () => {
        const details = {
          to: to,
          subject: subject,
          content: editorState.blocks,
        };
        const dummyEmail = email
          .toLowerCase()
          .split("")
          .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
          .join("");
        try {
          const response = await fetch(
            `https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/${dummyEmail}/sentMails.json`,
            {
              method: "POST",
              body: JSON.stringify(details),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(response);
          console.log(data);
          if (!response.ok) {
            throw new Error(data.error);
          }
        } catch (err) {
          alert(err);
        }
      };
    
      const mailSendTo = async () => {
        const details = {
          from: email,
          subject: subject,
          content: editorState.blocks,
          isRead: false,
        };
        const dummyEmail = to
          .toLowerCase()
          .split("")
          .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
          .join("");
        try {
          const response = await fetch(
            `https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/${dummyEmail}/Inbox.json`,
            {
              method: "POST",
              body: JSON.stringify(details),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(response);
          console.log(data);
          if (!response.ok) {
            throw new Error(data.error);
          }
        } catch (err) {
          alert(err);
        }
      };

    return(
        <div className="main">
            <div className="row">
                <input
                    id="to"
                    className="p-2"
                    type="email"
                    placeholder="To :"
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                />
            </div>
            <div className="row">
                <input
                    id="subject"
                    className="p-2"
                    type="text"
                    placeholder="Subject:"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                />
            </div>
            <div className="editor">
                <Editor
                    initialContentState={editorState}
                    onContentStateChange={setEditorState}
                    // toolbarClassName="flex justify-between items-center cursor-pointer"
                    // toolbar={{
                    //     inline: { isDropdown: true },
                    //     list: { isDropdown: true },
                    //     textAlign: { isDropdown: true },
                    //     link: { isDropdown: true },
                    //     history: { isDropdown: true },
                    // }}
                />
            </div>
            <div className="mt-auto">
                <Button variant="primary" onClick={handleSendBtn}> Send </Button>
            </div>
        </div>

    );
}

export default MailBox;