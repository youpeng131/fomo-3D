const express=require('express');
const fs = require('fs');
const path = require('path');
const DIST = 'dist';
const opn = require('opn');
const app=express();
const staticPath = path.join(__dirname, '..', DIST, 'static');
// const favicon = path.join(__dirname, '..', DIST, 'favicon.ico');
const port = 3000;
app.use('/static', express.static(staticPath));
// app.use('/favicon.icon', express.static(favicon));


// 接口
app.use('/api/test', (req, res) => {
    res.send({'msg': '', code: 0, data: []});
});




app.use((req,res) => {
    const file = path.join(__dirname, '..', DIST, 'index.html');
    fs.readFile(file, 'utf-8',(err, content) => {
        if (err) {
            console.log('\x1B[31mPlease execute \x1B[41m\x1B[37m\x1B[1mnpm run build\x1B[0m \x1B[31mfirst\x1B[0m');
            res.status(404).send('We cannot open \'index.html\' file.<br/>Maybe you need to pack it once');
        } else {
            res.set('Content-Type', 'text/html');
            res.send(content);
        }
    });

});
app.listen(port);
opn('http://localhost:'+port);
