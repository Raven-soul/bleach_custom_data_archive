// start generation functions

async function awake(){
    setChapterTitle("Онлайн-справочник Bleach D&D 5e");
    setMainSectionDataChapterTitle("Новости сайта", true);
    getTemplatesData(0);
}

// template functions

async function getTemplatesData(contentBlockTypeId) {
    var result;
    fetch("Source/Json/templates/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getMenuContentData(JSONdata.templates); 
        getInfoBlockContentData(JSONdata.templates, contentBlockTypeId)
    })
    .catch((e) => console.error(e));
}

async function getMenuContentData(templatesData) {
    var result;
    fetch("Source/Json/templates/menu_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainMenuBuilder(JSONdata.mainMenuTableData, templatesData); 
    })
    .catch((e) => console.error(e));    
}

async function getInfoBlockContentData(templatesData, contentBlockTypeId) {
    var result;
    fetch("Source/Json/content/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainInfoBlockContentBuilder(JSONdata.mainInfoBlockData[contentBlockTypeId], templatesData); 
    })
    .catch((e) => console.error(e));    
}

// content functions

function mainMenuBuilder (menuContent, templates){
    var menuBlock = $(".main-menu-block .row-2");
    var summHtmlBlock = "";
    menuContent.forEach((menuElement) => {
        let tempMenuStroke = templates[0].segments[0].data;
        let tempMenuList = "";

        tempMenuStroke = tempMenuStroke.replace("@@BLOCKFUNCTION@@", templates[0].segments[0].Function);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKID@@/g, menuElement.Id);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKCHEVRONCLASSNAME@@/g, templates[0].segments[0].ChevronClassName);
        tempMenuStroke = tempMenuStroke.replace(/@@BLOCKLISTCLASSNAME@@/g, menuElement.ListClassName);
        tempMenuStroke = tempMenuStroke.replace("@@BLOCKNAME@@", menuElement.Name);
        menuElement.List.forEach((listElement) => {
            let tempListStroke = templates[0].segments[1].data;
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

function mainInfoBlockContentBuilder(infoBlockContent, templates){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    var summHtmlBlock = "";

    infoBlockContent.List.forEach((blockElement) => {
        let tempMenuStroke = templates[1].segments[0].data;

        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKNAME@@", blockElement.Name);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKDATA@@", blockElement.Data);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBOCKIMAGE@@", blockElement.Image);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKFUNCTION@@", blockElement.Function);

        summHtmlBlock = summHtmlBlock + tempMenuStroke;
    });

    contentInfoBlockPosition.html( summHtmlBlock );
}

function fill() {
    alert("ready");
}