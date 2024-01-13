const express = require('express');
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')
const app = express();

// Configuration
const config = fs.readFileSync(path.join(__dirname, "../", "services.launch.json"), { encoding: 'utf8' });
const PROXY_PORT = JSON.parse(config).PROXY_PORT;
const BACKEND_PORT = JSON.parse(config).BACKEND_PORT;
const FRONTEND_PORT = JSON.parse(config).FRONTEND_PORT;

const ANALYZE_SERVICE_PORT = JSON.parse(config).ANALYZE_SERVICE_PORT;

//
// const HOST = JSON.parse(config).HOST || "localhost";
const HOST = "127.0.0.1" ?? "192.168.0.127";
const BACKEND_TARGET = `http://${HOST}:5000`;
const FRONTEND_TARGET = `http://${HOST}:${FRONTEND_PORT}`;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static("build"));

app.use("/api", createProxyMiddleware({
    target: BACKEND_TARGET,
    changeOrigin: true,
}));

console.log("Use frontend dev-server mode")
app.use("*", createProxyMiddleware({
    target: FRONTEND_TARGET,
    changeOrigin: true,
    ws: true
}));
//
// if (process.env.ENV === "production") {
//     console.log("Use frontend production mode");
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "build", "index.html"));
//     });
// } else {
//     console.log("Use frontend dev-server mode")
//     app.use(createProxyMiddleware({
//         target: FRONTEND_TARGET,
//         changeOrigin: true,
//     }));
// }



if (!PROXY_PORT) {
    throw new Error("PROXY_PORT is not defined in ../services.launch.json")
}
if (!BACKEND_PORT) {
    throw new Error("BACKEND_PORT is not defined in ../services.launch.json")
}


app.listen(PROXY_PORT, HOST);
