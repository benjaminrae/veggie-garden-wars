import "./GameGrid.css";

const GameGrid = ({ height, width }) => {
    const gridElements = [];
    for (let i = 0; i < height * width; i++) {
        gridElements.push(i + 1);
    }

    const handleCellClick = (event) => {
        event.preventDefault();
        event.target.classList.add("game-grid__cell--red");
    };

    return (
        <div className="game-grid">
            {gridElements.map((element, index) => (
                <div
                    className="game-grid__cell"
                    key={index}
                    onClick={handleCellClick}
                >
                    {element}
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
