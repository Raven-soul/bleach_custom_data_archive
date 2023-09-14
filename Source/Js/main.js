function getTemplatesData() {
    var result;
    fetch("Source/Json/menu_data_templates.json") //C:\Users\kozyrev\Desktop\соло\data\bleach_custom_data_archive\Source\Json\menu_data_templates.json
    .then((res) => res.text())
    .then((text) => { 
        debugger
        var JSONdata = JSON.parse(text);
        result = JSONdata.templates; 
    })
    .catch((e) => console.error(e));
    return result;
}

function getMenuContentData() {
    var result;
    fetch("Source/Json/menu_data.json") //C:\Users\kozyrev\Desktop\соло\data\bleach_custom_data_archive\Source\Json\menu_data.json
    .then((res) => res.text())
    .then((text) => {
        debugger
        var JSONdata = JSON.parse(text);
        result = JSONdata.mainMenuTableData; 
    })
    .catch((e) => console.error(e));
    return result;
}

async function start(){
    var menuBlock = $(".main-menu-block .row-2").html();
    var templates = await getTemplatesData();
    var menuContent = await getMenuContentData();
    var summHtmlBlock = "";
    debugger

    menuContent.forEach((menuElement) => {
        let tempMenuStroke = templates[0].data;
        let tempMenuList = "";

        tempMenuStroke.replace("@@MENUROWDATA@@", menuElement.Name);
        menuElement.List.forEach((listElement) => {
            let tempListStroke = templates[1].data;
            tempListStroke.replace("@@LIROWFUNCTION@@", listElement.Function);
            tempListStroke.replace("@@LIROWICO@@", listElement.ico);
            tempListStroke.replace("@@LIROWNAME@@", listElement.Name);
            tempMenuList = tempMenuList + tempListStroke;
        });

        summHtmlBlock = summHtmlBlock + tempMenuList;
    });

    menuBlock.html( summHtmlBlock );
}

function data(){
    fetch("menu_data.json")
        .then((res) => res.text())
        .then((text) => {
            var mydata = JSON.parse(text);
            alert(mydata.table[0].Id);
        })
        .catch((e) => console.error(e));
}

function fill(){
    alert('ready');
}
