const commentBox = document.getElementById("commentBox");
const commentButton = document.getElementById("commentButton");
const computerResponse = document.getElementById("computerResponse");

commentButton.addEventListener("click", () => {
    const text = commentBox.value.trim();

    if (!text) {
        computerResponse.textContent = "💀 Type something first!";
        return;
    }

    // Show what the computer is doing
    computerResponse.textContent = "🗣️ Computer is reading...";

    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Read the user's comment
    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1.05;
    speech.pitch = 1.15;
    speech.volume = 1;

    // Try to find a fun computer-like voice
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice = voices.find(voice =>
        /Google|Microsoft|Samantha|Daniel/i.test(voice.name)
    );

    if (preferredVoice) {
        speech.voice = preferredVoice;
    }

    window.speechSynthesis.speak(speech);

    // After reading → laugh
    speech.onend = () => {
        computerResponse.textContent =
            "🤖 ANALYSIS COMPLETE: That comment was unnecessarily funny.";

        setTimeout(() => {
            const laugh = new SpeechSynthesisUtterance(
                "HAHAHAHAHAHAHAHA! BEEP BOOP! HAHAHAHAHA!"
            );

            laugh.rate = 1.35;
            laugh.pitch = 1.45;
            laugh.volume = 1;

            // Make the laugh sound more robotic
            if (preferredVoice) {
                laugh.voice = preferredVoice;
            }

            window.speechSynthesis.speak(laugh);
        }, 300);
    };
});