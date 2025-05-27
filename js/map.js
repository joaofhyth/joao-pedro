const pontosTuristicos = [
  {
    nome: "Serra de Ouro Branco",
    tipo: "natural",
    lat: -20.5218,
    lng: -43.7642,
    descricao: "Um dos principais atrativos naturais da cidade.",
    imagem: "img/serra.jpg"
  },
  {
    nome: "Igreja Matriz de Santo Antônio",
    tipo: "historico",
    lat: -20.5235,
    lng: -43.7650,
    descricao: "Importante patrimônio histórico do município.",
    

  },
{nome:" escola municipal",
    tipo: "onde mora o mais lindo de ob",
    lat: -20.5165863,
    lng: -43.703186,
    descricao: "fachada azul.",
    imagem: "img/igreja.jpg"}
  
];

const map = L.map('map').setView([-20.5227, -43.7646], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = [];

function addMarkers(filteredPoints) {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
  filteredPoints.forEach(ponto => {
    const marker = L.marker([ponto.lat, ponto.lng]).addTo(map);
    marker.bindPopup(`
      <strong>${ponto.nome}</strong><br />
      <img src="${ponto.imagem}" alt="${ponto.nome}" style="width:100px; border-radius:5px; margin-top:5px;" /><br />
      <p>${ponto.descricao}</p>
      <button onclick="startRouting(${ponto.lat}, ${ponto.lng})">Traçar Rota</button>
    `);
    markers.push(marker);
  });
}

function startRouting(lat, lng) {
  if (window.routeControl) {
    map.removeControl(window.routeControl);
  }
  window.routeControl = L.Routing.control({
    waypoints: [
      L.latLng(-20.5227, -43.7646), // Ponto fixo (exemplo: centro da cidade)
      L.latLng(lat, lng)
    ],
    routeWhileDragging: true
  }).addTo(map);
}

function filterPoints() {
  const filterValue = document.getElementById('filter').value.toLowerCase();
  const searchValue = document.getElementById('searchBox').value.toLowerCase();
  const filtered = pontosTuristicos.filter(ponto => {
    const matchTipo = filterValue === '' || ponto.tipo === filterValue;
    const matchNome = ponto.nome.toLowerCase().includes(searchValue);
    return matchTipo && matchNome;
  });
  addMarkers(filtered);
}

document.getElementById('filter').addEventListener('change', filterPoints);
document.getElementById('searchBox').addEventListener('input', filterPoints);

addMarkers(pontosTuristicos);

// Iniciar Swiper
const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
  loop: true,
  autoplay: {
    delay: 4000,
    
  },
});