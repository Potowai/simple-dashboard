const express = require("express");
const si = require("systeminformation");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

wss.on("connection", (ws) => {
    const sendStats = async () => {
        try {
            const [cpu, mem, temp, fsSize, osInfo] = await Promise.all([
                si.currentLoad(), si.mem(), si.cpuTemperature(),
                si.fsSize(), si.osInfo()
            ]);
            ws.send(JSON.stringify({
                cpu: Math.round(cpu.currentLoad),
                ram: Math.round((mem.used / mem.total) * 100),
                temp: temp.main || 0,
                disk: fsSize.map(d => ({
                    mount: d.mount,
                    used: Math.round((d.used / d.size) * 100),
                    size: (d.size / 1073741824).toFixed(1) + "GB"
                })),
                uptime: Math.round(osInfo.uptime / 3600) + "h"
            }));
        } catch (e) {}
    };
    sendStats();
    const interval = setInterval(sendStats, 2000);
    ws.on("close", () => clearInterval(interval));
});

server.listen(3001, () => console.log("Dashboard on port 3001"));
