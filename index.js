//HACER UN BUCLE FOR EN EL REQUESTER PARA QUE SAQUE TODOS LOS NOMBRES DE LAS AGENCIAS
//Link: https://lienapuey.github.io/Project_AJAX_Oddity/

function printHTML(datos) {

  let cardBody = document.querySelectorAll('#mainRow')[0];
  let claves = Object.keys(datos);
  for (var i = 0; i < claves.length; i++) {
    for (var j = 0; j < datos[claves[i]].length; j++) {
      let stringText = datos[claves[i]][j]["missions"][0] != undefined ? datos[claves[i]][j]["missions"][0]["description"] : "No mission provided";
      stringText.split(" ");
      let stringTextArray = stringText.split(" ");
      let textLimit = stringTextArray.slice(0, 31);
      let textRead = textLimit.join(" ") + ' ...';
      let imagURL = "";
      switch (datos[claves[i]][j]["location"]["pads"][0]["agencies"][0]["name"]) {
        case "SpaceX":
          imagURL = "img/SpaceX.jpg";
          break;
          case "Rocket Lab Ltd":
          imagURL = "img/roquetlab.png"
          break;
          case "Indian Space Research Organization":
          imagURL = "img/ISRO.png"
          break;
          case "Russian Aerospace Defence Forces":
          imagURL = "img/VVKO.png"
          break;
      }
      cardBody.innerHTML +=
        `<div class="col-4">
        <img class="rounded-circle" src="${imagURL}" alt="Generic placeholder image" width="140" height="140">
        <h2>${datos[claves[i]][j]["name"]}</h2>
        <p>${datos[claves[i]][j]["missions"][0] != undefined ? textRead : "No mission provided"}</p>
        <p><a class="btn btn-secondary" href="#" role="button">Read more &raquo;</a></p>
        </div>
      `;
    }
  }
}

function getData() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return
    }

    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      var agencies = {};
      for (var i = 0; i < data["launches"].length; i++) {
        let nombre = data["launches"][i]["location"]["pads"][0]["agencies"][0]["name"];
        let lanzamientoProp = data["launches"][i]; // datos de los lanzamientos

        if (agencies[nombre] == undefined) {
          agencies[nombre] = [lanzamientoProp]; // pasa los datos de los lanzamientos según el nombre de la empresa

        } else {
          agencies[nombre].push(lanzamientoProp);
        }


      }
      printHTML(agencies);
    }
  }
  xhr.open('GET', "https://launchlibrary.net/1.3/launch/next/5", true);
  xhr.send();

}
getData();





//
