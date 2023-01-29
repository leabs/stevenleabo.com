function speaks() {
    let input = document.getElementById("speechTxt").value;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(input));
    /*wait 1 seconds before sending*/
    setTimeout(readyToSend, 1000);
  }
  function readyToSend() {
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance("Ready to send your message?")
    );
  }