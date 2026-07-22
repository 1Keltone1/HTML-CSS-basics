const poll = new Map();

function addOption(option) {
  if (!option) {
    return "Option cannot be empty.";
  } else if (!poll.has(option)) {
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
  } else {
    return `Option "${option}" already exists.`;
  }
}

function vote(option, voterId) {
  let voted = false;
  let voteOption = '';
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`
  } else {
    poll.forEach((value, key) => {
      if (value.has(voterId)) {
        voted = true;
        voteOption = key;
      }
    });
    if (voted) {
      return `Voter ${voterId} has already voted for "${voteOption}".`
    } else {
      poll.get(option).add(voterId);
      return `Voter ${voterId} voted for "${option}".`
    }
  }
}

function displayResults() {
  let result = `Poll Results:`;
  poll.forEach((value, key) => {
    result += `\n${key}: ${value.size} votes`;
  })
  return result;
}

console.log(addOption("Turkey"));
console.log(addOption("Morocco"));
console.log(addOption("Spain"));
console.log(vote("Turkey", "traveler1"));
console.log(vote("Morocco", "traveler2"));
console.log(vote("Turkey", "traveler3"));
console.log(displayResults());