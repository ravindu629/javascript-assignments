function getScaleValues() {
  const scaleValues = [];
  const list = [];

  // Get scale values as string input (e.g., "[3, 4]")
  let input = prompt("Enter scale values (e.g., [3, 4]):");
  try {
    scaleValues.push(...JSON.parse(input)); // Convert string input to array
  } catch (e) {
    alert("Invalid input for scale values.");
    return;
  }

  // Check if scaleValues array has exactly two elements
  if (scaleValues.length !== 2) {
    alert("Please enter exactly two scale values.");
    return;
  }

  // Get the weights as string input (e.g., "[1, 2, 7, 7]")
  input = prompt("Enter weights (e.g., [1, 2, 7, 7]):");
  try {
    list.push(...JSON.parse(input)); // Convert string input to array
  } catch (e) {
    alert("Invalid input for weights.");
    return;
  }

  // Call scaleBalancing with the scale values and list of available weights
  scaleBalancing(scaleValues, list);
}

function scaleBalancing(scaleValues, list) {
  const [left, right] = scaleValues;
  let output = "";

  // If the scale is already balanced
  if (left === right) {
    output = "Equals";
    document.getElementById("output").innerHTML = output;
    return;
  }

  // Calculate the difference between the left and right
  const diff = Math.abs(left - right);

  // Balancing with one weight
  for (let weight of list) {
    if (weight === diff) {
      if (left < right) {
        output = `Left: ${weight} | Right: 0`;
      } else {
        output = `Left: 0 | Right: ${weight}`;
      }
      document.getElementById("output").innerHTML = output;
      return;
    }
  }

  // Balance with two weights
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const w1 = list[i];
      const w2 = list[j];

      // Add weights to the left
      if (left + w1 + w2 === right) {
        output = `Left: ${w1}, ${w2} | Right: 0`;
        document.getElementById("output").innerHTML = output;
        return;
      }

      // Add weights to the right
      if (right + w1 + w2 === left) {
        output = `Left: 0 | Right: ${w1}, ${w2}`;
        document.getElementById("output").innerHTML = output;
        return;
      }

      // Add one weight to each side
      if (left + w1 === right + w2 || left + w2 === right + w1) {
        output = `Left: ${Math.min(w1, w2)} | Right: ${Math.max(w1, w2)}`;
        document.getElementById("output").innerHTML = output;
        return;
      }
    }
  }

  // No balance found
  output = "Not possible";
  document.getElementById("output").innerHTML = output;
}
