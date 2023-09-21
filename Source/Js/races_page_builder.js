async function racePage(pageId){
    getRacesContentData(pageId);
}

async function getRacesContentData(pageId) {
    debugger
    fetch("Source/Json/races_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        RacePageContentBuilder(JSONdata.RacesPagesData[pageId], JSONdata.Name); 
    })
    .catch((e) => console.error(e));    
}

function RacePageContentBuilder(pageContet, pageName){
    var contentInfoBlockPosition = $(".main-info-data-section .row-2");
    contentInfoBlockPosition.html( pageContet.Data );

    checkMobileMenuData();
    setChapterTitle(pageContet + " - " + pageName);
    setMainSectionDataChapterTitle("", false);
}