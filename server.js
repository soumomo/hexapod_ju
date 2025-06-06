const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Route handling
    if (pathname === '/') {
        pathname = '/index.html';
    } else if (pathname === '/hardware') {
        pathname = '/hardware.html';
    } else if (pathname === '/software') {
        pathname = '/software.html';
    } else if (pathname === '/electronics') {
        pathname = '/electronics.html';
    }

    // Construct file path
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'text/plain';

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found - send 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>404 - Page Not Found</title>
                    <style>
                        body { 
                            font-family: 'Inter', sans-serif; 
                            text-align: center; 
                            padding: 50px; 
                            background-color: #f8fafc;
                            color: #1e293b;
                        }
                        h1 { color: #dc2626; }
                        a { 
                            color: #2563eb; 
                            text-decoration: none; 
                            font-weight: 500;
                        }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <p><a href="/">Return to Home</a></p>
                </body>
                </html>
            `);
            return;
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Hexapod Project Website running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('🔗 Available routes:');
    console.log(`   • Home: http://localhost:${PORT}/`);
    console.log(`   • Hardware Team: http://localhost:${PORT}/hardware`);
    console.log(`   • Software Team: http://localhost:${PORT}/software`);
    console.log(`   • Electronics Team: http://localhost:${PORT}/electronics`);
    console.log('');
    console.log('💡 All HTML files are also accessible directly:');
    console.log(`   • http://localhost:${PORT}/index.html`);
    console.log(`   • http://localhost:${PORT}/hardware.html`);
    console.log(`   • http://localhost:${PORT}/software.html`);
    console.log(`   • http://localhost:${PORT}/electronics.html`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
});

module.exports = server;
