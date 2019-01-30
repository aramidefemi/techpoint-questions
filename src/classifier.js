const input = require("./inputs/edge-input");
/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

function classifier (input) {

var output = {};
var groupCounter = 0;

reorderInput(input);

function reorderInput(input) {
  var reorder = input.map((input, index) => {
    return {
      name: input.name,
      dob: input.dob,
      age: (() => {
        var dob = new Date(input.dob).getFullYear();
        var presentYear = new Date().getFullYear();
        return presentYear - dob;
      })(),
      regNo: input.regNo
    };
  });

  reorder.sort((a, b) => parseFloat(a.age) - parseFloat(b.age)); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  recursive(reorder);
}


function recursive(input) {
  var inputLength = input.length;
  var newinput = {};
  newinput.members = [];
  newinput.regNos = [];

  if (inputLength == 0) {
    return;
  } else if (inputLength == 1) {
    newinput.members = input.slice(0, 1);
  } else if (inputLength == 2) {
    newinput.members = input.slice(0, 2);
  } else if (inputLength > 2) {
    newinput.members = input.slice(0, 3);
  }

  var membersLength = newinput.members.length;

  switch (membersLength) {
    case 1:
      input.splice(0, 1); // remove 1  items from position 0
      break;
    case 2:
      var oldest = newinput.members[1].age;

      var youngest = newinput.members[0].age;
      var distance = oldest - youngest;

      if (distance < 6) {
        input.splice(0, 2); // remove 2  items from position 0
      } else {
        newinput.members.pop();
        input.splice(0, 1); // remove 1  items from position 0
      }
      break;
    case 3:
      var oldest = newinput.members[2].age;

      var youngest = newinput.members[0].age;
      var distance = oldest - youngest;

      if (distance < 6) {
        input.splice(0, 3); // remove 3  items from position 0
      } else {
        var oldest = newinput.members[1].age;

        var youngest = newinput.members[0].age;
        var distance = oldest - youngest;

        if (distance < 6) {
          newinput.members.pop();
          input.splice(0, 2); // remove 2  items from position 0
        } else {
          newinput.members.pop();
          newinput.members.pop();
          input.splice(0, 1); // remove 1  items from position 0
        }
      }
      break;
  }

  var stock = newinput.members;
  newinput.members = stock.map(res => {
    return { name: res.name, age: res.age, dob: res.dob, regNo: res.regNo };
  });

  newinput.regNos = stock.map(res => parseInt(res.regNo));
  newinput.regNos = newinput.regNos.sort((a, b) => parseInt(a) - parseInt(b));

  oldest = newinput.members[newinput.members.length - 1].age;
  newinput["oldest"] = oldest;
  newinput["sum"] = newinput.members.reduce((accumulator, array) => {
    return accumulator + array.age;
  }, 0);

  // console.log(newinput);

  groupCounter = groupCounter + 1;
  output[`group${groupCounter}`] = newinput;

  recursive(input);
}

output["noOfGroups"] = groupCounter;
return output;
}
module.exports = classifier;
