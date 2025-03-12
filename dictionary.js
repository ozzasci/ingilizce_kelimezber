document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')  // JSON dosyanızın yolunu burada belirtin
        .then(response => response.json())
        .then(data => {
            var wordTable = document.getElementById('wordTable').getElementsByTagName('tbody')[0];
            data.words.forEach(wordObj => {
                var row = wordTable.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.textContent = wordObj.word;
                cell2.textContent = wordObj.meaning;
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
