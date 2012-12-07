# Javascripted Life

## An implementation of Conway's Game of Life in JS

### What is it?

- This is an extensible framework for the
  [Game of life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)
- It allows users to define rules in real time that will affect the
  behavior of the cells

### Details, please

- The 'game' works as follows:
  1. The board is initialized (it's made up of 400x400 'cells')
  2. The board is drawn on the screen
  3. The game 'ticks' once (here is where the new board comes in)


### The building blocks of life

#### Board

The `board` is a grid of `cells`. You can get the state of cell on a
board with `get` (e.g. `myBoard.get(x,y)`). This will tell you if the
cell is living or dead. You can count the number of live neighbors
that piece has with the `neighbors` function
(e.g. `myBoard.neighbors(0,1)`). *N.B.* Neighbors is a fairly
expensive call, so cache this result when possible.

If you want to make a cell come to life at a particular location, use
the `birth` function. If you want to make sure that a particular cell
is dead, use `kill`.

#### Cells

Cells or `pieces` have two pieces of state `alive` and `visited`
(currently unused). You can copy a piece with `clone`.

### Let's get to the good part; how do I add my own rules?

All 3 pieces above are extensible and user overwritable. When you load
the page, you'll see a textarea on the right with a submit button. Any
code in this area will be evaluated when you submit.

#### Initializers

You can add an `initializer` which takes a `board` and modifies that
board (e.g. using `birth` and `kill`). To add an initializer function
to the game, there is a global `AddInitializer` function which has
been made available. There is also a `ClearInitializers` function
which does what it sounds like.

#### Rules

You can add `rule`s which modify the entire board. These take an
`oldboard` (from the prior tick) and a `newboard` (from this tick). As
with initializers, there's `AddRule` and `ClearRules` global functions
for your convenience.

#### Cell Rules

Since using a `rule` generally means you need to write your own
iterator to go over each cell, I've added a special construct called
`cellRule`s. These are called for you on each cell and depending on whether
they return `true` or `false` will `birth` or `kill` that particular
cell. When called, a `cellRule` has a context (`this`) with
`neighbors`, `x`, `y`, and `living`. If there are multiple cell rules,
they are `or`'ed together to decide whether a cell should live or die.

`AddCellRule` and `ClearCellRules` are your friends here.

#### Drawers

You can even change how the board is drawn on screen. The game will
call each `drawer` with the current `board` and the `canvas`
element. Using this you can draw the board however you like on screen.

As expected, `AddDrawer` and `ClearDrawers` are provided.


### Examples

There are examples for all of these in `defaults.js` which will load
by default. You can clear them out using the `clear*` functions from
above.


