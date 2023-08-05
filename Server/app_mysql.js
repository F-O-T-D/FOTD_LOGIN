const express = require('express');
require('dotenv').config({ path: 'mysql/.env' });
const mysql = require('./mysql');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(
  express.json({
    limit: '50mb',
  })
);

app.listen(3000, () => {
  console.log('Server started. port 3000.');
});

app.get('/api/user_table', async (req, res) => {
  const user_table = await mysql.query('userList');
  console.log(user_table);
  res.send(user_table);
});

app.post('/api/user_table/insert', async (req, res) => {
  console.log(req.body);
  const { user_name, user_email, user_password } = req.body;
  try {
    const result = await mysql.query('userInsert', {
      user_name,
      user_email,
      user_password,
    });

    const userrow = await mysql.query('userLogin', { user_email });

    // userInsert 쿼리가 성공했을 때 success 값을 true로 설정
    res.send({ success: true, user: userrow[0] });
  } catch (error) {
    // userInsert 쿼리가 실패했을 때 success 값을 false로 설정
    res.send({ success: false, error: error.message });
  }
});

app.put('/api/user_table/update', async (req, res) => {
  const result = await mysql.query('userUpdate', req.body.param);
  res.send(result);
});

app.delete('/api/user_table/delete/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    await mysql.query('userDelete', [user_id]);
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

app.post('/api/user_table/login', async (req, res) => {
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;

  try {
    if (user_email && user_password) {
      const result = await mysql.query('userLogin', user_email);

      if (result.length > 0) {
        if (result[0].user_password === user_password) {
          res.send({ success: true, user: result[0] });
        } else {
          res.send({ success: false, err: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        res.send({ success: false, err: '존재하지 않는 이메일입니다.' });
      }
    }
  } catch (error) {
    console.error('로그인 오류: ', error);
    res.status(500).send({ success: false, error: '로그인 오류' });
  }
});

app.get('/api/user_table/checkEmail/:email', async (req, res) => {
  const user_email = req.params.email;
  const result = await mysql.query('userLogin', user_email);

  if (result.length > 0) {
    res.send({ exists: true });
  } else {
    res.send({ exists: false });
  }
});
