const db = require('../db/config/config');

/*
Expect obj to have keys sender_id, receiver_id, and body
Ex. 
{
  club_name: 'Book Club'
}
*/

module.exports = {
	//Get all the events of a particular club
	findAllWithClub: function(obj) {
	  return new Promise ((resolve, reject) => {
	    const queryString = "SELECT * from Events e INNER JOIN Clubs c ON c.id = e.club_id AND c.id = ?";
	    db.query(queryString, [obj.id], (err, res) => {
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
