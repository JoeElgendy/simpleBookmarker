var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkURL");

var bookmarks = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  Display(bookmarks);
}

function addBookmark() {
  if (NameValidation() && UrlValidation()) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    bookmarks.push(bookmark);
    Display(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    clearForm();
  }
}

function Display(bookmarks) {
  var container = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    container += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarks[i].name}</td>
    <td>${bookmarks[i].url}</td>
    <td><button onclick="visitBookMark(${i})" class="btn btn-success">Visit</button></td>
    <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
    `;
  }
  document.getElementById("tableContent").innerHTML = container;
}

function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  Display(bookmarks);
}

function visitBookMark(index) {
  open(bookmarks[index].url);
}

function searchBookMark(term) {
  var matchedBookmark = [];
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      matchedBookmark.push(bookmarks[i]);
    }
  }
  Display(matchedBookmark);
}

function UrlValidation() {
  var regex = /^(http(s):\/\/)([\w]*)(.[\w]+)(.com|.net|.edu)/;
  isTrue = regex.test(bookmarkUrl.value);
  if (isTrue) {
    return true;
  } else {
    document.getElementById("main").classList.add("blackout");

    document
      .getElementById("box-info")
      .classList.replace("d-none", "d-inline-block");
    return false;
  }
}

function NameValidation() {
  var regex = /[A-Z]+(\w{3,})/;
  isTrue = regex.test(bookmarkName.value);
  if (isTrue) {
    return true;
  } else {
    document.getElementById("main").classList.add("blackout");

    document
      .getElementById("box-info")
      .classList.replace("d-none", "d-inline-block");
    return false;
  }
}

function hideinfo() {
  document
    .getElementById("box-info")
    .classList.replace("d-inline-block", "d-none");
  document.getElementById("main").classList.remove("blackout");
}

function updateBookmark(index) {
  bookmarkName.value = bookmarks[index].value;
  bookmarkUrl.value = bookmarks[index].value;
}
