//top tracks chart

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8000/top-tracks-chart')
    .then(response => response.json())
    .then(data => {
        const trackNames = data.items.map(item => item.name);
        const trackPopularity = data.items.map(item => item.popularity);

        renderChart(trackNames, trackPopularity);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function renderChart(trackNames, trackPopularity) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var config = {
            type: 'line',
            data: {
                labels: trackNames,
                datasets: [{
                    label: 'Track Popularity',
                    data: trackPopularity,
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1,
                    fill:true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            },
        };
        
        var myChart = new Chart(ctx, config);
    }
}); 

//top genres chart
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8000/top-genres-chart')
    .then(response => response.json())
    .then(data => {
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
            "#469748",
            "#16bb77", 
            "#3a8b4c",
            "#168742",
            "#527b37",
            "#05816a",
            "#678e20",
            "#337048",
            "#8fb441",
            "#627328"
        ];

        renderGenreChart(genreNames, genreCounts, backgroundColors);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function renderGenreChart(genreNames, genreCounts, backgroundColors) {
        var ctx = document.getElementById('genreChart').getContext('2d');
        var config = {
            type: 'pie',
            data: {
                labels: genreNames,
                datasets: [{
                    data: genreCounts,
                    backgroundColor: backgroundColors,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            },
        };

        var genreChart = new Chart(ctx, config);
    }
});


document.addEventListener("DOMContentLoaded", function() {
    fetch('/my-top-artist-last-year')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Hiba:', data.error);
            return;
        }
        // Adatok feldolgozása
        const artistName = data.name;
        const artistImage = data.image;
        // Cselekvés az adatokkal
        // Például: beállítjuk az előadó nevét és képét a weboldalon
        const numeroUnoBox = document.querySelector('.box:nth-child(5)'); // Az ötödik doboz kiválasztása
        const artistInfo = document.createElement('div');
        artistInfo.innerHTML = `<p class="box-text">${artistName}</p>`;
        if (artistImage) {
            const img = document.createElement('img');
            img.src = artistImage;
            img.id = 'artist-image'; // Az egyedi azonosító hozzáadása
            artistInfo.appendChild(img);
        }
        numeroUnoBox.appendChild(artistInfo);
    })
    .catch(error => console.error('Hálózati hiba:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const topTracksTable = document.getElementById("top-tracks-table").getElementsByTagName('tbody')[0];

    fetch(`/top-tracks-dash`)
        .then((response) => response.json())
        .then((data) => {
            topTracksTable.innerHTML = ""; 
            if (data.error) {
                const errorRow = topTracksTable.insertRow();
                const errorCell = errorRow.insertCell();
                errorCell.colSpan = 4;
                errorCell.textContent = `Error: ${data.error}`;
            } else {
                data.items.forEach((track, index) => {
                    const trackRow = topTracksTable.insertRow();
                    const positionCell = trackRow.insertCell();
                    positionCell.textContent = index + 1;
                    const trackImageCell = trackRow.insertCell();
                    const trackImage = document.createElement("img");
                    trackImage.src = track.album.images[0].url;
                    trackImage.alt = `${track.name} cover`;
                    trackImage.classList.add("track-image");
                    trackImageCell.appendChild(trackImage);
                    const trackNameCell = trackRow.insertCell();
                    const trackName = document.createElement("p");
                    trackName.textContent = track.name;
                    trackName.classList.add("track-name");
                    trackNameCell.appendChild(trackName);
                    const trackArtistsCell = trackRow.insertCell();
                    const trackArtists = document.createElement("p");
                    trackArtists.textContent = track.artists.map((artist) => artist.name).join(", ");
                    trackArtists.classList.add("track-artists");
                    trackArtistsCell.appendChild(trackArtists);
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching top tracks:", error);
        });
});
