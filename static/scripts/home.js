document.addEventListener("DOMContentLoaded", function () {
  fetch("/top-tracks-chart")
    .then((response) => response.json())
    .then((data) => {
      const trackNames = data.items.map((item) => item.name);
      const trackPopularity = data.items.map((item) => item.popularity);

      renderChart(trackNames, trackPopularity);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function renderChart(trackNames, trackPopularity) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(0, 230, 64, 1)");
    gradient.addColorStop(0.5, "rgba(0, 230, 0, 0.25)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    var config = {
      type: "line",
      data: {
        labels: trackNames,
        datasets: [
          {
            label: "Track Popularity",
            data: trackPopularity,
            backgroundColor: gradient,
            pointBackgroundColor: "white",
            borderColor: "#18D639",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          easing: "easeInOutQuad",
          duration: 520,
        },
        scales: {
          x: {
            grid: {
              color: "rgba(200, 200, 200, 0.05)",
              lineWidth: 1,
            },
          },
          y: {
            grid: {
              color: "rgba(200, 200, 200, 0.08)",
              lineWidth: 1,
            },
            beginAtZero: true,
          },
        },
        elements: {
          point: {
            backgroundColor: "white",
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          titleFontFamily: "Open Sans",
          backgroundColor: "rgba(0,0,0,0.3)",
          titleFontColor: "red",
          caretSize: 5,
          cornerRadius: 2,
          xPadding: 10,
          yPadding: 10,
        },
      },
    };

    var myChart = new Chart(ctx, config);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/top-genres-chart")
    .then((response) => response.json())
    .then((data) => {
      const genres = data.reduce((acc, genre) => {
        if (acc[genre]) {
          acc[genre]++;
        } else {
          acc[genre] = 1;
        }
        return acc;
      }, {});

      const genreNames = Object.keys(genres);
      const genreCounts = Object.values(genres);

      const backgroundColors = [
        "#004d00",
        "#006600",
        "#008000",
        "#009900",
        "#00b300",
        "#00cc00",
        "#00e600",
        "#00ff00",
        "#1aff1a",
        "#33ff33",
      ];

      renderGenreChart(genreNames, genreCounts, backgroundColors);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function renderGenreChart(genreNames, genreCounts, backgroundColors) {
    var ctx = document.getElementById("genreChart").getContext("2d");
    var config = {
      type: "pie",
      data: {
        labels: genreNames,
        datasets: [
          {
            data: genreCounts,
            backgroundColor: backgroundColors,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };

    var genreChart = new Chart(ctx, config);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/top-artists-dash")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }

      const sliderContainer = document.getElementById("sliderContainer");
      sliderContainer.innerHTML = "";
      data.items.forEach((item) => {
        const artistDiv = document.createElement("div");
        artistDiv.classList.add("slider-item");

        const artistImage = document.createElement("img");
        artistImage.src = item.images[0].url;
        artistImage.alt = item.name;

        const artistName = document.createElement("p");
        artistName.textContent = item.name;

        const spotifyLink = document.createElement("a");
        spotifyLink.href = item.external_urls.spotify;
        spotifyLink.textContent = "Listen on Spotify";

        artistDiv.appendChild(artistImage);
        artistDiv.appendChild(artistName);
        artistDiv.appendChild(spotifyLink);
        sliderContainer.appendChild(artistDiv);
      });

      initializeSlider();
    })
    .catch((error) => {
      console.error("Error fetching top artists data:", error);
    });

  function initializeSlider() {
    $("#sliderContainer").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1800,
      arrows: false,
      dots: false,
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  let intervalId;
  let audioPlayers = [];
  let isMuted = false;

  fetch("/recommendations-dash")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      const recommendationsContainer = document.getElementById(
        "recommendationsContainer"
      );
      recommendationsContainer.innerHTML = "";

      data.forEach((item) => {
        const recommendationDiv = document.createElement("div");
        recommendationDiv.classList.add("slider-item");

        const trackImage = document.createElement("img");
        trackImage.src = item.image;
        trackImage.alt = item.name;

        const trackName = document.createElement("p");
        trackName.textContent = item.name;

        const trackArtists = document.createElement("p");
        trackArtists.textContent = item.artists.join(", ");

        recommendationDiv.appendChild(trackImage);
        recommendationDiv.appendChild(trackName);
        recommendationDiv.appendChild(trackArtists);
        recommendationsContainer.appendChild(recommendationDiv);

        const audioPlayer = new Audio(item.preview_url);
        audioPlayer.autoplay = false;
        audioPlayer.loop = false;
        audioPlayer.volume = 0.1;
        audioPlayers.push(audioPlayer);
      });

      initializeRecommendationsSlider();

      playPreview(data[0].preview_url);

      if (!isMuted) {
        startAutoSlide(data);
      }
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
    });

  function initializeRecommendationsSlider() {
    $("#recommendationsContainer").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      dots: false,
    });
  }

  function playPreview(previewUrl) {
    if (!isMuted) {
      audioPlayers.forEach((player) => {
        player.pause();
        player.remove();
      });

      audioPlayers = [];
      const audioPlayer = new Audio(previewUrl);
      audioPlayer.autoplay = true;
      audioPlayer.loop = false;
      audioPlayer.volume = 0.1;
      audioPlayers.push(audioPlayer);
    }
  }

  function startAutoSlide(data) {
    intervalId = setInterval(function () {
      currentIndex = (currentIndex + 1) % data.length;

      $("#recommendationsContainer").slick("slickNext");

      playPreview(data[currentIndex].preview_url);
    }, 7000);

    if (!isMuted) {
      intervalId;
    }
  }

  const muteButton = document.getElementById("muteButton");
  muteButton.addEventListener("click", function () {
    isMuted = !isMuted;

    audioPlayers.forEach((player) => {
      player.muted = isMuted;
    });

    if (isMuted) {
      muteButton.textContent = "Unmute";
    } else {
      muteButton.textContent = "Mute";
    }
  });
});

document.getElementById("artistButton").addEventListener("click", function () {
  window.location.href = "/top-artists";
});

document.getElementById("discoverButton").addEventListener("click", function () {
  window.location.href = "/discover";
});