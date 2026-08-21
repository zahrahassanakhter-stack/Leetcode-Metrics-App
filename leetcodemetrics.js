document.addEventListener("DOMContentLoaded", function () {
  let username = document.getElementById("inputfield");
  let searchbtn = document.getElementById("searchbar");
  let Easyprogress = document.getElementById("Easy-progress");
  let Mediumprogress = document.getElementById("Medium-progress");
  let hardprogress = document.getElementById("Hard-progress");
  let Easylabel = document.getElementById("Easy-label");
  let Mediumlabel = document.getElementById("Medium-progress-label");
  let Hardlabel = document.getElementById("Hard-label");
  let statscontainer = document.querySelector(".statsconainer");
  function validateusername(username) {
    if (username.trim() === "") {
      alert("please enter a name to this field;");
    }
    let regexpression = "^[A-Za-z0-9_]{3,20}$";
    let ismatch = regexpression.test(username);
    if (!ismatch) {
      return false;
    }
  }
  async function fetchusername() {
    let url = "";

    try {
      let response = await fetch(url);
      let data = json.decode();
      searchbtn.textContent = "searching...";
      searchbtn.disabled = true;
    } catch (error) {
    } finally {
    }
  }

  searchbtn.addEventListener("click", function () {
    const userInput = username.value;
    if (validateusername(userInput)) {
      fetchusername();
    }
  });
});
