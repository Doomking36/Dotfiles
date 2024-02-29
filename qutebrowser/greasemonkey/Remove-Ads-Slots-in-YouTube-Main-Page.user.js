// ==UserScript==
// @name         Remove Ads Slots in YouTube Main Page
// @namespace    http://tampermonkey.net/
// @version      0.1.5
// @license      MIT
// @author       CY Fung
// @match        https://www.youtube.com/*
// @exclude      /^https?://\S+\.(txt|png|jpg|jpeg|gif|xml|svg|manifest|log|ini)[^\/]*$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// @require      https://update.greasyfork.org/scripts/465819/1304833/API%20for%20CustomElements%20in%20YouTube.js
// @description  to remove ads slots in YouTube main page
// @downloadURL https://update.greasyfork.org/scripts/469376/Remove%20Ads%20Slots%20in%20YouTube%20Main%20Page.user.js
// @updateURL https://update.greasyfork.org/scripts/469376/Remove%20Ads%20Slots%20in%20YouTube%20Main%20Page.meta.js
// ==/UserScript==

(function () {
  'use strict';
  const wm = new WeakSet();

  const removeAdsSlot = async (grid) => {
    const td = grid.data;
    if (td && !wm.has(td)) {
      const md = Object.assign({}, td);
      md.contents = md.contents.filter(content => {
        let isadSlotRenderer = ((((content || 0).richItemRenderer || 0).content || 0).adSlotRenderer || null) !== null;
        return isadSlotRenderer ? false : true;
      });
      wm.add(md);
      grid.data = md;
    }
  }

  customYtElements.whenRegistered('ytd-rich-grid-renderer', (proto) => {
    proto.dataChanged = ((dataChanged) => {
      return function () {
        removeAdsSlot(this);
        return dataChanged.apply(this, arguments);
      }
    })(proto.dataChanged)
  });

})();