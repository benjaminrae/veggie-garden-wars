import "./App.css";
import GameGrid from "../GameGrid/GameGrid";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import { useState } from "react";

const App = () => {
    const [gridHeight, setGridHeight] = useState(10);
    const [gridWidth, setGridWidth] = useState(10);
    const [isVersusCPU, setIsVersusCPU] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showPlayer1Grid, setShowPlayer1Grid] = useState(false);

    const handlePlayerSelect = (numberOfPLayers) => {
        setIsVersusCPU(numberOfPLayers === 1);
    };

    const startGame = () => {
        setShowWelcome(false);
        setShowPlayer1Grid(true);
    };

    return (
        <div className="app">
            <Header />

            <div className="app__main-container">
                {showWelcome && (
                    <Welcome
                        onPlayerSelect={handlePlayerSelect}
                        onStartGame={startGame}
                    />
                )}
                {showPlayer1Grid && (
                    <GameGrid height={gridHeight} width={gridWidth} />
                )}
            </div>
        </div>
    );
};

export default App;
