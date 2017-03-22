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
	findOne: function (member) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Members WHERE username =?';

			db.query(queryString, [member.username], (err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						resolve(res[0]);
					} else {
						resolve(false);
					}
				}
			});
		});
	},

	create: function (member) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Members SET ?';

			db.query(queryString, member, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(member);
				}
			});
		});
	},

	findAllWithClub: function (club) {
		return new Promise ((resolve, reject) => {
			const queryString = 'select * from Clubs c, Members m, Members_Clubs mc WHERE mc.club_id = c.id AND m.id = mc.member_id AND c.name = ?';

			db.query(queryString, [club.name], (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
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
