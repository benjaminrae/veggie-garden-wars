import "./HitOrMiss.css";
import miss from "../../assets/gifs/will-ferrell-the-house.gif";
import hit from "../../assets/gifs/explosion-boom.gif";
const HitOrMiss = (props) => {
    return (
        <div className="hit-or-miss">
            <div className="hit-or-miss__screen">
                <h2 className="hit-or-miss__title">
                    {props.isHit ? "HIT! 🔥" : "Miss 💔"}
                </h2>
                <img
                    className="hit-or-miss__gif"
                    src={props.isHit ? hit : miss}
                    alt=""
                />
                <div className="hit-or-miss__button" onClick={props.onContinue}>
                    Continue
                </div>
            </div>
        </div>
    );
};

export default HitOrMiss;
