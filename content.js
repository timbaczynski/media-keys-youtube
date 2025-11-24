function initIntervals() {
  var firstDelay = 300 // first interval between executions
  var timeoutDelay = 10000 // time after which the first interval turns off and the second turns on
  var secondDelay = 10000 // second interval between executions
  let firstInterval = setInterval(initMediaSession, firstDelay);
  setTimeout(function(){
    clearInterval(firstInterval);
    setInterval(initMediaSession, secondDelay);
  }, timeoutDelay);
}

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
          nextMedia(document);
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
          prevMedia(document);
      }
      nexttime = new Date().getTime();
  });
}

function simulateShortPress(key, keyCode) {
  const eventOptions = { key, keyCode };
  
  document.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
  document.dispatchEvent(new KeyboardEvent("keyup", eventOptions));
}

function space() {
  simulateShortPress(" ", 32);
}

function forward() {
  simulateShortPress("ArrowRight", 39);
}
  
function backward() {
  simulateShortPress("ArrowLeft", 37);
}


function nextMedia( element ) {
  element.querySelectorAll('iframe').forEach(function(item) {
    try {
      if ( iframe.contentWindow ) {
        nextMedia(iframe.contentWindow.document);
      }
    } catch(err) {}
  });
  if ( document.querySelector('[class*="ytp-next-button"]') ) {
    document.querySelector('[class*="ytp-next-button"]').click();
  } else {
    window.history.forward();
  }
};

function prevMedia( element ) {
  element.querySelectorAll('iframe').forEach(function(item) {
    try {
      if ( iframe.contentWindow ) {
        prevMedia(iframe.contentWindow.document);
      }
    } catch(err) {}
  });
  if ( document.querySelector('[class*="ytp-prev-button"]') && document.querySelector('[class*="ytp-prev-button"]').getAttribute('aria-disabled') == 'false' ) {
    document.querySelector('[class*="ytp-prev-button"]').click();
  } else {
    window.history.back();
  }
};

window.onload = function() {
  initIntervals();
}
