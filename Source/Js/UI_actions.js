function hideChangeChevron(hideTagClassNameWithoutId, chevronClassNameWithoutId, button) {
    let id = button.getAttribute("id");
    let hideTagClassName = "." + hideTagClassNameWithoutId + "-" + id;
    let chevronClassName = "." + chevronClassNameWithoutId + "-" + id;
    if ( $(hideTagClassName).css("display") == "none" ){
        $(hideTagClassName).css("display","block");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-down\"></i>" );
    } else {
        $(hideTagClassName).css("display","none");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-left\"></i>" );
    }
}

function setChapterTitle(title) {
    $(".chapter-title-label-data").html( title );
}

function setMainSectionDataChapterTitle(title, isPublish) {
    var stroke = "<div class=\"chapter-data-container-label\" @@HIDDEN@@>@@DATA@@</div>"
    debugger
    
    if(isPublish){
        stroke = v.replace("@@DATA@@", title);
        stroke = v.replace("@@HIDDEN@@", "");
    } else {
        stroke = v.replace("@@DATA@@", "");
        stroke = v.replace("@@HIDDEN@@", "hidden");
    }   

    $(".chapter-data-container").html( stroke );
}