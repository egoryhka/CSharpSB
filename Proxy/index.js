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
const HOST = "127.0.0.1";
const TARGET = `http://${HOST}:5000`;
const ORIGIN = `http://${HOST}:${FRONTEND_PORT}`;
const ANALYZE_SERVICE = `http://${HOST}:${ANALYZE_SERVICE_PORT}`;

app.use(cors());
app.use(morgan('dev'));

app.use("/api", createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
}));

app.use("/analyze", createProxyMiddleware({
    headers: { "OAuth2000": "d3904r0jf548t8953++-0454d||234" },
    target: ANALYZE_SERVICE,
    changeOrigin: true,
}));

app.use(createProxyMiddleware({
    target: ORIGIN,
    changeOrigin: true,
}));

if (!PROXY_PORT) {
    throw new Error("PROXY_PORT is not defined in ../services.launch.json")
}
if (!BACKEND_PORT) {
    throw new Error("BACKEND_PORT is not defined in ../services.launch.json")
}
if (!FRONTEND_PORT) {
    throw new Error("FRONTEND_PORT is not defined in ../services.launch.json")
}

app.listen(PROXY_PORT, HOST);
