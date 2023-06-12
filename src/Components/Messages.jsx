import React, { useRef, useEffect } from 'react';


const Messages = ({ messages, currentMember }) => {

    const listRef = useRef(null)

    useEffect(() => {
        if (messages.length) {
            listRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages.length])

    const renderMessage = (message) => {
        const { member, text } = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? "Messages-message currentMember" : "Messages-message";

        return (
            <li className={className}>
                <span className="avatar" style={{ backgroundColor: member.clientData.color }} />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="Messages-list" ref={listRef}>
            {messages.map((message, index) => (
                <React.Fragment key={index}>
                    {renderMessage(message)}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default Messages;
