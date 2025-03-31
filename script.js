// Mock data for demonstration
const mockData = {
  football: [
    {
      id: 1,
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      score: "2-1",
      time: "FT",
      competition: "Premier League",
      date: "2023-11-12"
    },
    {
      id: 2,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      score: "3-2",
      time: "FT",
      competition: "La Liga",
      date: "2023-11-11"
    }
  ],
  basketball: [
    {
      id: 1,
      homeTeam: "LA Lakers",
      awayTeam: "Golden State Warriors",
      score: "112-108",
      time: "Q4 2:34",
      competition: "NBA",
      date: "2023-11-12"
    }
  ],
  cricket: [
    {
      id: 1,
      homeTeam: "India",
      awayTeam: "Australia",
      score: "320/5 (50 ov) vs 280/9 (50 ov)",
      time: "India won by 40 runs",
      competition: "ODI Series",
      date: "2023-11-12"
    }
  ]
};

// Form submission handler
document.getElementById('scoreForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const sport = document.getElementById('sport').value;
  const team = document.getElementById('team').value.trim();
  
  // Simulate API call with timeout
  setTimeout(() => {
    const results = mockData[sport]?.filter(match => 
      match.homeTeam.toLowerCase().includes(team.toLowerCase()) || 
      match.awayTeam.toLowerCase().includes(team.toLowerCase())
    );
    
    if (results && results.length > 0) {
      localStorage.setItem('scoreResults', JSON.stringify({
        sport,
        team,
        matches: results
      }));
      window.location.href = 'results.html';
    } else {
      localStorage.setItem('scoreResults', JSON.stringify({
        sport,
        team,
        matches: []
      }));
      window.location.href = 'results.html';
    }
  }, 1000);
});

// Results page initialization
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('results.html')) {
    const resultsData = JSON.parse(localStorage.getItem('scoreResults'));
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const cardsContainer = document.getElementById('scoreCards');
    const resultsTitle = document.getElementById('resultsTitle');
    
    setTimeout(() => {
      loadingElement.style.display = 'none';
      
      if (!resultsData || resultsData.matches.length === 0) {
        errorElement.classList.remove('hidden');
        resultsTitle.textContent = `No results for ${resultsData?.team || 'your search'}`;
        return;
      }
      
      resultsTitle.textContent = `Results for ${resultsData.team} (${resultsData.sport})`;
      
      resultsData.matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300';
        card.innerHTML = `
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-gray-800">${match.homeTeam} vs ${match.awayTeam}</h3>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">${match.competition}</span>
            </div>
            <div class="text-center my-4">
              <p class="text-3xl font-bold text-gray-900">${match.score}</p>
              <p class="text-sm text-gray-500 mt-1">${match.time}</p>
            </div>
            <div class="flex justify-between items-center text-sm text-gray-500">
              <span>${match.date}</span>
              <button class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }, 1500);
  }
});