import "./CropPlaceTable.css";

const CropPlaceTable = (props) => {
    const handleCropSelection = (event) => {
        console.log(event);
        const playerCrops = [...props.playerCrops];
        playerCrops.forEach((crop) =>
            crop.cropSymbol === event.target.id
                ? (crop.isSelected = true)
                : (crop.isSelected = false)
        );
        console.log(playerCrops);
        props.onUpdateCrops([...playerCrops]);
    };

    const tableHeader = (
        <>
            <tr>
                <th>Vegetable</th>
                <th>Placed?</th>
            </tr>
        </>
    );

    const tableContent = props.playerCrops.map((crop, index) => {
        return (
            <tr key={index}>
                <td
                    className={
                        crop.isSelected ? "crop-selected" : "vegetable-name"
                    }
                    onClick={handleCropSelection}
                    id={crop.cropSymbol}
                >
                    {`${crop.cropSymbol} (${crop.spaces})`}
                </td>
                <td>{crop.isPlaced ? "✅" : "❌"}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>{tableHeader}</thead>
            <tbody>{tableContent}</tbody>
        </table>
    );
};

export default CropPlaceTable;
