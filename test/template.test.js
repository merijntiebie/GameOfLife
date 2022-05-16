const {isTheCellAlive, determineTheAmountOfAliveNeighbours} = require('../src/template');

describe('When we play the game of life, we want to be able to determine whether a cell is dead or alive', () => {
    it('▓ -> not alive', () => {
        expect(isTheCellAlive(0)).toEqual(false);        
    });
    it('░ -> alive', () => {
        expect(isTheCellAlive(1)).toEqual(true);        
    });
});

describe('We want to be able to determine the amount of alive neighbours for each cell', () => {
    describe('When our universe consists of 1 row', () => {
        
        it('▓▓▓ first cell has no alive neighbours', () => {
            expect(determineTheAmountOfAliveNeighbours([[0,0,0]],0,0)).toEqual(0);
        });
        it('▓░▓ first cell has one alive neighbour', () => {
            expect(determineTheAmountOfAliveNeighbours([[0, 1, 0]],0,0)).toEqual(1);
        });
        it('▓░░ second cell has one alive neighbour', () => {
            expect(determineTheAmountOfAliveNeighbours([[0, 1, 1]],0,1)).toEqual(1);
        });
        it('░░░ second cell has two alive neighbours', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 1]],0,1)).toEqual(2);
        });
    });
    describe('When our universe consists of 2 rows', () => {
        it('░▓▓, ▓▓▓ first cell has no alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1,0,0],[0,0,0]],0,0)).toEqual(0)
        });
        it('░░▓, ▓▓▓ first cell has one alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [0, 0, 0]],0,0)).toEqual(1)
        });
        it('░░▓, ░▓▓ first cell has 2 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 0, 0]], 0, 0)).toEqual(2)
        });
    });
});