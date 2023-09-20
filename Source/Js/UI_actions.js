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
    
    if(isPublish){
        stroke = stroke.replace("@@DATA@@", title);
        stroke = stroke.replace("@@HIDDEN@@", "");
    } else {
        stroke = stroke.replace("@@DATA@@", "");
        stroke = stroke.replace("@@HIDDEN@@", "hidden");
    }   

    $(".chapter-data-container").html( stroke );
}

function mobileMenuData(){
    $('.main-menu-back').toggleClass('active');
    $('.main-menu-block').toggleClass('active');
    if($('.list-logo').attr('src')=='Source/Images/list_logo.png') {
        $('.list-logo').attr('src', 'Source/Images/list_logo_exit.png');
    } else {
        $('.list-logo').attr('src', 'Source/Images/list_logo.png');
    }   
}

function checkMobileMenuData(){
    if($('.main-menu-back').attr('class')=='col main-menu-back active') {
        mobileMenuData()
    }
}
