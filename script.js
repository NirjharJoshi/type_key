"use strict";

const textData = document.querySelector(`.text_Data`);
const textUser = document.querySelector(`.text_user`);
const btnNextData = document.querySelector(`.btn_Next_Data`);
const loadingData = document.querySelector(`.loading_data`);

let dataStr;
let userStr;
let dataArr;
let eleStr = ``;
const apiPath = `https://quotable.io/random`;

const fetchData = function (path) {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => data.content);
};

const getData = async function () {
  textData.innerHTML = ``;
  textUser.value = ``;
  loadingData.classList.add(`loading_data_show`);
  loadingData.classList.remove(`loading_data_hide`);
  dataStr = await fetchData(apiPath);
  loadingData.classList.remove(`loading_data_show`);
  loadingData.classList.add(`loading_data_hide`);
  console.log(dataStr);
  dataArr = Array.from(dataStr);
  eleStr = ``;
  for (let i = 0; i < dataArr.length; i++) {
    eleStr += `<span class="typing_span">${dataArr[i]}</span>`;
  }
  console.log(eleStr);

  textData.insertAdjacentHTML(`beforeend`, eleStr);

  // showData();
};

const typingState = function () {
  const spanCollection = document.querySelectorAll(`.typing_span`);
  console.log(spanCollection);
  userStr = textUser.value;

  if (userStr.length === dataStr.length) getData();

  for (let i = 0; i < spanCollection.length; i++) {
    const ele = spanCollection[i];
    const dataChar = ele.innerHTML;
    if (!userStr[i]) {
      ele.classList.remove(`text-success`);
      ele.classList.remove(`text-danger`);
      ele.classList.remove(`text-decoration-underline`);
    } else if (userStr[i] === dataChar) {
      ele.classList.add(`text-success`);
      ele.classList.remove(`text-danger`);
      ele.classList.remove(`text-decoration-underline`);
    } else if (userStr[i] !== dataChar) {
      ele.classList.add(`text-danger`);
      ele.classList.add(`text-decoration-underline`);
      ele.classList.remove(`text-success`);
    }
  }
};

getData();

textUser.addEventListener(`input`, typingState);
btnNextData.addEventListener(`click`, getData);
