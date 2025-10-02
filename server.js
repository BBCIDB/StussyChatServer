const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

let chats = {};

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    let data = JSON.parse(msg);
    if (!chats[data.room]) chats[data.room] = [];
    chats[data.room].push(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
  ws.send(JSON.stringify({ system: true, text: "Connected to StussyChat server ✅" }));
});

console.log(`StussyChat WebSocket server running on port ${PORT}`);
add server.js
