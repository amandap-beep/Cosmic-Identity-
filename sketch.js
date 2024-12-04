let ship;
let stars = [];
let planets = [];
let speed = 0.5;
let quizActive = false;
let currentQuestion = 0;
let introPage = true; // Track if on the intro page
let transition = false; // Track if transitioning between pages
let bgMusicgffj; // Background music

function preload() {
  ship = loadImage("Spaceship.png"); // Spaceship Picture
   // Start background music
  bgMusic = loadSound("Starlight.m4a"); // Load background music 
}

// Questions and answers (Each answer is a different planet)
let questions = [
  {
    question: "What do you value most in life?",
    choices: ["The pursuit of knowledge", "Inner peace", "Embracing creativity", "Being completely yourself"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What is your perfect vacation?",
    choices: ["Learning about different cultures", "Relaxing in nature", "Creating something new", "Having exciting adventures"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you face challenges in your life?",
    choices: ["Research and try to understand", "Stay calm and patient", "Think outside the box", "By taking risks"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "Which part of the galaxy fascinates you the most?",
    choices: ["The mysteries of planets", "The beauty of stars", "The technology", "Exploring the unknown"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What type of music gives you inspiration?",
    choices: ["Classical", "Sounds of nature", "Country", "Rock"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How would you describe your own personality?",
    choices: ["Constantly curious", "Calm", "Creative", "Brave"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What is your dream job?",
    choices: ["Scientist", "Environmentalist", "Artist", "Explorer"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What is your favorite type of movie?",
    choices: ["Documentary", "Fantasy", "Sci-fi", "Adventure"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What kind of books are your favorite to read?",
    choices: ["Non-fiction", "Poetry", "Fiction", "Thrillers"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "Which one of these brings you the most joy?",
    choices: ["Learning new things", "Meditating and yoga", "Creating new things", "Traveling to new places"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you harness your own creativity?",
    choices: ["By writing", "Through walks in nature", "Through your art", "Through team sports"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What is the backbone to the decisions you make?",
    choices: ["By researching more about it", "Through gut intuition", "By thinking through options", "By trying something new"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "Which role do you typically take in a group project?",
    choices: ["The leader", "Happy to be there and support", "Bringing in new ideas", "Risk-taker"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "Which season is your favorite?",
    choices: ["Spring", "Summer", "Autumn", "Winter"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you spend your free time?",
    choices: ["Reading about new things", "Spending time outdoors", "Refining your art", "Playing sports"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What kind of environment do you thrive in?",
    choices: ["Knowledge-rich", "Calm and peaceful", "Creative and vibrant", "Dynamic and adventurous"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What food is your favorite?",
    choices: ["A good balance", "Healthy 'clean' eating", "Loves new options", "Anything spicy"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you recharge your mind?",
    choices: ["Reading", "Meditating", "Creating", "Traveling"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "What makes you passionate?",
    choices: ["Knowledge", "Peace", "Innovation", "Adventure"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you see failure?",
    choices: ["A learning opportunity", "A temporary setback", "A chance to change things up", "An exciting challenge"],
    answers: [0, 1, 2, 3]
  }
];


// Which planet they are
let planetOutcomes = [
  { name: "Planet Curiosus", color: [255, 223, 0], description: "As an inquisitive soul, you would live on Curiosus. \n This planet of discovery always has a new opportunity to learn. \n You are introspective and patient always ready to look \n deeper into the mysteries of life and the universe. \n You appreciate solitude, not for loneliness, \n but for the clarity it brings to your life.\n  On Curiosus, learning is a way of life, \n and it is always the goal to seek the unknown." },
  { name: "Planet Serenia", color: [0, 204, 204], description: "As a person always recentering and finding their \n peace of mind, you would live on Serenia. Time seems to move slower here. \n But that is no bother to its citizens, who are always able \n to savor every moment of being present. Always prioritizing mental wellbeing, \n you typically have introspection at the \n forefront of your mind. \n Serenia is perfect for someone who values inner peace above all else." },
  { name: "Planet Innovatia", color: [255, 127, 80], description: "As an inventor of your own right, \n Innovatia is the perfect planet for you. \n This is where ideas come to life. \n As a city of constant reinvention, it is a testament to those who live there. \n You are someone who aspires for the freedom of creating \n freely. In Innovatia, everyone is a creator and you are able \n to be one with fellow creators where there \n is no limit on what you can create." },
  { name: "Planet Adventurix", color: [255, 0, 127], description: "As a bold spontaneous adventurer, \n the planet perfect for you is Adventurix. \n This place of never-ending excitement always offers thrilling experiences \n at every turn. Its citizens are constantly all about \n seeking the next adrenaline rush and living life to the fullest. \n Adventurix is for those who see life as an \n adventure and who always seek the extraordinary." }
];

let chosenPlanet = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop(); // Loop the background music
  
  // Stars
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(random(width), random(height)));
  }

  // Planets
  for (let i = 0; i < 5; i++) {
    planets.push(new Planet(random(width), random(height), random(50, 150)));
  }
}

// Randomizing questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = floor(random(i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function draw() {
  background(20, 24, 82); // Dark space background

  // Draw Stars
  for (let star of stars) {
    star.move();
    star.pulsate();
    star.show();
  }

  // Draw planets
  for (let planet of planets) {
    planet.move();
    planet.show();
  }
  
 // Make spaceship smaller 
  let shipScale = 0.5; // Change this value to adjust the size (0.5 = 50% smaller)
  
  // Draw spaceship 
  image(ship, width / 2 - ship.width * shipScale / 2, height * 0.8 - ship.height * shipScale / 2, ship.width * shipScale, ship.height * shipScale); // Draw the ship image
  
  // More stars as moving
  if (frameCount % 30 == 0) {
    stars.push(new Star(random(width), -10));
  }

  // More planets as moving
  if (frameCount % 300 == 0 && !quizActive) {
    planets.push(new Planet(random(width), -100, random(50, 150)));
  }

  // Storyline of experience
  if (introPage) {
    displayIntroPage();
  } else if (quizActive) {
    displayQuiz();
  } else if (chosenPlanet !== null) {
    displayOutcome();
  }

  // Stars and Planets off screen 
  stars = stars.filter(star => star.y < height);
  planets = planets.filter(planet => planet.y < height + planet.size);
}

// Spaceship 
class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.8;
    this.size = 50;
  }

  show() {
    push();
    fill(255, 204, 0);
    noStroke();
    triangle(
      this.x, this.y - this.size,
      this.x - this.size / 2, this.y + this.size / 2,
      this.x + this.size / 2, this.y + this.size / 2
    );
    pop();
  }
}

// Stars with pulsing
class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(1, 4); // Base size for the star
    this.size = this.baseSize;
    this.pulseSpeed = random(0.01, 0.05); // Speed of pulsation
    this.pulseFactor = 0; // Control pulsation effect
  }

  move() {
    this.y += speed; // Drift down
  }

  pulsate() {
    this.pulseFactor += this.pulseSpeed;
    this.size = this.baseSize + sin(this.pulseFactor) * 2; // Size pulsing
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}

// Planet 
class Planet {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  move() {
    this.y += speed * 0.5; // Drift slower than stars
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

// Intro page
function displayIntroPage() {
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Cosmic Identity", width / 2, height / 2 - 180);

  textSize(20);
  textAlign(CENTER);
  text(" \n \n The universe is expansive and ever changing. " +
       " \n Trust your feelings, \n and let the stars guide you to your cosmic home.", 
       width / 2, height / 2 - 130);

  // Star Search box
  fill(255);
  rect(width / 2 - 60, height / 2 + 20, 120, 40); // Button rectangle
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Star Search", width / 2, height / 2 + 40); // Button text
}

// Choices
function displayQuiz() {
  let q = questions[currentQuestion];

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(q.question, width / 2, height / 3 - 40);

  for (let i = 0; i < q.choices.length; i++) {
    let buttonX = width / 2 - 120; // Adjust button X position
    let buttonY = height / 3 + i * 50; // Increase space between buttons
    fill(255);
    rect(buttonX, buttonY, 240, 40); // Increase button height

    fill(0);
    textSize(16); // Adjust text size
    textAlign(CENTER, CENTER); // Center text in both directions
    text(q.choices[i], buttonX + 120, buttonY + 20);
  }
}

// Choice answers
function mousePressed() {
  // If on intro page, switch to quiz
  if (introPage) {
    introPage = false; // Move to the quiz page
    quizActive = true; // Activate quiz
    shuffleQuestions(); // Shuffle questions here
    return; // Exit function to avoid further checks
  }

  // In choices 
  if (quizActive) {
    let q = questions[currentQuestion];
    for (let i = 0; i < q.choices.length; i++) {
      let buttonX = width / 2 - 120;
      let buttonY = height / 3 + i * 50;
      if (mouseX > buttonX && mouseX < buttonX + 240 && mouseY > buttonY && mouseY < buttonY + 40) {
        // Update chosen planet based on the answer
        chosenPlanet = q.answers[i];
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          // End of the quiz
          quizActive = false; // Deactivate quiz
          // Display the outcome based on chosenPlanet
          chosenPlanet = planetOutcomes[chosenPlanet]; // Get the planet outcome object
        }
      }
    }
  }
}

// Show which planet (Outcome Page)
function displayOutcome() {
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Your Cosmic Home: " + chosenPlanet.name, width / 2, height / 3 - 40);
  
  textSize(16);
  textAlign(CENTER);
  text(chosenPlanet.description, width / 2, height / 2 + 20);
  
  // Draw Restart button
  fill(255);
  rect(width / 2 - 60, height / 2 + 100, 120, 40); // Restart button rectangle
  
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Restart", width / 2, height / 2 + 120); // Button text
}

// Function to reset game state
function resetGame() {
  introPage = true; // Go back to intro page
  quizActive = false; // Deactivate quiz
  currentQuestion = 0; // Reset question counter
  chosenPlanet = null; // Clear chosen planet
  shuffleQuestions(); // Shuffle questions for new game
}

// Detect button presses
function mousePressed() {
  // If on intro page, switch to quiz
  if (introPage) {
    introPage = false; // Move to the quiz page
    quizActive = true; // Activate quiz
    shuffleQuestions(); // Shuffle questions here
    return; // Exit function to avoid further checks
  }

  // Check if a choice is clicked 
  if (quizActive) {
    let q = questions[currentQuestion];
    for (let i = 0; i < q.choices.length; i++) {
      let buttonX = width / 2 - 120;
      let buttonY = height / 3 + i * 50;
      if (mouseX > buttonX && mouseX < buttonX + 240 && mouseY > buttonY && mouseY < buttonY + 40) {
        // Update planet
        chosenPlanet = q.answers[i];
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          // End of the quiz
          quizActive = false; // Deactivate quiz
          // Display the outcome based on chosenPlanet
          chosenPlanet = planetOutcomes[chosenPlanet]; // Get the planet outcome object
        }
      }
    }
  }

  // Restart button 
  if (chosenPlanet !== null) {
    let buttonX = width / 2 - 60;
    let buttonY = height / 2 + 100;
    if (mouseX > buttonX && mouseX < buttonX + 120 && mouseY > buttonY && mouseY < buttonY + 40) {
      resetGame(); // Reset the game if restart button is clicked
    }
  }
}
