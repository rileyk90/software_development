var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_algadhim',
  password        : 'cs361g8',
  database        : 'cs361_algadhim'
});

module.exports.pool = pool;
