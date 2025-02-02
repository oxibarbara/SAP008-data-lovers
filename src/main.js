import { calculoAgregado, ordenarPersonagens, filtrarGenero, filtrarEspecie, filtrarStatus } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const cardsContainer = document.querySelector("#cardsContainer")
const characters = data.results;

function gerarCards(caracters) {
  const templateCards = caracters.map((item) => {
    const cardTemplate = `
        <div class="cards">
            <img class="cardsImg" src="${item.image}" alt="${item.name}">
            <ul class="cardText" style="list-style: none">                       
            <li>Name: ${item.name}</li>
            <li>Status: ${item.status}</li>
            <li>Species: ${item.species}</li>
            <li>Gender: ${item.gender}</li>
            <li>Location: ${item.origin.name}</li>
            </ul>                
        </div>
        `;
    return cardTemplate;

  }).join("")

  cardsContainer.innerHTML = templateCards
}
gerarCards(characters);

const selectOrderAZ = document.querySelector("#order");
const printAZOrdered = () => {
  const orderAZ = selectOrderAZ.value;
  const resultAZ = ordenarPersonagens(characters, orderAZ);
  gerarCards(resultAZ)
}
selectOrderAZ.addEventListener("change", printAZOrdered);

const selectGenero = document.querySelector("#opcoesGenero");
const generoFiltrado = () => {
  const gender = selectGenero.value
  const resultadoGenero = filtrarGenero(characters, gender)
  //linha 40 mexi no PF
  const resultadoporgeneroeespecie= filtrarEspecie(resultadoGenero,"Alien")
  const calculo = calculoAgregado(characters.length, resultadoporgeneroeespecie.length);
  document.getElementById("exibirCalculo").innerHTML =
    "Essa categoria representa " + calculo + "% dos personagens"

  gerarCards(resultadoporgeneroeespecie)
};
selectGenero.addEventListener("change", generoFiltrado);

const selectEspecie = document.querySelector("#opcoesEspecie");
const especieFiltrada = () => {
  const species = selectEspecie.value
  const resultadoEspecie = filtrarEspecie(characters, species)
  const calculo = calculoAgregado(characters.length, resultadoEspecie.length);
  document.getElementById("exibirCalculo").innerHTML =
    "Essa categoria representa " + calculo + "% dos personagens"

  gerarCards(resultadoEspecie)
};
selectEspecie.addEventListener("change", especieFiltrada);

const selectStatus = document.querySelector("#opcoesStatus");
const statusFiltrado = () => {
  const status = selectStatus.value
  const resultadoStatus = filtrarStatus(characters, status)
  const calculo = calculoAgregado(characters.length, resultadoStatus.length);
  document.getElementById("exibirCalculo").innerHTML =
    "Essa categoria representa " + calculo + "% dos personagens"

  gerarCards(resultadoStatus)
};
selectStatus.addEventListener("change", statusFiltrado);
