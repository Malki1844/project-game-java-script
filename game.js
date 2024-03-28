        //משתנים של המשחק
        let timer = 0;
        let timerElement = document.querySelector("#timer");
        let Board = document.querySelector("#game-board");
        let snake = [{ x: 200, y: 200 }];
        let food = { x: 0, y: 0 };
        let direction = "right";
        let interval;
        let gameOver = false;
        let gameStarted = false;
        //לסדר את הכפתור כשהמשחק נגמר
        function startGame() {
            if (!gameStarted) {
                gameStarted = true;
                if (gameOver) {
                    snake = [{ x: 200, y: 200 }];
                    direction = "right";
                }

                init();
            }
        }

        // משתנה לכפתור התחלה
        let startButton = document.querySelector("#start-button");
        startButton.addEventListener("click", startGame);
        //לראות מה מצב המשחק
        function updateTimer() {
            if (!gameOver && gameStarted) {
                timer++;
                timerElement.textContent = timer + "s";
            } else {
                //לעצור את הטיימר אם המשחק נגמר
                clearInterval(interval);
            }
        }
        setInterval(updateTimer, 1000);

        //כפתור עצירה
        let pauseButton = document.querySelector("#pause-button");
        pauseButton.addEventListener("click", pauseGame);

        // כפתור המשך
        let resumeButton = document.querySelector("#resume-button");
        resumeButton.addEventListener("click", resumeGame);

        // פונקציה להשהיית המשחק
        function pauseGame() {
            clearInterval(interval);
            gameStarted = false;
        }

        // פונקציה להמשיך את המשחק
        function resumeGame() {
            if (!gameStarted) {
                interval = setInterval(move, 200);
                gameStarted = true;
            }
        }
        // להגרלת מיקום לאוכל וגם לבדוק שהנחש לא נמצא איפה שהאוכל מוגרל
        function getFood() {
            let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * 20) * 20;
        food.y = Math.floor(Math.random() * 20) * 20;

        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
        }
        //עצירת הטיימר כשהמשחק נגמר
        function stopGame() {
            clearInterval(interval);
            gameStarted = false;
            gameOver = true;
            // הסתרת הנחש והאוכל
            let snakeElements = document.getElementsByClassName("snake");
            let foodElement = document.getElementsByClassName("food");
            for (let i = 0; i < snakeElements.length; i++) {
                snakeElements[i].style.display = "none";
            }
            for (let i = 0; i < foodElement.length; i++) {
                foodElement[i].style.display = "none";
            }
        }
        // לצייר את הנחש והאוכל במשחק
        function draw() {
            Board.innerHTML = "";

            // לצייר ולהוסיף נחש
            for (let i = 0; i < snake.length; i++) {
                const segment = snake[i];
                let snakeElement = document.createElement("div");
                snakeElement.style.left = segment.x + "px";
                snakeElement.style.top = segment.y + "px";
                snakeElement.classList.add("snake");
                Board.appendChild(snakeElement);
            }
            // לצייר אוכל
            let foodElement = document.createElement("div");
            foodElement.style.left = food.x + "px";
            foodElement.style.top = food.y + "px";
            foodElement.classList.add("food");
            Board.appendChild(foodElement);
        }

        // להזיז את נחש
        function move() {
            let head = { x: snake[0].x, y: snake[0].y };
            // עדכן את מיקום הראש בהתאם לכיוון
            switch (direction) {
                case "up":
                    head.y -= 20;
                    break;
                case "down":
                    head.y += 20;
                    break;
                case "left":
                    head.x -= 20;
                    break;
                case "right":
                    head.x += 20;
                    break;
            }
            // לבדוק אם הנחש נוגע באוכל
            if (head.x === food.x && head.y === food.y) {
                snake.push({});
                getFood();
                snakeLengthElement = document.querySelector("#snake-length");
                snakeLength++;
                snakeLengthElement.textContent = "אורך הנחש: " + snakeLength;
            }

            // בדיקה האם הנחש נתקע בקיר או בעצמו
            if (
                head.x < 0 ||
                head.x + 20 > Board.offsetWidth ||
                head.y < 0 ||
                head.y + 20 > Board.offsetHeight ||
                snake.some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                stopGame();
                alert("Game Over");
                return;
            }

            // לעדכן את ראש הנחש
            for (let i = snake.length - 1; i > 0; i--) {
                snake[i] = { ...snake[i - 1] };
            }
            snake[0] = head;

            //להמשיך ליצור משחק
            draw();

        }
        //פונקציה למקשים של המקלדת
        function handlFunc(e) {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "down") direction = "up";
                    break;
                case "ArrowDown":
                    if (direction !== "up") direction = "down";
                    break;
                case "ArrowLeft":
                    if (direction !== "right") direction = "left";
                    break;
                case "ArrowRight":
                    if (direction !== "left") direction = "right";
                    break;
                default:
                    break;
            }
        }
        // אתחול משחק
        function init() {
            timer = 0;
            timerElement.textContent = "0s";
            snakeLength = 1;
            snakeLengthElement = document.querySelector("#snake-length");
            snakeLengthElement.textContent = "אורך הנחש: " + snakeLength;
            getFood();
            draw();
            interval = setInterval(move, 200);
            gameOver = false;
            document.addEventListener("keydown", handlFunc);
        }

        // התחלת המשחק
        if (gameStarted)
            init();