// General HTML Elements
const container = document.querySelector(".full-container");
const chatContainer = container.querySelector(".chat-container");
const aiResponse = chatContainer.querySelector(".ai-response");
const promptArea = container.querySelector(".prompt");
const sendButton = container.querySelector(".send-btn");

// Tokens
const csrfToken = document.querySelector("[name='csrfmiddlewaretoken']").value

// Colors
const enabledColor = 'hsl(212, 90%, 66%)'
const diabledColor = 'hsl(0, 1%, 56%)'

// Event Listener
sendButton.addEventListener("click", () => {
    toggleSend()
    const promptText = validatePrompt();
    sendPrompt(promptText)
})

// API
function validatePrompt() {
    let promptText = (promptArea.value).trim();

    if (promptText == '') {
        return "Give me some motivation";
    }
    return promptText;
}

async function sendPrompt(promptMessage) {
    const url = "http://127.0.0.1:8000/coach"

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({prompt: promptMessage})
        })

        if (!response.ok) {
            console.log("An error occured.")
            
        }

        const data = await response.json()
        if (data["message"]) {
            updateAIResponse(data["message"])
        }
    } catch(error) {
        console.log(error)
    } finally {
        toggleSend()
    }
}

// UI helpers

function updateAIResponse(response) {
    aiResponse.innerHTML = DOMPurify.sanitize(marked.parse(response));
}

function toggleSend() {
    const isNowDisabled = !sendButton.disabled;
    sendButton.disabled = isNowDisabled;

    if (isNowDisabled === true) {
        sendButton.style.backgroundColor = diabledColor;
        sendButton.style.cursor = 'default';
    } else {
        sendButton.style.backgroundColor = enabledColor;
        sendButton.style.cursor = 'pointer';
    }
}