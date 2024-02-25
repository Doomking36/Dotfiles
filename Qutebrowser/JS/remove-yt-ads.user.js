// ==UserScript==
// @name     _delete Adblock blocking nodes
// @match    *://YOUR_SERVER.COM/YOUR_PATH/*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// @grant    GM.getValue
// ==/UserScript==
//- The @grant directives are needed to restore the proper sandbox.
/* global $, waitForKeyElements */

waitForKeyElements ("[id$='player-ads']", killNode);

function killNode (jNode) {
    jNode.remove ();
}
