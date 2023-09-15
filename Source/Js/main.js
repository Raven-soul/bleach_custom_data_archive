async function getTemplatesData() {
    var result;
    fetch("Source/Json/menu_data_templates.json")
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
    fetch("Source/Json/menu_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainMenuBuilder(JSONdata.mainMenuTableData, templatesData); 
    })
    .catch((e) => console.error(e));
    
}

async function awake(){
    setChapterTitle("Онлайн-справочник Bleach D&D 5e");
    getTemplatesData();
}

function mainMenuBuilder (menuContent, templates){
    var menuBlock = $(".main-menu-block .row-2");
    var summHtmlBlock = "";
    menuContent.forEach((menuElement) => {
        let tempMenuStroke = templates[0].data;
        let tempMenuList = "";

        tempMenuStroke = tempMenuStroke.replace("@@BLOCKFUNCTION@@", templates[0].Function);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKID@@/g, menuElement.Id);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKCHEVRONCLASSNAME@@/g, templates[0].ChevronClassName);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKLISTCLASSNAME@@/g, menuElement.ListClassName);
        tempMenuStroke = tempMenuStroke.replace("@@BLOCKNAME@@", menuElement.Name);
        menuElement.List.forEach((listElement) => {
            let tempListStroke = templates[1].data;
            tempListStroke = tempListStroke.replace("@@LIROWFUNCTION@@", listElement.Function);
            tempListStroke = tempListStroke.replace("@@LIROWICO@@", listElement.ico);
            tempListStroke = tempListStroke.replace("@@LIROWNAME@@", listElement.Name);
            tempMenuList = tempMenuList + tempListStroke;
        });

        tempMenuStroke = tempMenuStroke.replace("@@BLOCKLISTDATA@@", tempMenuList);

        summHtmlBlock = summHtmlBlock + tempMenuStroke;
    });

    menuBlock.html( summHtmlBlock );
}

function setChapterTitle(title) {
    $(".chapter-title-label").html( title );
}
