function start() {
    debugger;
    fetch("db_file.sqlite3")
        .then((res) => res.text())
        .then((text) => {
            alert(text)
        })
        .catch((e) => console.error(e));
}