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
						resolve(res[0]);
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

	findAllWithMember: function (member) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * from Clubs c, Members m, Members_Clubs mc WHERE mc.club_id = c.id AND m.id = mc.member_id AND m.username = ?';

			db.query(queryString, [member.username], (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	},

	/*
	Expect obj to have keys sender_id, receiver_id, and body
	Ex. 
	{
	  club_name: 'alpha_phi',
	  member_name: 'bea',
	  admin: true
	}
	*/

	// //Query for selecting member Id given member username
	// 'SELECT id from Members WHERE username = ' + obj.username;
	// 'SELECT id from Clubs WHERE clubname = ' + obj.clubname;

	// //Query for adding new entry to Member Club
	// 'INSERT INTO Members_Clubs '

	addAdminToClub: function(obj) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Members_Clubs SET ?';
		});
	}

  //input: member, club. 
  //func: insert club into Clubs table. Then insert member + club into Members_Clubs table with admin false
  joinClub: function (club) {

  },

}