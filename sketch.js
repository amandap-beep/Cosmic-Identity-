let ship;
let stars = [];
let planets = [];
let speed = 0.5;
let quizActive = false;
let currentQuestion = 0;
let introPage = true; // To track if we are on the introduction page
let transition = false; // Track if transitioning between pages

function preload() {
  ship = loadImage("Spaceship.png"); // Load your image
}

// Questions and answers for the quiz
let questions = [
  {
    question: "What do you value most in life?",
    choices: ["Knowledge", "Peace", "Creativity", "Adventure"],
    answers: [0, 1, 2, 3] // Each answer corresponds to a planet
  },
  {
    question: "What describes your ideal vacation?",
    choices: ["Exploring new worlds", "Relaxing in nature", "Creating something new", "Thrilling expeditions"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "How do you face challenges?",
    choices: ["Research and understand", "Stay calm and patient", "Think outside the box", "Embrace risks"],
    answers: [0, 1, 2, 3]
  },
  {
    question: "Which aspect of the cosmos fascinates you the most?",
    choices: ["Planets and their mysteries", "The beauty of stars", "Innovative technologies", "The thrill of exploration"],
    answers: [0, 1, 2, 3]
  }
];

// Planet outcomes with colors
let planetOutcomes = [
  { name: "Planet Curiosus", color: [255, 223, 0], description: "A world of endless exploration and discovery." },
  { name: "Planet Serenia", color: [0, 204, 204], description: "A tranquil planet filled with serene beauty." },
  { name: "Planet Innovatia", color: [255, 127, 80], description: "A vibrant planet where creativity thrives." },
  { name: "Planet Adventurix", color: [255, 0, 127], description: "A dynamic planet of thrilling adventures." }
];

let chosenPlanet = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Generate initial stars
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(random(width), random(height)));
  }

  // Generate some initial planets
  for (let i = 0; i < 5; i++) {
    planets.push(new Planet(random(width), random(height), random(50, 150)));
  }
}

function draw() {
  background(20, 24, 82); // Dark space background

  // Draw stars
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
  
 // Scale the spaceship down by 50%
  let shipScale = 0.5; // Change this value to adjust the size (0.5 = 50% smaller)
  
  
  // Draw spaceship with scaling
  image(ship, width / 2 - ship.width * shipScale / 2, height * 0.8 - ship.height * shipScale / 2, ship.width * shipScale, ship.height * shipScale); // Draw the ship image
  
  // Add more stars as they drift
  if (frameCount % 30 == 0) {
    stars.push(new Star(random(width), -10));
  }

  // Add more planets occasionally
  if (frameCount % 300 == 0 && !quizActive) {
    planets.push(new Planet(random(width), -100, random(50, 150)));
  }

  // Display content based on the current page
  if (introPage) {
    displayIntroPage();
  } else if (quizActive) {
    displayQuiz();
  } else if (chosenPlanet !== null) {
    displayOutcome();
  }

  // Remove stars and planets off the screen
  stars = stars.filter(star => star.y < height);
  planets = planets.filter(planet => planet.y < height + planet.size);
}

// Spaceship class
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

// Star class with pulsating effect
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
    this.size = this.baseSize + sin(this.pulseFactor) * 2; // Size oscillates between baseSize and baseSize + 2
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}

// Planet class
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

// Display introduction page
function displayIntroPage() {
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Galactic Belonging Quiz", width / 2, height / 2 - 180);

  textSize(20);
  textAlign(CENTER);
  text("Discover which unique planet in the galaxy you belong to! " +
       "Answer the following questions honestly, and let the stars guide you to your cosmic home.", 
       width / 2, height / 2 - 130);

  // Star Search Button
  fill(255);
  rect(width / 2 - 60, height / 2 + 20, 120, 40); // Button rectangle
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Star Search", width / 2, height / 2 + 40); // Button text
}

// Display quiz overlay
function displayQuiz() {
  let q = questions[currentQuestion];

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(q.question, width / 2, height / 2 - 40);

  for (let i = 0; i < q.choices.length; i++) {
    let buttonX = width / 2 - 120; // Adjust button X position
    let buttonY = height / 2 + i * 50; // Increase space between buttons
    fill(255);
    rect(buttonX, buttonY, 240, 40); // Increase button height

    fill(0);
    textSize(16); // Adjust text size
    textAlign(CENTER, CENTER); // Center text in both directions
    text(q.choices[i], buttonX + 120, buttonY + 20);
  }
}

// Handle mouse clicks for quiz answers
function mousePressed() {
  // If on intro page, switch to quiz
  if (introPage) {
    introPage = false; // Move to the quiz page
    quizActive = true; // Activate quiz
    return; // Exit function to avoid further checks
  }

  // If in quiz mode
  if (quizActive) {
    let q = questions[currentQuestion];
    for (let i = 0; i < q.choices.length; i++) {
      let buttonX = width / 2 - 120;
      let buttonY = height / 2 + i * 50;
      if (mouseX > buttonX && mouseX < buttonX + 240 && mouseY > buttonY && mouseY < buttonY + 40) {
        // Track the user's planet choice based on the selected answer
        let planetIndex = q.answers[i];
        currentQuestion++; // Move to the next question
        if (currentQuestion >= questions.length) {
          chosenPlanet = planetIndex; // Set the chosen planet
          quizActive = false; // End quiz when all questions are answered
        }
        return; // Exit to avoid processing more clicks
      }
    }
  }

  // If displaying outcome, allow restarting the quiz
  if (chosenPlanet !== null) {
    let buttonX = width / 2 - 60;
    let buttonY = height / 2 + 80;
    if (mouseX > buttonX && mouseX < buttonX + 120 && mouseY > buttonY && mouseY < buttonY + 40) {
      // Reset variables to restart the quiz
      currentQuestion = 0;
      chosenPlanet = null;
      quizActive = false;
      introPage = true; // Go back to the introduction page
    }
  }
}

// Display the outcome based on user answers
function displayOutcome() {
  let planet = planetOutcomes[chosenPlanet];

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Your Cosmic Home: " + planet.name, width / 2, height / 2 - 40);
  
  fill(planet.color);
  textSize(20);
  text(planet.description, width / 2, height / 2 + 20);
  
  // Button to restart the quiz
  fill(255);
  rect(width / 2 - 60, height / 2 + 80, 120, 40);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Restart Quiz", width / 2, height / 2 + 100);
}

// Window resize function to adjust canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Continue with the rest of the code...


