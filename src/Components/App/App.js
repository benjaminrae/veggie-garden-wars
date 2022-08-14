import "./App.css";
import GameGrid from "../GameGrid/GameGrid";
import Header from "../Header/Header";
import { useState } from "react";

const App = () => {
    const [gridHeight, setGridHeight] = useState(10);
    const [gridWidth, setGridWidth] = useState(10);

    return (
        <div className="app">
            <Header />
            <GameGrid height={gridHeight} width={gridWidth} />
        </div>
    );
};

export default App;
