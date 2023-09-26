// start generation functions

async function racesStartPage(){
    getRacesContentTemplatesData();
}

async function classesStartPage(){
    getClassesContentTemplatesData();
}

// template and content data functions

async function getRacesContentTemplatesData() {
    var result;
    fetch("Source/Json/templates/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getRacesContentData(JSONdata.templates)
    })
    .catch((e) => console.error(e));
}

async function getClassesContentTemplatesData() {
    var result;
    fetch("Source/Json/templates/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getClassesContentData(JSONdata.templates)
    })
    .catch((e) => console.error(e));
}

async function getRacesContentData(templatesData) {
    var result;
    fetch("Source/Json/content/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacesWebContentBuilder(JSONdata.mainInfoBlockData[1], templatesData); 
    })
    .catch((e) => console.error(e));    
}

async function getClassesContentData(templatesData) {
    var result;
    fetch("Source/Json/content/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        ClassesWebContentBuilder(JSONdata.mainInfoBlockData[2], templatesData); 
    })
    .catch((e) => console.error(e));    
}

// web content functions

function RacesWebContentBuilder(infoBlockContent, templates){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    var summHtmlBlock = "";
    var gridHtmlBlock = templates[2].segments[0].data;

    infoBlockContent.Group.forEach((groupBlockElement) => {
        var gridGroupHtmlBlock = templates[2].segments[1].data;

        gridGroupHtmlBlock = gridGroupHtmlBlock.replace("@@INFOBLOCKGRIDGROUPNAME@@", groupBlockElement.GroupName);
        
        var tempGroupList = ""
        groupBlockElement.List.forEach((itemElement) => {
            let tempGroupStroke = templates[2].segments[2].data;

            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSFUNCTION@@", itemElement.Function);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSID@@", itemElement.SoulId);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSIMAGE@@", itemElement.Image);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSHEADNAME@@", itemElement.HeadName);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSAPPENDNAME@@", itemElement.AppendName);

            tempGroupList = tempGroupList + tempGroupStroke;
        });

        gridGroupHtmlBlock = gridGroupHtmlBlock.replace("@@INFOBLOCKGRIDGROUPDATA@@", tempGroupList);

        summHtmlBlock = summHtmlBlock + gridGroupHtmlBlock;
    });

    gridHtmlBlock = gridHtmlBlock.replace("@@INFOBLOCKGRIDDATA@@", summHtmlBlock);
    
    contentInfoBlockPosition.html( gridHtmlBlock );

    checkMobileMenuData();
    setChapterTitle(infoBlockContent.Name);
    setMainSectionDataChapterTitle("", false);
}

function ClassesWebContentBuilder(infoBlockContent, templates){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    var summHtmlBlock = "";
    var gridHtmlBlock = templates[2].segments[0].data;

    infoBlockContent.Group.forEach((groupBlockElement) => {
        var gridGroupHtmlBlock = templates[2].segments[1].data;

        gridGroupHtmlBlock = gridGroupHtmlBlock.replace("@@INFOBLOCKGRIDGROUPNAME@@", groupBlockElement.GroupName);
        
        var tempGroupList = ""
        groupBlockElement.List.forEach((itemElement) => {
            let tempGroupStroke = templates[2].segments[2].data;

            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSFUNCTION@@", itemElement.Function);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSID@@", itemElement.SoulId);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSIMAGE@@", itemElement.Image);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSHEADNAME@@", itemElement.HeadName);
            tempGroupStroke = tempGroupStroke.replace("@@INFOBLOCKCLASSAPPENDNAME@@", itemElement.AppendName);

            tempGroupList = tempGroupList + tempGroupStroke;
        });

        gridGroupHtmlBlock = gridGroupHtmlBlock.replace("@@INFOBLOCKGRIDGROUPDATA@@", tempGroupList);

        summHtmlBlock = summHtmlBlock + gridGroupHtmlBlock;
    });

    gridHtmlBlock = gridHtmlBlock.replace("@@INFOBLOCKGRIDDATA@@", summHtmlBlock);
    
    contentInfoBlockPosition.html( gridHtmlBlock );

    checkMobileMenuData();
    setChapterTitle(infoBlockContent.Name);
    setMainSectionDataChapterTitle("", false);
}