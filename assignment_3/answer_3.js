function calculateDots() {
  const number = parseInt(document.getElementById("numberInput").value);
  const totalDots = CenteredPentagonalNumber(number);

  if (totalDots !== undefined) {
    document.getElementById("result").innerHTML = `Total dots: ${totalDots}`;
  } else {
    document.getElementById("result").innerHTML =
      "Please enter a valid positive integer.";
  }
}

function CenteredPentagonalNumber(num) {
  if (Number.isInteger(num) && num > 0) {
    const totalDots = (5 * num * (num - 1)) / 2 + 1;
    return totalDots;
  } else {
    return undefined;
  }
}
