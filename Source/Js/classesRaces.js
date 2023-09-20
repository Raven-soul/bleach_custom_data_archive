// start generation functions

async function racesStartPage(){
    setChapterTitle("Рассы Bleach D&D 5e");
    setMainSectionDataChapterTitle("", false);
    getSecondContentTemplatesData(1);
}

// template functions

async function getSecondContentTemplatesData(contentBlockTypeId) {
    var result;
    fetch("Source/Json/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getSecondBlockContentData(JSONdata.templates, contentBlockTypeId)
    })
    .catch((e) => console.error(e));
}

async function getSecondBlockContentData(templatesData, contentBlockTypeId) {
    var result;
    fetch("Source/Json/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacesClassesContentBuilder(JSONdata.mainInfoBlockData[contentBlockTypeId], templatesData); 
    })
    .catch((e) => console.error(e));    
}

// content functions

function RacesClassesContentBuilder(infoBlockContent, templates){
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
}