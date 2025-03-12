document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            var wordTable = document.getElementById('wordTable').getElementsByTagName('tbody')[0];
            if (Array.isArray(data)) {
                data.forEach(wordObj => {
                    var row = wordTable.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.textContent = wordObj.word;
                    cell2.textContent = wordObj.meaning;
                });
            } else {
                console.error('JSON data is not an array:', data);
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
    
    // Arama işlevselliği
    document.getElementById('searchInput').addEventListener('keyup', function() {
        var searchValue = this.value.toLowerCase();
        var rows = document.getElementById('wordTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            var word = cells[0].textContent.toLowerCase();
            var meaning = cells[1].textContent.toLowerCase();
            if (word.includes(searchValue) || meaning.includes(searchValue)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });
});
