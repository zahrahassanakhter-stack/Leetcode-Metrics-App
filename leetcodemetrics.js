document.addEventListener("DOMContentLoaded", function () {
  let username = document.getElementById("inputfield");
  let searchbtn = document.getElementById("searchbar");
  let Easyprogresscircle = document.querySelector(".Easy-progress");
  let Mediumprogresscircle = document.querySelector(".Medium-progress");
  let Hardprogresscircle = document.querySelector(".Hard-progress");
  let Easylabel = document.querySelector(".Easy-label");
  let Mediumlabel = document.querySelector(".Medium-label");
  let Hardlabel = document.querySelector(".Hard-label");
  let statscontainer = document.querySelector(".stats-container");
  function validateusername(username) {
    if (username.trim() === "") {
      alert("Username is empty");
    }
    let regexpression = /^[A-Za-z0-9_]{3,20}$/;
    let ismatch = regexpression.test(username);
    if (!ismatch) {
      return false;
      console.log("hello");
    }
    return ismatch;
  }
  //function call
  function calculateUserDetail(
    totalQuestions,
    solvedQuestion,
    label,
    progresscircle,
  ) {
    const progressdegree = (solvedQuestion / totalQuestions) * 100;
    progresscircle.style.setProperty("--progress-degree", `${progressdegree}%`);
    label.textContent = `${solvedQuestion}/${totalQuestions}`;
    console.log("Easy:", Easyprogresscircle);
    console.log("Medium:", Mediumprogresscircle);
    console.log("Hard:", Hardprogresscircle);
  }
  function EnterUserDetail(Parseddata) {
    const totalQuestions = Parseddata.data.allQuestionsCount[0].count;
    const totalEasyQuestions = Parseddata.data.allQuestionsCount[1].count;
    const totalMediumQuestions = Parseddata.data.allQuestionsCount[2].count;
    const totalHardQuestions = Parseddata.data.allQuestionsCount[3].count;

    //solved question
    const solvedQuestion =
      Parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count;
    const solvedEasyQuestion =
      Parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
    const solvedMediumQuestion =
      Parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
    const solvedHardQuestion =
      Parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

    calculateUserDetail(
      totalEasyQuestions,
      solvedEasyQuestion,
      Easylabel,
      Easyprogresscircle,
    );

    calculateUserDetail(
      totalMediumQuestions,
      solvedMediumQuestion,
      Mediumlabel,
      Mediumprogresscircle,
    );
    calculateUserDetail(
      totalHardQuestions,
      solvedHardQuestion,
      Hardlabel,
      Hardprogresscircle,
    );
  }

  async function fetchusername(username) {
    try {
      searchbtn.textContent = "searching...";
      searchbtn.disabled = true;
      const proxyserver = "https://cors-anywhere.herokuapp.com/";
      const url = "https://leetcode.com/graphql/";
      const header = new Headers();
      header.append("content-type", "application/json");
      header.append("X-Requested-With", "XMLHttpRequest");
      const graphql = JSON.stringify({
        query:
          "\n    query userSessionProgress($username: String!) {\n        allQuestionsCount {\n            difficulty\n            count\n        }\n        matchedUser(username: $username) {\n            submitStats {\n                acSubmissionNum {\n                    difficulty\n                    count\n                    submissions\n                }\n                totalSubmissionNum {\n                    difficulty\n                    count\n                    submissions\n                }\n            }\n        }\n    }",
        variables: { username: `${username}` },
      });
      const request = {
        method: "POST",
        headers: header,
        body: graphql,
      };
      let response = await fetch(proxyserver + url, request);
      let Parseddata = await response.json();
      console.log(Parseddata);
      EnterUserDetail(Parseddata);
    } catch (error) {
      statscontainer.innerHTML = `${error}`;
    } finally {
      searchbtn.textContent = "search";
      searchbtn.disabled = false;
    }
  }

  searchbtn.addEventListener("click", function () {
    const userInput = username.value;
    if (validateusername(userInput)) {
      fetchusername(userInput);
    }
  });
});
