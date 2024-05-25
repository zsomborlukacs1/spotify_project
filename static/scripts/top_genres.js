document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("fetch-options");
  const topGenresTable = document
    .getElementById("top-genres-table")
    .getElementsByTagName("tbody")[0];

  selectElement.addEventListener("change", function () {
    const selectedValue = selectElement.value;
    fetch(`/top-genres-${selectedValue}`)
      .then((response) => response.json())
      .then((data) => {
        topGenresTable.innerHTML = "";
        if (data.error) {
          const errorRow = topGenresTable.insertRow();
          const errorCell = errorRow.insertCell();
          errorCell.colSpan = 2;
          errorCell.textContent = `Error: ${data.error}`;
        } else {
          const uniqueGenres = [...new Set(data)];
          const topGenres = uniqueGenres.slice(0, 10);
          topGenres.forEach((genre, index) => {
            const genreRow = topGenresTable.insertRow();
            const positionCell = genreRow.insertCell();
            positionCell.textContent = index + 1;
            const genreCell = genreRow.insertCell();
            genreCell.textContent = genre;
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching top genres:", error);
      });
  });
  selectElement.dispatchEvent(new Event("change"));
});
