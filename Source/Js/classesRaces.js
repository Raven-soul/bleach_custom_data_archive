// start generation functions

async function racesStartPage(){
    setChapterTitle("Рассы Bleach D&D 5e");
    getTemplatesData(1);
}

// template functions

async function getRacesTemplates(contentBlockTypeId) {
    var result;
    fetch("Source/Json/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getBlockContentData(JSONdata.templates, contentBlockTypeId)
    })
    .catch((e) => console.error(e));
}

async function getBlockContentData(templatesData, contentBlockTypeId) {
    var result;
    fetch("Source/Json/infoBlock_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        mainInfoBlockContentBuilder(JSONdata.mainInfoBlockData[contentBlockTypeId], templatesData); 
    })
    .catch((e) => console.error(e));    
}

// content functions

function mainInfoBlockContentBuilder(infoBlockContent, templates){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    var summHtmlBlock = "";
    var gridHtmlBlock = templates[2].segments[0].data;

    infoBlockContent.List.forEach((blockElement) => {
        let tempMenuStroke = templates[2].segments[1].data;

        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKCLASSFUNCTION@@", blockElement.Function);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKCLASSIMAGE@@", blockElement.Image);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKCLASSHEADNAME@@", blockElement.HeadName);
        tempMenuStroke = tempMenuStroke.replace("@@INFOBLOCKCLASSAPPENDNAME@@", blockElement.AppendName);

        summHtmlBlock = summHtmlBlock + tempMenuStroke;
    });

    gridHtmlBlock = gridHtmlBlock.replace("@@INFOBLOCKGRIDDATA@@", summHtmlBlock);
    
    contentInfoBlockPosition.html( summHtmlBlock );
}