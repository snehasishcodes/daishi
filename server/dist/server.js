"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const serialport_1 = require("serialport");
const SERIAL_PATH = "/dev/ttyACM0";
const BAUD_RATE = 9600;
const port = new serialport_1.SerialPort({ path: SERIAL_PATH, baudRate: BAUD_RATE });
const wss = new ws_1.WebSocketServer({ port: 8080 });
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
port.on("open", () => {
    console.log(`[A] Serial connected on ${SERIAL_PATH} @ ${BAUD_RATE} baud`);
});
port.on("error", (err) => {
    console.error("[A] Serial error:", err.message);
});
console.log("[WS] WebSocket Server running at ws://localhost:8080");
