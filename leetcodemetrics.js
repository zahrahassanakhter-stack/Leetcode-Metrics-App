document.addEventListener("DOMContentLoaded", function () {
  let username = document.getElementById("inputfield");
  let searchbtn = document.getElementById("searchbar");
  let Easyprogresscircle = document.getElementById("Easy-progress");
  let Mediumprogresscircle = document.getElementById("Medium-progress");
  let hardprogresscircle = document.getElementById("Hard-progress");
  let Easylabel = document.getElementById("Easy-label");
  let Mediumlabel = document.getElementById("Medium-label");
  let Hardlabel = document.getElementById("Hard-label");
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

  function EnterUserDetail(Parseddata) {
    const totalQuestions = Parseddata.data.llQuestionsCount[0].count;
    const totalEasyQuestions = Parseddata.data.llQuestionsCount[1].count;
    const totalMediumQuestions = Parseddata.data.llQuestionsCount[2].count;
    const totalHardQuestions = Parseddata.data.llQuestionsCount[3].count;

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
      totalQuestions,
      solvedQuestion,
      Easylabel,
      Easyprogresscircle,
    );
    calculateUserDetail(
      totalQuestions,
      solvedQuestion,
      Easylabel,
      Easyprogresscircle,
    );

    calculateUserDetail(
      totalQuestions,
      solvedQuestion,
      Easylabel,
      Easyprogresscircle,
    );

    calculateUserDetail(
      totalQuestions,
      solvedQuestion,
      Easylabel,
      Easyprogresscircle,
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
        redrirect: "follow",
      };
      let response = await fetch(proxyserver + url, request);
      let Parseddata = await response.json();
      console.log(Parseddata);
      EnterUserDetail(Parseddata);
    } catch (error) {
      statscontainer.innerHTML = "<p>No data found</p>";
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
