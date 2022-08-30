import "./HowItWorks.css";
import playerSelect from "../../assets/screenshots/playerselect.png";
import startGame from "../../assets/screenshots/startgame.png";
import chooseCell from "../../assets/screenshots/choosecell.png";
import fire from "../../assets/screenshots/fire.png";
import veggiesOrAttacking from "../../assets/screenshots/myveggiesorattacking.png";
import placeVeggies from "../../assets/screenshots/placeveggies.png";
import resetConfirm from "../../assets/screenshots/resetorconfirm.png";
import setDirection from "../../assets/screenshots/setdirection.png";

const HowItWorks = ({ onClose }) => {
    return (
        <div className="how-it-works">
            <div className="how-it-works__close" onClick={onClose}>
                &#10060;
            </div>
            <div className="how-it-works__screen">
                <h2 className="how-it-works__title">HowItWorks</h2>
                <ol className="how-it-works__list">
                    <li className="list__item">
                        Choose the number of players{" "}
                        <img
                            alt=""
                            className="list__image"
                            src={playerSelect}
                        />
                    </li>
                    <li className="list__item">
                        Start the game{" "}
                        <img alt="" className="list__image" src={startGame} />
                    </li>
                    <li className="list__item">
                        Choose the direction of your veggies{" "}
                        <img
                            alt=""
                            className="list__image"
                            src={setDirection}
                        />
                    </li>
                    <li className="list__item">
                        Place your veggies{" "}
                        <img
                            alt=""
                            className="list__image"
                            src={placeVeggies}
                        />
                    </li>
                    <li className="list__item">
                        Reset to start again or Confirm{" "}
                        <img
                            alt=""
                            className="list__image"
                            src={resetConfirm}
                        />
                    </li>
                    <li className="list__item">
                        Choose to see your veggies, or attack{" "}
                        <img
                            alt=""
                            className="list__image"
                            src={veggiesOrAttacking}
                        />
                    </li>
                    <li className="list__item">
                        Choose the cell you want to attack{" "}
                        <img alt="" className="list__image" src={chooseCell} />
                    </li>
                    <li className="list__item">
                        Press fire{" "}
                        <img alt="" className="list__image" src={fire} />
                    </li>
                </ol>
            </div>
        </div>
    );
};
export default HowItWorks;
