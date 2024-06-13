document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const micButton = document.getElementById("micButton");
    let isMicRecording = false;
    let recognition;

    function initializeSpeechRecognition() {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = "ko-KR";
            recognition.interimResults = true;
            recognition.continuous = false;

            recognition.addEventListener("result", (event) => {
                console.log("Recognition result event:", event);
                const text = event.results[0][0].transcript;
                textInput.value = text;

                if (event.results[0].isFinal) {
                    textInput.value = text;
                    document.getElementById("sendButton").click();
                }
            });

            recognition.addEventListener("end", () => {
                console.log("Recognition ended.");
                isMicRecording = false;
            });

            recognition.addEventListener("error", (event) => {
                console.log("Recognition error:", event.error);
                isMicRecording = false;
            });

        } else {
            console.log("Speech recognition not supported in this browser.");
            alert("Speech recognition not supported in this browser.");
        }
    }

    micButton.addEventListener("click", () => {
        if (!recognition) {
            initializeSpeechRecognition();
        }

        if (isMicRecording) {
            recognition.abort();
            isMicRecording = false;
            console.log("Microphone stopped.");
            document.getElementById("textInput").placeholder = "질문을 입력하세요.";
        } else {
            recognition.start();
            isMicRecording = true;
            console.log("Microphone started.");
            document.getElementById("textInput").placeholder = "음성인식 중입니다.";
        }
    });

    // 요청 시 초기화
    initializeSpeechRecognition();
});
