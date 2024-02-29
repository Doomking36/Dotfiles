// ==UserScript==
// @name         YouTube Volume Assistant
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Enhances the volume control on YouTube by providing additional information and features.
// @author       CY Fung
// @license      MIT License
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// @unwrap
// @allFrames
// @inject-into page
// @downloadURL https://update.greasyfork.org/scripts/466775/YouTube%20Volume%20Assistant.user.js
// @updateURL https://update.greasyfork.org/scripts/466775/YouTube%20Volume%20Assistant.meta.js
// ==/UserScript==

(function () {
    'use strict';

    //    AudioContext.prototype._createGain = AudioContext.prototype.createGain;


    let wm = new WeakMap();
    /*
        AudioContext.prototype.createGain = function(...args){
            return this.createdGain || (this.createdGain = this._createGain(...args));
        }
    */

    function getMediaElementSource() {
        return wm.get(this) || null;
    }
    function getGainNode() {
        return wm.get(this) || null;
    }

    AudioContext.prototype._createMediaElementSource = AudioContext.prototype.createMediaElementSource;

    AudioContext.prototype.createMediaElementSource = function (video, ...args) {
        let createdMediaElementSource = wm.get(video);
        if (createdMediaElementSource) return createdMediaElementSource;
        wm.set(video, createdMediaElementSource = this._createMediaElementSource(video, ...args));
        video.getMediaElementSource = getMediaElementSource;
        return createdMediaElementSource;
    }


    MediaElementAudioSourceNode.prototype._connect = MediaElementAudioSourceNode.prototype.connect;

    MediaElementAudioSourceNode.prototype.connect = function (gainNode, ...args) {

        this._connect(gainNode, ...args);
        wm.set(this, gainNode);

        this.getGainNode = getGainNode;
    }



    function addDblTap(element, doubleClick) {
        // https://stackoverflow.com/questions/45804917/dblclick-doesnt-work-on-touch-devices

        let expired


        let doubleTouch = function (e) {
            if (e.touches.length === 1) {
                if (!expired) {
                    expired = e.timeStamp + 400
                } else if (e.timeStamp <= expired) {
                    // remove the default of this event ( Zoom )
                    e.preventDefault()
                    doubleClick(e)
                    // then reset the variable for other "double Touches" event
                    expired = null
                } else {
                    // if the second touch was expired, make it as it's the first
                    expired = e.timeStamp + 400
                }
            }
        }

        element.addEventListener('touchstart', doubleTouch)
        element.addEventListener('dblclick', doubleClick)
    }


    function createCSS() {

        if (document.querySelector('#iTFoh')) return;
        let style = document.createElement('style');
        style.id = 'iTFoh';
        style.textContent = `
        .video-tip-offseted {
        margin-top:-1em;
        }
        .volume-tip-gain{
        opacity:0.52;
        }
        .volume-tip-normalized{
        opacity:0.4;
        }
        `;

        document.head.appendChild(style)

    }

    let volumeSlider = null;
    let volumeTitle = '';

    let volumeSpan = null;
    let lastContent = null;
    let gainNode = null;

    function refreshDOM() {
        volumeSlider = document.querySelector('.ytp-volume-panel[role="slider"][title]');
        if (volumeSlider) {
            volumeTitle = volumeSlider.getAttribute('title');
        } else {
            volumeTitle = '';
        }
    }

    function setDblTap() {
        if (!volumeSlider) return;
        if (volumeSlider.hasAttribute('pKRyA')) return;
        volumeSlider.setAttribute('pKRyA', '');

        addDblTap(volumeSlider, (e) => {
            let target = null;
            try {
                target = e.target.closest('.ytp-volume-area').querySelector('.ytp-mute-button');
            } catch (e) { }
            if (target !== null) {
                const e2 = new MouseEvent('contextmenu', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                target.dispatchEvent(e2);
            }
        });
    }

    let template = document.createElement('template');

    function changeVolumeText() {

        if (!volumeSpan || !lastContent) return;

        let video = document.querySelector('#player video[src]');
        if (!video) return;

        if (gainNode === null) {
            let source = video.getMediaElementSource ? video.getMediaElementSource() : null;
            if (source) {
                gainNode = source.getGainNode ? source.getGainNode() : null;
            }
        }

        let gainValue = (((gainNode || 0).gain || 0).value || 0);
        let m = gainValue || 1.0;

        let actualVolume = document.querySelector('ytd-player').player_.getVolume();
        let normalized = video.volume * 100;

        let gainText = gainValue ? `<span class="volume-tip-gain">Gain = ${+(gainValue.toFixed(2))}</span><br>` : '';

        template.innerHTML = `
                <span class="volume-tip-offset">
    ${gainText}
    <span class="volume-tip-volume">Volume: ${(m * actualVolume).toFixed(1)}% </span><br>
    <span class="volume-tip-normalized"> Normalized: ${(m * normalized).toFixed(1)}%</span>
    </span>`.trim();
        if (volumeSpan.textContent !== template.content.textContent && lastContent === volumeSpan.textContent) {

            volumeSpan.innerHTML = template.innerHTML;
            lastContent = volumeSpan.textContent;

        }
    }

    function addVideoEvents() {
        let video = document.querySelector('#player video[src]');
        if (!video) return;
        if (video.hasAttribute('zHbT0')) return;
        video.setAttribute('zHbT0', '');
        video.addEventListener('volumechange', changeVolumeText, false)
    }


    let ktid = 0;
    let goChecking = false;

    const asyncNavigateFinish = async () => {
        goChecking = false;
        createCSS();
        const f = () => {
            refreshDOM();
            if (!volumeSlider) return;
            setDblTap();
            addVideoEvents();
            goChecking = true;
            return true;
        };
        f() || setTimeout(f, 300);
    }

    const onNavigateFinish = () => {
        asyncNavigateFinish();
    };
    document.addEventListener('yt-navigate-finish', onNavigateFinish, true);


    (async function () {

        const filterFn = t => t.textContent === volumeTitle;
        const r80Fn = r => setTimeout(r, 80);
        const r0Fn = r => requestAnimationFrame(r);

        while (true) {

            let tid = Date.now();
            ktid = tid;
            await new Promise(r80Fn);
            if (!goChecking) continue;

            if (!volumeSpan) {
                let elms = [...document.querySelectorAll('#player .ytp-tooltip div.ytp-tooltip-text-wrapper span.ytp-tooltip-text')];
                if (elms.length > 0) {
                    elms = elms.filter(filterFn);
                }

                if (elms[0]) {
                    HTMLElement.prototype.closest.call(elms[0], '#player .ytp-tooltip').classList.add('video-tip-offseted');
                    volumeSpan = elms[0];
                    lastContent = volumeSpan.textContent;
                }
            }

            if (volumeSpan && (!volumeSpan.isConnected || volumeSpan.textContent !== lastContent)) {
                // volumeSpan.textContent = volumeTitle;
                let p = document.querySelector('.video-tip-offseted');
                if (p) p.classList.remove('video-tip-offseted');
                let m = document.querySelector('.volume-tip-offset');
                if (m) m.remove();
                volumeSpan = null;
                lastContent = null;
            }

            if (volumeSpan) {

                await new Promise(r0Fn);
                if (ktid === tid) {
                    changeVolumeText();
                }

            }


        }

    })();


})();