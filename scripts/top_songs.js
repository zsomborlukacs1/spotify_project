document.getElementById('time-range').addEventListener('change', function() {
    var timeRange = document.getElementById('time-range').value;
    fetch('/my-top-tracks-' + timeRange)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Received data:', data); // Log the received data
            if (data.error) {
                console.log('Error:', data.error);
            } else {
                var table = document.createElement('table');
                var headerRow = document.createElement('tr');
                var nameHeader = document.createElement('th');
                nameHeader.textContent = 'Name';
                headerRow.appendChild(nameHeader);
                var artistHeader = document.createElement('th');
                artistHeader.textContent = 'Artist';
                headerRow.appendChild(artistHeader);
                table.appendChild(headerRow);
                data.forEach(function(track) {
                    console.log('Processing track:', track); // Log each track
                    var row = document.createElement('tr');
                    var nameCell = document.createElement('td');
                    nameCell.textContent = track.name;
                    row.appendChild(nameCell);
                    var artistCell = document.createElement('td');
                    artistCell.textContent = track.artist;
                    row.appendChild(artistCell);
                    table.appendChild(row);
                });
                document.getElementById('main').appendChild(table);
            }
        });
});
