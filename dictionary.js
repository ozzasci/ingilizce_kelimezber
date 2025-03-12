document.addEventListener('DOMContentLoaded', function() {
    let words = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let level = 1;
    let questionsPerLevel = 10;
    const badges = {
        10: 'First 10 Words!',
        20: '20 Words Mastered!',
        50: '50 Words Pro!',
        100: '100 Words Champion!',
    };

    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            var wordTable = document.getElementById('wordTable').getElementsByTagName('tbody')[0];
            if (Array.isArray(words)) {
                words.forEach(wordObj => {
                    var row = wordTable.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.textContent = wordObj.word;
                    cell2.textContent = wordObj.meaning;
                });
                loadNextQuestion();
            } else {
                console.error('JSON data is not an array:', words);
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));

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

    document.getElementById('submitAnswer').addEventListener('click', function() {
        var answerInput = document.getElementById('answerInput');
        var userAnswer = answerInput.value.trim().toLowerCase();
        if (words.length > 0) {
            var correctAnswer = words[currentQuestionIndex].meaning.toLowerCase();
            if (userAnswer === correctAnswer) {
                score++;
                document.getElementById('score').textContent = score;
                if (score % questionsPerLevel === 0) {
                    level++;
                    document.getElementById('level').textContent = level;
                }
                updateProgressBar();
                checkForBadges();
                alert('Correct!');
            } else {
                alert('Incorrect. The correct answer was: ' + words[currentQuestionIndex].meaning);
            }
            answerInput.value = '';
            loadNextQuestion();
        } else {
            alert('No words available to ask.');
        }
    });

    function loadNextQuestion() {
        if (words.length > 0) {
            currentQuestionIndex = Math.floor(Math.random() * words.length);
            document.getElementById('question').textContent = 'What is the meaning of: ' + words[currentQuestionIndex].word + '?';
        } else {
            document.getElementById('question').textContent = 'No words available';
        }
    }

    function updateProgressBar() {
        var progress = (score % questionsPerLevel) / questionsPerLevel * 100;
        document.getElementById('progressBar').style.width = progress + '%';
    }
    
    function checkForBadges() {
        if (badges[score]) {
            addBadge(badges[score]);
        }
    }

    function addBadge(badgeText) {
        const badgeContainer = document.getElementById('badgeContainer');
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = badgeText;
        badgeContainer.appendChild(badge);
    }
});
