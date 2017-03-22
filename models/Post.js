const db = require('../db/config/config');

module.exports = {
	getAllPostsOfClub: function(club) {
	  return new Promise ((resolve, reject) => {
	    const queryString = 'SELECT * Posts FROM Events INNER JOIN Clubs ON Events.club_id = Clubs.id'
	  });
	}
}
