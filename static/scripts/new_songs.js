document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("fetch-options");
  const topTracksTableBody = document
    .getElementById("top-tracks-table")
    .getElementsByTagName("tbody")[0];

  let audio = null;

  selectElement.addEventListener("change", function () {
    const selectedValue = selectElement.value;
    fetch(`/recommendations-${selectedValue}`)
      .then((response) => response.json())
      .then((data) => {
        topTracksTableBody.innerHTML = "";

        data.forEach((track) => {
          const row = document.createElement("tr");

          const positionCell = document.createElement("td");
          positionCell.textContent = track.position;
          row.appendChild(positionCell);

          const imageCell = document.createElement("td");
          const img = document.createElement("img");
          img.src = track.image;
          img.alt = track.name;
          img.width = 50;
          imageCell.appendChild(img);
          row.appendChild(imageCell);

          const nameCell = document.createElement("td");
          nameCell.textContent = track.name;
          row.appendChild(nameCell);

          const artistsCell = document.createElement("td");
          artistsCell.textContent = track.artists.join(", ");
          row.appendChild(artistsCell);

          const playbackCell = document.createElement("td");
          const playButton = document.createElement("button");
          playButton.textContent = "Play";
          playButton.classList.add("play-button");

          playButton.onclick = () => {
            if (track.preview_url) {
              if (!audio || audio.src !== track.preview_url) {
                audio = new Audio(track.preview_url);
              }
              if (audio.paused) {
                audio.play();
                playButton.textContent = "Pause";
              } else {
                audio.pause();
                playButton.textContent = "Play";
              }
            } else {
              console.error("Preview URL not available for this track.");
              alert("Preview URL not available for this track.");
            }
          };
          playbackCell.appendChild(playButton);
          row.appendChild(playbackCell);

          const addToPlaylistCell = document.createElement("td");
          const addToPlaylistButton = document.createElement("button");
          addToPlaylistButton.textContent = "Add to Playlist";
          addToPlaylistButton.classList.add("add-to-playlist-button");
          addToPlaylistButton.dataset.trackUri = track.track_uri;

          addToPlaylistButton.onclick = () => {
            const trackUri = addToPlaylistButton.dataset.trackUri;
            console.log("Track URI:", trackUri);

            const addToPlaylistLink = `/add-to-recommended-playlist?track_uri=${encodeURIComponent(
              trackUri
            )}`;

            fetch(addToPlaylistLink)
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  alert(
                    "Song added to playlist successfully! Check your Spotify! :D Datafy Recommendations"
                  );
                } else {
                  alert("Failed to add track to playlist.");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          };
          addToPlaylistCell.appendChild(addToPlaylistButton);
          row.appendChild(addToPlaylistCell);

          topTracksTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching top tracks:", error);
      });
  });

  selectElement.dispatchEvent(new Event("change"));
});
