import "./App.css";
import GameGrid from "../GameGrid/GameGrid";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import HideScreen from "../HideScreen/HideScreen";
import HowItWorks from "../HowItWorks/HowItWorks";
import { useState, useEffect } from "react";
import HighScores from "../HighScores/HighScores";
import GameScreen from "../GameScreen/GameScreen";

const crops = [
    {
        cropName: "Carrots",
        cropSymbol: "🥕",
        spaces: 5,
        isPlaced: false,
        isSelected: true,
        cells: [],
    },
    {
        cropName: "Onions",
        cropSymbol: "🧅",
        spaces: 4,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        cropName: "Potatoes",
        cropSymbol: "🥔",
        spaces: 3,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        cropName: "Corn",
        cropSymbol: "🌽",
        spaces: 3,
        isPlaced: false,
        isSelected: false,
        cells: [],
    },
    {
        cropName: "Broccoli",
        cropSymbol: "🥦",
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
    const [arePlayer1CropsPlaced, setArePlayer1CropsPlaced] = useState(false);
    const [arePlayer2CropsPlaced, setArePlayer2CropsPlaced] = useState(false);
    const [player1Crops, setPlayer1Crops] = useState([...crops]);
    const [player2Crops, setPlayer2Crops] = useState([...crops]);
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
                cropSymbol: "",
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

    const updatePlayerCropSelection = (newCrops) => {
        isPlayer1Turn
            ? setPlayer1Crops([...newCrops])
            : setPlayer2Crops([...newCrops]);
    };

    const updatePlayerGrid = (newPlayerGrid) => {
        isPlayer1Turn
            ? setPlayer1Grid(newPlayerGrid)
            : setPlayer2Grid(newPlayerGrid);
    };

    const onResetGridAndPlacement = () => {
        if (isPlayer1Turn) {
            setPlayer1Grid(createPlayerGrid());
            setPlayer1Crops([...crops]);
            return;
        }
        setPlayer2Grid(createPlayerGrid());
        setPlayer2Crops([...crops]);
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
                        arePlayerCropsPlaced={
                            isPlayer1Turn
                                ? arePlayer1CropsPlaced
                                : arePlayer2CropsPlaced
                        }
                        playerCrops={
                            isPlayer1Turn ? player1Crops : player2Crops
                        }
                        playerGrid={isPlayer1Turn ? player1Grid : player2Grid}
                        onUpdateCrops={updatePlayerCropSelection}
                        onPlayerGridChange={updatePlayerGrid}
                        onReset={onResetGridAndPlacement}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
