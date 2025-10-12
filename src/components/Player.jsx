
function Player({ score = 99, prenom = "Landy" }) {
    const isWin = score >= 100;
    const message = `${prenom}, votre score est de ${score}, vous avez ${isWin ? "gagné" : "perdu"} !`;

    return (
        <div>
            <h1>Player Component</h1>
            <p style={{ color: isWin ? "green" : "red" }}>
                {message}
            </p>
        </div>
    );
}

export default Player;