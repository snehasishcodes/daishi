"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const serialport_1 = require("serialport");
const SERIAL_PATH = "/dev/ttyACM0";
const BAUD_RATE = 9600;
const PORT = 8080;
// Serial setup
const port = new serialport_1.SerialPort({ path: SERIAL_PATH, baudRate: BAUD_RATE });
// Create HTTP server (needed so Cloudflare health checks don’t fail)
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("WebSocket + Serial server is running\n");
});
// Attach WebSocket server to HTTP server
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
    console.log("[WS] Client Connected");
    ws.on("message", (msg) => {
        const text = msg.toString().trim();
        console.log("[WS] New Message Received:", text);
        if (port.writable) {
            port.write(text + "\n", (err) => {
                if (err) {
                    console.error("[A] Serial write error:", err.message);
                }
            });
        }
        else {
            console.error("[A] Serial port not writable");
        }
    });
    ws.on("close", () => {
        console.log("[WS] Client Disconnected");
    });
});
// Serial events
port.on("open", () => {
    console.log(`[A] Serial connected on ${SERIAL_PATH} @ ${BAUD_RATE} baud`);
});
port.on("error", (err) => {
    console.error("[A] Serial error:", err.message);
});
// Start HTTP + WS server
server.listen(PORT, () => {
    console.log(`[WS] WebSocket Server running at ws://localhost:${PORT}`);
});
