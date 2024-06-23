const translations = {
    en: {
      discover: "Discover",
      dashboard: "Dashboard",
      top_songs: "Top Songs",
      top_artists: "Top Artists",
      top_genres: "Top Genres",
      discover_songs: "Discover Songs",
      login: "Login",
      instructions_heading: "You might like these songs 🔎",
      instructions_paragraph: "Here you'll find your top 50 song recommendations in 2 different options. <br /> Try both of them for the best experience! 😀 <br> If you want new recommendations just refresh the page! 🔄",
      based_on: "Based on:",
      based_on_songs: "My top songs",
      based_on_artists: "My top artists",
      position: "Position",
      image: "Image",
      name: "Name",
      artists: "Artists",
      playback: "Playback",
      play: "Play",
      pause: "Pause",
      add_to_playlist: "Add to Playlist",
      success_message: "Song added to playlist successfully! Check your Spotify! :D Datafy Recommendations",
      failure_message: "Failed to add track to playlist.",
      preview_unavailable: "Preview URL not available for this track."
    },
    hu: {
      discover: "Felfedezés",
      dashboard: "Irányítópult",
      top_songs: "Top Dalok",
      top_artists: "Top Előadók",
      top_genres: "Top Műfajok",
      discover_songs: "Felfedezés",
      login: "Bejelentkezés",
      instructions_heading: "Ezek a dalok tetszhetnek 🔎",
      instructions_paragraph: "Itt találhatók a legjobb 50 dalajánlások 2 különböző lehetőségben. <br /> Próbáld ki mindkettőt a legjobb élmény érdekében! 😀 <br> Ha új ajánlásokat szeretnél, frissítsd az oldalt! 🔄",
      based_on: "Szűrés:",
      based_on_songs: "A kedvenc dalaim alapján",
      based_on_artists: "A kedvenc előadóim alapján",
      position: "Pozíció",
      image: "Kép",
      name: "Név",
      artists: "Előadók",
      playback: "Lejátszás",
      play: "Lejátszás",
      pause: "Szünet",
      add_to_playlist: "Hozzáadás a lejátszási listához",
      success_message: "A dalt sikeresen hozzáadtuk a lejátszási listához! Nézd meg a Spotify-on! :D Datafy Ajánlások",
      failure_message: "Nem sikerült hozzáadni a dalt a lejátszási listához.",
      preview_unavailable: "Az előnézeti URL nem érhető el ehhez a dalhoz."
    }
  };
  

  function translatePage(language) {
    document.querySelector('.header-text').innerText = translations[language].discover;
    document.getElementById('dashboard').innerText = translations[language].dashboard;
    document.getElementById('topSongs').innerText = translations[language].top_songs;
    document.getElementById('topArtists').innerText = translations[language].top_artists;
    document.getElementById('topGenres').innerText = translations[language].top_genres;
    document.getElementById('discoverSongs').innerText = translations[language].discover_songs;
    document.getElementById('login').innerText = translations[language].login;
    document.querySelector('.inst-heading').innerText = translations[language].instructions_heading;
    document.querySelector('.inst-paragraph').innerHTML = translations[language].instructions_paragraph;
    document.querySelector('.time-range').innerText = translations[language].based_on;
    document.getElementById('fetch-options').options[0].innerText = translations[language].based_on_songs;
    document.getElementById('fetch-options').options[1].innerText = translations[language].based_on_artists;
    document.querySelector('thead th:nth-child(1)').innerText = translations[language].position;
    document.querySelector('thead th:nth-child(2)').innerText = translations[language].image;
    document.querySelector('thead th:nth-child(3)').innerText = translations[language].name;
    document.querySelector('thead th:nth-child(4)').innerText = translations[language].artists;
    document.querySelector('thead th:nth-child(5)').innerText = translations[language].playback;
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

