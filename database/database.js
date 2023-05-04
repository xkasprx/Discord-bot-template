// const mysql = require(`mysql`);
const cred = require(`../config/config.json`)[`database`];

exports.con = {
	init: function(x, s){
		client = x;
		scripts = s;

		util = scripts.util;
		
		return new Promise((resolve, reject) => {
			let handler = (error, con) => {
				if(error){
					util.log(`[ERROR]                             `, `${util.prettyDate()}`, `red`, `red`);
					reject(error);
				}else{
					resolve(con);
				}
			};
			
			let pool = mysql.createPool(this.serverDetails);
				pool.getConnection(handler);
		});
	},
	serverDetails: {
		connectionLimit: 100,
		host     : cred[`host`],
		user     : cred[`user`],
		password : cred[`pass`],
		database : cred[`database`],
	},
};

let con;

exports.query = {
	bind: c => con = c,
	execute: (statement, details, callback) => {
		if(details){
			con.query(statement, details, function(error, results, fields){
				callback(error, results, fields);
			});
		}else{
			con.query(statement, function(error, results, fields){
				callback(error, results, fields);
			});
		}
	},
};