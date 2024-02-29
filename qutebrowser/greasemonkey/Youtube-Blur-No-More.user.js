// ==UserScript==
// @name         Youtube Blur No More
// @namespace    http://tampermonkey.net/
// @version      2023-12-08
// @description  Youtube Thumbnail Blur Remover
// @author       donotprikel231
// @match        https://www.youtube.com/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/481732/Youtube%20Blur%20No%20More.user.js
// @updateURL https://update.greasyfork.org/scripts/481732/Youtube%20Blur%20No%20More.meta.js
// ==/UserScript==

(function() {
    'use strict';

    function removeImageBlurURLs() {
        var elements = document.getElementsByClassName('yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded');

        // Loop through each element
        for (var i = 0; i < elements.length; i++) {
            // Get the src attribute of the current element
            var src = elements[i].getAttribute('src');

            // Split the URL by '/'
            var parts = src.split('/');

            // Find the ID in the URL parts
            var id = parts[parts.length - 2];

            // If a valid ID is found, replace the image source URL
            if (id && id.length === 11) {
                var newSrc = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
                elements[i].src = newSrc;
            } 
        }
    }

    setInterval(removeImageBlurURLs, 200);
})();