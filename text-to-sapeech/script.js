const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = input.value || "enter a value!";
    window.speechSynthesis.speak(msg);
  }
});
