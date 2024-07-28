// ==UserScript==
// @name         Test AB view
// @namespace    http://view.testab.si/
// @version      0.33
// @description  test AB view
// @author       You
// @downloadUR   https://github.com/git-s80/testab/raw/main/testabview.user.js
// @updateURL    https://github.com/git-s80/testab/raw/main/testabview.user.js
// @match        https://www.avanture.net/*
// @match        https://avanture.net/*
// @match        https://www.sloescort.com/*
// @match        http://www.oglasi.si/oglas_zasebni_stiki/*
// @match        http://www.oglasi.si/zasebni_stiki/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

// https://raw.githubusercontent.com/git-s80/testab/main/testabview.user.js
var site = "";


(function() {
    'use strict';
    if ($(location).attr('origin') == 'https://www.avanture.net' || $(location).attr('origin') == 'https://www.avanture.net') {
        site = "a";
    }

    switch (site) {
        case 'a':
            // jquery: 1.11.2, jquery-ui: 1.11.4
            addCssSiteA();
            setupA();
            break;
    }
})();

function setupA() {
    var tmpCity;
    var tmpAge;
    var tmpSex;
    var citiesArr = Object();
    var agesArr = Object();
    var sexArr = Object();
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        tmpCity = $(".location strong", this).text();
        if (typeof citiesArr[tmpCity] !== 'undefined') {
            citiesArr[tmpCity]++;
        } else {
            citiesArr[tmpCity] = 1;
        }
    });
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        tmpAge = $("li.mdi-altimeter", this).text();
        if (typeof agesArr[tmpAge] !== 'undefined') {
            agesArr[tmpAge]++;
        } else {
            agesArr[tmpAge] = 1;
        }
    });
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        tmpSex = $("li.mdi-view-list", this).text();
        if (typeof sexArr[tmpSex] !== 'undefined') {
            sexArr[tmpSex]++;
        } else {
            sexArr[tmpSex] = 1;
        }
    });
    citiesArr = sortObject(citiesArr);
    agesArr = sortObject(agesArr);

    var div0 = document.createElement('div');
    var divC = document.createElement('div');
    var divA = document.createElement('div');
    var divS = document.createElement('div');
    $(div0).insertAfter($("div#content > div.content-header > h1"));

    $(divC).appendTo($(div0)).addClass("siteAcities");
    $(divA).appendTo($(div0)).addClass("siteAages");
    $(divS).appendTo($(div0)).addClass("siteAsex");

    Object.entries(citiesArr).forEach(([key, value]) =>{
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(key+" ("+value+")"));
        $(span).on("click", function(){siteAshowOnlyCity(key, this)});
        $(span).addClass("siteAshowOnly").addClass("siteAshowOnlyCity");
        $(span).appendTo($(divC));
    });

    Object.entries(agesArr).forEach(([key, value]) =>{
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(key));
        $(span).on("click", function(){siteAshowOnlyAge(key, this)});
        $(span).addClass("siteAshowOnly").addClass("siteAshowOnlyAge");
        $(span).appendTo($(divA));
    });

    Object.entries(sexArr).forEach(([key, value]) =>{
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(key));
        $(span).on("click", function(){siteAshowOnlySex(key, this)});
        $(span).addClass("siteAshowOnly").addClass("siteAshowOnlySex");
        $(span).appendTo($(divS));
    });

    $("div#content > div.content-header > h1").on("click", function(){siteAshowAll()});
}

function xUnique(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function siteAshowAll() {
    $(".siteAshowOnly ").removeClass("siteAselected");
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        $(this).show();
    });
}

function siteAshowOnlyAge(age, sender) {
    $(".siteAshowOnly ").removeClass("siteAselected");
    $(sender).addClass("siteAselected");
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        if ($("li.mdi-altimeter", this).text() != age){
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function siteAshowOnlyCity(city, sender) {
    $(".siteAshowOnly ").removeClass("siteAselected");
    $(sender).addClass("siteAselected");
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        if ($(".location strong", this).text().toLowerCase() != city.toLowerCase()){
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function siteAshowOnlySex(sex, sender) {
    $(".siteAshowOnly ").removeClass("siteAselected");
    $(sender).addClass("siteAselected");
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        if ($("li.mdi-view-list", this).text().toLowerCase() != sex.toLowerCase()){
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}
function addCssSiteA() {
    var a = `
div.footer {z-index: 900;}
.siteAshowOnly {
  padding-left: 12px;
}
.siteAselected{
color: red;
}
.content-item > .row > div {
position: unset;
}
div.pagination ul li.info, div.pagination ul li a {
position: unset;
}
`;
    var script = document.createElement('style');
    script.appendChild(document.createTextNode(a));
    document.head.appendChild(script);
}
