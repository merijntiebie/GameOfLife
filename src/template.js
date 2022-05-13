function isTheCellAlive(cell) {
    return cell == 1 
}

function determineTheAmountOfAliveNeighbours(universe, cellNumber) {
    if (isTheCellAlive(universe[cellNumber - 1] && universe[cellNumber + 1])) {
        return 2
    } if (isTheCellAlive(universe[cellNumber - 1] || universe[cellNumber + 1])) {
        return 1
    }
    else return 0
}

module.exports = {isTheCellAlive, determineTheAmountOfAliveNeighbours}