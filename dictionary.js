document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // JSON verisini kontrol etmek için
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
});
