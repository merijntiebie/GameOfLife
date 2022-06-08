const {
    isTheCellAlive,
    determineTheAmountOfAliveNeighbours, 
    determineIfThereIsUnderpopulation, 
    determineIfThereIsReproduction, 
    determineIfThereIsOvercrowding,
    determineNextStatusOfCell,
    determineNextStateOfUniverse
} = require('../src/template');

describe('Before we can determine deaths and births, we want to be able to determine the current state of a cell (dead or alive)', () => {
    it('▓ -> not alive', () => {
        expect(isTheCellAlive(0)).toEqual(false);        
    });
    it('░ -> alive', () => {
        expect(isTheCellAlive(1)).toEqual(true);        
    });
});

describe('We want to be able to determine the next generation. To do that, we first have to determine the amount of alive neighbours for each cell', () => {
    describe('When our universe consists of 1 row', () => {
        
        it(`▓▓▓ first cell has zero alive neighbours
        `, () => {
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
        it(`first cell has zero alive neighbours
        ░▓▓
        ▓▓▓ 
        `, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 0, 0], [0, 0, 0]], 0, 0)).toEqual(0)
        });

        it(`first cell has one alive neighbour
        ░░▓
        ▓▓▓ `, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [0, 0, 0]], 0, 0)).toEqual(1)
        });

        it(`first cell has 2 alive neighbours
        ░░▓ 
        ░▓▓ `, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 0, 0]], 0, 0)).toEqual(2)
        });
        it(`first cell has 3 alive neighbours
        ░░▓
        ░░▓`, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 0)).toEqual(3)
        });
        it(`3rd cell on the 2nd row has 2 alive neighbours
        ░░▓
        ░░▓`, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 2)).toEqual(2)
        });
        it(`second cell on the first row has 3 alive neighbours
        ░░▓
        ░░▓`, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 1)).toEqual(3)
        });
        it(`first cell on the second row has 3 alive neighbours
        ░░▓
        ░░▓`, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 0)).toEqual(3)
        });

    });
    describe('When our universe consists of 3 rows', () => {
        it(`second cell on the second row has 8 alive neighbours
        ░░░
        ░░░
        ░░░`, () => {
            expect(determineTheAmountOfAliveNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1)).toEqual(8)
        });
    });
});

describe('We want to be able to determine if a cell dies or is born based on the amount of its alive neighbours', () => {
    describe('We first need to check which rule is appliccable to a cell', () => {
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
    });
    
    describe('When the cell is alive', () => {
        it('1 neighbour, it dies because of underpopulation', () => {
            expect(determineNextStatusOfCell(1,1)).toEqual(0)
        });
        it('2 neighbours, it stays alive because a there is a stable environment', () => {
            expect(determineNextStatusOfCell(1,2)).toEqual(1)
        });
        it('3 neighbours, it stays alive because of reproduction', () => {
            expect(determineNextStatusOfCell(1,3)).toEqual(1)
        });
        it('4 neighbours, it dies because of overpopulation', () => {
            expect(determineNextStatusOfCell(1,4)).toEqual(0)
        });
    });
    describe('When the cell is dead', () => {
        it('1 neighbour, it stays dead because of underpopulation', () => {
            expect(determineNextStatusOfCell(0, 1)).toEqual(0)
        });
        it('2 neighbours, it stays dead because a there is a stable environment', () => {
            expect(determineNextStatusOfCell(0, 2)).toEqual(0)
        });
        it('3 neighbours, it becomes alive because of reproduction', () => {
            expect(determineNextStatusOfCell(0, 3)).toEqual(1)
        });
        it('4 neighbours, it stays dead because of overpopulation', () => {
            expect(determineNextStatusOfCell(0, 4)).toEqual(0)
        });
    });
});

describe('At every tick, the generation moves from its current state to the next state', () => {
    it(`When we have a dead universe at generation 0 it remains dead at generation 1
    t=0  |  t=1
    ▓▓▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[0,0,0],[0,0,0],[0,0,0]])).toEqual([[0,0,0],[0,0,0],[0,0,0]])        
    });
    it(`one alive cell at generation 0, the universe will be dead at generation 1
    t=0  |  t=1
    ▓▓▓  |  ▓▓▓
    ▓░▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[0,0,0],[0,1,0],[0,0,0]])).toEqual([[0,0,0],[0,0,0],[0,0,0]])        
    });
    it(`2 alive cells at generation 0, the universe will be dead at generation 1
    t=0  |  t=1
    ░▓▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓
    ▓▓░  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[1, 0, 0], [0, 0, 0], [0, 0, 1]])).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    });
    it(`2 alive cells next to eachother, universe will be dead at generation 1
    t=0  |  t=1
    ░░▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[1, 1, 0], [0, 0, 0], [0, 0, 0]])).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    });
    it(`4 alive cells, universe will be stable at generation 1
    t=0  |  t=1
    ░░▓  |  ░░▓
    ░░▓  |  ░░▓
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[1, 1, 0], [1, 1, 0], [0, 0, 0]])).toEqual([[1, 1, 0], [1, 1, 0], [0, 0, 0]])
    });
    it(`3 alive cells, + 1 cell due to reproduction
    t=0  |  t=1
    ░░▓  |  ░░▓
    ░▓▓  |  ░░▓
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[1, 1, 0], [1, 0, 0], [0, 0, 0]])).toEqual([[1, 1, 0], [1, 1, 0], [0, 0, 0]])
    });
    it(`5 alive cells, due to reproduction and death at the same time --> 4 alive cells
    t=0  |  t=1
    ░░░  |  ░▓░
    ░░▓  |  ░▓░
    ▓▓▓  |  ▓▓▓`, () => {
        expect(determineNextStateOfUniverse([[1, 1, 1], [1, 1, 0], [0, 0, 0]])).toEqual([[1, 0, 1], [1, 0, 1], [0, 0, 0]])
    });
});