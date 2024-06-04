function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});

        function updateCountdown() {
            const endDate = new Date("2024-06-24T00:00:00").getTime();
            const now = new Date().getTime();
            const distance = endDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = `Countdown to UAE National Finals: ${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(interval);
                document.getElementById("countdown").innerHTML = "The event has ended.";
            }
        }

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        // Scroll Progress Bar
        document.addEventListener("scroll", function() {
            const timeline = document.querySelector(".timeline");
            const progressBar = document.getElementById("progress-bar");
            const totalHeight = timeline.scrollHeight - window.innerHeight;
            const scrollHeight = window.scrollY;
            const scrollPercentage = (scrollHeight / totalHeight) * 100;
            const today = new Date().toISOString().split('T')[0];

            progressBar.style.height = `${Math.min(scrollPercentage, getScrollPercentageToCurrentDate())}%`;
        });

        function getScrollPercentageToCurrentDate() {
            const timelineItems = document.querySelectorAll(".timeline-item");
            const today = new Date();
            let totalItems = timelineItems.length;
            let currentItemIndex = 0;

            timelineItems.forEach((item, index) => {
                const itemDate = new Date(item.getAttribute("data-date"));
                if (itemDate <= today) {
                    currentItemIndex = index + 1;
                }
            });

            return (currentItemIndex / totalItems) * 100;
        }

        // Modal functionality
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modal-title");
        const modalDate = document.getElementById("modal-date");
        const modalDescription = document.getElementById("modal-description");
        const closeModal = document.getElementsByClassName("close")[0];

        document.querySelectorAll(".timeline-item").forEach(item => {
            item.addEventListener("click", () => {
                modalTitle.textContent = item.querySelector("h3").textContent;
                modalDate.textContent = `Date: ${item.getAttribute("data-date")}`;
                modalDescription.textContent = "Description of the event"; // Add more details as needed
                modal.style.display = "block";
            });
        });

        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        document.getElementById('open-chat').addEventListener('click', function () {
            document.querySelector('.chat-widget').style.display = 'flex';
            this.style.display = 'none';
        });
        
        document.getElementById('close-chat').addEventListener('click', function () {
            document.querySelector('.chat-widget').style.display = 'none';
            document.getElementById('open-chat').style.display = 'block';
        });
        
        document.getElementById('send-message').addEventListener('click', sendMessage);
        document.getElementById('chat-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const inputField = document.getElementById('chat-input');
            const messageText = inputField.value.trim();
        
            if (messageText === '') return;
        
            const chatBody = document.getElementById('chat-body');
        
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.innerHTML = `<p>${messageText}</p>`;
            chatBody.appendChild(userMessage);
        
            inputField.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        
            fetchGPTResponse(messageText);
        }
        
        function fetchGPTResponse(message) {
            fetch('YOUR_GPT_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                const chatBody = document.getElementById('chat-body');
        
                const botMessage = document.createElement('div');
                botMessage.classList.add('message', 'bot-message');
                botMessage.innerHTML = `<p>${data.response}</p>`;
                chatBody.appendChild(botMessage);
        
                chatBody.scrollTop = chatBody.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById('open-chat').addEventListener('click', function () {
                document.querySelector('.chat-widget').style.display = 'flex';
                this.style.display = 'none';
            });
        
            document.getElementById('close-chat').addEventListener('click', function () {
                document.querySelector('.chat-widget').style.display = 'none';
                document.getElementById('open-chat').style.display = 'block';
            });
        
            document.getElementById('send-message').addEventListener('click', sendMessage);
            document.getElementById('chat-input').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        });
        
        function sendMessage() {
            const inputField = document.getElementById('chat-input');
            const messageText = inputField.value.trim();
        
            if (messageText === '') return;
        
            const chatBody = document.getElementById('chat-body');
        
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.innerHTML = `<p>${messageText}</p>`;
            chatBody.appendChild(userMessage);
        
            inputField.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        
            fetchGPTResponse(messageText);
        }
        
        function fetchGPTResponse(message) {
            fetch('YOUR_GPT_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                const chatBody = document.getElementById('chat-body');
        
                const botMessage = document.createElement('div');
                botMessage.classList.add('message', 'bot-message');
                botMessage.innerHTML = `<p>${data.response}</p>`;
                chatBody.appendChild(botMessage);
        
                chatBody.scrollTop = chatBody.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
// Close notification functionality
document.getElementById('close-notification').addEventListener('click', function() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'none';
});

document.getElementById('nav-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('open');
});

// Initial call to display the countdown immediately
updateCountdown();
    document.addEventListener('DOMContentLoaded', () => {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    });

    const slider = document.getElementById("screenshotSlider");
    const oldAppScreenshot = document.getElementById("oldAppScreenshot");
    const vulcontrolScreenshot = document.getElementById("vulcontrolScreenshot");
    
    slider.addEventListener("input", () => {
        const value = slider.value;
        oldAppScreenshot.style.opacity = 1 - value / 100;
        vulcontrolScreenshot.style.opacity = value / 100;
    });
    
    // Function to generate a random gradient color
function getRandomGradient() {
    // Generate random hue values for two colors
    var hue1 = Math.floor(Math.random() * 360);
    var hue2 = (hue1 + 180) % 360;

    // Generate random saturation and lightness values
    var saturation = Math.floor(Math.random() * 50) + 50;
    var lightness = Math.floor(Math.random() * 30) + 50;

    // Construct the gradient string
    var gradient = "linear-gradient(to right, hsl(" + hue1 + ", " + saturation + "%, " + lightness + "%), hsl(" + hue2 + ", " + saturation + "%, " + lightness + "%))";

    return gradient;
}

// Apply random gradient background to elements with orange color
document.addEventListener("DOMContentLoaded", function() {
    var orangeElements = document.querySelectorAll('*'); // Select all elements
    orangeElements.forEach(function(element) {
        var style = window.getComputedStyle(element); // Get computed styles
        var color = style.getPropertyValue('color'); // Get the color property value
        if (color === 'rgb(255, 165, 0)' || color === '#ffa500') { // Check if the color is orange
            element.style.background = getRandomGradient(); // Apply random gradient background
        }
    });
});


// Function to generate a random gradient color
function getRandomGradient(currentColor) {
    // Convert the current color to HSL
    var rgb = currentColor.match(/\d+/g);
    var hsl = rgbToHsl(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));

    // Generate a darker shade of the current color
    var darkerHsl = [hsl[0], hsl[1], Math.max(hsl[2] - 0.2, 0)]; // Decrease lightness by 20%

    // Generate random hue value for the second color
    var hue2 = Math.floor(Math.random() * 360);

    // Construct the gradient string
    var gradient = "linear-gradient(to right, hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%), hsl(" + hue2 + ", " + hsl[1] + "%, " + darkerHsl[2] + "%))";

    return gradient;
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

// Apply random gradient background to elements with orange color
document.addEventListener("DOMContentLoaded", function() {
    var orangeElements = document.querySelectorAll('.contact .form-btn');
    orangeElements.forEach(function(element) {
        var style = window.getComputedStyle(element);
        var color = style.getPropertyValue('background-color');
        element.style.background = getRandomGradient(color);
    });
});


function expandCard(card) {
    // Toggle the expanded class on the clicked card
    card.classList.toggle('expanded');

    // Get all the sponsor cards
    const cards = document.querySelectorAll('.sponsor-card');

    // Get the number of expanded cards
    const expandedCards = document.querySelectorAll('.sponsor-card.expanded').length;

    // Calculate the width for each card
    const cardWidth = (100 / cards.length) * (cards.length - expandedCards);

    // Apply the width to each card
    cards.forEach(card => {
        card.style.width = `${cardWidth}%`;
    });
}
