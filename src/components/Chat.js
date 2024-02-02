import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import SendMessage from './SendMessage';
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const { userID } = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => data();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <div>Kura</div>
        {/* link to go to profile */}
        <div className="flex gap-3">
          <Link to="/profile">
            <img
              src={auth.currentUser.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </Link>
          <button
            onClick={() => auth.signOut()}
            className="p-2 bg-red-500 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages &&
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                userID === auth.currentUser.uid
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`msg ${
                  userID === auth.currentUser.uid ? 'sent' : 'received'
                }`}
              >
                <img
                  src={message.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p>{message.text}</p>
              </div>
            </div>
          ))}
      </div>
      <SendMessage />
    </div>
  );
}

export default Chat;
