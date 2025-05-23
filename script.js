addEventListener("load", () => {
  document.fonts.ready.then((fontFaces) => {
    console.log(...fontFaces);
    fetch("/gwernia-characters/view.html").then((response) => response.text()).then((view) => {
      fetch(`${location.pathname}/sheet.yaml`).then((response) => response.text()).then((sheet) => {
        document.body.innerHTML = Sqrl.render(view, YAML.parse(sheet));
        const dice = document.getElementById("dice");
        const box = new DICE.dice_box(dice);
        dice.addEventListener("click", () => {
          if (box.rolling) return;
          dice.classList.add("clear");
          dice.classList.remove("result");
        });

        let to = null;
        let ds = [];
        window.queueRoll = function(dx){
          clearTimeout(to);
          ds.push(dx);          
          to = setTimeout(() => {
            box.setDice(ds.join("+"))
            box.start_throw(() => {
              // before throw
              //dice.style.opacity = "100";
              //dice.style.left = "0";
              dice.setAttribute("data-total", "");
              dice.classList.add("rolling");
              dice.classList.remove("clear");
            }, (result) => {
              // after throw
              console.log(result);
              dice.setAttribute("data-total", result.resultTotal);
              if (result.result.indexOf(1) >= 0){
                dice.setAttribute("data-total",
                                  dice.getAttribute("data-total") +
                                  getComputedStyle(document.body).getPropertyValue("--symbol-bump").replaceAll('"', '').replaceAll("'", "")
                                 );
              }

              dice.classList.remove("rolling");
              dice.classList.add("result");
              ds = [];
            });
          }, 400);
        }
      });
    });
  })  
});