const container = document.getElementById("array-container");
const generateButton = document.getElementById("generate");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const explanation = document.getElementById("explanation");
const progressBar = document.getElementById("progress");

let array = [];
let delay = 300;
let isPaused = false;

// Generate Random Array
function generateArray() {
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 150) + 10);
  renderArray();
  explanation.textContent = "Click 'Start Sorting' to begin!";
  updateProgress(0);
}

// Render Array
function renderArray() {
  container.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    bar.style.width = "20px";
    bar.textContent = value;
    container.appendChild(bar);
  });
}

// Update Progress Bar
function updateProgress(percent) {
  progressBar.style.width = `${percent}%`;
}

// Delay Animation
function delayAnimation(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Insertion Sort Visualization
async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    explanation.textContent = `Pass #${i}: Moving ${key} to its correct position.`;
    bars[i].classList.add("active");

    await delayAnimation(delay);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      bars[j + 1].textContent = array[j + 1];
      j--;
      await delayAnimation(delay);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[j + 1].textContent = key;
    bars[i].classList.remove("active");
    bars[j + 1].classList.add("sorted");

    updateProgress(((i + 1) / array.length) * 100);
  }

  explanation.textContent = "Sorting complete! The array is fully sorted.";
}

// Event Listeners
generateButton.addEventListener("click", generateArray);
startButton.addEventListener("click", () => {
  isPaused = false;
  insertionSort();
});
pauseButton.addEventListener("click", () => (isPaused = true));
resumeButton.addEventListener("click", () => (isPaused = false));

// Initialize
generateArray();
