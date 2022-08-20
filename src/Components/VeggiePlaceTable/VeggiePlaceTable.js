import "./VeggiePlaceTable.css";

const VeggiePlaceTable = (props) => {
    const handleVeggieSelection = (event) => {
        console.log(event);
        const playerVeggies = [...props.playerVeggies];
        playerVeggies.forEach((veggie) =>
            veggie.veggieSymbol === event.target.id
                ? (veggie.isSelected = true)
                : (veggie.isSelected = false)
        );
        console.log(playerVeggies);
        props.onUpdateVeggies([...playerVeggies]);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Vegetable</th>
                    <th>Placed?</th>
                </tr>
            </thead>
            <tbody>
                {props.playerVeggies.map((veggie, index) => {
                    return (
                        <tr key={index}>
                            <td
                                className={
                                    veggie.isSelected
                                        ? "veggie-selected"
                                        : "vegetable-name"
                                }
                                onClick={handleVeggieSelection}
                                id={veggie.veggieSymbol}
                            >
                                {`${veggie.veggieSymbol} (${veggie.spaces})`}
                            </td>
                            <td>{veggie.isPlaced ? "✅" : "❌"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default VeggiePlaceTable;
