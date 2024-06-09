document.getElementById('sendButton').addEventListener('click', function () {
    var text = document.getElementById('textInput').value;
    if (!text) {
        alert("Please enter text.");
        return;
    }
    else if(text == "#debugOn"){
        deBugMode(true);
        document.getElementById('textInput').value = "";
        return;
    }
    else if (text == "#debugOff"){
        deBugMode(false);
        document.getElementById('textInput').value = "";
        return;
    }

    document.getElementById('textInput').value = "";

    fetch('http://localhost:3545/tts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.blob())
        .then(blob => {
            var audioUrl = URL.createObjectURL(blob);
            var audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        })
        .catch(error => {
            console.error('Error:', error);
        });

});
