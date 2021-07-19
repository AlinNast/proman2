import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { boardsManager } from "./boardsManager.js";

export let domManager = {
  addChild(parentIdentifier, childContent) {
      let parent = document.querySelector(parentIdentifier);
      if (parent) {
        parent.insertAdjacentHTML("beforeend", childContent);
      } else {
          console.error("could not find such html element: " + parentIdentifier)
      }
  },
  addEventListener(parentIdentifier, eventType, eventHandler) {
      let parent = document.querySelector(parentIdentifier);
      if (parent) {
          parent.addEventListener(eventType, eventHandler);
      } else {
          console.error("could not find such html element: " + parentIdentifier)
      }
  },
  initModal(label, value=null) {
    document.querySelector(".modal-header h3").innerText = label;
    document.querySelector(".modal-body").innerHTML = "";
    const modalBuilder = htmlFactory(htmlTemplates.singleModal);
    document.querySelector(".modal-body").innerHTML = modalBuilder(value);
    document.querySelector(".modal").style.display="block";
  },
  initRegisterModal(label) {
    document.querySelector(".modal-header h3").innerText = label;
    document.querySelector(".modal-body").innerHTML = "";
    const modalBuilder = htmlFactory(htmlTemplates.registrationModal);
    document.querySelector(".modal-body").innerHTML = modalBuilder();
    document.querySelector(".modal").style.display="block";
  },
  initLoginModal(label) {
    document.querySelector(".modal-header h3").innerText = label;
    document.querySelector(".modal-body").innerHTML = "";
    const modalBuilder = htmlFactory(htmlTemplates.loginModal);
    document.querySelector(".modal-body").innerHTML = modalBuilder();
    document.querySelector(".modal").style.display="block";
  },
  submitModalClose(force = true) {
    document.querySelector(".modal").style.display = "none";
    if (force) {
        this.emptyRoot();
        boardsManager.loadBoards();
    }
},
    handleModalClose() {
    const closeButtons = [...document.getElementsByClassName("close")];
    closeButtons.forEach(closeButton => {
        closeButton.onclick = function () {
            document.querySelector(".modal").style.display = "none";
        };
    })
},
closeModalWindow() {
    modal.style.display = "none";
},
 emptyRoot() {
    document.querySelector("#root").innerHTML = "";
}
};
