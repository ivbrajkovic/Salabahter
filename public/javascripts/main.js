(() => {
  // Enable debuging messages
  const DEBUG = true;

  // Find main route to set active navbar button
  const mainRoute = "/" + window.location.pathname.split("/")[1];
  DEBUG && console.log("mainRoute: ", mainRoute);

  const navLink = document.querySelectorAll(`nav a[href='${mainRoute}']`);
  if (navLink)
    navLink.forEach(element => {
      element.classList.add("w3-win8-teal");
    });
  DEBUG && console.log("navLink: ", navLink);

  const collapsable = document.querySelector("nav .collapsable");
  if (collapsable) {
    document.querySelector("nav .toggler").addEventListener("click", function() {
      DEBUG && console.log("click: ", this);
      collapsable.classList.toggle("w3-show");
    });
    collapsable.querySelectorAll("a").forEach(() => {
      collapsable.classList.remove("w3-show");
    });
  }
  DEBUG && console.log("navLink: ", collapsable);

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
