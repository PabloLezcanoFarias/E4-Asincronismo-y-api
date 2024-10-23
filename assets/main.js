// Evita que al enviarse el formulario la web se recargue///////////////////
function formPreventDefault(){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

// Variable auxiliar para almacenar el innerHTML original del body para luego volver a renderizarlo//////////////////////////////////////////////////////////////
let origBackground = "";
let origBckgroundSize = "";
let origAnimation = "";

function saveOriginalBody() {
  const body = document.querySelector('body');
  origBackground = body.style.background
  origBackgroundSize = body.style.backgroundSize
  origAnimation = body.style.animation
}

function renderOriginalBody() {
  const body = document.querySelector("body");
  body.style.background = origBackground
  body.style.backgroundSize = origBackgroundSize
  body.style.animation = origAnimation
}
  
// Solicitud a la API y obtener pokémon solicitado en el formulario/////////////////////////////////////
async function getPokemon(numPoke){
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${numPoke}`);
    const data = await res.json()
    const main = document.getElementById('mainContainer')
    // Comprueba si el Pokémon solicitado es de 2 tipos//////////////////////
    if(data.types.length === 2){
      main.innerHTML = `<img src="${data.sprites.front_default}"/> 
                      <h1>${data.name}</h1>
                      <p>-Types: ${data.types[0].type.name} /
                      ${data.types[1].type.name}</p>
                      <p>-Height: ${data.height / 10}cm</p>
                      <p>-Weight: ${data.weight / 10}kg</p>`
    } else {
      main.innerHTML = `<img src="${data.sprites.front_default}"/> 
                      <h1>${data.name}</h1>
                      <p>-Types: ${data.types[0].type.name}</p>
                      <p>-Height: ${data.height / 10}cm</p>
                      <p>-Weight: ${data.weight / 10}kg</p>`
    }
  } catch (error) {
    // Renderiza el error en SECTION MAIN//////
    console.error(`el error es:${error}`)
    const main = document.getElementById("mainContainer");
    main.innerHTML = `<p> El número ingresado no corresponde a ningún Pokémon...</p>
                      <p>¡Un Missingno salvaje ha aparecido!</p>
                      <img src="./assets/img/MissingNO.webp" class= "main__imgMissingNO" alt="MissingNO" />`;
    // Cambia el background del body////////////
    const body = document.querySelector('body')
    body.style.background = "url('./assets/img/GlitchCity.webp') ";
    body.style.animation = "none";
  }
};

// Pone el formulario a la escucha del evento "submit", es decir, el envio del mismo (cuando se hace click en "enviar")////////// 
function getValueInput() {
  const form = document.getElementById('form')
  form.addEventListener('submit', (e) => {
    renderOriginalBody()
    const valueInput = Number(document.getElementById('inputForm').value)
    // Verifica que el input este vacío////////////////////////////////////
    if (valueInput === 0) {
      alert('No puedes dejar el campo vacío, debes ingresar un número.')
      return
    }
    // Llama a la función getPokemon y le pasa el valor obtenido del input como argumento//////////////////////////////////////////////////////////////////
    getPokemon(valueInput)
  })
};

// Llamada la funcion first()///////////////////////////////////////////////
function first() {
  formPreventDefault()
  saveOriginalBody()
  getValueInput()
};

// Llamada a la funcion first()/////////////////////////////////////////////
first();

