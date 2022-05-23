# Kata GameOfLife
Refinement

Universe with only dead cells



T = 0   T = 1    
[0,0,0] [0,0,0]   
[0,0,0] [0,0,0]   
[0,0,0] [0,0,0] 

Universe with 1 live cell --> dies because of under population
T = 0   T = 1    
[1,0,0] [0,0,0]   
[0,0,0] [0,0,0]   
[0,0,0] [0,0,0] 

Universe with 2 living cells --> both die because of under population
T = 0   T = 1    
[1,0,0] [0,0,0]   
[0,0,0] [0,0,0]   
[0,0,1] [0,0,0] 

Universe with 2 adjacent living cells --> both die because of under population
T = 0   T = 1    
[1,1,0] [0,0,0]   
[0,0,0] [0,0,0]   
[0,0,0] [0,0,0] 

Universe with 4 adjacent living cells --> they all live in harmony
T = 0   T = 1    
[1,1,0] [1,1,0]   
[1,1,0] [1,1,0]   
[0,0,0] [0,0,0]

Universe with 3 adjacent living cells --> they all live in harmony and reproduce one more living cell
T = 0   T = 1    
[1,1,0] [1,1,0]   
[1,0,0] [1,1,0]   
[0,0,0] [0,0,0]

Universe with 5 living cells --> death and reproduction happen at the same time
T = 0   T = 1    
[1,1,1] [1,0,1]   
[1,1,0] [1,0,1]   
[0,0,0] [0,0,0]

More complex universe where all rules are applied in one tick
T = 0            T = 1       
[0,0,0,0,0,0]    [0,0,0,0,0,0]
[0,1,0,0,0,0]    [0,0,0,0,0,0]
[0,0,0,0,0,0]    [0,0,0,0,0,0]
[1,1,1,0,1,1]    [1,0,1,0,1,1]
[1,1,0,0,1,1]    [1,0,1,0,1,1]

Atomic behaviors:
- Determine if a cell is currently dead or alive
✔ 0 = dead
✔ 1 = alive

- Determine the amount of alive neighbours
Universes of 1 row:
✔[0,0,0] first cell -> 0 alive neighbours
✔[0,1,0] first cell -> 1 alive neighbour
✔[0,1,1] second cell -> 1 alive neighbour
✔[1,1,1] second cell -> 2 alive neighbours

Universes of 2 rows
✔[1,0,0] -> first cell, first row -> 0 alive neighbours
  [0,0,0]

✔[1,1,0] -> first cell, first row -> 1 alive neighbours
  [0,0,0]

✔[1,1,0] -> first cell, first row -> 2 alive neighbours
  [1,0,0]

✔[1,1,0] -> first cell,  first row -> 3 alive neighbours
  [1,1,0]

✔[1,1,0] -> third cell, second row -> 2 alive neighbours
  [1,1,0]


- Determine underpopulation -> when fewer than two live neighbours
- Determine reproduction -> when a dead cell has exactly 3 neighbours
- Determine overcrowding -> when a live cell has more than three live neighbours 

Customer question:
- Can we assume the input is valid
