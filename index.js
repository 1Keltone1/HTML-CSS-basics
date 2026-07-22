const audioQ = document.getElementById("Q");
const audioW = document.getElementById("W");
const audioE = document.getElementById("E");
const audioA = document.getElementById("A");
const audioS = document.getElementById("S");
const audioD = document.getElementById("D");
const audioZ = document.getElementById("Z");
const audioX = document.getElementById("X");
const audioC = document.getElementById("C");
const display = document.getElementById("display");

const names = {
    "Q": "Heater 1",
    "W": "Heater 2",
    "E": "Heater 3",
    "A": "Heater 4",
    "S": "Clap",
    "D": "Open-HH",
    "Z": "Kick-n'-Hat",
    "X": "Kick",
    "C": "Closed-HH"
}

const pads = document.querySelectorAll(".drum-pad");
pads.forEach((pad) => {
    pad.addEventListener("click", () => {
        const audio = document.getElementById(pad.innerText);
        audio.play();
        display.innerText = names[pad.innerText];
    });
});

document.addEventListener('keydown', (e) => {
    const id = e.key.toUpperCase()
    if ('QWEASDZXC'.includes(id)){
        const audio = document.getElementById(id);
        audio.play();
        display.innerText = names[id];
    }
})