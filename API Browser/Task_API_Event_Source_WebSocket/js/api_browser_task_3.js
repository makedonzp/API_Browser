/*
Задание 3.

1.Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

2.Добавить в чат механизм отправки гео-локации:

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

*/

const sendMessage = document.querySelector(".container_btn_send_message");
let writeMessage = document.querySelector(".container_message_in_come");
const messageOut = document.querySelector(".container_message_area");
const geolocation = document.querySelector(".geo");
let websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

sendMessage.addEventListener("click", () => {
  if (writeMessage.value == "") {
  } else {
    messageOut.innerHTML += `<div class= "sending"><div class="sending_message_box"><p>${writeMessage.value}</p></div></div>`;
    websocket.send(writeMessage.value);
    scrollMessage(0, 1e9);

    websocket.onmessage = function (event) {
      messageOut.innerHTML += `<div class="answer"><div class="answer_message_box"><p>${writeMessage.value}</p></div></div>`;
      writeMessage.value = "";
      scrollMessage(0, 1e9);
    };
  }
});
enterPress();

geolocation.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoLink = `https://www.openstreetmap.org/#map=6/${latitude}/${longitude}`;
      messageOut.innerHTML += `<div class="geoposition"><div class="geoposition_message_box"><a href="https://www.openstreetmap.org/#map=6/${latitude}/${longitude}">Гео-локация</a></div></div>`;
      scrollMessage(0, 1e9);
    };
    const error = () => {
      alert("геолокация выключена или браузер не поддерживает данную функцию");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Ваш браузер не поддерживает определения геопозиции");
  }
});

function enterPress() {
  document
    .querySelector(".container_message_in_come")
    .addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        if (writeMessage.value == "") {
        } else {
          messageOut.innerHTML += `<div class= "sending"><div class="sending_message_box"><p>${writeMessage.value}</p></div></div>`;
          websocket.send(writeMessage.value);
          scrollMessage(0, 1e9);
          websocket.onmessage = function (event) {
            messageOut.innerHTML += `<div class="answer"><div class="answer_message_box"><p>${writeMessage.value}</p></div></div>`;
            writeMessage.value = "";
            scrollMessage(0, 1e9);
          };
        }
      }
    });
}

function scrollMessage(x, y) {
  messageOut.scrollBy(x, y);
}
