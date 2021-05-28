//* Theme
let theme;
updateTheme();

function updateTheme() {
  theme = localStorage.getItem("theme") || "light";

  document.getElementById("themeIcon").className =
    theme === "light" ? "fa-lg fas fa-moon" : "fa-lg fas fa-sun";
  document.querySelector("html").setAttribute("data-theme", theme);
}

function changeTheme() {
  if (theme === "light") {
    theme = "dark";
  } else {
    theme = "light";
  }

  document.getElementById("themeIcon").className =
    theme === "light" ? "fa-lg fas fa-moon" : "fa-lg fas fa-sun";

  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  updateTheme();
}

//* Main
let messages = [];

getMessages();
showLastMessage();
showAllMessages();

function getMessages() {
  messages = JSON.parse(localStorage.getItem("messages")) || [];
}

function saveMessage() {
  const messageInput = document.getElementById("messageInput").value;

  if (!messageInput.length) {
    return handleEmptyMessageError();
  } else if (messageInput.length > 2000) {
    return handleLongMessageError();
  }

  messages.push(messageInput);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function showLastMessage() {
  const lastMessageDiv = document.getElementById("lastMessage");

  let lastMessage;
  if (messages.length) lastMessage = messages[messages.length - 1];
  else lastMessage = "Nothing to show right now :(";

  lastMessageDiv.innerHTML = `<p class="text-4xl">${lastMessage}</p>`;
}

function showAllMessages() {
  const allMessagesDiv = document.getElementById("allMessages");

  let allMessages = "<ol>";
  if (messages.length) {
    messages.forEach((message, index) => {
      allMessages += `<li>${index + 1}) ${message}</li>`;
    });
    allMessages += "</ol>";
  } else {
    allMessages = "Nothing to show right now :(";
  }

  allMessagesDiv.innerHTML = allMessages;
}

function deleteAllMessages() {
  messages = [];
  localStorage.setItem("messages", JSON.stringify(messages));

  showLastMessage();
  showAllMessages();
}

function handleEmptyMessageError() {
  const errorsDiv = document.getElementById("errors");

  errorsDiv.innerHTML = `
    <div class="alert alert-error m-5">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"><!----> <!----> <!----> <!----> 
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!---->
        </svg> 
        <label>Please provide a message that contains more than 0 characters!</label>
      </div>
    </div>
  `;

  setTimeout(() => (errorsDiv.innerHTML = ""), 10000);
}

function handleLongMessageError() {
  const errorsDiv = document.getElementById("errors");

  errorsDiv.innerHTML = `
    <div class="alert alert-error m-5">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"><!----> <!----> <!----> <!----> 
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!---->
        </svg> 
        <label>Please provide a message that contains less than 2000 characters!</label>
      </div>
    </div>
  `;

  setTimeout(() => (errorsDiv.innerHTML = ""), 10000);
}
