var airhorn = new Audio(chrome.runtime.getURL("airhorn.mp3"));
airhorn.play();
var skrrrrrr = new Audio(chrome.runtime.getURL("skrrrrrr.mp3"));
skrrrrrr.play();

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

let count = 0;

setTimeout(() => {
  while (walker.nextNode()) {
    let tags = [
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
    ];

    let yolo = ["Skrrrt ", "Skrrrrr ", "Brrr ", "Brrrraaa ", "Skkkk "];

    if (tags.includes(walker.currentNode.tagName)) {
      let x = walker.currentNode.textContent.split(" ");
      let newVal = "";

      x.forEach((n) => {
        let swag = Math.floor(Math.random() * (5 - 1 + 1) + 1) - 1;
        newVal += yolo[swag];
      });

      if (walker.currentNode.tagName === "A") {
        walker.currentNode.textContent = "Skrrrrt Skrrrt";
      }

      if (walker.currentNode.tagName === "BUTTON") {
        walker.currentNode.textContent = "Skrrrrt";
      }

      if (walker.currentNode.tagName === "LI") {
        walker.currentNode.textContent = "Skrrrrt Skrrrt";
      }

      walker.currentNode.textContent = newVal;
    }
  }
}, 240);
