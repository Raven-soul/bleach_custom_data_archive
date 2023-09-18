async function awake(){
    setChapterTitle("Онлайн-справочник Bleach D&D 5e");
    setMainSectionDataChapterTitle("Новости сайта");
    getTemplatesData(0);
}

async function getTemplatesData(blockTypeId) {
    var result;
    fetch("Source/Json/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getMenuContentData(JSONdata.templates); 
        getInfoBlockContentData(JSONdata.templates, blockTypeId)
    })
    .catch((e) => console.error(e));
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

async function getInfoBlockContentData(templatesData, blockTypeId) {
    var result;
    fetch("Source/Json/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainInfoBlockContentBuilder(JSONdata.mainInfoBlockData[blockTypeId], templatesData); 
    })
    .catch((e) => console.error(e));    
}

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
        let tempMenuList = "";

        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKNAME@@", blockElement.Name);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKDATA@@", blockElement.Data);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBOCKIMAGE@@", blockElement.Image);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKFUNCTION@@", blockElement.Function);

        summHtmlBlock = summHtmlBlock + tempMenuStroke;
    });

    contentInfoBlockPosition.html( summHtmlBlock );
}
