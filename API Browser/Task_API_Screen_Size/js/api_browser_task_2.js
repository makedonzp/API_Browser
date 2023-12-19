/*
Задание 2.

Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
*/

const btnCheckScreenSize = document.querySelector(
  ".container_btn_size_screen_check"
);
const outInformationScreenSize = document.querySelector(
  ".container_out_screen_information"
);

btnCheckScreenSize.addEventListener("click", () => {
  alert(`${window.screen.width}x${window.screen.height}`);
});
