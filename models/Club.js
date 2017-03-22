const db = require('../db/config/config');

module.exports = {
	findClub: function (club) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Clubs WHERE name =?';

			db.query(queryString, [club.name], (err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						const club = res[0];
						resolve(club);
					} else {
						resolve(false);
					}
				}
			});
		});
	},

  //input: member, club. 
  //func: insert club into Clubs table. Then insert member + club into Members_Clubs table with admin true
	createClub: function (club) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Clubs SET ?';

			db.query(queryString, club, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(club);
				}
			});
		});
	},

  //input: member, club. 
  //func: insert club into Clubs table. Then insert member + club into Members_Clubs table with admin false
  joinClub: function (club) {

  },

}