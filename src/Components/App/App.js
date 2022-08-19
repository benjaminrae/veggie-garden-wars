import "./App.css";
import GameGrid from "../GameGrid/GameGrid";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import HideScreen from "../HideScreen/HideScreen";
import HowItWorks from "../HowItWorks/HowItWorks";
import { useState, useEffect } from "react";
import HighScores from "../HighScores/HighScores";
import GameScreen from "../GameScreen/GameScreen";

const veggies = [
    {
        veggieName: "Carrots",
        veggieSymbol: "🥕",
        spaces: 5,
        isPlaced: false,
        isSelected: true,
        cells: [],
    },
    {
        veggieName: "Onions",
        veggieSymbol: "🧅",
        spaces: 4,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        veggieName: "Potatoes",
        veggieSymbol: "🥔",
        spaces: 3,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        veggieName: "Corn",
        veggieSymbol: "🌽",
        spaces: 3,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        veggieName: "Broccoli",
        veggieSymbol: "🥦",
        spaces: 2,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
];

const App = () => {
    const [gridHeight, setGridHeight] = useState(10);
    const [gridWidth, setGridWidth] = useState(10);
    const [isVersusCPU, setIsVersusCPU] = useState(null);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    const [isPlayer2Turn, setIsPlayer2Turn] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showHideScreen, setShowHideScreen] = useState(false);
    const [showGameScreen, setShowGameScreen] = useState(false);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showHighScores, setShowHighScores] = useState(false);
    const [arePlayer1VeggiesPlaced, setArePlayer1VeggiesPlaced] =
        useState(false);
    const [arePlayer2VeggiesPlaced, setArePlayer2VeggiesPlaced] =
        useState(false);
    const [player1Veggies, setPlayer1Veggies] = useState([...veggies]);
    const [player2Veggies, setPlayer2Veggies] = useState([...veggies]);
    const [player1Grid, setPlayer1Grid] = useState([]);
    const [player2Grid, setPlayer2Grid] = useState([]);

    useEffect(() => {
        setPlayer1Grid(createPlayerGrid());
        setPlayer2Grid(createPlayerGrid());
    }, []);

    const createPlayerGrid = () => {
        const playerGrid = [];
        for (let i = 0; i < gridHeight * gridWidth; i++) {
            playerGrid.push({
                id: i + 1,
                veggieSymbol: "",
            });
        }
        return playerGrid;
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
        if (isPlayer1Turn) {
            setPlayer1Grid(createPlayerGrid());
            setPlayer1Veggies([...veggies]);
            return;
        }
        setPlayer2Grid(createPlayerGrid());
        setPlayer2Veggies([...veggies]);
    };

    return (
        <div className="app">
            <Header
                onHowItWorksClick={openHowItWorks}
                onHighScoresClick={openHighScores}
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
                    />
                )}
            </div>
        </div>
    );
};

export default App;
