const lottoNumbersDiv = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// Theme handling logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

themeToggleBtn.addEventListener('click', toggleTheme);
initTheme();

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 7) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const numbersArray = Array.from(numbers);
    const mainNumbers = numbersArray.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = numbersArray[6];

    lottoNumbersDiv.innerHTML = ''; // Clear previous numbers
    
    // Add main numbers
    for (const number of mainNumbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        lottoNumbersDiv.appendChild(numberDiv);
    }

    // Add plus sign
    const plusSpan = document.createElement('span');
    plusSpan.classList.add('plus-sign');
    plusSpan.textContent = '+';
    lottoNumbersDiv.appendChild(plusSpan);

    // Add bonus number
    const bonusDiv = document.createElement('div');
    bonusDiv.classList.add('number', 'bonus');
    bonusDiv.textContent = bonusNumber;
    lottoNumbersDiv.appendChild(bonusDiv);
}

generateBtn.addEventListener('click', generateNumbers);

// Generate numbers on initial load
generateNumbers();