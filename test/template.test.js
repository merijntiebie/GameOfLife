const {
    isTheCellAlive,
    determineTheAmountOfAliveNeighbours, 
    determineIfThereIsUnderpopulation, 
    determineIfThereIsReproduction, 
    determineIfThereIsOvercrowding,
    determineNextStatusOfCell
} = require('../src/template');

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
        it('░░▓, ░░▓ first cell has 3 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 0)).toEqual(3)
        });
        it('░░▓, ░░▓ 3rd cell on the 2nd row has 2 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 2)).toEqual(2)
        });
        it('░░▓, ░░▓ second cell on the first row has 3 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 1)).toEqual(3)
        });
        it('░░▓, ░░▓ first cell on the second row has 3 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 0)).toEqual(3)
        });
        it('░░░, ░░░, ░░░ second cell on the second row has 8 alive neighbours ', () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1)).toEqual(8)
        });
    });
});

describe('We want to be able to determine if a cell can persist based on the amount of alive neighbours', () => {
    describe('When there are less than 2 alive neighbours there is underpopulation:', () => {
        it('2 -> no', () => {
            expect(determineIfThereIsUnderpopulation(2)).toEqual(false)
        });
        it('1 -> yes', () => {
            expect(determineIfThereIsUnderpopulation(1)).toEqual(true)
        });
    });    
    describe('When there are exactly 3 alive neighbours there is reproduction:', () => {
        it('2 -> no', () => {
            expect(determineIfThereIsReproduction(2)).toEqual(false)
        });
        it('3 -> yes', () => {
            expect(determineIfThereIsReproduction(3)).toEqual(true)
        });
        it('4 -> no', () => {
            expect(determineIfThereIsReproduction(4)).toEqual(false)
        });
    });    
    describe('When there are more than 3 alive neighbours there is overcrowding:', () => {
        it('3 -> no', () => {
            expect(determineIfThereIsOvercrowding(3)).toEqual(false)
        });
        it('4 -> yes', () => {
            expect(determineIfThereIsOvercrowding(4)).toEqual(true)
        });
    });
    describe('When the cell is alive', () => {
        it('and has 1 neighbour, it dies', () => {
            expect(determineNextStatusOfCell(1, 1)).toEqual(0)
        });
        it('and has 2 neighbours, it stays alive', () => {
            expect(determineNextStatusOfCell(1, 2)).toEqual(1)
        });
    });
});