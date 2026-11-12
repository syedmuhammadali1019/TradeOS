// TradeOS - Step A: Voice Engine Integration (Web Speech API)

const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('status-text');
const liveText = document.getElementById('live-text');

// Check karte hain ke browser Speech Recognition ko support karta hai ya nahi
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    statusText.innerText = "Aapka browser voice recognition support nahi karta.";
    micBtn.disabled = true;
} else {
    const recognition = new SpeechRecognition();
    
    // Settings: Urdu ya English dono samajhne ke liye (Roman Urdu/English mix)
    recognition.lang = 'ur-PK'; // Aap chahein toh 'en-US' ya 'ur-PK' rakh sakte hain
    recognition.interimResults = true;
    recognition.continuous = false;

    // Jab mic button par click ho
    micBtn.addEventListener('click', () => {
        try {
            recognition.start();
            statusText.innerText = "Sun rahe hain... Boliye!";
            micBtn.style.backgroundColor = "#E6C657"; // Thoda bright gold jab sun raha ho
        } catch (error) {
            console.log("Recognition already started");
        }
    });

    // Jab aawaz sun kar text ban jaye
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        liveText.innerText = speechToText;
        statusText.innerText = "Aawaz sun li gayi hai!";
    };

    // Jab sunna khatam ho jaye
    recognition.onspeechend = () => {
        recognition.stop();
        micBtn.style.backgroundColor = "#D4AF37"; // Wapas normal gold rang
    };

    // Agar koi error aaye
    recognition.onerror = (event) => {
        statusText.innerText = "Error: Dobara koshish karein";
        micBtn.style.backgroundColor = "#D4AF37";
    };
}
