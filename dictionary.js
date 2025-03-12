<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Word Dictionary</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 20px;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        .category-container, .game-container, .badge-container {
            width: 90%;
            max-width: 800px;
            text-align: center;
            margin-bottom: 20px;
        }
        .category-container select {
            padding: 10px;
            font-size: 16px;
            width: 50%;
        }
        .score, .level, .timer {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .progress-bar-container {
            width: 100%;
            background-color: #ddd;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .progress-bar {
            width: 0;
            height: 20px;
            background-color: #007BFF;
            border-radius: 5px;
        }
        .question {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .example-sentence {
            font-size: 16px;
            margin-bottom: 20px;
            color: #555;
        }
        .answer-input, .submit-btn, .audio-btn {
            padding: 10px;
            font-size: 16px;
        }
        .submit-btn, .audio-btn {
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .submit-btn:hover, .audio-btn:hover {
            background-color: #0056b3;
        }
        .multiple-choice-container {
            margin-bottom: 20px;
        }
        .badge {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffcc00;
            border-radius: 10px;
            margin: 5px;
            font-size: 14px;
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Word Dictionary</h1>
    <div class="search-container">
        <input type="text" id="searchInput" class="search-input" placeholder="Search for words...">
    </div>
    <div class="category-container">
        <select id="categorySelect">
            <option value="all">All Categories</option>
            <option value="animals">Animals</option>
            <option value="food">Food</option>
            <option value="verbs">Verbs</option>
            <!-- Diğer kategorileri buraya ekleyin -->
        </select>
    </div>
    <div class="game-container">
        <div class="score">Score: <span id="score">0</span></div>
        <div class="level">Level: <span id="level">1</span></div>
        <div class="progress-bar-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="timer" id="timer">Time left: <span id="timeLeft">30</span> seconds</div>
        <div class="question" id="question"></div>
        <div class="example-sentence" id="exampleSentence"></div>
        <div class="multiple-choice-container" id="multipleChoiceContainer">
            <!-- Çoktan seçmeli şıklar buraya eklenecek -->
        </div>
        <input type="text" id="answerInput" class="answer-input" placeholder="Type your answer...">
        <button class="submit-btn" id="submitAnswer">Submit</button>
        <button class="audio-btn" id="playAudio">Play Audio</button>
    </div>
    <div class="badge-container" id="badgeContainer">
        <!-- Rozetler buraya eklenecek -->
    </div>
    <script src="dictionary.js"></script>
</body>
</html>
