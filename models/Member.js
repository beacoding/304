const db = require('../db/config/config');

module.exports = {
	findOne: function (member) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Members WHERE username =?';

			db.query(queryString, [member.username], (err, res) => {
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
