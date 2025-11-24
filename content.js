function initMediaSession() {
  navigator.mediaSession.setActionHandler('play', space);
  navigator.mediaSession.setActionHandler('pause', space);

  var nexttime = 0;

  navigator.mediaSession.setActionHandler('nexttrack', function() {
      if (new Date().getTime() - 48 > nexttime) { // if a single click occurs
        setTimeout(function(){
          if (new Date().getTime() - 48 > nexttime) {
            forward();
          }
        }, 50);
      } else { // if there is a long press
          nextMedia();
      }
      nexttime = new Date().getTime();
  });

  navigator.mediaSession.setActionHandler('previoustrack', function() {
      if (new Date().getTime() - 48 > nexttime) {// if a single click occurs
        setTimeout(function(){
          if (new Date().getTime() - 48 > nexttime) {
          backward();
          }
        }, 50);
      } else { // if there is a long press
          prevMedia();
      }
      nexttime = new Date().getTime();
  });
}

function simulateShortPress(params) {
  document.dispatchEvent(new KeyboardEvent("keydown", params));
  document.dispatchEvent(new KeyboardEvent("keyup", params));
}

function space() {
  simulateShortPress({ key: " ", keyCode: 32 });
}

function forward() {
  simulateShortPress({ key: "ArrowRight", keyCode: 39 });
}
  
function backward() {
  simulateShortPress({ key: "ArrowLeft", keyCode: 37 });
}

function nextMedia() {
  simulateShortPress({ key: "N", keyCode: 78, shiftKey: true });
}

function prevMedia() {
  simulateShortPress({ key: "P", keyCode: 80, shiftKey: true });
}

function runInitialization() {
  const FAST_INTERVAL_MS = 300;
  const SLOW_INTERVAL_MS = 10000;
  const switchToSlowTimeout = 10000;

  const fastIntervalId = setInterval(initMediaSession, FAST_INTERVAL_MS);

  setTimeout(() => {
    clearInterval(fastIntervalId);
    setInterval(initMediaSession, SLOW_INTERVAL_MS);
  }, switchToSlowTimeout);
}

runInitialization();
