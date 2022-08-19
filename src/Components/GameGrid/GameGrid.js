import "./GameGrid.css";
import { useState, useEffect } from "react";

const GameGrid = (props) => {
    const [selectedCellId, setSelectedCellId] = useState("");
    const [cellDifference, setCellDifference] = useState({});

    useEffect(() => {
        setCellDifference({
            [props.buttonDirections[0].direction]: props.height * -1,
            [props.buttonDirections[1].direction]: props.height,
            [props.buttonDirections[2].direction]: -1,
            [props.buttonDirections[3].direction]: 1,
        });
    }, []);

    const handleCellClick = (event) => {
        event.preventDefault();
        const playerVeggies = props.playerVeggies;
        if (props.arePlayerVeggiesPlaced) {
            event.target.classList.add("game-grid__cell--red");
        } else {
            fillCellsWithVeggies(props.currentVeggie, event);
        }
        const newPlayerVeggies = playerVeggies.map((veggie, index) => {
            if (veggie.veggieName === props.currentVeggie.veggieName) {
                veggie.isSelected = false;
                veggie.isPlaced = true;
            }
            return veggie;
        });
        props.onUpdateVeggies(newPlayerVeggies);
    };

    const fillCellsWithVeggies = (currentVeggie, event) => {
        let playerGrid = props.playerGrid;
        const targetId = +event.target.id;
        if (targetId === selectedCellId) {
        } else {
            setSelectedCellId(+event.target.id);
        }

        for (let i = 0; i < currentVeggie.spaces; i++) {
            playerGrid = playerGrid.map((cell) => {
                if (
                    cell.id ===
                    targetId +
                        i *
                            cellDifference[
                                props.buttonDirections.find(
                                    (direction) => direction.isSelected
                                ).direction
                            ]
                ) {
                    cell.veggieSymbol = currentVeggie.veggieSymbol;
                }
                return cell;
            });
        }

        props.onPlayerGridChange(playerGrid);
    };

    return (
        <div className="game-grid">
            {props.playerGrid.map((cell) => (
                <div
                    className="game-grid__cell"
                    key={cell.id}
                    onClick={handleCellClick}
                    id={cell.id}
                >
                    {cell.id}
                    <div className="game-grid__inner-cell">
                        {cell.veggieSymbol}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
