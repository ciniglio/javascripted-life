(function(window, document, undefined){
    // lists of plugins
    var initializers = [];
    var drawers = [];
    var rules = [];
    var cellRules = [];

    var canvas = document.getElementById("board");

    var Piece = function() {
        this.visited = false;
        this.alive = false;
    };

    Piece.prototype = {
        visit : function() {
            this.visited = true;
        },
        set : function(living) {
            this.alive = living;
            this.visit();
        },
        birth : function() {
            this.set(true);
        },
        clone : function() {
            var p = new Piece();
            p.alive = this.alive;
            return p;
        },
    };


    var Board = function(x, y) {
        this.x = x;
        this.y = y;
        this.board = newBoard(x,y);

        function newBoard(x, y){
            var board = new Array(x);
            for (var i = 0; i < x; i++) {
                board[i] = new Array(y);
                for (var j = 0; j < y; j++) {
                    board[i][j] = new Piece();
                }
            }
            return board;
        };
    };

    Board.prototype = {
        set : function(x, y, living) {
            this.board[x][y].set(living);
        },
        birth : function(x, y) {
            this.set(x, y, true);
        },
        kill : function(x, y) {
            this.set(x, y, false);
        },
        get : function(x, y) {
            return this.board[x][y].alive;
        },
        getPiece : function(x, y) {
            return this.board[x][y]
        },
        clone : function() {
            var board = new Board(this.x, this.y);
            var b = new Array(this.x);
            for (var i = 0; i < this.x; i++){
                b[i] = new Array(this.y)
                for (var j = 0; j < this.y; j++){
                   b[i][j] = this.getPiece(i,j).clone();
                }
            }
            board.board = b
            return board;
        },
        n : function(x,y) {
            if (y == 0) {
                return false;
            } else {
                return this.get(x, y-1);
            }
        },
        w : function(x,y) {
            if (x == 0) {
                return false;
            } else {
                return this.get(x-1, y);
            }
        },
        s : function(x,y) {
            if (y == this.y-1) {
                return false;
            } else {
                return this.get(x, y+1);
            }
        },
        e : function(x,y) {
            if (x == this.x-1) {
                return false;
            } else {
                return this.get(x+1,y);
            }
        },
        ne : function(x,y) {
            if (x == this.x-1 || y == 0) {
                return false;
            } else {
                return this.get(x+1,y-1);
            }
        },
        se : function(x,y){
            if (x == this.x-1 || y == this.y-1) {
                return false;
            } else {
                return this.get(x+1,y+1);
            }
        },
        sw : function(x,y){
            if (x == 0 || y == this.y-1) {
                return false;
            } else {
                return this.get(x-1, y+1);
            }
        },
        nw : function(x,y){
            if (x == 0 || y == 0) {
                return false;
            } else {
                return this.get(x-1, y-1);
            }
        },
        neighbors : function(x,y){
            var count = 0;
            var meth = ['n', 'w', 's', 'e', 'nw', 'ne', 'se', 'sw'];
            for (var i = 0; i < meth.length; i++){
                if (this[meth[i]](x,y)) { count += 1; }
            }
            return count;
        }
    }

    var Tick = function(oldBoard) {
        var newBoard = new Board(oldBoard.x, oldBoard.y);
        // board modifiers
        for (var i = 0; i < rules.length; i++) {
            rules[i].call(undefined, oldBoard, newBoard);
        }
        // cell modifiers
        for (var i = 0; i < oldBoard.x; i++) {
            for (var j = 0; j < oldBoard.y; j++) {
                var v = false;
                for (var k = 0; k < cellRules.length; k++) {
                    v = v || cellRules[k].call({
                        neighbors : oldBoard.neighbors(i, j),
                        alive : oldBoard.get(i, j),
                    });
                }
                v ? newBoard.birth(i,j) : newBoard.kill(i,j);
            }
        }
        return newBoard;
    }

    var Draw = function(board) {
        for (var i = 0; i < drawers.length; i++) {
            drawers[i].call(undefined, canvas, board);
        }
    }

    var Run = function(board) {
        var curtime = Date.now();
        var nextTick = curtime + 500;

        // update board
        board = Tick(board);

        // draw board
        Draw(board);

        window.setTimeout(
            function() {
                Run(board);
            },
            4
        );

    };

    var Init = function(x,y) {
        var board = new Board(x,y);
        for (var i = 0; i < initializers.length; i++) {
            initializers[i].call(undefined, board);
        }
        Run(board);
    }

    var AddDrawer = function(drawer) {
        drawers.push(drawer);
    };

    var ClearDrawers = function() {
        drawers = [];
    };

    var AddInitializer = function(initializer) {
        initializers.push(initializer);
    };

    var ClearInitializers = function() {
        initializers = [];
    };

    var AddRule = function(rule) {
        rules.push(rule);
    };

    var ClearRules = function() {
        rules = [];
    };

    var AddCellRule = function(rule) {
        cellRules.push(rule);
    };

    var ClearCellRules = function() {
        cellRules = [];
    };

    window.AddDrawer = AddDrawer;
    window.AddInitializer = AddInitializer;
    window.AddRule = AddRule;
    window.AddCellRule = AddCellRule;

    window.ClearDrawers = ClearDrawers;
    window.ClearInitializers = ClearInitializers;
    window.ClearRules = ClearRules;
    window.ClearCellRules = ClearCellRules;

    window.onload = function() {
        Init(200,200);
    };
})(window, document);
