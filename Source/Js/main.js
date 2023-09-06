function start() {
    debugger;
    fetch("global_text.txt")
        .then((res) => res.text())
        .then((text) => {
            alert(text)
        })
        .catch((e) => console.error(e));
}