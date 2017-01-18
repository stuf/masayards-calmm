/* eslint-disable */
window.onload = function () {
  alert('loaded into webview');
  console.log('lel');
  var gameFrame = document.geteElementyById('game_frame');
  var elemRect = gameFrame.getBoundingClientRect();
  var bodyRect = document.body.getBoundingClientRect();
  var offsetLeft = elemRect.left - bodyRect.left;
  var offsetTop = elemRect.top - bodyRect.top;
  window.scrollX = offsetLeft;
  window.scrollY = offsetTop;
};
