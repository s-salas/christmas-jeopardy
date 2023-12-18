const categories = ["Characters", "Movies", "Music", "Grandma", "Disney/Pixar"];
const questions = [
  [
    // Characters
    "What are Frosty the Snowman's eyes made of?", // Coal
    "How many reindeer does Santa have?", // 9
    "Who spies on naughty kids and reports them to Santa?", // Elf on the Shelf
    "Which reindeer shares a name with a household cleaner?", // Comet
    'This football (soccer) award given to The Best FIFA Men\'s Player is French for "Golden Ball."', // What is the Ballon d'Or?
  ],
  [
    // Movies
    "In A Christmas Story, what does Ralphie want for Christmas?", // A Red Ryder BB gun
    "What Christmas song do the Plastics perform in Mean Girls?", // Jingle Bell Rock
    "In It's A Wonderful Life, what happens every time a bell rings?", // An angel gets its wings
    "In the Christmas classic Die Hard, what's the name of the building that gets taken over by terrorists?", // Nakatomi Plaza
    "This man invented Python.", // Who is Guido van Rossum?
  ],
  [
    // Music
    "13x9", // What is 117?
    "This shape has 8 sides.", // What is an octagon?
    "The interior angle of a hexagon.", // What is 120 degrees?
    "These are the first 5 prime numbers.", // What are 2, 3, 5, 7, 11?
    "2 to the 8th power", // What is 256?
  ],
  [
    // Grandma
    "This artist played Sicko Mode at the Super Bowl.", // Who is Travis Scott?
    "Lil Nas X got his Cowboy Hat from this fashion store.", // What is Gucci?
    "This is Weezy F. Baby's last name.", // What is Carter?
    "You must sell this many albums to go platinum.", // What is 1 million albums?
    "This is the highest paid artist of 2018 making $118 million.", // Who is U2?
  ],
  [
    // Disney/Pixar
    "Even miracles take a little time.", // Who is the Fairy Godmother from Cinderella?
    "Ohana means family. Family means no one gets left behind.", // Who is Lilo from Lilo and Stitch?
    "You're braver than you believe, and stronger than you seem, and smarter than you think.", // Who is Winnie the Pooh?
    "The problem is not the problem. The problem is your attitude about the problem.", // Who is Jack Sparrow from Pirates of the Caribbean?
    "You control your destiny -- you don't need magic to do it. And there are no magical shortcuts to solving your problems.", // Who is Merida from Brave?
  ],
];
const teams = [
  ["Team 1", 0],
  ["Team 2", 0],
  ["Team 3", 0],
  ["Team 4", 0],
];

function setupBoard() {
  for (let i = 0; i < categories.length; i++) {
    let col = document.createElement("div");
    col.className = "col-sm text-center";
    let card = document.createElement("div");
    card.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    const header = document.createElement("h2");
    const headerText = document.createTextNode(categories[i]);
    header.appendChild(headerText);

    const list = document.createElement("ul");
    list.className = "list-group list-group-flush";
    for (let j = 0; j < questions[i].length; j++) {
      const link = document.createElement("a");
      link.setAttribute("href", "");
      link.setAttribute("data-toggle", "modal");
      link.setAttribute("data-target", "#questionModal");
      link.setAttribute("data-category", i.toString());
      link.setAttribute("data-money", ((j + 1) * 100).toString());
      link.setAttribute("data-questionid", j.toString());
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      const amount = document.createTextNode("$" + (j + 1) * 100);
      listItem.appendChild(amount);

      list.append(link);
      link.append(listItem);
    }

    $("#gameBoard").append(col);
    col.append(card);
    card.append(cardHeader);
    cardHeader.append(header);
    card.append(list);
  }
}

function setScoreboard() {
  $("#scoreboard").empty();
  teams.forEach(function (team) {
    let s = "<p>" + team[0] + ": $" + team[1] + "</p>";
    $("#scoreboard").append(s);
  });
}

function nextQuestion() {
  $("#questionModal").modal("hide");
  setScoreboard();
}

$(document).ready(function () {
  let category = "";
  let money = "";
  let questionid = "";

  setupBoard();
  setScoreboard();

  $("a").click(function () {
    $(this).addClass("isDisabled");
    $(this).children().addClass("disabled");
  });

  $("#questionModal").on("shown.bs.modal", function (event) {
    let link = $(event.relatedTarget);
    category = link.data("category");
    money = link.data("money");
    questionid = link.data("questionid");

    let modal = $(this);
    modal.find(".modal-title").text(categories[category] + " for $" + money);
    modal.find(".modal-body p").text(questions[category][questionid]);
  });

  $("#team-1").click(function () {
    teams[0][1] += parseInt(money);
    nextQuestion();
  });

  $("#team-2").click(function () {
    teams[1][1] += parseInt(money);
    nextQuestion();
  });

  $("#team-3").click(function () {
    teams[2][1] += parseInt(money);
    nextQuestion();
  });

  $("#team-4").click(function () {
    teams[3][1] += parseInt(money);
    nextQuestion();
  });

  $("#incorrect").click(function () {
    nextQuestion();
  });
});
