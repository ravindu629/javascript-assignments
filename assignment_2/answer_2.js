// Check if a string contains only 0s and 1s
function isBinaryString(row) {
  return row.split("").every((char) => char === "0" || char === "1");
}

// Validate the matrix input
function isValidMatrixInput(strArr) {
  if (strArr.length === 0) return false; // If input is empty, return false
  const rowLength = strArr[0].length; // Get the length of the first row
  return strArr.every((row) => isBinaryString(row) && row.length === rowLength); // Return false if row contains anything other than 0 or 1, or lengths don't match
}

// Calculate the largest square of 1's
function MaximalSquare(strArr) {
  const matrix = strArr.map((row) => row.split("").map(Number)); // convert matrix to numbers
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array(m) // create a dp table with 0's
    .fill()
    .map(() => Array(n).fill(0));
  let maxSide = 0,
    maxRow = 0,
    maxCol = 0;

  for (let i = 0; i < m; i++) {
    //if cell = 1 check top, left and top left cells. take smallest value and and add 1
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        dp[i][j] =
          i === 0 || j === 0
            ? 1
            : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        if (dp[i][j] > maxSide) {
          maxSide = dp[i][j];
          maxRow = i;
          maxCol = j;
        }
      }
    }
  }

  return { maxSide, maxRow, maxCol };
}

function displayMatrix(strArr, maxInfo) {
  const matrixDisplay = document.getElementById("matrixDisplay");
  matrixDisplay.innerHTML = "";

  const { maxSide, maxRow, maxCol } = maxInfo;

  // loop through each row
  strArr.forEach((row, i) => {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";

    // loop through each cell
    row.split("").forEach((cell, j) => {
      const cellDiv = document.createElement("div");
      cellDiv.textContent = cell;
      cellDiv.style.padding = "10px";
      cellDiv.style.border = "1px solid #000";
      cellDiv.style.textAlign = "center";
      cellDiv.style.minWidth = "20px";
      cellDiv.style.minHeight = "20px";

      // check cell is inside the largest square and change the background color
      if (maxSide != 1) {
        if (
          //check the range
          i >= maxRow - maxSide + 1 &&
          i <= maxRow &&
          j >= maxCol - maxSide + 1 &&
          j <= maxCol
        ) {
          cellDiv.style.backgroundColor = "green";
        }
      }

      rowDiv.appendChild(cellDiv);
    });
    matrixDisplay.appendChild(rowDiv);
  });
}

// Get the input and display the result
function calculateMaximalSquare() {
  //read the input and remove extra spaces
  const input = document.getElementById("matrixInput").value.trim();

  if (!input) {
    const matrixDisplay = document.getElementById("matrixDisplay");
    matrixDisplay.innerHTML = "";

    document.getElementById("result").textContent =
      "Please enter a valid matrix.";
    return;
  }

  // Split the input into an array of strings
  const strArr = input.split(",").map((row) => row.trim());

  // Validate input format
  if (!isValidMatrixInput(strArr)) {
    const matrixDisplay = document.getElementById("matrixDisplay");
    matrixDisplay.innerHTML = "";

    document.getElementById("result").textContent =
      "Invalid input! Only 0s and 1s are used & all rows are of equal length.";
    return;
  }

  const maxInfo = MaximalSquare(strArr);
  displayMatrix(strArr, maxInfo);
  if (maxInfo.maxSide != 1) {
    document.getElementById("result").textContent =
      "Maximal Square Area: " + maxInfo.maxSide * maxInfo.maxSide;
  } else {
    document.getElementById("result").textContent = "Try another matrix";
  }
}
