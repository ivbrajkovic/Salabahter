// Enable debuging messages
let DEBUG = true;

(() => {
  let collapsable = document.querySelector("nav .collapsable");

  document.querySelector("nav .toggler").addEventListener("click", function() {
    DEBUG && console.log("click: ", this);
    collapsable.classList.toggle("w3-show");
  });

  document.getElementById("input-filter").addEventListener("input", function() {
    DEBUG && console.log("input: ", this);
    filterHTML("questions", ".answer", this.value);
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

  getElements = function(id) {
    if (typeof id == "object") {
      return [id];
    } else {
      return document.querySelectorAll(id);
    }
  };

  filterHTML = function(id, sel, filter) {
    let a, b, c, hit;
    // a = getElements(id);

    a = document.getElementById(id);
    // for (i = 0; i < a.length; i++) {

    // b = getElements(sel);
    b = a.querySelectorAll(sel);
    for (let i = 0; i < b.length; i++) {
      hit = 0;
      if (b[i].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        hit = 1;
      } else {
        c = b[i].getElementsByTagName("*");
        for (let ii = 0; ii < c.length; ii++) {
          if (c[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            hit = 1;
            break;
          }
        }
      }

      if (hit == 1) {
        b[i].style.display = "";
      } else {
        b[i].style.display = "none";
      }
    }
    // }
  };
})();
