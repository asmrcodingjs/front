const form = document.getElementsByClassName("url-form")[0];
const inputValue = document.getElementsByClassName("url-input")[0];
const resultSection = document.getElementById("result-section");
const resultValue = document.getElementsByClassName("result-section__value")[0];

const copyBtn = document.getElementsByClassName("result-section__btn")[0];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = inputValue.value;
  if (!value) return;

  if (!value.startsWith("https://")) return alert("invalid URL");

  const url = new URL("https://t.ly/api/v1/link/shorten");

  const headers = {
    Authorization:
      "Bearer i8SuEUqlOd86YIzPRxAR7GXnJb88xkc7NNqOOIxsN0Vs3MzDKRVMuzuaN5xk",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let body = {
    long_url: value,
  };

  resultSection.style.visibility = "hidden";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json();

  const short_url = data.short_url;
  resultSection.style.visibility = "visible";
  resultValue.innerHTML = short_url;
});

copyBtn.addEventListener("click", async () => {
  if (!resultValue.innerHTML) return;
  resultSection.style.background = "#c5e1a5";
  await navigator.clipboard.writeText(resultValue.innerHTML.trim());
  setTimeout(() => {
    resultSection.style.background = "rgba(255, 255, 255, 0.1)";
  }, 1000);
});
