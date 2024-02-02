import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function SendMessage() {
  const [msg, setMsg] = useState('');
  const messagesRef = collection(db, 'messages');

  const sendMsg = async (e) => {
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    });
    setMsg('');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200">
      <input
        placeholder="Message..."
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={sendMsg}
        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}

export default SendMessage;
