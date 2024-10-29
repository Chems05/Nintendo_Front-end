import { useEffect, useRef, useState } from "react";
import { sendMessage, getMessages } from "../services/service";
import Image from "react-bootstrap/Image";
import "../style/ChatPage.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const employeeId = localStorage.getItem("employeeId");
  const user = JSON.parse(localStorage.getItem("user"));
  const endOfMessagesRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;

    try {
      const messageData = {
        mittenteId: employeeId,
        contenuto: newMessage,
      };
      await sendMessage(messageData);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Errore nell'invio del messaggio:", error);
      setError(error.message);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat Generale</h2>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="chat-window">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${
                msg.mittenteId === employeeId
                  ? "chat-my-message"
                  : "chat-other-message"
              }`}
            >
              <Image
                src={msg.mittenteId === employeeId ? user.avatar : msg.avatar}
                alt="Avatar"
                roundedCircle
                width={30}
                height={30}
                className="me-2"
              />
              <div>
                <strong>{msg.username}:</strong> {msg.contenuto}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Scrivi un messaggio..."
            required
          />
          <button type="submit">Invia</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
