import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import { UserData } from '../SystemSetup/UserData';
import { useLocation } from "react-router-dom";
const Userdata = new UserData();
const user_data = Userdata.getData('token');
const SenderId = user_data ? user_data[0]._id : "";
// const Chatbox = ({ ReceiveId, SenderId }) => {
  const Chatbox = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ReceiveId = searchParams.get("sellerId");
  // console.log(sellerId);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history when component mounts
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      // const response = await axios.get(`/api/chat/history/${ReceiveId}/${SenderId}`);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/read_history_messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SenderId: SenderId,
            ReceiveId: ReceiveId,
          }),
        }
      );
      const data = await response.json();
      setChatHistory(data.data);

    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/send_message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SenderId: SenderId,
            ReceiveId: ReceiveId,
            Message: message
          }),
        }
      );
      // const data = await response.json();
      // console.log(data);
      const newMessage = await response.json();
      // console.log(newMessage);
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="message-container">
        {chatHistory.map((message) => (
          <div
            key={message._id}
            className={`message ${message.SenderId === ReceiveId ? 'sent' : 'received'}`}
          >
            {message.SenderId !== ReceiveId}
            {/* {message.SenderId !== ReceiveId && <strong>{message.sender.username}: </strong>} */}
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );

};

export default Chatbox;
