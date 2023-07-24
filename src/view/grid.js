import { CONSTANT, MODE, GLOBAL } from "../model/variable.js";
import { subscribe } from "../controller/observer.js";
import { moveGrid, toggleView, toggleSubscription } from "../model/store.js";

function initGrid(parentNode) {
  const dom = document.createElement("div");
  dom.className = "grid-view";

  for (let i = 0; i < CONSTANT.GRID_ROW_NUM; i++) {
    const gridRow = document.createElement("ul");
    gridRow.className = "grid-row";
    for (let j = 0; j < CONSTANT.GRID_COL_NUM; j++) {
      const gridLi = document.createElement("li");
      const pressLogo = document.createElement("img");
      pressLogo.className = "press-logo";
      gridLi.appendChild(pressLogo);
      gridRow.appendChild(gridLi);
    }
    dom.appendChild(gridRow);
  }

  parentNode.appendChild(dom);
}

function drawGrid() {
  if (GLOBAL.CURRENT_MODE === MODE.LIST_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) return;

  document.querySelector(".list-view").style.display = "none";
  document.querySelector(".grid-view").style.display = "flex";

  let iconIndex = GLOBAL.GRID_CURRENT_PAGE * CONSTANT.GRID_NEWS_NUM;
  const pressLogo = document.querySelectorAll(".press-logo");
  const targetData = GLOBAL.CURRENT_MODE === MODE.GRID_ALL ? GLOBAL.NEWS_DATA : GLOBAL.SUBSCRIBE_NEWS_DATA;

  pressLogo.forEach((img) => {
    img.src = targetData[iconIndex] ? targetData[iconIndex++].path : "";
  });
}

subscribe(moveGrid, drawGrid);
subscribe(toggleView, drawGrid);
subscribe(toggleSubscription, drawGrid);

export { initGrid, drawGrid };
