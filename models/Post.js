const db = require('../db/config/config');

module.exports = {
	findAllWithClub: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select * FROM Posts p INNER JOIN Clubs c ON c.id = p.club_id INNER JOIN Members m ON m.id = p.member_id  AND c.id = ?';

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
