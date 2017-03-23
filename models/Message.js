const db = require('../db/config/config');

/*
Expect member to have keys sender_id, receiver_id, and body
Ex. 
{
  username: mike_zhang
}

Expect member to have keys sender_id, receiver_id, and body
Ex. 
{
  sender_id: 1,
  receiver_id: 2,
  body: 'Hello'
}
*/

module.exports = {
	findAll: function (member) {
    return new Promise ((resolve, reject) => {
      const queryString = 'select * from Messages msg, Members m WHERE (msg.sender_id = m.id OR msg.receiver_id = m.id) AND m.username = ?';
      db.query(queryString, [member.username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
	},

  create: function(obj) {
    return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Messages SET ?';
      db.query(queryString, obj, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
