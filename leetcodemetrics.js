document.addEventListener("DOMContentLoaded", function () {
  let username = document.getElementById("inputfield");
  let searchbtn = document.getElementById("searchbar");
  let Easyprogress = document.getElementById("Easy-progress");
  let Mediumprogress = document.getElementById("Medium-progress");
  let hardprogress = document.getElementById("Hard-progress");
  let Easylabel = document.getElementById("Easy-label");
  let Mediumlabel = document.getElementById("Medium-progress-label");
  let Hardlabel = document.getElementById("Hard-label");

  function validateusername(username) {
    if (username.trim() === "") {
      alert("please enter a name to this field;");
    }
    const isMatch=
  }

  searchbtn.addEventListener("click", function () {
    const userInput = username.value;
    validateusername(userInput);
  });
});
