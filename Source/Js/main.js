function start() {
    debugger;
    fetch("db_bleach.sqlite3")
        .then((res) => res.text())
        .then((text) => {
            let db = new SQL.Database(text);
            let stmt = db.prepare("SELECT * FROM Class");
            var row = stmt.get(1);
            alert(row);
        })
        .catch((e) => console.error(e));
}