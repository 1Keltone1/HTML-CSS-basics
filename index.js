const shuffledFragments = [
  { id: 15, text: "and, after a time, passed the place where the Hare was sleeping." },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 11, text: "and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare," },
  { id: 7, text: "but for the fun of the thing he agreed." },
  { id: 19, text: "The Hare now ran his swiftest," },
  ,
  { id: 1, text: "A Hare was making fun of the Tortoise one day for being so slow." },
  { id: 14, text: "The Tortoise meanwhile kept going slowly but steadily," },
  { id: 9, text: "marked the distance and started the runners off." },
  ,
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 17, text: "and when at last he did wake up," },
  { id: 2, text: '"Do you ever get anywhere?" he asked with a mocking laugh.' },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 8, text: "So the Fox, who had consented to act as judge," },
  { id: 20, text: "but he could not overtake the Tortoise in time." },
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 6, text: "The Hare was much amused at the idea of running a race with the Tortoise," },
  ,
  { id: 13, text: "until the Tortoise should catch up." },
  { id: 10, text: "The Hare was soon far out of sight," },
  { id: 12, text: "he lay down beside the course to take a nap" },
  { id: 18, text: "the Tortoise was near the goal." },
];

function compactFragments(arr) {
  let isCompact = false;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined) {
      result.push(arr[i]);
    } else {
      isCompact = true;
    }
  }
  if (isCompact) {
    console.log("[COMPACTED]");
  }
  return result;
}

const compactedShuffledFragments = compactFragments(shuffledFragments);

function sortFragments(arr) {
  let result = [...arr.slice()];
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j].id > result[j + 1].id) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
}

const sortedFragments = sortFragments(compactedShuffledFragments);

function dedupeFragments(arr) {
  let ids = [];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!ids.includes(arr[i].id)) {
      ids.push(arr[i].id);
      result.push(arr[i]);
    } else {
      console.log(`[DEDUPED] ${arr[i].id}`)
    }
  }
  return result;
}

const dedupedFragments = dedupeFragments(sortedFragments);

function fillMissingFragments(arr) {
  let result = [];
  let nextId = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == nextId) {
      result.push(arr[i]);
      nextId++;
    } else {
      if (i < arr.length) {
        for (let k = nextId; k < arr[i].id; k++) {
          result.push({id: k, text: "[...]"});
          nextId++;
          console.log(`[FILLED] ${k}`);
        }
      }
    }
  }
  if (result[result.length - 1].id != arr[arr.length - 1].id) {
    result.push(arr[arr.length - 1]);
  }
  return result;
}

const filledFragments = fillMissingFragments(dedupedFragments);

function assembleStory(arr) {
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].text + "\n";
  }
  return result.slice(0, -1);
}

console.log(assembleStory(filledFragments));
console.log(JSON.stringify(fillMissingFragments([{ id: 1, text: "a" }, { id: 3, text: "c" }])));
console.log(assembleStory([{ id: 1, text: "Hello" }, { id: 2, text: "World" }]));