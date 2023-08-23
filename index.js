import { pokemonCardTpl } from './pokemon-card.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchForm: document.querySelector('js-search-form'),
};

// повесили на форму обработчик события сабытия и будет вызываться ончерч
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  // запретить перезагрузку формы при отправке
  event.preventDefault();

  const form = event.currentTarget;
  // при сабмите мы тоже получаем ссылку на ввелью инпута
  const searchQuery = form.elements.query.value;

  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}

function fetchPokemon(pokemonId) {
  // сделать запрос на получение покемона с индификатором 2
  return (
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      // когда прийдет распарси ответ
      .then(response => {
        return response.json();
      })
  );
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}
