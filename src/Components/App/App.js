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
    const [display, setDisplay] = useState({
        showWelcome: true,
        showHideScreen: false,
        showGameScreen: false,
        showHowItWorks: false,
        showHighScores: false,
        showHitOrMiss: false,
        showBoardComparison: false,
    });
    const [gameStatus, setGameStatus] = useState({
        isVersusCPU: false,
        isPlayer1Turn: true,
        isReset: false,
        isHit: false,
        isMuted: false,
        isComputerFire: false,
    });
    const [isComputerFire, setIsComputerFire] = useState(false);
    // player 1
    const [player1Data, setPlayer1Data] = useState({});
    const [arePlayer1VeggiesPlaced, setArePlayer1VeggiesPlaced] =
        useState(false);
    const [player1Veggies, setPlayer1Veggies] = useState([]);
    const [player1Grid, setPlayer1Grid] = useState([]);
    // player 2
    const [player2Data, setPlayer2Data] = useState({});
    const [arePlayer2VeggiesPlaced, setArePlayer2VeggiesPlaced] =
        useState(false);
    const [player2Veggies, setPlayer2Veggies] = useState([]);
    const [player2Grid, setPlayer2Grid] = useState([]);

    useEffect(() => {
        setPlayer1Grid(createPlayerGrid());
        setPlayer2Grid(createPlayerGrid());
        setPlayer1Veggies(createNewVeggies());
        setPlayer2Veggies(createNewVeggies());
    }, []);

    useEffect(() => {
        if (gameStatus.isPlayer1Turn) {
            setPlayer1Grid(createPlayerGrid());
            setPlayer1Veggies(createNewVeggies());
        } else {
            setPlayer2Grid(createPlayerGrid());
            setPlayer2Veggies(createNewVeggies());
        }
        return () => {
            setGameStatus((prev) => ({ ...prev, isReset: false }));
            // setIsReset(false);
        };
    }, [gameStatus.isReset]);

    useEffect(() => {
        if (!arePlayer1VeggiesPlaced || !arePlayer2VeggiesPlaced) {
            return;
        }
        const player1Cells = player1Grid.filter((cell) => cell.veggieSymbol);
        const player2Cells = player2Grid.filter((cell) => cell.veggieSymbol);
        if (player1Cells && player1Cells.every((cell) => cell.isDefendingHit)) {
            setGameStatus((prev) => ({ ...prev, isWon: true }));
            // setIsWon(true);
        }
        if (player2Cells && player2Cells.every((cell) => cell.isDefendingHit)) {
            setGameStatus((prev) => ({ ...prev, isWon: true }));
            // setIsWon(true);
        }
    }, [
        arePlayer1VeggiesPlaced,
        arePlayer2VeggiesPlaced,
        player1Grid,
        player2Grid,
    ]);

    useEffect(() => {
        if (!gameStatus.isComputerFire) {
            return;
        }
        let fireId;
        do {
            fireId = createComputerId();
        } while (checkComputerId(fireId));
        const fireTimeout = setTimeout(() => {
            onFire(fireId);
            setGameStatus((prev) => ({ ...prev, isComputerFire: false }));
            // setIsComputerFire(false);
        }, 3000);

        return () => {
            clearTimeout(fireTimeout);
        };
    }, [gameStatus.isComputerFire]);

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
                isDefended: false,
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
        setGameStatus((prev) => ({
            ...prev,
            isVersusCPU: numberOfPLayers === 1,
        }));
        // setIsVersusCPU(numberOfPLayers === 1);
    };

    const startGame = () => {
        setDisplay((prev) => ({ ...prev, showWelcome: false }));
        // setShowWelcome(false);
        if (gameStatus.isVersusCPU) {
            setDisplay((prev) => ({ ...prev, showGameScreen: true }));
            // setShowGameScreen(true);
            setUpComputerGrid();
            return;
        }
        setDisplay((prev) => ({ ...prev, showHideScreen: true }));
        // setShowHideScreen(true);
    };

    const takeTurn = () => {
        setDisplay((prev) => ({
            ...prev,
            showHideScreen: false,
            showGameScreen: true,
        }));
        // setShowHideScreen(false);
        // setShowGameScreen(true);
    };

    const handleCloseHighScoresClick = () => {
        setDisplay((prev) => ({ ...prev, showHighScores: false }));
        // setShowHighScores(false);
    };

    const handleCloseHowItWorksClick = () => {
        setDisplay((prev) => ({ ...prev, showHowItWorks: false }));
        // setShowHowItWorks(false);
    };

    const openHighScores = () => {
        setDisplay((prev) => ({ ...prev, showHighScores: true }));
        // setShowHighScores(true);
    };

    const openHowItWorks = () => {
        setDisplay((prev) => ({ ...prev, showHowItWorks: true }));
        // setShowHowItWorks(true);
    };

    const updatePlayerVeggieSelection = (newVeggies) => {
        gameStatus.isPlayer1Turn
            ? setPlayer1Veggies([...newVeggies])
            : setPlayer2Veggies([...newVeggies]);
    };

    const updatePlayerGrid = (newPlayerGrid) => {
        gameStatus.isPlayer1Turn
            ? setPlayer1Grid(newPlayerGrid)
            : setPlayer2Grid(newPlayerGrid);
    };

    const onResetGridAndPlacement = () => {
        setGameStatus((prev) => ({ ...prev, isReset: true }));
        // setIsReset(true);
    };

    const onConfirmVeggiePlacement = () => {
        if (gameStatus.isPlayer1Turn) {
            setArePlayer1VeggiesPlaced(true);
            togglePlayer();
        } else {
            setArePlayer2VeggiesPlaced(true);
            togglePlayer();
        }
    };

    const togglePlayer = () => {
        if (gameStatus.isPlayer1Turn && !gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: false }));
            // setIsPlayer1Turn(false);
            setDisplay((prev) => ({
                ...prev,
                showHideScreen: true,
                showGameScreen: false,
            }));
            // setShowGameScreen(false);
            // setShowHideScreen(true);
        } else if (!gameStatus.isPlayer1Turn && !gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: true }));
            // setIsPlayer1Turn(true);
            setDisplay((prev) => ({
                ...prev,
                showHideScreen: true,
                showGameScreen: false,
            }));
            // setShowGameScreen(false);
            // setShowHideScreen(true);
        } else if (gameStatus.isPlayer1Turn && gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: false }));
            // setIsPlayer1Turn(false);
            setDisplay((prev) => ({ ...prev, showGameScreen: true }));
            // setShowGameScreen(true);
        } else {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: true }));
            // setIsPlayer1Turn(true);
        }
    };

    const onFire = (targetId) => {
        if (gameStatus.isPlayer1Turn) {
            const newPlayer1Grid = [...player1Grid];
            const newPlayer2Grid = player2Grid.map((cell, index) => {
                if (cell.id === targetId) {
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        cell.isDefended = true;
                        newPlayer1Grid[index].isAttackingHit = true;
                        newPlayer1Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: true }));
                        // setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isDefended = true;
                        newPlayer1Grid[index].isAttackingMiss = true;
                        newPlayer1Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: false }));
                        // setIsHit(false);
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
                        cell.isDefended = true;
                        newPlayer2Grid[index].isAttackingHit = true;
                        newPlayer2Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: true }));
                        // setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isDefended = true;
                        newPlayer2Grid[index].isAttackingMiss = true;
                        newPlayer2Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: false }));
                        // setIsHit(false);
                    }
                    newPlayer2Grid[index].isSelected = false;
                }
                return cell;
            });
            setPlayer1Grid(newPlayer1Grid);
            setPlayer2Grid(newPlayer2Grid);
            if (!gameStatus.isWon && gameStatus.isVersusCPU) {
            }
        }
        setDisplay((prev) => ({ ...prev, showHitOrMiss: true }));
        // setShowHitOrMiss(true);
    };

    const handleHitOrMissContinue = () => {
        if (gameStatus.isPlayer1Turn && gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isComputerFire: true }));
            // setIsComputerFire(true);
        }
        setDisplay((prev) => ({ ...prev, showHitOrMiss: false }));
        // setShowHitOrMiss(false);
        togglePlayer();
    };

    const onVolumeClick = () => {
        setGameStatus((prev) => ({ ...prev, isMuted: !prev.isMuted }));
        // setIsMuted(!gameStatus.isMuted);
    };

    const handlePlayAgain = () => {
        setPlayer1Grid(createPlayerGrid());
        setPlayer1Veggies(createNewVeggies());
        setArePlayer1VeggiesPlaced(false);
        setGameStatus((prev) => ({
            ...prev,
            isPlayer1Turn: true,
            isWon: false,
        }));
        setPlayer2Grid(createPlayerGrid());
        setPlayer2Veggies(createNewVeggies());
        setArePlayer1VeggiesPlaced(false);
        // setIsPlayer1Turn(true);
        // setIsWon(false);
        setDisplay((prev) => ({
            ...prev,
            showWelcome: true,
            showGameScreen: false,
            showBoardComparison: false,
        }));
        // setShowBoardComparison(false);
        // setShowGameScreen(false);
        // setShowWelcome(true);
    };

    const handleShowBoards = () => {
        setDisplay((prev) => ({
            ...prev,
            showHideScreen: false,
            showGameScreen: true,
            showBoardComparison: true,
        }));
        setGameStatus((prev) => ({
            ...prev,
            isWon: false,
        }));
        // setIsWon(false);
        // setShowHideScreen(false);
        // setShowGameScreen(true);
        // setShowBoardComparison(true);
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
                isMuted={gameStatus.isMuted}
                onVolumeClick={onVolumeClick}
            />
            <div className="app__main-container">
                {display.showHowItWorks && (
                    <HowItWorks onClose={handleCloseHowItWorksClick} />
                )}
                {display.showHighScores && (
                    <HighScores onClose={handleCloseHighScoresClick} />
                )}
                {display.showWelcome && (
                    <Welcome
                        onPlayerSelect={selectPlayers}
                        onStartGame={startGame}
                    />
                )}
                {display.showHideScreen && (
                    <HideScreen
                        isPlayer1Turn={gameStatus.isPlayer1Turn}
                        onTakeTurn={takeTurn}
                    />
                )}
                {display.showGameScreen && (
                    <GameScreen
                        height={gridDimensions.gridHeight}
                        width={gridDimensions.gridWidth}
                        isPlayer1Turn={gameStatus.isPlayer1Turn}
                        arePlayerVeggiesPlaced={
                            gameStatus.isPlayer1Turn
                                ? arePlayer1VeggiesPlaced
                                : arePlayer2VeggiesPlaced
                        }
                        playerVeggies={
                            gameStatus.isPlayer1Turn
                                ? player1Veggies
                                : player2Veggies
                        }
                        playerGrid={
                            gameStatus.isPlayer1Turn ? player1Grid : player2Grid
                        }
                        onUpdateVeggies={updatePlayerVeggieSelection}
                        onPlayerGridChange={updatePlayerGrid}
                        onReset={onResetGridAndPlacement}
                        onConfirmPlacement={onConfirmVeggiePlacement}
                        onFire={onFire}
                        showBoardComparison={display.showBoardComparison}
                        secondPlayerGrid={
                            gameStatus.isPlayer1Turn ? player2Grid : player1Grid
                        }
                        onPlayAgain={handlePlayAgain}
                        isVersusCPU={gameStatus.isVersusCPU}
                    />
                )}
                {display.showHitOrMiss && (
                    <HitOrMiss
                        isHit={gameStatus.isHit}
                        onContinue={handleHitOrMissContinue}
                    />
                )}
                {gameStatus.isWon && (
                    <GameOver
                        isPlayer1Turn={gameStatus.isPlayer1Turn}
                        isVersusCPU={gameStatus.isVersusCPU}
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
