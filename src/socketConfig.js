import io from "socket.io-client";

let socket = io("https://anonymous-chat-server.herokuapp.com");

export default socket;