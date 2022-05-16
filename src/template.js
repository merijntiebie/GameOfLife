function isTheCellAlive(cell) {
    return cell == 1 
}

function determineTheAmountOfAliveNeighbours(universe, cellRow, cellColumn) {
    var numberOfNeiboursAlive = 0
    
    if (isTheCellAlive(universe[cellRow][cellColumn - 1] && universe[cellRow][cellColumn + 1])) {
        return 2
    } else if (isTheCellAlive(universe[cellRow][cellColumn - 1] && universe[cellRow][cellColumn + 1])) {
        return 2
    } else if ((isTheCellAlive(universe[cellRow][cellColumn - 1] || universe[cellRow][cellColumn + 1]) && universe[cellRow + 1][cellColumn] )) {
        return 2
    } else if (isTheCellAlive(universe[cellRow][cellColumn - 1] || universe[cellRow][cellColumn + 1])) {
        return 1
    }
    else return 0
}

module.exports = {isTheCellAlive, determineTheAmountOfAliveNeighbours}