document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("fetch-options");
    const topArtistsTable = document.getElementById("top-artists-table").getElementsByTagName('tbody')[0];

    selectElement.addEventListener("change", function () {
        const selectedValue = selectElement.value;
        fetch(`/my-top-artists-${selectedValue}`)
            .then((response) => response.json())
            .then((data) => {
                topArtistsTable.innerHTML = ""; 
                if (data.error) {
                    const errorRow = topArtistsTable.insertRow();
                    const errorCell = errorRow.insertCell();
                    errorCell.colSpan = 3;
                    errorCell.textContent = `Error: ${data.error}`;
                } else {
                    data.items.forEach((artist, index) => {
                        const artistRow = topArtistsTable.insertRow();
                        const positionCell = artistRow.insertCell();
                        positionCell.textContent = index + 1;
                        const artistImageCell = artistRow.insertCell();
                        const artistImage = document.createElement("img");
                        artistImage.src = artist.images[0].url;
                        artistImage.alt = `${artist.name} image`;
                        artistImage.classList.add("artist-image");
                        artistImageCell.appendChild(artistImage);
                        const artistNameCell = artistRow.insertCell();
                        const artistName = document.createElement("p");
                        artistName.textContent = artist.name;
                        artistName.classList.add("artist-name");
                        artistNameCell.appendChild(artistName);
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching top artists:", error);
            });
    });
    selectElement.dispatchEvent(new Event("change"));
});