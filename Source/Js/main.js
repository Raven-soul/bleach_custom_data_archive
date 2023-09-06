function start(){
    fetch("data.txt")
        .then((res) => res.text())
        .then((text) => {
            var mydata = JSON.parse(text);
            alert(mydata.table[0].Id);
        })
        .catch((e) => console.error(e));
}