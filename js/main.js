

//Tarjetas de presentacion //

$(".option").click(function () {
  $(".option").removeClass("active");
  $(this).addClass("active");
});

const clickButton = document.querySelector;

$(`.verCarrito`).click(() => {
  $(`.contenedorCarrito`).toggleClass(`verCarrito`);
});

const btnmodoOscuro = document.querySelector(`#modoOscuro`);

btnmodoOscuro.addEventListener(`click`, () => {
  document.body.classList.toggle(`dark`);
  btnmodoOscuro.classList.toggle(`active`);

  //guardamos el modo en locaStorage.//
  if (document.body.classList.contains(`dark`)) {
    localStorage.setItem(`dark-mode`, `true`);
  } else {
    localStorage.setItem(`dark-mode`, `false`);
  }
});

//obtenemos el modo actual.//

if (localStorage.getItem(`dark-mode`) === `true`) {
  document.body.classList.add(`dark`);
  btnmodoOscuro.classList.add(`active`);
} else {
  document.body.classList.remove(`dark`);
  btnmodoOscuro.classList.remove(`active`);
}
//fin del modo//
$(document).ready(function () {
  $(".redo").click(function () {
    $(".success, .error").toggle();
  });
});

let cartel = true;
class Joya {
  constructor(data) {
    this.id = data.id;
    this.promo = data.promo;
    this.peso = data.peso;
    this.nombre = data.nombre;
    this.info = data.info;
    this.precio = data.precio;
    this.imagenes = data.imagenes;
  }
}

const joya1 = new Joya({
  id: 0,
  promo: "3x2!",
  peso: "7 kilates de plata",
  nombre: " Collar Etiope",
  info: "Tamaño grande",
  precio: "$31000",
  imagenes: (URL = "img_depilarte/collarTiffany.PNG"),
});

const joya3 = new Joya({
  id: 2,
  promo: "2x1!",
  peso: "3K de oro bañado en oro",
  nombre: " Collar  Dual",
  info: "Tamaño Mediano ",
  precio: "$35000",
  imagenes: (URL = "img_depilarte/collarTiffany3.PNG"),
});
const joya4 = new Joya({
  id: 3,
  promo: "3x2!",
  peso: "3K bañada en Ocre",
  nombre: "Collar Persa",
  info: "Tamaño chico ",
  precio: "$70000",
  imagenes: (URL = "img_depilarte/collarTiffany4.PNG"),
});


let arrayJoyas = [];

arrayJoyas.push(joya1, joya2, joya3, joya4,joya5);

function joyaPorId(id) {
  return arrayJoyas.find((Joya) => Joya.id === id);
}

let tarjetas = $("#tarjetas")[0];

function generar() {
  $(tarjetas).html(null);
  $(boton).toggleClass("desaparecer");

  /*  const frag = document.createDocumentFragment(); */

  for (let arr of arrayJoyas) {
    let article = document.createElement("article");
    article.className = "col-12 col-md-6 col-lg-3 mb-3 mb-lg-0    d-flex ";

    let tarj = `
      <div class="card    ">
    
       <img class="img-fluid" src= "${arr.imagenes}"</img>
       
        <div class="card-body">
        <div class="card__inner ">
        <div class="card__face face__front ">
            <div class="card__header">
            <h5 class="card-title text-white">${arr.precio}<br></h5>
            
            <p class="card-text font-monospace ">   <i class="far fa-gem"></i> ${arr.peso}</p>

            <br>

          <button id="btn" class="bg-white btn  rounded-pill fw-bold text-dark btn-producto_promo" data-valor=${arr.id} >Ver Promo</button>
          <br>
          <button id="btn" class="bg-white btn  rounded-pill fw-bold text-dark btn-producto_comprar " data-valor=${arr.id} >Añadir a carrito</button>
            
        </div>
        </div>
        </div>
        </div>
      </div>
    `;
    $(article).html(tarj);

    tarjetas.append(article);
  }

  /* tarjetas.appendChild(frag) */
}

function guardarProductosLocalStorage(arr) {
  arr = this.obtenerProductosLocalStorage();
  arr.push(arr);
  localStorage.setItem("arr", JSON.stringify(arr));
}

const productos = document.getElementById("lista-productos");

let cantidadProductos = [0, 0, 0, 0];
let eventoDisminuir = [0, 0, 0, 0];
let eventoRepetir = [0, 0, 0, 0];
function insertarCarrito(id) {
  if (cantidadProductos[id] == 0) {
    cantidadProductos[id]++;

    let row = `<tr> <td>
    <img src="${arrayJoyas[id].imagenes}" width=100>
  </td>
  <td>${arrayJoyas[id].nombre}</td>
  <td>${arrayJoyas[id].precio}</td>

  <td> <button class="btn-disminuir-${id} btn-dis">-</button>
        <p class="joya-${id} textJoya">${cantidadProductos[id]}<p>
       <button class="btn-repetir-${id} btn-re">+</button>
      
      </td>
     
  <td>
    <a href="#" class="borrar-producto fas fa-times-circle" data-valor="${arrayJoyas[id].id}"></a>
   
   
  </td>
  
  </tr>
    `;
    $("#lista-productos").append(row);
    //agregar producto al carrito en localStorage//
    agregarProductoAlLocalStorage(arrayJoyas[id]);
    guardarLocalStorage(arrayJoyas[id]);
  } else if (cantidadProductos[id] >= 1) {
    cantidadProductos[id]++;
    $(`.joya-${id}`).html(`${cantidadProductos[id]}`);
    // actualizarProductoAlLocalStorage(arrayJoyas[id]);
    guardarLocalStorage(arrayJoyas[id]);
  }
}
function agregarProductoAlLocalStorage(id) {
  cantidadProductos[id]++;
}

//funcion creada nueva (guarda elementos en el localstorage y checkea si no hay antes)
function guardarLocalStorage(item) {
  //trae los elementos que estan en el localstorage y lo guarda en check exist
  let checkExist = localStorage.getItem("carritoPrevio");
  console.log(checkExist);
  //si check exist es null (cuando no hay ningun valor en el local storage) crea un array con el producto agregado
  if (checkExist == null) {
    let arrayCartOld = [];
    arrayCartOld.push(item);
    //agrega el item al local storage
    localStorage.setItem("carritoPrevio", JSON.stringify(arrayCartOld));
  } else {
    //en caso de que ya exista el valor en local storage
    //toma el localstorage viejo y lo agrega a un array
    let arrayviejo = JSON.parse(localStorage.getItem("carritoPrevio"));
    //agrega al array el elemento nuevo cargado por el carrito
    arrayviejo.push(item);
    //setea el local storage con los nuevos valores
    localStorage.setItem("carritoPrevio", JSON.stringify(arrayviejo));
  }
}
function botonesDeCarrito(id) {
  if (eventoRepetir[id] == 0) {
    $(`.btn-repetir-${id}`).click(() => {
      cantidadProductos[id]++;
      $(`.joya-${id}`).html(`${cantidadProductos[id]}`);
    });
  }
  eventoRepetir[id]++;
  if (eventoDisminuir[id] == 0) {
    $(`.btn-disminuir-${id}`).click(() => {
      if (cantidadProductos[id] >= 2) {
        cantidadProductos[id]--;
        $(`.joya-${id}`).html(`${cantidadProductos[id]}`);
      }
    });
  }
  eventoDisminuir[id]++;
}

$(tarjetas).click(temporal);

function temporal(ev) {
  ev.stopPropagation();

  if (ev.target.className.includes("btn-producto_promo")) {
    promocionar(ev.target.dataset.valor);
  }
  if (ev.target.className.includes("btn-producto_comprar")) {
    insertarCarrito(ev.target.dataset.valor);
    botonesDeCarrito(ev.target.dataset.valor);
  }
}

function promocionar(id) {
  console.log(id);
  swal({
    title: `  ${arrayJoyas[id].nombre}`,
    text: ` ${arrayJoyas[id].info}\n Llevate ${arrayJoyas[id].promo}`,
    icon: `success`,
  });
}
console.log(arrayJoyas);
const card = document.querySelector(`.card__inner`);

let boton = $("#btnGenera");

let arrayBotones = $("#button");

let accion = function () {
  generar();
};

$(boton).click(generar);
