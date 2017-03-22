const db = require('../db/config/config');

/*
Expect obj to have keys sender_id, receiver_id, and body
Ex. 
{
  sender_name: 'bea',
  receiever_name: 'allan',
  body: 'hello'
}
*/

module.exports = {
	findAll: function (obj) {
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT * FROM Messages WHERE sender_name = ' + obj.sender_name + 'AND receiever_name = ' + obj.receiver_name);
      db.query(queryString, (err, res) => {
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
      db.query(queryString, obj, (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    });
  }
}
