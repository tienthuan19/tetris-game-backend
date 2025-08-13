const fs = require('fs');
const path = require('path');
const swaggerSpec = require('./app/config/swagger'); // Import cấu hình swagger của bạn

const publicDir = path.join(__dirname, 'public');

// Tạo thư mục 'public' nếu nó chưa tồn tại
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Ghi đối tượng swaggerSpec vào file swagger.json trong thư mục public
fs.writeFileSync(
  path.join(publicDir, 'swagger.json'),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log('✅ Đã tạo file swagger.json trong thư mục /public');