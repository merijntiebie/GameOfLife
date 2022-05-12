function isTheCellAlive(cell) {
    return cell == 1 
}

function determineTheAmountOfAliveNeighbours(universe) {
    if (isTheCellAlive(universe[1])) {
        return 1
    }
    else return 0
}

module.exports = {isTheCellAlive, determineTheAmountOfAliveNeighbours}