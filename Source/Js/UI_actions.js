function hideChangeChevron(hideTagClassNameWithoutId, chevronClassNameWithoutId, button) {
    let id = button.getAttribute("id");
    let hideTagClassName = "." + hideTagClassNameWithoutId + "-" + id;
    let chevronClassName = "." + chevronClassNameWithoutId + "-" + id;
    if ( $(hideTagClassName).css("visibility") == "hidden" ){
        $(hideTagClassName).css("visibility","visible");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-down\"></i>" );
    } else {
        $(hideTagClassName).css("visibility","hidden");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-left\"></i>" );
    }
}