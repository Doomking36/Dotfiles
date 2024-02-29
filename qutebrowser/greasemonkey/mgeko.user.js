// ==UserScript==
// @name		Ad Remover for Mgeko
// @namespace		https://tampermonkey.net/
// @version		1.0
// @description		Eliminate ads for a clean, better experience
// @author		Doomking
// @match		*://www.mgeko.com/*
// @grant		none
// ==/UserScript==


(function() {
	'use strict';

	const listOfDivIds = ['radio_content', 'abrir_radio', 'cerrar_radio', 'alertbox_error', 'alertbox_question', 'bg_7263168464'];

	listOfDivIds.forEach(divId => {
		const div = document.getElementById(divId);
		if (div) {
			div.remove();
		}
	});


//	const targetDiv = document.getElementById('radio_content');
//	if (targetDiv) {
//		targetDiv.remove();
//	}

})();

