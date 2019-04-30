//HACER UN BUCLE FOR EN EL REQUESTER PARA QUE SAQUE TODOS LOS NOMBRES DE LAS AGENCIAS
function printHTML(datos) {

  let cardBody = document.querySelectorAll('body > main > div.container.marketing > div:nth-child(1) > div')[0];
let claves = Object.keys(datos)
  for (var i = 0; i < claves.length; i++) {
    for (var j = 0; j < datos[claves[i]].length; j++) {
      console.log(datos[claves[i]][j]);
     cardBody.innerHTML +=
          `
        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">
          <rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>
        <h2>${datos[claves[i]][j]["name"]}</h2>
        <p>${datos[claves[i]][j]["missions"][0] != undefined ? datos[claves[i]][j]["missions"][0]["description"] : "Mission undefined"}</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      `
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

        if (agencies[nombre]== undefined) {
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
