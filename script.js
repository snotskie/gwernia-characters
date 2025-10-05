addEventListener("load", () => {
  document.fonts.ready.then((fontFaces) => {
    fetch(`https://snotskie.com/ttrpg/export.json?t=${(new Date).getTime()}`).then((response) => response.json()).then((humanity) => {
      console.log(humanity);
      fetch(`/gwernia-characters/view.html?t=${(new Date).getTime()}`).then((response) => response.text()).then((view) => {
        fetch(`${location.pathname}/sheet.yaml?t=${(new Date).getTime()}`).then((response) => response.text()).then((sheet) => {
          const it = YAML.parse(sheet);
          it.humanity = humanity;
          window.it = it;
          document.body.innerHTML = Sqrl.render(view, it);
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
    });
  })  
});