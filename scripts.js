// Initialize Chart
const ctx = document.getElementById('pieChart').getContext('2d');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Focus Time', 'Break Time', 'Idle Time'],
        datasets: [{
            data: [60, 20, 20],
            backgroundColor: [
                '#8b5cf6',
                '#34d399',
                '#fbbf24'
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Timer functionality
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
const timeDisplay = document.getElementById('time');
const timerButton = document.getElementById('timerButton');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

timerButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        timerButton.textContent = 'Start';
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                timerButton.textContent = 'Start';
                alert('Time is up!');
                timeLeft = 25 * 60;
                updateTimer();
            }
        }, 1000);
        timerButton.textContent = 'Pause';
    }
});

// Chat functionality
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

function addMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '0.5rem';
    messageDiv.style.padding = '0.5rem';
    messageDiv.style.borderRadius = '0.375rem';
    messageDiv.style.maxWidth = '80%';
    messageDiv.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
    messageDiv.style.background = isUser ? '#8b5cf6' : '#e5e7eb';
    messageDiv.style.color = isUser ? 'white' : '#374151';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message);
        messageInput.value = '';
        // Simulate bot response
        setTimeout(() => {
            addMessage('I\'m here to help you stay focused!', false);
        }, 1000);
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Music Player functionality
const playPauseButton = document.getElementById('playPause');
let isPlaying = false;

playPauseButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? '⏸' : '▶';
});