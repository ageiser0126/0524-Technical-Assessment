const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const TemperatureController = require('./temperature');
const temperature = new TemperatureController();
const clients = {};

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Serve the index.html file
        fs.readFile('callerExample.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading callerExample.html');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

const ws = new WebSocket.Server({port: 3000});
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});

ws.on('connection', (client) => {
    client.id = uuidv4();
    client.on('message', function(obj) {
       // Save the client settings
        clients[client.id] = JSON.parse(obj);
    });
});

setInterval(() => {
    // send temperature updates to all connected clients ever (n) seconds
    const currentTemperature = temperature.updateTemperatures(); // A function to simulate temperature changes
    ws.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            // Check if the client has set any alert thresholds
            if (clients[client.id]) {
                const {lowPoint, highPoint, changeThreshold} = clients[client.id];
                const alertStatus = temperature.getAlertStatus(lowPoint, highPoint, changeThreshold);
                client.send(JSON.stringify({currentTemperature, alertStatus}));
            } else {
                client.send(JSON.stringify({currentTemperature}));
            }
        }
    });
}, 3500);


