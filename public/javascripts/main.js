(() => {
  // Enable debuging messages
  const DEBUG = true;

  const collapsable = document.querySelector("nav .collapsable");
  document.querySelector("nav .toggler").addEventListener("click", function() {
    DEBUG && console.log("click: ", this);
    collapsable.classList.toggle("w3-show");
  });

  //oninput="w3.filterHTML('#id01', 'li', this.value)"
  // let toggler = document.querySelector("nav.top .toggler");
  // DEBUG && console.log("toggler: ", toggler);

  // let collapsable = document.querySelector("nav.top .collapsable");
  // DEBUG && console.log("collapsable: ", collapsable);

  // toggler.addEventListener("click", () => {
  //   DEBUG && console.log("click: ", toggler);

  //   //collapsable.classList.toggle("d-flex");
  //   collapsable.classList.toggle("show");
  // });

  // getElements = function(id) {
  //   if (typeof id == "object") {
  //     return [id];
  //   } else {
  //     return document.querySelectorAll(id);
  //   }
  // };
})();
