async function racePage(pageId){
    getRacePageContentData(pageId);
}

async function getRacePageContentData(pageId) {
    fetch("Source/Json/races_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacePageContentBuilder(JSONdata.RacesPagesData[pageId], JSONdata.Name); 
    })
    .catch((e) => console.error(e));    
}

function RacePageContentBuilder(pageContent, pageName){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    contentInfoBlockPosition.html( pageContent.Data );

    checkMobileMenuData();
    setChapterTitle(pageContent.Name + " - " + pageName);
    setMainSectionDataChapterTitle("", false);
}