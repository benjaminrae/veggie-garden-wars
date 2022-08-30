import "./HitOrMiss.css";
import miss from "../../assets/gifs/will-ferrell-the-house.gif";
import hit from "../../assets/gifs/explosion-boom.gif";

const HitOrMiss = ({ isHit, onContinue }) => {
    // const [explosionSound] = useState(
    //     new Audio(
    //         "../../assets/sounds/zapsplat_explosion_big_heavy_dynomite_002_62566.mp3"
    //     )
    // );
    // const [missSound] = useState(
    //     new Audio(
    //         "../../assets/sounds/zapsplat_sound_design_cinematic_whoosh_fast_sudden_thud_vanish_85673.mp3"
    //     )
    // );
    // const [playing, setPlaying] = useState(false);

    // useEffect(() => {
    //     if (!isMuted) {
    //         isHit ? explosionSound.play() : missSound.play();
    //         console.log(explosionSound, missSound);
    //     }
    //     return () => {
    //         setPlaying(false);
    //     };
    // }, [explosionSound, isHit, isMuted, missSound]);

    return (
        <div className="hit-or-miss">
            <div className="hit-or-miss__screen">
                {/* {isHit && explosionSound.play()} */}
                <h2 className="hit-or-miss__title">
                    {isHit ? "HIT! 🔥" : "Miss 💔"}
                </h2>
                <img
                    className="hit-or-miss__gif"
                    src={isHit ? hit : miss}
                    alt=""
                />
                <div className="hit-or-miss__button" onClick={onContinue}>
                    Continue
                </div>
            </div>
        </div>
    );
};

export default HitOrMiss;
