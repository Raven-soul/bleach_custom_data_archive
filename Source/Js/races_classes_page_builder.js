// start generation functions
async function racePage(pageId){
    getRacePageTemplates(pageId);
}

async function classPage(pageId){
    getClassPageTemplates(pageId);
}

// Races data

async function getRacePageTemplates(pageId) {
    var result;
    fetch("Source/Json/templates/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getRacePageContentData(JSONdata.templates, pageId)
    })
    .catch((e) => console.error(e));
}

async function getRacePageContentData(templates, pageId) {
    fetch("Source/Json/content/races_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacePageContentBuilder(templates, JSONdata.RacesPagesData[pageId], JSONdata.Name); 
    })
    .catch((e) => console.error(e));    
}

// Classes data

async function getClassPageTemplates(pageId) {
    var result;
    fetch("Source/Json/templates/data_templates.json")
    .then((res) => res.text())
    .then(async (text) => { 
        var JSONdata = JSON.parse(text);
        getClassPageContentData(JSONdata.templates, pageId)
    })
    .catch((e) => console.error(e));
}

async function getClassPageContentData(templates, pageId) {
    fetch("Source/Json/content/classes_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacePageContentBuilder(templates, JSONdata.RacesPagesData[pageId], JSONdata.Name); 
    })
    .catch((e) => console.error(e));    
}

// web content functions

function RacePageContentBuilder(templates, pageContent, pageName){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");

    var summHtmlBlock = templates[3].segments[0].data;
    var headBlock = templates[3].segments[1].data;
    var contentBlock = templates[3].segments[2].data;

    headBlock = headBlock.replace("@@RACENAME@@", pageContent.Name);
    headBlock = headBlock.replace("@@RACEDATASOURCE@@", pageContent.DataSource);
    headBlock = headBlock.replace("@@RACEQUOTE@@", pageContent.Quote);
    headBlock = headBlock.replace("@@RACEQUOTEAUTHOR@@", pageContent.QuoteAuthor);
    headBlock = headBlock.replace("@@RACEQUOTEAUTHORPOST@@", pageContent.QuoteAuthorPost);

    contentBlock = contentBlock.replace("@@RACEPAGEDATACONTENT@@", pageContent.Data);

    summHtmlBlock = summHtmlBlock.replace("@@RACEPAGECONTENT@@", headBlock + contentBlock);

    contentInfoBlockPosition.html( summHtmlBlock );

    checkMobileMenuData();
    setChapterTitle(pageContent.Name + " - " + pageName);
    setMainSectionDataChapterTitle("", false);
}