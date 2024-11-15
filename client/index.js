function handleClick() {
  const result = document.getElementById("result");
  fetch("http://13.201.64.118/connect", { method: "GET" })
    .then((res) => res.json())
    .then((parsed) => {
      if (parsed.success) {
        result.textContent = parsed.data;
      } else {
        result.textContent = parsed.error;
      }
    })
    .catch((err) => console.log(err.message));
}
