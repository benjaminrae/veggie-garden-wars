import "./App.css";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import HideScreen from "../HideScreen/HideScreen";
import HowItWorks from "../HowItWorks/HowItWorks";
import { useState, useEffect, cloneElement } from "react";
import HighScores from "../HighScores/HighScores";
import GameScreen from "../GameScreen/GameScreen";
import HitOrMiss from "../HitOrMiss/HitOrMiss";
import GameOver from "../GameOver/GameOver";

const App = () => {
    const [veggies] = useState([
        {
            veggieName: "Carrots",
            veggieSymbol: "🥕",
            spaces: 5,
            isPlaced: false,
            isSelected: true,
        },
        {
            veggieName: "Onions",
            veggieSymbol: "🧅",
            spaces: 4,
            isPlaced: false,
            isSelected: false,
        },
        {
            veggieName: "Potatoes",
            veggieSymbol: "🥔",
            spaces: 3,
            isPlaced: false,
            isSelected: false,
        },
        {
            veggieName: "Corn",
            veggieSymbol: "🌽",
            spaces: 3,
            isPlaced: false,
            isSelected: false,
        },
        {
            veggieName: "Broccoli",
            veggieSymbol: "🥦",
            spaces: 2,
            isPlaced: false,
            isSelected: false,
        },
    ]);
    const [gridDimensions] = useState({ gridHeight: 10, gridWidth: 10 });
    // const [gridHeight] = useState(10);
    // const [gridWidth] = useState(10);
    const [isVersusCPU, setIsVersusCPU] = useState(null);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showHideScreen, setShowHideScreen] = useState(false);
    const [showGameScreen, setShowGameScreen] = useState(false);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showHighScores, setShowHighScores] = useState(false);
    const [arePlayer1VeggiesPlaced, setArePlayer1VeggiesPlaced] =
        useState(false);
    const [arePlayer2VeggiesPlaced, setArePlayer2VeggiesPlaced] =
        useState(false);
    const [player1Veggies, setPlayer1Veggies] = useState([]);
    const [player2Veggies, setPlayer2Veggies] = useState([]);
    const [player1Grid, setPlayer1Grid] = useState([]);
    const [player2Grid, setPlayer2Grid] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const [isHit, setIsHit] = useState(false);
    const [showHitOrMiss, setShowHitOrMiss] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [showBoardComparison, setShowBoardComparison] = useState(false);
    const [isComputerFire, setIsComputerFire] = useState(false);

    useEffect(() => {
        setPlayer1Grid(createPlayerGrid());
        setPlayer2Grid(createPlayerGrid());
        setPlayer1Veggies(createNewVeggies());
        setPlayer2Veggies(createNewVeggies());
    }, []);

    useEffect(() => {
        if (isPlayer1Turn) {
            setPlayer1Grid(createPlayerGrid());
            setPlayer1Veggies(createNewVeggies());
        } else {
            setPlayer2Grid(createPlayerGrid());
            setPlayer2Veggies(createNewVeggies());
        }
        return () => {
            setIsReset(false);
        };
    }, [isReset]);

    useEffect(() => {
        if (!arePlayer1VeggiesPlaced || !arePlayer2VeggiesPlaced) {
            return;
        }
        const player1Cells = player1Grid.filter((cell) => cell.veggieSymbol);
        const player2Cells = player2Grid.filter((cell) => cell.veggieSymbol);
        if (player1Cells && player1Cells.every((cell) => cell.isDefendingHit)) {
            setIsWon(true);
        }
        if (player2Cells && player2Cells.every((cell) => cell.isDefendingHit)) {
            setIsWon(true);
        }
    }, [
        arePlayer1VeggiesPlaced,
        arePlayer2VeggiesPlaced,
        player1Grid,
        player2Grid,
    ]);

    useEffect(() => {
        if (!isComputerFire) {
            return;
        }
        let fireId;
        do {
            fireId = createComputerId();
        } while (checkComputerId(fireId));
        const fireTimeout = setTimeout(() => {
            onFire(fireId);
            setIsComputerFire(false);
        }, 3000);

        return () => {
            clearTimeout(fireTimeout);
        };
    }, [isComputerFire]);

    const createPlayerGrid = () => {
        const playerGrid = [];
        for (
            let i = 0;
            i < gridDimensions.gridHeight * gridDimensions.gridWidth;
            i++
        ) {
            playerGrid.push({
                id: i + 1,
                veggieSymbol: "",
                isAttackingHit: false,
                isAttackingMiss: false,
                isDefendingHit: false,
                isDefendingMiss: false,
                isSelected: false,
                isAttacked: false,
            });
        }
        return playerGrid;
    };

    const createNewVeggies = () => {
        const newVeggies = [
            {
                veggieName: "Carrots",
                veggieSymbol: "🥕",
                spaces: 5,
                isPlaced: false,
                isSelected: true,
            },
            {
                veggieName: "Onions",
                veggieSymbol: "🧅",
                spaces: 4,
                isPlaced: false,
                isSelected: false,
            },
            {
                veggieName: "Potatoes",
                veggieSymbol: "🥔",
                spaces: 3,
                isPlaced: false,
                isSelected: false,
            },
            {
                veggieName: "Corn",
                veggieSymbol: "🌽",
                spaces: 3,
                isPlaced: false,
                isSelected: false,
            },
            {
                veggieName: "Broccoli",
                veggieSymbol: "🥦",
                spaces: 2,
                isPlaced: false,
                isSelected: false,
            },
        ];
        return newVeggies;
    };

    const selectPlayers = (numberOfPLayers) => {
        setIsVersusCPU(numberOfPLayers === 1);
    };

    const startGame = () => {
        setShowWelcome(false);
        if (isVersusCPU) {
            setShowGameScreen(true);
            setUpComputerGrid();
            return;
        }
        setShowHideScreen(true);
    };

    const takeTurn = () => {
        setShowHideScreen(false);
        setShowGameScreen(true);
    };

    const handleCloseHighScoresClick = () => {
        setShowHighScores(false);
    };

    const handleCloseHowItWorksClick = () => {
        setShowHowItWorks(false);
    };

    const openHighScores = () => {
        setShowHighScores(true);
    };

    const openHowItWorks = () => {
        setShowHowItWorks(true);
    };

    const updatePlayerVeggieSelection = (newVeggies) => {
        isPlayer1Turn
            ? setPlayer1Veggies([...newVeggies])
            : setPlayer2Veggies([...newVeggies]);
    };

    const updatePlayerGrid = (newPlayerGrid) => {
        isPlayer1Turn
            ? setPlayer1Grid(newPlayerGrid)
            : setPlayer2Grid(newPlayerGrid);
    };

    const onResetGridAndPlacement = () => {
        setIsReset(true);
    };

    const onConfirmVeggiePlacement = () => {
        if (isPlayer1Turn) {
            setArePlayer1VeggiesPlaced(true);
            togglePlayer();
        } else {
            setArePlayer2VeggiesPlaced(true);
            togglePlayer();
        }
    };

    const togglePlayer = () => {
        if (isPlayer1Turn && !isVersusCPU) {
            setIsPlayer1Turn(false);
            setShowGameScreen(false);
            setShowHideScreen(true);
        } else if (!isPlayer1Turn && !isVersusCPU) {
            setIsPlayer1Turn(true);
            setShowGameScreen(false);
            setShowHideScreen(true);
        } else if (isPlayer1Turn && isVersusCPU) {
            setIsPlayer1Turn(false);
            setShowGameScreen(true);
        } else {
            setIsPlayer1Turn(true);
        }
    };

    const onFire = (targetId) => {
        if (isPlayer1Turn) {
            const newPlayer1Grid = [...player1Grid];
            const newPlayer2Grid = player2Grid.map((cell, index) => {
                if (cell.id === targetId) {
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        cell.isAttacked = true;
                        newPlayer1Grid[index].isAttackingHit = true;
                        setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isAttacked = true;
                        newPlayer1Grid[index].isAttackingMiss = true;
                        setIsHit(false);
                    }
                    newPlayer1Grid[index].isSelected = false;
                }
                return cell;
            });
            setPlayer1Grid(newPlayer1Grid);
            setPlayer2Grid(newPlayer2Grid);
        } else {
            const newPlayer2Grid = [...player2Grid];
            const newPlayer1Grid = player1Grid.map((cell, index) => {
                if (cell.id === targetId) {
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        cell.isAttacked = true;

                        newPlayer2Grid[index].isAttackingHit = true;
                        setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isAttacked = true;

                        newPlayer2Grid[index].isAttackingMiss = true;
                        setIsHit(false);
                    }
                    newPlayer2Grid[index].isSelected = false;
                }
                return cell;
            });
            setPlayer1Grid(newPlayer1Grid);
            setPlayer2Grid(newPlayer2Grid);
            if (!isWon && isVersusCPU) {
            }
        }
        // if (!isWon && !isVersusCPU) setShowHitOrMiss(true);
        // if (!isWon && isVersusCPU) {
        //     isPlayer1Turn ? setShowHitOrMiss(true) : togglePlayer();
        // }
        setShowHitOrMiss(true);
    };

    const handleHitOrMissContinue = () => {
        if (isPlayer1Turn && isVersusCPU) {
            setIsComputerFire(true);
        }
        setShowHitOrMiss(false);
        togglePlayer();
    };

    const onVolumeClick = () => {
        setIsMuted(!isMuted);
    };

    const handlePlayAgain = () => {
        setPlayer1Grid(createPlayerGrid());
        setPlayer1Veggies(createNewVeggies());
        setArePlayer1VeggiesPlaced(false);
        setIsPlayer1Turn(true);
        setPlayer2Grid(createPlayerGrid());
        setPlayer2Veggies(createNewVeggies());
        setArePlayer1VeggiesPlaced(false);
        setIsWon(false);
        setShowBoardComparison(false);
        setShowGameScreen(false);
        setShowWelcome(true);
    };

    const handleShowBoards = () => {
        setShowHideScreen(false);
        setShowGameScreen(true);
        setIsWon(false);
        setShowBoardComparison(true);
    };

    const createComputerId = () => {
        const randomId = Math.floor(Math.random() * player2Grid.length);
        return randomId;
    };

    const checkComputerId = (randomId) => {
        return player1Grid[randomId].isAttacked;
    };

    const createComputerDirection = () => {
        const randomDirection = [
            1,
            -1,
            gridDimensions.gridHeight,
            gridDimensions.gridHeight * -1,
        ][Math.floor(Math.random() * 4)];
        return randomDirection;
    };

    const setUpComputerGrid = () => {
        for (let playerVeggie of player2Veggies) {
            let randomId, randomDirection;
            do {
                randomId = createComputerId();
                randomDirection = createComputerDirection();
            } while (
                !checkComputerCellsToFill(
                    playerVeggie,
                    randomId,
                    player2Grid,
                    randomDirection
                )
            );

            fillComputerCellsWithVeggies(
                playerVeggie,
                randomId,
                randomDirection
            );
        }
    };

    const fillComputerCellsWithVeggies = (
        playerVeggie,
        randomId,
        randomDirection
    ) => {
        let playerGrid = player2Grid;

        for (let i = 0; i < playerVeggie.spaces; i++) {
            playerGrid = playerGrid.map((cell) => {
                if (cell.id === randomId + i * randomDirection) {
                    cell.veggieSymbol = playerVeggie.veggieSymbol;
                }
                return cell;
            });
        }
        setPlayer2Grid(playerGrid);
    };

    const checkComputerCellsToFill = (
        playerVeggie,
        randomId,
        playerGrid,
        randomDirection
    ) => {
        console.log(playerVeggie);
        const cellsToFill = [];
        for (let i = 0; i < playerVeggie.spaces; i++) {
            playerGrid.forEach((cell) => {
                if (cell.id === randomId + i * randomDirection) {
                    cellsToFill.push(cell);
                }
            });
        }

        if (cellsToFill.some((cell) => cell.veggieSymbol)) {
            // console.log("veggie clash");
            return false;
        }
        if (cellsToFill.length !== playerVeggie.spaces) {
            // console.log("out of grid");
            return false;
        }
        if (
            randomDirection === gridDimensions.gridHeight ||
            randomDirection === gridDimensions.gridHeight * -1
        ) {
            // console.log("end of line edge case");

            return true;
        }
        const sortedCellsToFill = cellsToFill.sort((a, b) => a.id - b.id);
        if (sortedCellsToFill[sortedCellsToFill.length - 1].id % 10 === 0) {
            // console.log("end of line edge case");
            return true;
        }
        if (sortedCellsToFill[0].id % 10 === 0) {
            // console.log("end of line edge case");
            return false;
        }
        // if (cellsToFill[cellsToFill.length - 1].id % 10 === 0) {
        //     console.log("end of line edge case");
        //     return cellsToFill[0].id < cellsToFill[cellsToFill.length - 1].id;
        // }
        if (
            Math.floor(cellsToFill[0].id / 10) !==
            Math.floor(cellsToFill[cellsToFill.length - 1].id / 10)
        ) {
            // console.log("end of line");
            return false;
        }
        return true;
    };

    const takeComputerTurn = () => {};

    return (
        <div className="app">
            <Header
                onHowItWorksClick={openHowItWorks}
                onHighScoresClick={openHighScores}
                isMuted={isMuted}
                onVolumeClick={onVolumeClick}
            />
            <div className="app__main-container">
                {showHowItWorks && (
                    <HowItWorks onClose={handleCloseHowItWorksClick} />
                )}
                {showHighScores && (
                    <HighScores onClose={handleCloseHighScoresClick} />
                )}
                {showWelcome && (
                    <Welcome
                        onPlayerSelect={selectPlayers}
                        onStartGame={startGame}
                    />
                )}
                {showHideScreen && (
                    <HideScreen
                        player1Turn={isPlayer1Turn}
                        onTakeTurn={takeTurn}
                    />
                )}
                {showGameScreen && (
                    <GameScreen
                        height={gridDimensions.gridHeight}
                        width={gridDimensions.gridWidth}
                        isPlayer1Turn={isPlayer1Turn}
                        arePlayerVeggiesPlaced={
                            isPlayer1Turn
                                ? arePlayer1VeggiesPlaced
                                : arePlayer2VeggiesPlaced
                        }
                        playerVeggies={
                            isPlayer1Turn ? player1Veggies : player2Veggies
                        }
                        playerGrid={isPlayer1Turn ? player1Grid : player2Grid}
                        onUpdateVeggies={updatePlayerVeggieSelection}
                        onPlayerGridChange={updatePlayerGrid}
                        onReset={onResetGridAndPlacement}
                        onConfirmPlacement={onConfirmVeggiePlacement}
                        onFire={onFire}
                        showBoardComparison={showBoardComparison}
                        secondPlayerGrid={
                            isPlayer1Turn ? player2Grid : player1Grid
                        }
                        onPlayAgain={handlePlayAgain}
                        isVersusCPU={isVersusCPU}
                    />
                )}
                {showHitOrMiss && (
                    <HitOrMiss
                        isHit={isHit}
                        onContinue={handleHitOrMissContinue}
                    />
                )}
                {isWon && (
                    <GameOver
                        isPlayer1Turn={isPlayer1Turn}
                        isVersusCPU={isVersusCPU}
                        onHighScoresClick={openHighScores}
                        onPlayAgain={handlePlayAgain}
                        onShowBoards={handleShowBoards}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
