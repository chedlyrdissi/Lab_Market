let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.classList.remove("active");
      document.getElementById("doSearchButton").hidden = true;
    } else {
      clearAccordions();    
      panel.style.display = "block";
      this.classList.add("active");
      document.getElementById("doSearchButton").hidden = false;
    }
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

function clearAccordions() {
  for ( let accor of acc ) {
    accor.nextElementSibling.style.display = "none";
    if (accor.classList.contains("active")) {
      accor.classList.remove("active");
      accor.nextElementSibling.style.maxHeight = null;
    }
  }
}

function getActiveAccordion() {
  let accs = document.getElementsByClassName("accordion");
  for ( let a of accs ) {
    if ( a.classList.contains("active") ) {
      return a.name;
    }
  }
}