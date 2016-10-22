"use strict";

var $menu = $('#menu');
function showMenu(menuItem) {
    menuItem = menuItem.substring(1);
    $menu.find('li > a').each(function() {
        var $a = $(this);
        if (this.href.split("#")[1] === menuItem) {
            $a.parent().addClass('active');
        } else {
            $a.parent().removeClass('active');
        }
    });
    menu.show(menuItem);
}

menu.menus.forEach(function(menuItem) {
    $menu.append('<li role="presentation"><a href="#' + menuItem.id + '">' + menuItem.label + '</a></li>');
});

$(window).on('hashchange', function() {
    showMenu(location.hash);
});

if (location.hash) {
    showMenu(location.hash);
} else {
    location.hash = '#' + menu.menus[0].id;
}
