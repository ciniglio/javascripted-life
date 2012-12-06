(function(window, document, undefined){
    var liveColor = "rgb(255,0,0)";
    var deadColor = "rgb(0,0,150)";
    var drawCell = function(context, x, y, living) {
        context.fillStyle = living ? liveColor : deadColor;
        context.fillRect(4*x,4*y,4,4);
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

(function(window, undefined){
    var conway = function(oldboard, newboard){
        for (var i = 0; i < oldboard.x; i++){
            for (var j = 0; j < oldboard.y; j++){
                var neighbors = oldboard.neighbors(i,j);
                if (neighbors < 2 || neighbors > 3) {
                    newboard.kill(i,j);
                } else if (neighbors == 3) {
                    newboard.birth(i,j);
                } else if (neighbors == 2 && oldboard.get(i,j)) {
                    newboard.birth(i,j);
                }
            }
        }
    }
    window.AddRule(conway);
})(window);
