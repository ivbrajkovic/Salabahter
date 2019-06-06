// console.log(DEBUG);
// var DEBUG = DEBUG || false;
// console.log(DEBUG);

(() => {
  // Enable debuging messages
  const DEBUG = true;

  // On input text handler
  const inputFilter = document.getElementById("input-filter");
  if (inputFilter)
    inputFilter.addEventListener("input", function() {
      DEBUG && console.log("input: ", this);
      // filterHTML("questions", ".answer", this.value);
      filterHTML(this.value);
    });
  DEBUG && console.log("inputFilter: ", inputFilter);

  // filterHTML = function(id, sel, filter) {
  // let root, outer, inner, hit;
  // a = getElements(id);
  // root = document.getElementById(id);
  // outer = root.querySelectorAll(sel);

  // Filter questions on input
  //
  const root = document.getElementById("questions");
  const outer = root.querySelectorAll(".answer");
  filterHTML = function(filter) {
    let inner, hit;
    //
    // Search all outer elements
    for (let i = 0; i < outer.length; i++) {
      hit = false;
      //
      if (outer[i].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        // Match found
        hit = true;
      } else {
        //
        // Get all inner elements
        inner = outer[i].getElementsByTagName("*");
        //
        // Search all inner elements
        for (let ii = 0; ii < inner.length; ii++) {
          if (inner[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            // Match found exit loop
            hit = true;
            break;
          }
        } // End loop
      }
      //
      // If show or hide element uppon match found
      if (hit) {
        outer[i].style.display = "";
      } else {
        outer[i].style.display = "none";
      }
    } // End loop
  };
})();
