document.querySelectorAll(".play-sound").forEach(function(el) {
  el.addEventListener("mouseover", function() {
    if (el.hasAttribute("data-sound-mouseover")) {
      playSound(el.getAttribute("data-sound-mouseover"), el.hasAttribute("data-sound-bypass"));
    }
  });
  el.addEventListener("mouseleave", function() {
    if (el.hasAttribute("data-sound-mouseleave")) {
      playSound(el.getAttribute("data-sound-mouseleave"), el.hasAttribute("data-sound-bypass"));
    }
  });
  el.addEventListener("input", function() {
    if (el.hasAttribute("data-sound-input")) {
      playSound(el.getAttribute("data-sound-input"), el.hasAttribute("data-sound-bypass"));
    }
  });
});

if (localStorage.getItem("noplay") == "y" && localStorage.getItem("set-by-self") == "y") {
  // remove overlap prevention
  localStorage.setItem("noplay", "n");
  localStorage.removeItem("set-by-self");
}

if (localStorage.getItem("noplay")) {
  document.querySelector(".header select").value = localStorage.getItem("noplay");
}

function playSound(url, bypass) {
  if (localStorage.getItem("noplay") == "y" && !bypass) {return;}
  var p = document.createElement("audio");
  p.src = url;
  document.querySelector("body").append(p);
  p.play();
  p.onended = function() {p.remove();}
}

function playThenTake(url, dest) {
  if (localStorage.getItem("noplay") == "y") {
    window.open(dest, "_self");
    return;
  }

  if (!localStorage.getItem("noplay") || localStorage.getItem("noplay") == "n") {
    // prevent overlap
    localStorage.setItem("noplay", "y");
    localStorage.setItem("set-by-self", "y");
  }


  var p = document.createElement("audio");
  p.src = url;
  document.querySelector("body").append(p);
  p.play();
  p.onended = function() {
    p.remove(); 
    window.open(dest, "_self");
  }
}