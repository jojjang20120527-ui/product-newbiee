class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: ${color};
                }
            </style>
            <div>${number}</div>
        `;
    }

    getColor(number) {
        const num = parseInt(number, 10);
        if (num <= 10) return '#fbc400';
        if (num <= 20) return '#69c8f2';
        if (num <= 30) return '#ff7272';
        if (num <= 40) return '#aaa';
        return '#b0d840';
    }
}

customElements.define('lotto-ball', LottoBall);

// Lotto Generation Logic
document.getElementById('generate').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();

    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    [...numbers].sort((a, b) => a - b).forEach(number => {
        const ball = document.createElement('lotto-ball');
        ball.setAttribute('number', number);
        numbersContainer.appendChild(ball);
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    
    localStorage.setItem('theme', theme);
});
