const container = document.querySelector(".full-container");
const chatContainer = container.querySelector(".chat-container");
const aiResponse = chatContainer.querySelector(".ai-response");
const promptArea = container.querySelector(".prompt");
const sendButton = container.querySelector(".send-btn");

const csrfToken = document.querySelector("[name='csrfmiddlewaretoken']").value

sendButton.addEventListener("click", () => {
    toggleSend()
    const promptText = validatePrompt();
    sendPrompt(promptText)
   
})

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
        response = await fetch(url, {
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

        data = await response.json()
        if (data["message"]) {
            updateAIResponse(data["message"])
        }

    } catch(error) {
        console.log(error)
    }
}

function updateAIResponse(response) {
    aiResponse.textContent = response
}

function toggleSend() {
    sendButton.disabled = !sendButton.disabled
}