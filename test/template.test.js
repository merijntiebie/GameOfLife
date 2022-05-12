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
            expect(determineTheAmountOfAliveNeighbours([0,0,0])).toEqual(0);
        });
        
    });
});