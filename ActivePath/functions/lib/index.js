"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloGuys = void 0;
const functions = require("firebase-functions");
// 简单的 Hello guys 函数
exports.helloGuys = functions.https.onRequest((req, res) => {
    // 设置CORS头
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    // 如果是OPTIONS请求，直接返回
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    // 返回 Hello guys 消息
    res.send({
        message: "Hello guys! 👋",
        timestamp: new Date().toISOString(),
        function: "helloGuys",
        status: "success"
    });
});
//# sourceMappingURL=index.js.map