function getScaleValues() {
  const scaleValues = [];
  const list = [];

  // Get scale values
  for (let i = 0; i < 2; i++) {
    const input = prompt(`Enter scale value ${i + 1}:`);
    const value = Number(input);
    if (!isNaN(value)) {
      scaleValues.push(value);
    } else {
      alert("Invalid input, please enter a valid number.");
      return;
    }
  }

  // Get the number of weights
  const n = prompt("How many weights do you want to add to the list?");
  const numWeights = Number(n);
  if (isNaN(numWeights) || numWeights <= 0) {
    alert("Invalid input. Please enter a valid number of weights.");
    return;
  }

  for (let i = 0; i < numWeights; i++) {
    const input = prompt(`Enter weight ${i + 1}:`);
    const weight = Number(input);
    if (!isNaN(weight)) {
      list.push(weight);
    } else {
      alert("Invalid weight, please enter a valid number.");
      return;
    }
  }

  // Call scaleBalancing with the scale values and list of available weights
  scaleBalancing(scaleValues, list);
}

function scaleBalancing(scaleValues, list) {
  const [left, right] = scaleValues;

  // If the scale is already balanced
  if (left === right) {
    console.log("Equals");
    return;
  }

  // Calculate the difference between the left and right
  const diff = Math.abs(left - right);

  // TBalancing with one weight
  for (let weight of list) {
    if (weight === diff) {
      if (left < right) {
        console.log(`Left: ${weight} | Right: 0`);
      } else {
        console.log(`Left: 0 | Right: ${weight}`);
      }
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
        console.log(`Left: ${w1},${w2} | Right: 0`);
        return;
      }

      // Add weights to the right
      if (right + w1 + w2 === left) {
        console.log(`Left: 0 | Right: ${w1},${w2}`);
        return;
      }

      // Add one weight to each side
      if (left + w1 === right + w2 || left + w2 === right + w1) {
        console.log(`Left: ${Math.min(w1, w2)} | Right: ${Math.max(w1, w2)}`);
        return;
      }
    }
  }

  // No balance found
  console.log("Not possible");
}
