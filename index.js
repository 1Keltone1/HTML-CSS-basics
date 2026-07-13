const footballTeam = {
  team: "Spain",
  year: 2026,
  headCoach: "Luis de la Fuente",
  players: [
    {
      name: "David Raya",
      position: "goalkeeper",
      isCaptain: false
    },
    {
      name: "Joan Garcia",
      position: "goalkeeper",
      isCaptain: false
    },
    {
      name: "Unai Simon",
      position: "goalkeeper",
      isCaptain: true
    }, 
    {
      name: "Marc Pubill",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Alex Grimaldo",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Eric Garcia",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Marcos Llorente",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Pedro Porro",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Pau Cubarsi",
      position: "defender",
      isCaptain: false
    }, 
    {
      name: "Mikel Merino",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Fabian Ruiz",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Gavi",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Alex Baena",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Rodri",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Martin Zubimendi",
      position: "midfielder",
      isCaptain: false
    }, 
    {
      name: "Ferran Torres",
      position: "forward",
      isCaptain: false
    }, 
    {
      name: "Dani Olmo",
      position: "forward",
      isCaptain: false
    }, 
    {
      name: "Yeremy Pino",
      position: "forward",
      isCaptain: false
    }, 
    {
      name: "Nico Williams",
      position: "forward",
      isCaptain: false
    }, 
    {
      name: "Lamine Yamal",
      position: "forward",
      isCaptain: false
    }, 
    {
      name: "Mikel Oyarzabal",
      position: "forward",
      isCaptain: false
    }
  ]
}

const coach = document.getElementById("head-coach");
const team = document.getElementById("team");
const year = document.getElementById("year");

coach.textContent = footballTeam.headCoach;
team.textContent = footballTeam.team;
year.textContent = footballTeam.year;

const strings = [];
for (const player of footballTeam.players) {
  if (player.isCaptain) {
    strings.push(
      `<div class="player-card">
        <h2>${player.name}(Captain)</h2>
        <p>Position:${player.position}
      </div>`
    );
  } else {
    strings.push(
      `<div class="player-card">
        <h2>${player.name}</h2>
        <p>Position:${player.position}
      </div>`
    );
  }
}

const container = document.getElementById("player-cards");
container.innerHTML = strings.join("\n");

const selector = document.getElementById("players");
selector.addEventListener("change", () => {
  showPlayers(selector.value);
})

function showPlayers(option) {
  if (option === "all") {
    container.innerHTML = strings.join("\n");
  } else {
    const result = [];
    for (const player of footballTeam.players) {
      if (player.position === option) {
        if (player.isCaptain) {
          result.push(
            `<div class="player-card">
              <h2>${player.name}(Captain)</h2>
              <p>Position:${player.position}
            </div>`
          );
        } else {
          result.push(
            `<div class="player-card">
              <h2>${player.name}</h2>
              <p>Position:${player.position}
            </div>`
          );
        }
      }
    }
    container.innerHTML = result.join("\n");
  }
}