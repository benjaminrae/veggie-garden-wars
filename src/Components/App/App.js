import "./App.css";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import HideScreen from "../HideScreen/HideScreen";
import HowItWorks from "../HowItWorks/HowItWorks";
import { useState, useEffect, cloneElement } from "react";
import HighScores from "../HighScores/HighScores";
import GameScreen from "../GameScreen/GameScreen";
import HitOrMiss from "../HitOrMiss/HitOrMiss";

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
    const [gridHeight] = useState(10);
    const [gridWidth] = useState(10);
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
        const player1Veggies = player1Grid.filter((cell) => cell.veggieSymbol);
        const player2Veggies = player2Grid.filter((cell) => cell.veggieSymbol);
        if (player1Veggies.every((cell) => cell.isDefendingHit)) {
            setIsWon(true);
        }
        if (player2Veggies.every((cell) => cell.isDefendingHit)) {
            setIsWon(true);
        }
    }, [player1Grid, player2Grid]);

    const createPlayerGrid = () => {
        const playerGrid = [];
        for (let i = 0; i < gridHeight * gridWidth; i++) {
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
        isVersusCPU ? setShowGameScreen(true) : setShowHideScreen(true);
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
        }
    };

    const onFire = (targetId) => {
        if (isPlayer1Turn) {
            const newPlayer1Grid = [...player1Grid];
            const newPlayer2Grid = player2Grid.map((cell, index) => {
                if (cell.id === targetId) {
                    if (cell.veggieSymbol) {
                        cell.isDefendingHit = true;
                        newPlayer1Grid[index].isAttackingHit = true;
                        setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
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
                        newPlayer2Grid[index].isAttackingHit = true;
                        setIsHit(true);
                    } else {
                        cell.isDefendingMiss = true;
                        newPlayer2Grid[index].isAttackingMiss = true;
                        setIsHit(false);
                    }
                    newPlayer2Grid[index].isSelected = false;
                }
                return cell;
            });
            setPlayer1Grid(newPlayer1Grid);
            setPlayer2Grid(newPlayer2Grid);
        }
        if (!isWon) setShowHitOrMiss(true);
    };

    const handleHitOrMissContinue = () => {
        setShowHitOrMiss(false);
        togglePlayer();
    };

    const onVolumeClick = () => {
        setIsMuted(!isMuted);
    };

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
                        height={gridHeight}
                        width={gridWidth}
                        player1Turn={isPlayer1Turn}
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
                    />
                )}
                {showHitOrMiss && (
                    <HitOrMiss
                        isHit={isHit}
                        onContinue={handleHitOrMissContinue}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
