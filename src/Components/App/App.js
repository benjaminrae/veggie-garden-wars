import "./App.css";
import GameGrid from "../GameGrid/GameGrid";
import { useState } from "react";

const App = () => {
    const [gridHeight, setGridHeight] = useState(10);
    const [gridWidth, setGridWidth] = useState(10);
    return (
        <>
            <GameGrid height={gridHeight} width={gridWidth} />
        </>
    );
};

export default App;
