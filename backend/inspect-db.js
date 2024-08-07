const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./payroll.db');

db.serialize(() => {
  db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Tables:', tables);
    }
  });
});

db.close();
