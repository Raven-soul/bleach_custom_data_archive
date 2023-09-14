function start(){
    fetch("data.txt")
        .then((res) => res.text())
        .then((text) => {
            var mydata = JSON.parse(text);
            alert(mydata.table[0].Id);
        })
        .catch((e) => console.error(e));
}

function getCode(id_data){
    fetch("data.txt")
        .then((res) => res.text())
        .then((text) => {
            var mydata = JSON.parse(text);
            return mydata.table[id_data].Id;
        })
        .catch((e) => console.error(e));
    return null;
}

function fill(){
    alert('ready');
}
