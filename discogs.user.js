// ==UserScript==
// @name         Discogs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Discogs enhancements
// @author       jruz
// @match        https://www.discogs.com/seller/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js
// @grant        none
// ==/UserScript==

(function() {
    var items = Array.from(document.getElementsByClassName('shortcut_navigable'));
    var k = items.map(function(el){
        var i = {};
        var res = Array.from(el.getElementsByClassName('community_number')).reduce(function(m, e) {
            return m + parseInt(e.textContent);
        }, 0);
        i.el = el;
        i.total = res;
        return i;
    });
    var sorted = _.sortBy(k, 'total').reverse();
    var table = document.getElementsByClassName('table_block mpitems push_down')[0].children[1];
    table.innerHTML = '';
    sorted.forEach(function(item){
        table.appendChild(item.el);
    });
})();
