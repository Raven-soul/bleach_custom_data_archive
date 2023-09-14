async function getTemplatesData() {
    var result;
    fetch("Source/Json/menu_data_templates.json") //C:\Users\kozyrev\Desktop\соло\data\bleach_custom_data_archive\Source\Json\menu_data_templates.json
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getMenuContentData(JSONdata.templates); 
    })
    .catch((e) => console.error(e));
    return result;
}

async function getMenuContentData(templatesData) {
    var result;
    fetch("Source/Json/menu_data.json") //C:\Users\kozyrev\Desktop\соло\data\bleach_custom_data_archive\Source\Json\menu_data.json
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainPageBuilder(JSONdata.mainMenuTableData, templatesData); 
    })
    .catch((e) => console.error(e));
    
}

async function start(){
    getTemplatesData();
}

function mainPageBuilder (menuContent, templates){
    var menuBlock = $(".main-menu-block .row-2");
    var summHtmlBlock = "";
    

    menuContent.forEach((menuElement) => {
        let tempMenuStroke = templates[0].data;
        let tempMenuList = "";
        debugger
        tempMenuStroke = tempMenuStroke.replace("@@MENUROWDATA@@", menuElement.Name);
        menuElement.List.forEach((listElement) => {
            let tempListStroke = templates[1].data;
            tempListStroke = tempListStroke.replace("@@LIROWFUNCTION@@", listElement.Function);
            tempListStroke = tempListStroke.replace("@@LIROWICO@@", listElement.ico);
            tempListStroke = tempListStroke.replace("@@LIROWNAME@@", listElement.Name);
            tempMenuList = tempMenuList + tempListStroke;
        });

        tempMenuStroke = tempMenuStroke.replace("@@LISTDATA@@", tempMenuList);

        summHtmlBlock = summHtmlBlock + tempMenuStroke;
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
