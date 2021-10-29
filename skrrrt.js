var airhorn = new Audio(chrome.runtime.getURL("sounds/airhorn.mp3"));
var skrrrrrr = new Audio(chrome.runtime.getURL("sounds/skrrrrrr.mp3"));
skrrrrrr.play();
airhorn.play();

let walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode: function (node) {
      return NodeFilter.FILTER_ACCEPT;
    },
  },
  false
);

function wordToSkrt(arg) {
  let hasDot = false
  let hasCapitalLetter = false
  const word = arg.split('')
  if( word === undefined && word === null) return

  const wordLength = word.length

  if(word[wordLength-1] === '.') hasDot = true
  if(word[0] === word[0].toUpperCase()) hasCapitalLetter = true

  if (wordLength === 1 || !wordLength) return arg
  if (wordLength === 2 && hasCapitalLetter) return "Sk"
  if (wordLength === 2 && !hasCapitalLetter) return "sk"
  if (wordLength === 3 && hasCapitalLetter) return "Skr"
  if (wordLength === 3 && !hasCapitalLetter) return "skr"
  if (wordLength === 4 && hasCapitalLetter && hasDot) return "Skr."
  if (wordLength === 4 && hasCapitalLetter && !hasDot) return "Skrt"
  if (wordLength === 4 && !hasCapitalLetter && hasDot) return "skr."
  if (wordLength === 4 && !hasCapitalLetter && !hasDot) return "skrt"


  const first = hasCapitalLetter ? "Sk" : "sk"
  const last = hasDot ? "t." : "t"
  const middle = "r"

  const middleMultiplier = wordLength - (first.length + last.length)
  const replacementStr = first + middle.repeat(middleMultiplier) + last

  return replacementStr
}

const tags = [
  "P",
  "SPAN",
  "INPUT",
  "LABEL",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "TD",
  "A",
  "LI",
];


while (walker.nextNode()) {
  const node = walker.currentNode;

  if (tags.includes(node.tagName)) {
    const words = node.textContent.trim().split(" ");
    let replacementText = ''

    words.forEach((word) => {
      if (word && word !== undefined) {
        replacementText+= " " + wordToSkrt(word)
      } 
    });

    node.textContent = replacementText;
  }

  if (node.tagName === "BUTTON") {
    node.textContent = "Skrrrrt";
  }
}

