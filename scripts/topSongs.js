
        document.addEventListener("DOMContentLoaded", function () {
            const selectElement = document.getElementById("fetch-options");
            const topTracksTable = document.getElementById("top-tracks-table").getElementsByTagName('tbody')[0];
    
            selectElement.addEventListener("change", function () {
                const selectedValue = selectElement.value;
                fetch(`/my-top-tracks-${selectedValue}`)
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
            selectElement.dispatchEvent(new Event("change"));
        });