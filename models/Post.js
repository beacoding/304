const db = require('../db/config/config');

module.exports = {
	findAllWithClub: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select p.body FROM Posts p, Clubs c WHERE c.id = p.club_id AND c.id = ?';

     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 }
}
