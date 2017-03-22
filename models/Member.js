const db = require('../db/config/config');

/*
Expect obj to have keys sender_id, receiver_id, and body
Ex. 
  {
    username: '',
    password: '',
    name: '',
    department: '',
    student_id: ''
  };
*/

module.exports = {
	findOne: function (obj) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Members WHERE username =?';

			db.query(queryString, [obj.username], (err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						const member = res[0];
						resolve(member);
					} else {
						resolve(false);
					}
				}
			});
		});
	},

	create: function (obj) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Members SET ?';

			db.query(queryString, obj, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(obj);
				}
			});
		});
	},

  // findAll: function(club) {
  //   return new Promise ((resolve, reject) => {
  //     const queryString = 'SELECT * Members FROM Members INNER JOIN Clubs ON Members.club'
  //   });
  // }

	findOrCreateMember: function(member) {
		return new Promise ((resolve, reject) => {
			findOne(member)
			.then((member) => {
				if (member) {
					resolve(member);
				} else {
					return create(member);
				}
			})
			.then((member) => {
				resolve(member);
			})
			.catch((err) => {
				reject(err);
			});
		});
	}
}
