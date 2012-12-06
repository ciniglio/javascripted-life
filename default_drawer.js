(function(window, document, undefined){
    var liveColor = "rgb(255,0,0)";
    var deadColor = "rgb(0,0,150)";
    var drawCell = function(context, x, y, living) {
        context.fillStyle = living ? liveColor : deadColor;
        context.fillRect(2*x,2*y,2,2);
    };

    var drawLiveCell = function(context, x, y) {
        drawCell(context, x, y, true);
    };

    var drawDeadCell = function(context, x, y) {
        drawCell(context, x, y, false);
    };

    var draw = function(canvas, board) {
        var c = canvas.getContext('2d');
        for (var i = 0; i < board.x; i++) {
            for (var j = 0; j < board.y; j++) {
                board.get(i, j) ? drawLiveCell(c, i, j) : drawDeadCell(c, i, j);
            }
        }
    };

    window.AddDrawer(draw);
})(window, document);

(function(window, document, undefined){
    var init = function(board){
        for (var i = 0; i < board.x; i++) {
            for (var j = 0; j < board.y; j++) {
                Math.random() < 0.5 ? board.birth(i,j) : board.kill(i,j)
            }
        }
    };
    window.AddInitializer(init);
})(window, document);
