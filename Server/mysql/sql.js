module.exports = {
  userList: `SELECT * FROM user_table`,
  userInsert: `INSERT INTO user_table SET ?`,
  userUpdate: `UPDATE user_table SET ? WHERE user_id=?`,
  userDelete: `DELETE FROM user_table WHERE user_id=?`,
  userLogin: `SELECT * FROM user_table WHERE user_email=?`,
};
