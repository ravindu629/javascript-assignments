// Function to calculate the largest square of 1's
function MaximalSquare(strArr) {
  const matrix = strArr.map((row) => row.split("").map(Number));

  const m = matrix.length;
  const n = matrix[0].length;

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));
  let maxSide = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide;
}

// Function to process the input and display the result
function calculateMaximalSquare() {
  const input = document.getElementById("matrixInput").value.trim();

  if (!input) {
    document.getElementById("result").textContent =
      "Please enter a valid matrix.";
    return;
  }

  // Split the input into an array of strings
  const strArr = input.split(",").map((row) => row.trim());

  const result = MaximalSquare(strArr);

  // Display the result
  document.getElementById("result").textContent =
    "Maximal Square Area: " + result;
}
