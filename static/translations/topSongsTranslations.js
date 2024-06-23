const translations = {
    en: {
      top_songs_dasboard: "Top Songs",
      dashboard: "Dashboard",
      top_artists_dasboard: "Top Artists",
      top_genres_dasboard: "Top Genres",
      discover: "Discover Songs",
      login: "Login",
      instructions_heading: "Top 50 Songs 🎵",
      instructions_paragraph: "Here you'll find your top 50 tracks in 3 different time intervals. Choose the one you like! 😀<br>You can also make a playlist for these songs! 🤩",
      create_playlist: "Create playlist",
      time_range: "⏱️ Time range:",
      time_range_short: "4 weeks",
      time_range_medium: "6 months",
      time_range_long: "~1 year",
      position: "Position",
      image: "Image",
      name: "Name",
      artists: "Artists"
    },
    hu: {
      top_songs_dasboard: "Top Dalok",
      dashboard: "Irányítópult",
      top_artists_dasboard: "Top Előadók",
      top_genres_dasboard: "Top Műfajok",
      discover: "Felfedezés",
      login: "Bejelentkezés",
      instructions_heading: "Top 50 Dal 🎵",
      instructions_paragraph: "Itt található a kedvenc 50 zeneszámod 3 különböző időintervallum alapján. Válaszd ki a neked tetszőt! 😀<br>Lejátszási listát is készíthetsz ezekből a dalokból! 🤩",
      create_playlist: "Lejátszási lista létrehozása",
      time_range: "⏱️ Időintervallum:",
      time_range_short: "4 hét",
      time_range_medium: "6 hónap",
      time_range_long: "~1 év",
      position: "Pozíció",
      image: "Kép",
      name: "Név",
      artists: "Előadók"
    }
  };
  
  function translatePage(language) {
    document.querySelector('.header-text').innerText = translations[language].top_songs_dasboard;
    document.getElementById('dashboard').innerText = translations[language].dashboard;
    document.getElementById('topSongs').innerText = translations[language].top_songs_dasboard;
    document.getElementById('topArtists').innerText = translations[language].top_artists_dasboard;
    document.getElementById('topGenres').innerText = translations[language].top_genres_dasboard;
    document.getElementById('discoverSongs').innerText = translations[language].discover;
    document.getElementById('login').innerText = translations[language].login;
    document.querySelector('.inst-heading').innerText = translations[language].instructions_heading;
    document.querySelector('.inst-paragraph').innerHTML = translations[language].instructions_paragraph;
    document.getElementById('create-playlist-btn').innerText = translations[language].create_playlist;
    document.querySelector('.time-range').innerText = translations[language].time_range;
    document.getElementById('fetch-options').options[0].innerText = translations[language].time_range_short;
    document.getElementById('fetch-options').options[1].innerText = translations[language].time_range_medium;
    document.getElementById('fetch-options').options[2].innerText = translations[language].time_range_long;
    document.querySelector('thead th:nth-child(1)').innerText = translations[language].position;
    document.querySelector('thead th:nth-child(2)').innerText = translations[language].image;
    document.querySelector('thead th:nth-child(3)').innerText = translations[language].name;
    document.querySelector('thead th:nth-child(4)').innerText = translations[language].artists;
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