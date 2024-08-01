const apiKey = '62c9c7de2f30407cea2e58aeceb69d29';
let cities = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Salvador',
    'Fortaleza',
    'Curitiba',
    'Manaus',
    'Recife',
    'Porto Alegre',
    'Belém',
    'Goiânia',
    'Guarulhos',
    'Campinas',
    'São Luís',
    'Maceió',
    'São Bernardo do Campo',
    'Natal',
    'São José dos Campos',
    'São Gonçalo',
    'Uberlândia'
];

// Chamada da API
async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data.main.temp;
}

// Função Assincrona para fazer o Fetch dos dados dentro de temperatures
async function apiFetchTemp(cities) {
    var temperatures = [];
    for (let city of cities) {
        let temp = await getWeatherData(city); // Busca os dados das cidades
        temperatures.push({ city, temp }); // Adiciona dentro do array temperatures o nome da Cidade e a Temperatura
    }
    return temperatures; // Retorna o array
}

// Função para criar o elemento
function createSquare(city, temp) {
    var square = document.createElement('div');
    let size;


    // Nestas condicionais ele verifica se a temperatura é satisfeita e aplica os seus atributos
    if (temp < 15) {
        size = 150;
        square.style.backgroundColor = 'blue';
        square.style.color = 'white';
    } else if (temp <= 20) {
        size = 250;
        square.style.backgroundColor = 'black';
        square.style.color = 'white';
    } else {
        size = 300;
        square.style.backgroundColor = 'red';
        square.style.color = 'white';
    }

    square.style.width = `${size}px`; // Define um size de largura de acordo com a condicional
    square.style.height = `${size}px`; // Define um size de altura de acordo com a condicional
    square.textContent = `${city}: ${temp}°C`; // Adiciona um texto na div criada
    square.classList.add('square'); // Adiciona a classe square na div criada
    return square;
}

// Função para carregar as cidades
function loadChart(data) {
    const treemap = document.getElementById('treemap'); // Busca o elemento ID da div treemap
    treemap.innerHTML = ''; // Limpa inicialmente os dados
    data.forEach(({ city, temp }) => {
        const square = createSquare(city, temp); // Cria o square
        treemap.appendChild(square); // Coloca o square no treemap
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const dataApi = await apiFetchTemp(cities); // Busca os dados da API
    loadChart(dataApi); // Carrega os dados iniciais antes do filtro de pesquisa assim que carrega o DOM

    // Busca os elementos da pesquisa
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', async (e) => { // Aciona o evento de clique do botão de pesquisa
        e.preventDefault();
        const searchCity = searchInput.value.trim(); // Remove todos espaços em branco da string
        if (searchCity) { // Mostra a cidade pesquisada caso ela exista na pesquisa
            const filterSearch = await apiFetchTemp([searchCity]); // Retorna o dado da api filtrado pelo nome, exemplo: data.searchCity em um array
            loadChart(filterSearch);
        } else { // Quando clicar no buscar sem dados ele mostra todas as 20 cidades iniciais
            loadChart(dataApi);
        }
    });
});