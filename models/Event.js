const db = require('../db/config/config');

/*
Expect obj to have keys sender_id, receiver_id, and body
Ex. 
{
  club_id: 1
}
*/

module.exports = {
	findAllWithClub: function(club) {
	  return new Promise ((resolve, reject) => {
	    const queryString = 'SELECT * Events FROM Events INNER JOIN Clubs ON Events.club_id = Clubs.id';
	    db.query(queryString, (err, res) => {
	    	if (err) {
	    		reject(err);
	    	} else {
	    		resolve(res);
	    	}
	    });
	  });
	},

	findAll: function() {
		return new Promise ((resolve, reject) => {
			const queryString = 'SELECT * Events from Events';
			db.query(queryString, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}
}
