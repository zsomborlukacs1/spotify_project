const translations = {
    en: {
      dashboard: "Dashboard",
      top_songs_sidebar: "Top Songs",
      top_artists_sidebar: "Top Artists",
      top_genres_sidebar: "Top Genres",
      discover_sidebar: "Discover Songs",
      login: "Log In",
      top_artists: "Top artists from the past month 🧑🏻‍🎨",
      top_songs: "Top 10 songs from the past month 🎵",
      top_genres: "Top 10 genres from the past month 🎭",
      discover: "Discover Songs",
      login: "Log In",
      recommendations: "You might also like these 🤔",
      new_feature: "New feature alert 🚨",
      discover_music: "Discover music with our Discover Music function! 🔎<br>Personalized recommendations are waiting for you to explore your new favorites! 🎶<br>Just click on the button, and you can dive into the world of music! 🎧💫",
      check_more: "Check out more",
      discover_button: "Discover Songs",
      addToPlayListButton: "Add to playlist"
    },
    hu: {
      dashboard: "Irányítópult",
      top_songs_sidebar: "Top Dalok",
      top_artists_sidebar: "Top Előadók",
      top_genres_sidebar: "Top Műfajok",
      discover_sidebar: "Felfedezés",
      login: "Bejelentkezés",
      top_artists: "Az elmúlt hónap legjobb előadói 🧑🏻‍🎨",
      top_songs: "Az elmúlt hónap legjobb dalai 🎵",
      top_genres: "Az elmúlt hónap legjobb műfajai 🎭",
      discover: "Felfedezés",
      login: "Bejelentkezés",
      recommendations: "Talán ezek is érdekelnek 🤔",
      new_feature: "Új funkció a láthatáron 🚨",
      discover_music: "Találj rá új zenékre a Felfedezés funkcióval! 🔎<br>Személyre szabott ajánlások várnak rád, hogy megtaláld új kedvenceidet! 🎶<br>Csak kattints a gombra, és merülj el a zene világában! 🎧💫",
      check_more: "Nézd meg a többit",
      discover_button: "Fedezz fel dalokat",
      addToPlayListButton: "Lejátszási listához adás"
    }
  };
  

  document.getElementById('languageSelector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    localStorage.setItem('preferredLanguage', selectedLanguage);
    translatePage(selectedLanguage);
  });
  
  function translatePage(language) {
    document.querySelector('.header-text').innerText = translations[language].dashboard;

    document.getElementById('dashboard').innerText= translations[language].dashboard;
    document.getElementById('topSongs').innerText= translations[language].top_songs_sidebar;
    document.getElementById('topArtists').innerText= translations[language].top_artists_sidebar;
    document.getElementById('topGenres').innerText= translations[language].top_genres_sidebar;
    document.getElementById('discoverSongs').innerText= translations[language].discover_sidebar;
    document.getElementById('login').innerText= translations[language].login;

    document.querySelector('.box-text').innerText = translations[language].top_artists;
    document.querySelectorAll('.box-text')[1].innerText = translations[language].top_songs;
    document.querySelectorAll('.box-text')[2].innerText = translations[language].top_genres;
    document.querySelectorAll('.box-text')[3].innerText = translations[language].recommendations;
    document.getElementById('artistButton').innerText = translations[language].check_more;
    document.querySelectorAll('.box-text')[4].innerText = translations[language].new_feature;
    document.querySelector('.feature-text').innerHTML = translations[language].discover_music;
    document.getElementById('discoverButton').innerText = translations[language].discover_button;
    document.getElementById('addToPlaylistButton').innerText = translations[language].addToPlayListButton;

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
  