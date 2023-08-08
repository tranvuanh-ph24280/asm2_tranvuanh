const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
app.use(bodyParser.json());

const DB_PATH = './db.json';
app.use(cors());
let db = {};

// Đọc dữ liệu từ tệp db.json khi ứng dụng bắt đầu
fs.readFile(DB_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error('Không thể đọc dữ liệu từ db.json', err);
  } else {
    try {
      db = JSON.parse(data);
      console.log('Dữ liệu đã được nạp từ db.json');
    } catch (parseErr) {
      console.error('Không thể phân tích dữ liệu từ db.json', parseErr);
    }
  }
});

// Lưu dữ liệu vào tệp db.json
function saveDbToFile() {
  const jsonData = JSON.stringify(db);
  fs.writeFile(DB_PATH, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Không thể ghi dữ liệu vào db.json', err);
    } else {
      console.log('Dữ liệu đã được lưu vào db.json');
    }
  });
}

// Kiểm tra và tạo tệp db.json nếu cần
fs.access(DB_PATH, fs.constants.F_OK, (err) => {
  if (err) {
    // Tạo tệp db.json với dữ liệu mặc định nếu tệp không tồn tại
    const defaultData = { products: [] };
    fs.writeFile(DB_PATH, JSON.stringify(defaultData), 'utf8', (err) => {
      if (err) {
        console.error('Không thể tạo tệp db.json', err);
      } else {
        console.log('Tạo tệp db.json với dữ liệu mặc định');
      }
    });
  }
});

// Endpoint để thêm bình luận vào sản phẩm dựa vào id sản phẩm
app.post('/products/:id', function(req, res) {
  const productId = parseInt(req.params.id);
  const commentContent = req.body.content;

  const product = db.products.find(function(item) {
    return item.id === productId;
  });

  if (!product) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  }

  const newComment = {
    id: product.comments.length + 1,
    content: commentContent
  };

  product.comments.push(newComment);

  // Lưu dữ liệu vào tệp db.json sau khi có thay đổi
  saveDbToFile();

  res.json(newComment);
});

const PORT = 3001;
app.listen(PORT, function() {
  console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
});
