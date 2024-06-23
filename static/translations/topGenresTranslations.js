const translations = {
    en: {
      top_genres_dasboard: "Top Genres",
      dashboard: "Dashboard",
      top_songs_dashboard: "Top Songs",
      top_artists_dashboard: "Top Artists",
      discover: "Discover Songs",
      login: "Login",
      instructions_heading: "Top 10 Genres 🎭",
      instructions_paragraph: "Here you'll find your top genres in 3 different time intervals. Choose the one you like! 😀",
      time_range: "⏱️ Time range:",
      time_range_short: "4 weeks",
      time_range_medium: "6 months",
      time_range_long: "~1 year",
      position: "Position",
      name: "Name"
    },
    hu: {
      top_genres_dasboard: "Top Műfajok",
      dashboard: "Irányítópult",
      top_songs_dashboard: "Top Dalok",
      top_artists_dashboard: "Top Előadók",
      discover: "Felfedezés",
      login: "Bejelentkezés",
      instructions_heading: "Top 10 Műfaj 🎭",
      instructions_paragraph: "Itt találhatóak a kedvenc 10 műfajod 3 különböző időintervallum alapján. Válaszd ki a neked tetszőt! 😀",
      time_range: "⏱️ Időintervallum:",
      time_range_short: "4 hét",
      time_range_medium: "6 hónap",
      time_range_long: "~1 év",
      position: "Pozíció",
      name: "Név"
    }
  };
  
  function translatePage(language) {
    document.querySelector('.header-text').innerText = translations[language].top_genres_dasboard;
    document.getElementById('dashboard').innerText = translations[language].dashboard;
    document.getElementById('topSongs').innerText = translations[language].top_songs_dashboard;
    document.getElementById('topArtists').innerText = translations[language].top_artists_dashboard;
    document.getElementById('topGenres').innerText = translations[language].top_genres_dasboard;
    document.getElementById('discoverSongs').innerText = translations[language].discover;
    document.getElementById('login').innerText = translations[language].login;
    document.querySelector('.inst-heading').innerText = translations[language].instructions_heading;
    document.querySelector('.inst-paragraph').innerText = translations[language].instructions_paragraph;
    document.querySelector('.time-range').innerText = translations[language].time_range;
    document.getElementById('fetch-options').options[0].innerText = translations[language].time_range_short;
    document.getElementById('fetch-options').options[1].innerText = translations[language].time_range_medium;
    document.getElementById('fetch-options').options[2].innerText = translations[language].time_range_long;
    document.querySelector('thead th:nth-child(1)').innerText = translations[language].position;
    document.querySelector('thead th:nth-child(2)').innerText = translations[language].name;
  }
  
  document.querySelector('.en').addEventListener('click', function () {
    changeLanguage('en');
  });
  
  document.querySelector('.hu').addEventListener('click', function () {
    changeLanguage('hu');
  });
  
  document.querySelector('.en2').addEventListener('click', function () {
    changeLanguage('en');
  });
  
  document.querySelector('.hu2').addEventListener('click', function () {
    changeLanguage('hu');
  });
  
  function changeLanguage(language) {
    localStorage.setItem('preferredLanguage', language);
    translatePage(language);
    toggleFlags(language);
  }

  function toggleFlags(language) {
    if (language === 'en') {
        document.querySelector('.en2').style.display = 'none';
        document.querySelector('.hu2').style.display = 'block';
    } else if (language === 'hu') {
        document.querySelector('.en2').style.display = 'block';
        document.querySelector('.hu2').style.display = 'none';
    }
}
  

  document.addEventListener('DOMContentLoaded', function () {
    const defaultLanguage = localStorage.getItem('preferredLanguage') || 'en';
    translatePage(defaultLanguage);
    toggleFlags(defaultLanguage);
  });

  document.getElementById('languageSelector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    localStorage.setItem('preferredLanguage', selectedLanguage);
    translatePage(selectedLanguage);
  });