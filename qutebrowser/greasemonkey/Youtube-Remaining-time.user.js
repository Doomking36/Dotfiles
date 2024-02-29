// ==UserScript==
// @name                          YouTube - Remaining time
// @namespace                 https://gist.github.com/4lrick/cf14cf267684f06c1b7bc559ddf2b943
// @version                       1.4
// @description                 Displays the remaining duration of a YouTube video next to the video duration, taking into account the playback rate.
// @description:fr              Affiche la durée restante d'une vidéo YouTube à côté de la durée de la vidéo, en tenant compte de la vitesse de lecture.
// @description:es             Muestra la duración restante de un video de YouTube junto a la duración del video, teniendo en cuenta la velocidad de reproducción.
// @description:de            Zeigt die verbleibende Dauer eines YouTube-Videos neben der Videodauer an und berücksichtigt dabei die Wiedergabegeschwindigkeit.
// @description:it              Mostra la durata rimanente di un video di YouTube accanto alla durata del video, tenendo conto della velocità di riproduzione.
// @description:zh-CN      在视频时长旁边显示YouTube视频的剩余时长，考虑播放速度。
// @author                        4lrick
// @match                         https://www.youtube.com/*
// @icon                            https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant                          none
// @license                        GPL-3.0-only
// @downloadURL https://update.greasyfork.org/scripts/477119/YouTube%20-%20Remaining%20time.user.js
// @updateURL https://update.greasyfork.org/scripts/477119/YouTube%20-%20Remaining%20time.meta.js
// ==/UserScript==

(function() {
    'use strict';
    let init = false;
    let timeDisplay;

    function displayRemainingTime() {
        const videoElement = document.querySelector('video');

        if (videoElement) {
            const timeRemaining = (videoElement.duration - videoElement.currentTime) / videoElement.playbackRate;
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = Math.floor(timeRemaining % 60);
            const isLive = document.querySelector('.ytp-live');
            const viewLiveCount = document.querySelector('span[dir="auto"].bold.style-scope.yt-formatted-string');
            const isEmbed = window.location.href;

            if ((viewLiveCount !== null && viewLiveCount.textContent.trim() !== "watching now") || isEmbed.includes("youtube.com/embed") && !isLive) {
                timeDisplay.textContent = `(${hours > 0 ? `${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds})`;
            } else {
                timeDisplay.textContent = null;
            }
        }
        requestAnimationFrame(displayRemainingTime);
    }

    function initDisplay() {
        timeDisplay = document.createElement('div');
        timeDisplay.style.display = 'inline-block';
        timeDisplay.style.marginLeft = '10px';
        timeDisplay.style.color = '#ddd';

        const timeContainer = document.querySelector('.ytp-time-display');

        if (timeContainer) {
            timeContainer.appendChild(timeDisplay);
            init = true;
        }

    }

    function checkVideoExists() {
        const videoElement = document.querySelector('video');

        if (videoElement) {
            if (!init) {
                initDisplay();
            }

            videoElement.onplaying = displayRemainingTime;
        }
    }

    const observer = new MutationObserver(checkVideoExists);
    const body = document.body;
    const config = { childList: true, subtree: true };
    observer.observe(body, config);
})();