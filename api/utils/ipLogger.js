import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.join(__dirname, '../logs/ipLogs.txt');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Ensure the log file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '', { flag: 'a' });
}

export const ipLogger = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const logEntry = `Incoming request from IP: ${clientIp}\n`;

  // Log the IP address to the console
  console.log(logEntry);

  // Append the log entry to the log file
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });

  next();
};
