document.addEventListener('DOMContentLoaded', function() {
    let words = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let level = 1;
    let questionsPerLevel = 10;
    let timeLeft = 30; // Zaman sınırı (saniye)
    let timerInterval;
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

    document.getElementById('categorySelect').addEventListener('change', function() {
        loadNextQuestion();
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

    document.getElementById('showFlashcards').addEventListener('click', function() {
        const flashcardContainer = document.getElementById('flashcardContainer');
        flashcardContainer.classList.toggle('open');
    });

    function loadNextQuestion() {
        const category = document.getElementById('categorySelect').value;
        let filteredWords = words;
        if (category !== 'all') {
            filteredWords = words.filter(word => word.category === category);
        }
        if (filteredWords.length > 0) {
            currentQuestionIndex = Math.floor(Math.random() * filteredWords.length);
            const questionType = Math.random() < 0.5 ? 'multipleChoice' : 'definition';
            if (questionType === 'multipleChoice') {
                document.getElementById('question').textContent = 'What is the meaning of: ' + filteredWords[currentQuestionIndex].word + '?';
                loadMultipleChoiceAnswers(filteredWords[currentQuestionIndex].meaning);
            } else {
                document.getElementById('question').textContent = 'Which word means: ' + filteredWords[currentQuestionIndex].meaning + '?';
                loadMultipleChoiceWords(filteredWords[currentQuestionIndex].word);
            }
            document.getElementById('exampleSentence').textContent = 'Example: ' + filteredWords[currentQuestionIndex].example;
            resetTimer();
        } else {
            document.getElementById('question').textContent = 'No words available';
        }
    }

    function loadMultipleChoiceAnswers(correctAnswer) {
        const choices = [correctAnswer];
        while (choices.length < 4) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomAnswer = words[randomIndex].meaning;
            if (!choices.includes(randomAnswer)) {
                choices.push(randomAnswer);
            }
        }
        choices.sort(() => Math.random() - 0.5); // Karıştır
        const multipleChoiceContainer = document.getElementById('multipleChoiceContainer');
        multipleChoiceContainer.innerHTML = '';
        choices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'submit-btn';
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', function() {
                document.getElementById('answerInput').value = choice;
            });
            multipleChoiceContainer.appendChild(choiceBtn);
        });
    }

    function loadMultipleChoiceWords(correctWord) {
        const choices = [correctWord];
        while (choices.length < 4) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex].word;
            if (!choices.includes(randomWord)) {
                choices.push(randomWord);
            }
        }
        choices.sort(() => Math.random() - 0.5); // Karıştır
        const multipleChoiceContainer = document.getElementById('multipleChoiceContainer');
        multipleChoiceContainer.innerHTML = '';
        choices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'submit-btn';
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', function() {
                document.getElementById('answerInput').value = choice;
            });
            multipleChoiceContainer.appendChild(choiceBtn);
        });
    }

    function showFlashcards() {
        const flashcardContainer = document.getElementById('flashcards');
        flashcardContainer.innerHTML = '';
        words.forEach(wordObj => {
            const flashcard = document.createElement('div');
            flashcard.className = 'flashcard';
            const flashcardInner = document.createElement('div');
            flashcardInner.className = 'flashcard-inner';
            const flashcardFront = document.createElement('div');
            flashcardFront.className = 'flashcard-front';
            const flashcardBack = document.createElement('div');
            flashcardBack.className = 'flashcard-back';

            const wordElement = document.createElement('div');
            wordElement.className = 'flashcard-word';
            wordElement.textContent = wordObj.word;

            const meaningElement = document.createElement('div');
            meaningElement.className = 'flashcard-meaning';
            meaningElement.textContent = wordObj.meaning;

            flashcardFront.appendChild(wordElement);
            flashcardBack.appendChild(meaningElement);

            flashcardInner.appendChild(flashcardFront);
            flashcardInner.appendChild(flashcardBack);

            flashcard.appendChild(flashcardInner);
            flashcardContainer.appendChild(flashcard);
        });
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

    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            document.getElementById('timeLeft').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up! The correct answer was: ' + words[currentQuestionIndex].meaning);
                loadNextQuestion();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 30; // Zaman sınırı (saniye)
        document.getElementById('timeLeft').textContent = timeLeft;
        startTimer();
    }

    // Sayfanın en üstüne gitme butonu işlevselliği
    const topBtn = document.getElementById('topBtn');
    const topBtnContainer = document.getElementById('topBtnContainer');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            topBtnContainer.style.display = 'block';
        } else {
            topBtnContainer.style.display = 'none';
        }
    });

    topBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
