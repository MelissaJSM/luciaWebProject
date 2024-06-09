// 전송 버튼 클릭 시 이벤트 핸들러 추가
document.getElementById('sendButton').addEventListener('click', handleSendButtonClick);

// 텍스트 입력 필드에서 엔터 키를 눌렀을 때 전송 버튼 클릭 이벤트 핸들러 호출
document.getElementById('textInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSendButtonClick();
    }
});

function handleSendButtonClick(){
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
            TalkAndIdleMode(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 오디오 재생 종료 이벤트 핸들러 추가
    document.getElementById('audioPlayer').addEventListener('ended', function() {
        console.log('Audio playback finished.');
        // 여기에 재생 종료 후 실행할 코드를 추가합니다.
        TalkAndIdleMode(false);
    });
}