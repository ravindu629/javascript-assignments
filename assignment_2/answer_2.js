// Check if a string contains only 0s and 1s
function isBinaryString(row) {
  return row.split("").every((char) => char === "0" || char === "1");
}

// Validate the matrix input
function isValidMatrixInput(strArr) {
  if (strArr.length === 0) return false; // If input is empty, return false

  const rowLength = strArr[0].length; // Get the length of the first row

  for (let row of strArr) {
    if (!isBinaryString(row) || row.length !== rowLength) {
      return false; // Return false if row contains anything other than 0 or 1, or lengths don't match
    }
  }

  return true; // Return true if all rows are valid
}

// Calculate the largest square of 1's
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

// Get the input and display the result
function calculateMaximalSquare() {
  const input = document.getElementById("matrixInput").value.trim();

  if (!input) {
    document.getElementById("result").textContent =
      "Please enter a valid matrix.";
    return;
  }

  // Split the input into an array of strings
  const strArr = input.split(",").map((row) => row.trim());

  // Validate input format
  if (!isValidMatrixInput(strArr)) {
    document.getElementById("result").textContent =
      "Invalid input! Only 0s and 1s are used & all rows are of equal length.";
    return;
  }

  const result = MaximalSquare(strArr);

  // Display the result
  document.getElementById("result").textContent =
    "Maximal Square Area: " + result;
}
