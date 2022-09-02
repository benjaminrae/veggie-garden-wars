import "./App.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import HideScreen from "../HideScreen/HideScreen";
import HowItWorks from "../HowItWorks/HowItWorks";
import HighScores from "../HighScores/HighScores";
import GameScreen from "../GameScreen/GameScreen";
import HitOrMiss from "../HitOrMiss/HitOrMiss";
import GameOver from "../GameOver/GameOver";
import useSound from "use-sound";
import explosionSound from "../../assets/sounds/zapsplat_explosion_big_heavy_dynomite_002_62566.mp3";
import missSound from "../../assets/sounds/zapsplat_sound_design_cinematic_whoosh_fast_sudden_thud_vanish_85673.mp3";

const App = () => {
    // eslint-disable-next-line no-unused-vars
    const [veggies] = useState([
        {
            veggieName: "Carrots",
            veggieSymbol: "🥕",
            spaces: 5,
            isPlaced: false,
            isSelected: true,
            isDestroyed: false,
        },
        {
            veggieName: "Onions",
            veggieSymbol: "🧅",
            spaces: 4,
            isPlaced: false,
            isSelected: false,
            isDestroyed: false,
        },
        {
            veggieName: "Potatoes",
            veggieSymbol: "🥔",
            spaces: 3,
            isPlaced: false,
            isSelected: false,
            isDestroyed: false,
        },
        {
            veggieName: "Corn",
            veggieSymbol: "🌽",
            spaces: 3,
            isPlaced: false,
            isSelected: false,
            isDestroyed: false,
        },
        {
            veggieName: "Broccoli",
            veggieSymbol: "🥦",
            spaces: 2,
            isPlaced: false,
            isSelected: false,
            isDestroyed: false,
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
        isWon: false,
    });
    const [player1Data, setPlayer1Data] = useState({
        playerVeggies: [],
        playerGrid: [],
        arePlayerVeggiesPlaced: false,
        playerName: "Player 1",
    });
    const [player2Data, setPlayer2Data] = useState({
        playerVeggies: [],
        playerGrid: [],
        arePlayerVeggiesPlaced: false,
        playerName: "Player 2",
    });
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        setPlayer1Data((prev) => ({
            ...prev,
            playerVeggies: createNewVeggies(),
            playerGrid: createPlayerGrid(),
        }));
        setPlayer2Data((prev) => ({
            ...prev,
            playerVeggies: createNewVeggies(),
            playerGrid: createPlayerGrid(),
            player2LastHitId: null,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (gameStatus.isPlayer1Turn) {
            setPlayer1Data((prev) => ({
                ...prev,
                playerVeggies: createNewVeggies(),
                playerGrid: createPlayerGrid(),
            }));
        } else {
            setPlayer2Data((prev) => ({
                ...prev,
                playerVeggies: createNewVeggies(),
                playerGrid: createPlayerGrid(),
            }));
        }
        return () => {
            setGameStatus((prev) => ({ ...prev, isReset: false }));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus.isReset]);

    useEffect(() => {
        if (
            !player1Data.arePlayerVeggiesPlaced ||
            !player2Data.arePlayerVeggiesPlaced
        ) {
            return;
        }
        const player1Cells = player1Data.playerGrid.filter(
            (cell) => cell.veggieSymbol
        );
        const player2Cells = player2Data.playerGrid.filter(
            (cell) => cell.veggieSymbol
        );
        if (player1Cells && player1Cells.every((cell) => cell.isDefendingHit)) {
            setGameStatus((prev) => ({ ...prev, isWon: true }));
            updateHighScores();
        }
        if (player2Cells && player2Cells.every((cell) => cell.isDefendingHit)) {
            setGameStatus((prev) => ({ ...prev, isWon: true }));
            updateHighScores();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        player1Data.arePlayerVeggiesPlaced,
        player1Data.playerGrid,
        player2Data.arePlayerVeggiesPlaced,
        player2Data.playerGrid,
    ]);

    useEffect(() => {
        if (gameStatus.isWon) {
            return () => {
                setGameStatus((prev) => ({ ...prev, isComputerFire: false }));
            };
        }
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
        }, 3000);

        return () => {
            clearTimeout(fireTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                isDestroyed: false,
            },
            {
                veggieName: "Onions",
                veggieSymbol: "🧅",
                spaces: 4,
                isPlaced: false,
                isSelected: false,
                isDestroyed: false,
            },
            {
                veggieName: "Potatoes",
                veggieSymbol: "🥔",
                spaces: 3,
                isPlaced: false,
                isSelected: false,
                isDestroyed: false,
            },
            {
                veggieName: "Corn",
                veggieSymbol: "🌽",
                spaces: 3,
                isPlaced: false,
                isSelected: false,
                isDestroyed: false,
            },
            {
                veggieName: "Broccoli",
                veggieSymbol: "🥦",
                spaces: 2,
                isPlaced: false,
                isSelected: false,
                isDestroyed: false,
            },
        ];
        return newVeggies;
    };

    const selectPlayers = (numberOfPLayers) => {
        setGameStatus((prev) => ({
            ...prev,
            isVersusCPU: numberOfPLayers === 1,
        }));
    };

    const startGame = (playerNames) => {
        setDisplay((prev) => ({ ...prev, showWelcome: false }));
        setPlayer1Data((prev) => ({
            ...prev,
            playerName: playerNames.player1Name,
        }));
        setPlayer2Data((prev) => ({
            ...prev,
            playerName: gameStatus.isVersusCPU
                ? "Robot"
                : playerNames.player2Name,
        }));
        if (gameStatus.isVersusCPU) {
            setDisplay((prev) => ({ ...prev, showGameScreen: true }));
            setUpComputerGrid();
            return;
        }
        setDisplay((prev) => ({ ...prev, showHideScreen: true }));
        setPlayer1Data((prev) => ({
            ...prev,
            playerName: playerNames.player1Name,
        }));
        setPlayer2Data((prev) => ({
            ...prev,
            playerName: gameStatus.isVersusCPU
                ? "Robot"
                : playerNames.player2Name,
        }));
    };

    const takeTurn = () => {
        setDisplay((prev) => ({
            ...prev,
            showHideScreen: false,
            showGameScreen: true,
        }));
    };

    const handleCloseHighScoresClick = () => {
        setDisplay((prev) => ({ ...prev, showHighScores: false }));
    };

    const handleCloseHowItWorksClick = () => {
        setDisplay((prev) => ({ ...prev, showHowItWorks: false }));
    };

    const openHighScores = () => {
        setDisplay((prev) => ({ ...prev, showHighScores: true }));
    };

    const openHowItWorks = () => {
        setDisplay((prev) => ({ ...prev, showHowItWorks: true }));
    };

    const updatePlayerVeggieSelection = (newVeggies) => {
        gameStatus.isPlayer1Turn
            ? setPlayer1Data((prev) => ({
                  ...prev,
                  playerVeggies: newVeggies,
              }))
            : setPlayer2Data((prev) => ({
                  ...prev,
                  playerVeggies: newVeggies,
              }));
    };

    const updatePlayerGrid = (newPlayerGrid) => {
        gameStatus.isPlayer1Turn
            ? setPlayer1Data((prev) => ({
                  ...prev,
                  playerGrid: newPlayerGrid,
              }))
            : setPlayer2Data((prev) => ({
                  ...prev,
                  playerGrid: newPlayerGrid,
              }));
    };

    const onResetGridAndPlacement = () => {
        setGameStatus((prev) => ({ ...prev, isReset: true }));
    };

    const onConfirmVeggiePlacement = () => {
        if (gameStatus.isPlayer1Turn) {
            setPlayer1Data((prev) => ({
                ...prev,
                arePlayerVeggiesPlaced: true,
            }));
            togglePlayer();
        } else {
            setPlayer2Data((prev) => ({
                ...prev,
                arePlayerVeggiesPlaced: true,
            }));
            togglePlayer();
        }
    };

    const togglePlayer = () => {
        if (gameStatus.isPlayer1Turn && !gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: false }));
            setDisplay((prev) => ({
                ...prev,
                showHideScreen: true,
                showGameScreen: false,
            }));
        } else if (!gameStatus.isPlayer1Turn && !gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: true }));
            setDisplay((prev) => ({
                ...prev,
                showHideScreen: true,
                showGameScreen: false,
            }));
        } else if (gameStatus.isPlayer1Turn && gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: false }));
            setDisplay((prev) => ({ ...prev, showGameScreen: true }));
        } else {
            setGameStatus((prev) => ({ ...prev, isPlayer1Turn: true }));
        }
    };

    const [playExplosion] = useSound(explosionSound, {
        volume: gameStatus.isMuted ? 0 : 0.5,
    });
    const [playMiss] = useSound(missSound, {
        volume: gameStatus.isMuted ? 0 : 0.5,
    });

    const checkVeggieDestroyed = (newPlayerGrid, cell) => {
        let newPlayerVeggies;
        if (gameStatus.isPlayer1Turn) {
            newPlayerVeggies = player2Data.playerVeggies;
        } else {
            newPlayerVeggies = player1Data.playerVeggies;
        }
        const veggieCells = newPlayerGrid.filter(
            (newPlayerCell) => newPlayerCell.veggieSymbol === cell.veggieSymbol
        );
        if (veggieCells.every((veggieCell) => veggieCell.isDefended)) {
            newPlayerVeggies.forEach((veggie) => {
                if (veggie.veggieSymbol === cell.veggieSymbol) {
                    veggie.isDestroyed = true;
                }
                return veggie;
            });
        }
        if (gameStatus.isPlayer1Turn) {
            setPlayer2Data((prev) => ({
                ...prev,
                playerVeggies: newPlayerVeggies,
            }));
        } else {
            setPlayer1Data((prev) => ({
                ...prev,
                playerVeggies: newPlayerVeggies,
            }));
        }
    };

    const onFire = (targetId) => {
        if (gameStatus.isPlayer1Turn) {
            let targetCell;
            const newPlayer1Grid = [...player1Data.playerGrid];
            const newPlayer2Grid = player2Data.playerGrid.map((cell, index) => {
                if (cell.id === targetId) {
                    targetCell = cell;
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        cell.isDefended = true;
                        newPlayer1Grid[index].isAttackingHit = true;
                        newPlayer1Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: true }));
                        playExplosion();
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isDefended = true;
                        newPlayer1Grid[index].isAttackingMiss = true;
                        newPlayer1Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({
                            ...prev,
                            isHit: false,
                        }));
                        playMiss();
                    }
                    newPlayer1Grid[index].isSelected = false;
                }
                return cell;
            });
            checkVeggieDestroyed(newPlayer2Grid, targetCell);

            setPlayer1Data((prev) => ({
                ...prev,
                playerGrid: newPlayer1Grid,
            }));
            setPlayer2Data((prev) => ({
                ...prev,
                playerGrid: newPlayer2Grid,
            }));
        } else {
            let targetCell;
            const newPlayer2Grid = [...player2Data.playerGrid];
            const newPlayer1Grid = player1Data.playerGrid.map((cell, index) => {
                if (cell.id === targetId) {
                    targetCell = cell;
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        cell.isDefended = true;
                        newPlayer2Grid[index].isAttackingHit = true;
                        newPlayer2Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({ ...prev, isHit: true }));
                        setPlayer2Data((prev) => ({
                            ...prev,
                            player2LastHitId: targetId,
                        }));
                        playExplosion();
                    } else {
                        cell.isDefendingMiss = true;
                        cell.isDefended = true;
                        newPlayer2Grid[index].isAttackingMiss = true;
                        newPlayer2Grid[index].isAttacked = true;
                        setGameStatus((prev) => ({
                            ...prev,
                            isHit: false,
                        }));
                        playMiss();
                    }
                    newPlayer2Grid[index].isSelected = false;
                }
                return cell;
            });
            checkVeggieDestroyed(newPlayer1Grid, targetCell);
            setPlayer1Data((prev) => ({
                ...prev,
                playerGrid: newPlayer1Grid,
            }));
            setPlayer2Data((prev) => ({
                ...prev,
                playerGrid: newPlayer2Grid,
            }));

            if (!gameStatus.isWon && gameStatus.isVersusCPU) {
            }
        }
        if (!gameStatus.isWon) {
            setDisplay((prev) => ({ ...prev, showHitOrMiss: true }));
        } else {
            setDisplay((prev) => ({ ...prev, showHitOrMiss: false }));
        }
        // if (gameStatus.isHit) {
        //     playExplosion();
        // } else {
        //     playMiss();
        // }
    };

    const handleHitOrMissContinue = () => {
        if (gameStatus.isPlayer1Turn && gameStatus.isVersusCPU) {
            setGameStatus((prev) => ({ ...prev, isComputerFire: true }));
        }
        setDisplay((prev) => ({ ...prev, showHitOrMiss: false }));
        if (!gameStatus.isWon) togglePlayer();
    };

    const onVolumeClick = () => {
        setGameStatus((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    };

    const handlePlayAgain = () => {
        setPlayer1Data((prev) => ({
            ...prev,
            playerGrid: createPlayerGrid(),
            playerVeggies: createNewVeggies(),
            arePlayerVeggiesPlaced: false,
        }));

        setGameStatus((prev) => ({
            ...prev,
            isPlayer1Turn: true,
            isWon: false,
        }));
        setPlayer2Data((prev) => ({
            ...prev,
            playerGrid: createPlayerGrid(),
            playerVeggies: createNewVeggies(),
            arePlayerVeggiesPlaced: false,
        }));

        setDisplay((prev) => ({
            ...prev,
            showWelcome: true,
            showGameScreen: false,
            showBoardComparison: false,
        }));
    };

    const handleShowBoards = () => {
        setDisplay((prev) => ({
            ...prev,
            showHideScreen: false,
            showGameScreen: true,
            showBoardComparison: true,
            showHitOrMiss: false,
        }));
        // setGameStatus((prev) => ({
        //     ...prev,
        //     isWon: true,
        // }));
    };

    const createComputerId = () => {
        const adjacentIds = [];
        if (player2Data.player2LastHitId) {
            adjacentIds.push(player2Data.player2LastHitId + 1);
            adjacentIds.push(player2Data.player2LastHitId - 1);
            adjacentIds.push(
                player2Data.player2LastHitId + gridDimensions.gridWidth
            );
            adjacentIds.push(
                player2Data.player2LastHitId + gridDimensions.gridWidth * -1
            );
            const checkedIds = adjacentIds.filter(
                (id) => id > 0 && id < 100 && !checkComputerId(id)
            );
            if (checkedIds.length) {
                return checkedIds[
                    Math.floor(Math.random() * checkedIds.length)
                ];
            }
        }

        const randomId = Math.floor(
            Math.random() * player2Data.playerGrid.length + 1
        );

        return randomId;
    };

    const checkComputerId = (randomId) => {
        return player2Data.playerGrid[randomId - 1].isAttacked;
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
        for (let playerVeggie of player2Data.playerVeggies) {
            let randomId, randomDirection;
            do {
                randomId = createComputerId();
                randomDirection = createComputerDirection();
            } while (
                !checkComputerCellsToFill(
                    playerVeggie,
                    randomId,
                    player2Data.playerGrid,
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
        let newPlayerGrid = player2Data.playerGrid;

        for (let i = 0; i < playerVeggie.spaces; i++) {
            newPlayerGrid = newPlayerGrid.map((cell) => {
                if (cell.id === randomId + i * randomDirection) {
                    cell.veggieSymbol = playerVeggie.veggieSymbol;
                }
                return cell;
            });
        }
        setPlayer2Data((prev) => ({ ...prev, playerGrid: [...newPlayerGrid] }));
    };

    const checkComputerCellsToFill = (
        playerVeggie,
        randomId,
        playerGrid,
        randomDirection
    ) => {
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

        if (
            Math.floor(cellsToFill[0].id / 10) !==
            Math.floor(cellsToFill[cellsToFill.length - 1].id / 10)
        ) {
            // console.log("end of line");
            return false;
        }
        return true;
    };

    const updateHighScores = () => {
        let winnerData, loserData, winnerTurns;
        if (gameStatus.isPlayer1Turn) {
            winnerData = player1Data;
            loserData = player2Data;
            winnerTurns = player1Data.playerGrid.filter(
                (cell) => cell.isAttacked
            ).length;
        } else {
            winnerData = player2Data;
            loserData = player2Data;
            winnerTurns = player2Data.playerGrid.filter(
                (cell) => cell.isAttacked
            ).length;
        }
        const newHighScore = {
            winner: winnerData,
            loser: loserData,
            turns: winnerTurns,
        };
        setHighScores((prev) => [...prev, newHighScore]);
    };

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
                    <HighScores
                        onClose={handleCloseHighScoresClick}
                        highScores={highScores}
                    />
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
                        player1Name={player1Data.playerName}
                        player2Name={player2Data.playerName}
                        onTakeTurn={takeTurn}
                    />
                )}
                {display.showGameScreen && (
                    <GameScreen
                        gridDimensions={gridDimensions}
                        gameStatus={gameStatus}
                        onUpdateVeggies={updatePlayerVeggieSelection}
                        onPlayerGridChange={updatePlayerGrid}
                        onReset={onResetGridAndPlacement}
                        onConfirmPlacement={onConfirmVeggiePlacement}
                        onFire={onFire}
                        showBoardComparison={display.showBoardComparison}
                        onPlayAgain={handlePlayAgain}
                        onHighScoresClick={openHighScores}
                        player2Data={player2Data}
                        player1Data={player1Data}
                    />
                )}
                {display.showHitOrMiss && !gameStatus.isWon && (
                    <HitOrMiss
                        isHit={gameStatus.isHit}
                        onContinue={handleHitOrMissContinue}
                        isMuted={gameStatus.isMuted}
                    />
                )}
                {gameStatus.isWon && !display.showBoardComparison && (
                    <GameOver
                        isPlayer1Turn={gameStatus.isPlayer1Turn}
                        isVersusCPU={gameStatus.isVersusCPU}
                        onHighScoresClick={openHighScores}
                        onPlayAgain={handlePlayAgain}
                        onShowBoards={handleShowBoards}
                        gameStatus={gameStatus}
                        playerName={
                            gameStatus.isPlayer1Turn
                                ? player1Data.playerName
                                : player2Data.playerName
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default App;
