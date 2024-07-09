const crypto = require('crypto');

function decryptUrl(saltString, password) {
  const data = Buffer.from(saltString, 'base64');
  const salt = data.slice(8, 16);
  const iv = data.slice(16, 32);
  const encrypted = data.slice(32);
  const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

const saltString = 'U2FsdGVkX19l3OMKL8/zZk7a86l9IgCW0mJE6Kgnao7Ck8DyB8bpgWEvP6e+iRokbRXI5Rhci8GkIqo8FaJbtokqlO9z+jhRTi1calbEwyo=';
const password = 'website:teraboxdownloader.in'; // Password extracted from the JavaScript code

try {
  const decryptedUrl = decryptUrl(saltString, password);
  console.log('Decrypted URL:', decryptedUrl);
} catch (error) {
  console.error('Decryption failed:', error.message);
}
