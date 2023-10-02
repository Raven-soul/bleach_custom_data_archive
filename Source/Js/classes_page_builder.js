// start generation functions

async function classPage(pageId){
    getClassPageTemplates(pageId);
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
    fetch("Source/Json/content/end_pages/classes_content_data.json")
    .then((res) => res.text())
    .then(async (text) => {
        var JSONdata = JSON.parse(text);
        ClassPageContentBuilder(templates, JSONdata.PagesData[pageId], JSONdata.Name); 
    })
    .catch((e) => console.error(e));    
}

// web content functions

function ClassPageContentBuilder(templates, pageContent, pageName){
    let contentInfoBlockPosition = $(".main-info-data-section .row-2");

    let summHtmlBlock = templates[4].segments[0].data;
    let headBlock = templates[4].segments[1].data;
    let contentBlock = templates[4].segments[2].data;

    let classCard = templates[4].segments[3].data;
    let hitsCard = templates[4].segments[4].data;

    let galleryBlock = templates[4].segments[6].data;

    headBlock = headBlock.replace("@@CLASSNAME@@", pageContent.Name);
    headBlock = headBlock.replace("@@CLASSDATASOURCE@@", pageContent.DataSource);
    headBlock = headBlock.replace("@@CLASSQUOTE@@", pageContent.Quote);
    headBlock = headBlock.replace("@@CLASSQUOTEAUTHOR@@", pageContent.QuoteAuthor);
    headBlock = headBlock.replace("@@CLASSQUOTEAUTHORPOST@@", pageContent.QuoteAuthorPost);

    hitsCard = hitsCard.replace("@@CLASSHITDICE@@", pageContent.Hits.HitDice);
    hitsCard = hitsCard.replace("@@CLASSHITFIRSTLEVEL@@", pageContent.Hits.FirstLevelHits);
    hitsCard = hitsCard.replace("@@CLASSHITNEXTLEVEL@@", pageContent.Hits.NextLevelsHits);

    hitsCard = hitsCard.replace("@@CLASSSKILLSARMOR@@", pageContent.Skills.Armor);
    hitsCard = hitsCard.replace("@@CLASSSKILLSWEAPON@@", pageContent.Skills.Weapon);
    hitsCard = hitsCard.replace("@@CLASSSKILLSTOOLS@@", pageContent.Skills.Tools);
    hitsCard = hitsCard.replace("@@CLASSSKILLSSAVES@@", pageContent.Skills.SavingRols);
    hitsCard = hitsCard.replace("@@CLASSSKILLS@@", pageContent.Skills.Skills);

    let tempHtmlSumm = "";
    pageContent.Equipment.forEach((listElement) => {
        tempHtmlSumm = tempHtmlSumm + listElement.data;
    });

    hitsCard = hitsCard.replace("@@CLASSEQUIPMENT@@", tempHtmlSumm);


    classCard = classCard.replace("@@CLASSEPIGRAPH@@", pageContent.Data.Epigraph);
    classCard = classCard.replace("@@CLASSTABLENAME@@", pageContent.Data.Table.name);  
    classCard = classCard.replace("@@CLASSTABLEDATA@@", pageContent.Data.Table.data);  
    classCard = classCard.replace("@@CLASSINTRODUCTION@@", pageContent.Data.Introdaction);
    classCard = classCard.replace("@@CLASSHITDATA@@", hitsCard);
    classCard = classCard.replace("@@CLASSABILITYDATA@@", pageContent.Data.AbilityData);

    classCard = classCard.replace("@@CLASSARCHETYPENAME@@", pageContent.Archetype.name);
    classCard = classCard.replace("@@CLASSARCHETYPEDESCRIPTION@@", pageContent.Archetype.description);


    tempHtmlSumm = "";
    pageContent.Archetype.data.forEach((listElement) => {
        let archetypeCard = templates[4].segments[5].data;
        archetypeCard = archetypeCard.replace("@@CLASSARCHETYPEITEMNAME@@", listElement.Name);
        archetypeCard = archetypeCard.replace(/@@CLASSARCHETYPEITEMID@@/g, listElement.Id);
        archetypeCard = archetypeCard.replace("@@CLASSARCHETYPEITEMDATA@@", listElement.data);
        tempHtmlSumm = tempHtmlSumm + archetypeCard;
    });

    classCard = classCard.replace("@@CLASSARCHETYPEITEM@@", tempHtmlSumm);  
    
    tempHtmlSumm = "";
    pageContent.Gallery.forEach((listElement) => {
        let galleryGridItem = templates[4].segments[7].data;
        galleryGridItem = galleryGridItem.replace(/@@CLASSGALLERYGRIDITEMURL@@/g, listElement.url);
        tempHtmlSumm = tempHtmlSumm + galleryGridItem;
    });

    galleryBlock = galleryBlock.replace("@@CLASSGALLERYGRIDLIST@@", tempHtmlSumm);

    contentBlock = contentBlock.replace("@@CLASSPAGEDATACONTENT@@", classCard);

    summHtmlBlock = summHtmlBlock.replace("@@CLASSBACKGROUNDIMAGE@@", pageContent.BackgroundImage);
    summHtmlBlock = summHtmlBlock.replace("@@CLASSPAGECONTENT@@", headBlock + contentBlock);

    contentInfoBlockPosition.html( summHtmlBlock + galleryBlock );

    checkMobileMenuData();
    setChapterTitle(pageContent.Name + " - " + pageName);
    setMainSectionDataChapterTitle("", false);
}