// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var sqlite3 = require('@journeyapps/sqlcipher').verbose();
var db = new sqlite3.Database('test.db');


function testSqlcipher() {
	db.serialize(function() {
	  // This is the default, but it is good to specify explicitly:
	  db.run("PRAGMA cipher_compatibility = 4");

	  // To open a database created with SQLCipher 3.x, use this:
	  // db.run("PRAGMA cipher_compatibility = 3");

	  db.run("PRAGMA key = 'mysecret'");
	  db.run("CREATE TABLE lorem (info TEXT)");

	  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	  for (var i = 0; i < 10; i++) {
		  stmt.run("Ipsum " + i);
	  }
	  stmt.finalize();

	  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
		  console.log(row.id + ": " + row.info);
	  });
	});

	db.close();
}