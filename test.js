// const numbers = [1,2,3];
// const doubledNumbers = numbers.map((number) => number * 2);
// console.log(doubledNumbers);

// const sentence = exampleArray.join(" "); 
// Separator takes a space character
// const exampleArr = ["This", "is", "a", "sentence"];
// Output: "This is a sentence"
// console.log(sentence); 

const user = {
  name: "Quincy",
  address: {
    city: "San Francisco",
    state: "CA",
    country: "USA",
  },
};

// Accessing nested properties without optional chaining
const state = user.address.state; // CA

// Accessing a non-existent nested property with optional chaining
const zipCode = user.address?.zipCode; // Returns undefined instead of throwing an error