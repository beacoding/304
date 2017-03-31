const db = require('../db/config/config');

module.exports = {
	findAllWithClub: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select p.id, p.body, m.name FROM Posts p INNER JOIN Clubs c ON c.id = p.club_id INNER JOIN Members m ON m.id = p.member_id  AND c.id = ?';

     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        console.log('this is res', res);
        resolve(res);
      }
    });
   });
 },


deletePost: function(post) {
   return new Promise ((resolve, reject) => {
     const queryString = 'delete p FROM Posts p INNER JOIN Members_clubs mc ON p.member_id = mc.member_id AND p.club_id = mc.club_id WHERE id = ?;'
     db.query(queryString, [post.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 },
 createPost: function(post) {
  return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Posts SET ?';
      db.query(queryString, post, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
 }, 

  countPost: function(obj) {
   return new Promise ((resolve, reject) => {
    console.log(obj);
     const queryString = 'select count(id) from posts p where p.member_id = ? and club_id = ?;'
     db.query(queryString, [obj.member_id, obj.club_id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
   });
 }
 
/*
 countPost: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select count(*) from posts;'
     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 },
 maxPost: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select count(*) from posts;'
     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 },
 minPost: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select count(*) from posts;'
     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 },

 avgPost: function(club) {
   return new Promise ((resolve, reject) => {
     const queryString = 'select count(*) from posts;'
     db.query(queryString, [club.id], (err, res) => {
       if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
   });
 }

 */
} 

