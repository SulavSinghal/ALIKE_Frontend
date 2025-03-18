import { useState,useEffect } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";
const Chat = () => {
    const {targetUserId} = useParams();
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
      const chat = await axios.get(baseUrl + "/chat/" + targetUserId,{
        withCredentials: true,
      });

      const chatMessages =  chat?.data?.messages.map(msg => {
        const { senderId,text } = msg;
        return {firstName: senderId?.firstName,
          lastName: senderId?.lastName, 
          text: text,
        };
      });
      setMessages(chatMessages);
    };
    useEffect(()=>{
      fetchChatMessages();
    },[]);
    useEffect(()=>{

      if(!userId) {return;}
      const socket = createSocketConnection();
      //as soon as the page loads the socket connection is made and joinChat event is emmitted
      socket.emit("joinChat", {firstName: user.firstName,userId,targetUserId});


      //listen for new messages
      socket.on("messageReceived",({ firstName,text }) =>{
        setMessages((messages) => [...messages,{firstName,text}]);
      });


      return () => {
        socket.disconnect();
      };

    },[userId,targetUserId]);

//send message
const sendMessage = () => {
const socket = createSocketConnection();
  socket.emit("sendMessage",
    {firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
};

return (
  <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
    <h1 className="p-5 border-b border-gray-600">Chat</h1>
    <div className="flex-1 overflow-scroll p-5">
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName}`}
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        );
      })}
    </div>
    <div className="p-5 border-t border-gray-600 flex items-center gap-2">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 border border-gray-500 text-white rounded p-2"
      ></input>
      <button onClick={sendMessage} className="btn btn-secondary">
        Send
      </button>
    </div>
  </div>
);
};
export default Chat;