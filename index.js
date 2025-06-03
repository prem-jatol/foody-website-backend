const http = require("http");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");
const DEMO_FILE_PATH = path.join(PUBLIC_DIR, "demo.txt");

fs.mkdir(PUBLIC_DIR, { recursive: true }, (err) => {
    if (err) {
        console.error("Error creating public directory:", err.message);
    } else {
        console.log(`Ensured directory exists: ${PUBLIC_DIR}`);
    }
});

const ourServer = http.createServer((req, res) => {
    console.log(`[${req.method}] ${req.url}`);

    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    if (req.url === "/create") {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const contentToWrite = body || "Default content if no body provided";
                fs.writeFile(DEMO_FILE_PATH, contentToWrite, (err) => {
                    if (err) {
                        console.error("Error creating file:", err.message);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Error: Could not create file.");
                    } else {
                        res.writeHead(201, { 'Content-Type': 'text/plain' }); // 201 Created
                        res.end("File 'demo.txt' created successfully.");
                    }
                });
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' }); // Method Not Allowed
            res.end("Method Not Allowed. Use POST for /create.");
        }

    } else if (req.url === "/") {
        if (req.method === 'GET') {
            fs.readFile(DEMO_FILE_PATH, "UTF-8", (err, data) => {
                if (err) {
                    console.error("Error reading file:", err.message);
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end("File 'demo.txt' not found.");
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Error: Could not read file.");
                    }
                } else {
                    console.log("Content of demo.txt:\n", data);
                    res.writeHead(200, { 'Content-Type': 'text/plain' }); // 200 OK
                    res.end(`Content of demo.txt:\n${data}`);
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end("Method Not Allowed. Use GET for /.");
        }

    } else if (req.url === '/update') {
        if (req.method === 'PUT' || req.method === 'POST') {
            let body = '';
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                if (!body) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end("Bad Request: No data provided for update.");
                    return;
                }
                fs.appendFile(DEMO_FILE_PATH, `\n: ${body}`, (err) => {
                    if (err) {
                        console.error("Error appending to file:", err.message);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Error: Could not update file.");
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end("File 'demo.txt' updated successfully.");
                    }
                });
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end("Method Not Allowed. Use PUT or POST for /update.");
        }

    } else if (req.url === '/delete') {
        if (req.method === 'DELETE') {
            fs.unlink(DEMO_FILE_PATH, (err) => {
                if (err) {
                    console.error("Error deleting file:", err.message);
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end("File 'demo.txt' not found to delete.");
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Error: Could not delete file.");
                    }
                } else {
                    res.writeHead(204, { 'Content-Type': 'text/plain' }); // 204 No Content
                    res.end("File 'demo.txt' deleted successfully.");
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end("Method Not Allowed. Use DELETE for /delete.");
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found: This route does not exist.");
    }
});

ourServer.listen(4000, (err) => {
    if (err) {
        console.error("Error starting the server:", err.message);
    } else {
        console.log("Server listening on port 4000");
        console.log(`  GET http://localhost:4000/`);
        console.log(`  POST http://localhost:4000/create`);
        console.log(`  PUT http://localhost:4000/update`);
        console.log(`  DELETE http://localhost:4000/delete`);
    }
});