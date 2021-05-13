// ==UserScript==
// @name         Test AB view
// @namespace    http://view.testab.si/
// @version      0.21
// @description  test AB view
// @author       You
// @match        https://www.avanture.net/*
// @match        https://avanture.net/*
// @match        https://www.sloescort.com/*
// @match        http://www.oglasi.si/oglas_zasebni_stiki/*
// @match        http://www.oglasi.si/zasebni_stiki/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

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
    var citiesX = [];
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        citiesX.push($(".location strong", this).text());
    });
    var cities = xUnique(citiesX);
    console.log(cities);

    $(cities).each(function() {
        var city=this;
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(city));
        $(span).on("click", function(){siteAshowOnlyCity(city)});
        $(span).addClass("siteAshowOnlyCity");
        $(span).insertAfter($("div#content > div.content-header > h1"));
    });

    $("div#content > div.content-header > h1").on("click", function(){siteAshowAllCities()});
}

function xUnique(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

function siteAshowAllCities() {
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        $(this).show();
    });
}

function siteAshowOnlyCity(city) {
    $("#infinitescroll-classifieds-container > .content-item").each(function(i){
        if ($(".location strong", this).text().toLowerCase() != city.toLowerCase()){
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function addCssSiteA() {
    var a = `
div.footer {z-index: 900;}
.siteAshowOnlyCity {
  padding-left: 12px;
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
