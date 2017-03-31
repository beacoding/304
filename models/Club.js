const db = require('../db/config/config');

module.exports = {
	findOne: function (club) {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * FROM Clubs WHERE id =?';

			db.query(queryString, [club.id], (err, res) => {
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

  findAll: function () {
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT * FROM Clubs';

      db.query(queryString, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    });
  },

  findClubAndIfMember: function (obj) {
    const context = this;
    return new Promise ((resolve, reject) => {
      context.findOne(obj)
      .then((club) => {
        if (club) {
          const info = {
            club_name: club.name,
            club_id: club.id,
            member_id: obj.member_id
          };
          return context.isMemberPartOfClub(info);
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    })
  },

  create: function (obj) {
    var context = this;
    return new Promise ((resolve, reject) => {
      context.insertClub(obj)
      .then((club) => {
        if (club) {
          let member_club = {member_id: obj.member_id, club_id: club.insertId, admin: true};
          return context.addAdminToClub(member_club);         
        }
      })
      .then((club_member) => {
        resolve(club_member);
      })
      .catch((err) => {
        reject(err);
      })
    })
  },

  //input: member, club. 
  //func: insert club into Clubs table. Then insert member + club into Members_Clubs table with admin true
	insertClub: function (obj) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Clubs SET ?';
      const club = {name: obj.club_name};

			db.query(queryString, club, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	},

	findAllWithMember: function (member) {
		return new Promise ((resolve, reject) => {
			const queryString = "SELECT * from Members m INNER JOIN Members_Clubs mc ON m.id = mc.member_id INNER JOIN Clubs c ON mc.club_id = c.id AND m.username =?";

			db.query(queryString, [member.username], (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	},

    //TODO:

    findAllWithAllMember2: function () {
        const context = this;
        return new Promise((resolve, reject) =>{
            const queryString = "SELECT m.username from Members m WHERE NOT EXISTS (SELECT * FROM Clubs c WHERE NOT EXISTS (SELECT * FROM Members_Clubs mc WHERE mc.member_id = m.id AND mc.club_id=c.id));"
            db.query(queryString, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })

    },



    countNumberOfElement: function () {
        return new Promise((resolve, reject) =>{
            const queryString = 'SELECT COUNT(*) FROM Clubs';
            db.query(queryString, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    },


  isMemberPartOfClub: function(obj) {
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT COUNT(1) FROM Members_Clubs mc WHERE mc.member_id = ? AND mc.club_id = ?';

      db.query(queryString, [obj.member_id, obj.club_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          let resultObj = {
            club_name: obj.club_name,
            club_id: obj.club_id
          };
          resultObj.isMember = res[0]['COUNT(1)'] === 1 ? true : false;
          resolve(resultObj);
        }
      })
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

	/* Query for selecting member Id given member username
	  'SELECT id from Members WHERE username = ' + obj.username;
	  'SELECT id from Clubs WHERE clubname = ' + obj.clubname;
	   Query for adding new entry to Member Club
	  'INSERT INTO Members_Clubs '
    expect obj to be {
      club_id: 1,
      member_id: 1,
      admin: true
    }
  */



	addAdminToClub: function(obj) {
		return new Promise ((resolve, reject) => {
			const queryString = 'INSERT INTO Members_Clubs SET ?';

      db.query(queryString, obj, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
		});
	},

  /*input: member, club. 
    func: insert club into Clubs table. Then insert member + club into Members_Clubs table with admin false
    expect obj to be {
      club_id: 1,
      member_id: 1,
      admin: false
    }
  */
  joinClub: function (obj) {
    return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Members_Clubs SET ?';

      db.query(queryString, obj, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    })
  },

}