/*

*/
window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // do cool things with the context
    context.font = '40pt Calibri';
    context.fillStyle = 'blue';
    context.fillRect(0, 0, 400, 10);
    context.fillRect(0, 0, 10, 400);
    context.fillRect(390, 0, 10, 400);
    context.fillRect(0, 390, 400, 10);
    context.fillText('Hello World!', 150, 100);
}