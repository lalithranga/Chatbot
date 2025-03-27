import React, { useState } from "react";
import axios from "axios";
import './chatBox.css';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);

  // Start Consultation
  const startConsultation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/start-consultation");
      const sentences = response.data.message
        .replace(/\d+\.\s*/g, "")
        .split(". ")
        .filter(s => s.trim() !== "")
        .map(s => {
          if (s.includes("?")) return `<strong>${s}</strong>`;
          return s + ".";
        });

      setMessages(sentences.map(text => ({ text, sender: "Tina" })));
      setStarted(true);
    } catch (error) {
      console.error("Error starting consultation:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userMessage.trim()) {
        sendMessage();
        e.currentTarget.textContent = '';
      }
    }
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    const newMessages = [...messages, { text: userMessage, sender: "User" }];
    setMessages(newMessages);
    setUserMessage("");
    const inputElement = document.querySelector('.message-input');
    if (inputElement) inputElement.textContent = '';
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/chat", { message: userMessage });
      const sentences = response.data.message
        .replace(/\d+\.\s*/g, "")
        .split(". ")
        .filter(s => s.trim() !== "")
        .map(s => {
          if (s.includes("?")) return `<strong>${s}</strong>`;
          return s + ".";
        });

      setMessages([...newMessages, ...sentences.map(text => ({ text, sender: "Tina" }))]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Insurance Recommendation Chat</h1>
      {!started ? (
        <button 
          onClick={startConsultation} 
          disabled={loading} 
          className={`start-button ${loading ? 'button-disabled' : ''}`}
        >
          Start Consultation
        </button>
      ) : (
        <div className="chat-window">
          <div className="messages-area">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === "User" ? 'message-user' : 'message-tina'}`}
              >
                <span
                  className={`message-content ${msg.sender === "User" ? 'message-content-user' : 'message-content-tina'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
          </div>
          {error && <div className="error-message">{error}</div>}
          <p
            contentEditable="true"
            onInput={(e) => setUserMessage(e.currentTarget.textContent)}
            onKeyDown={handleKeyPress}
            className="message-input"
            role="textbox"
            aria-label="Message input"
            data-placeholder="Type your message..."
          />
          <button 
            onClick={sendMessage} 
            disabled={loading} 
            className={`send-button ${loading ? 'button-disabled' : ''}`}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;