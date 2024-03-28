
        function changeColor() {
            let heading = document.querySelector("#h1_id");
            let colors = ["red", "blue", "green", "yellow"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            h1_id.style.color = randomColor;
        }
        setInterval(changeColor, 1000);
        // פונקציה לטופס כניסה
        function handleLogin(e) {
            e.preventDefault();
            const email = document.querySelector('#loginForm input[name="email"]').value;
            const password = document.querySelector('#loginForm input[name="password"]').value;

            // לבדוק שכל השדות מלאים
            if (email === "" || password === "") {
                alert("יש למלא את כל השדות");
                return;
            }

            // בודק אם המשתמש קיים בlocal storge
            const users = getUsersFromLocalStorage();
            let user;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    user = users[i];
                    break;
                }
            }
            if (user) {
                // אם המשתמש קיים או לא
                window.location.href = "game.html";
            } else {
                alert("אינך רשום יש קודם להירשם ואחר כך להתחבר");
            }
        }

        // פונקציה לרישום
        function handleRegistration(e) {
            e.preventDefault();
            const name = document.querySelector('#registrationForm input[name="name"]').value;
            const email = document.querySelector('#registrationForm input[name="email"]').value;
            const password = document.querySelector('#registrationForm input[name="password"]').value;

            // לבדוק שכל השדות מלאים
            if (name === "" || email === "" || password === "") {
                alert("יש למלאות את כל השדות");
                return;
            }

            // לבדוק האם המשתמש כבר קיים בlocal Storge
            const users = getUsersFromLocalStorage();
            // const userExists = users.some(u => u.email === email);
            let userExists = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    userExists = true;
                    break;
                }
            }
            if (userExists) {
                alert("קיים כבר משתמש עם פרטים אלו");
            } else {
                // ליצור אוביקט משתמש חדש
                const newUser = {
                    name: name,
                    email: email,
                    password: password
                };

                // לשמירת משתמש חדש בlocal storge
                users.push(newUser);
                saveUsersToLocalStorage(users);

                // לעמוד המשחק
                window.location.href = "game.html";
            }
        }

        //פונקציה לקבלת המשתמש מה-local Storge
        function getUsersFromLocalStorage() {
            const usersString = localStorage.getItem('users');
            return usersString ? JSON.parse(usersString) : [];
        }

        // פונקציה לשמור משתמש בlocal storge
        function saveUsersToLocalStorage(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        // להגשת טופס
        const loginForm = document.querySelector('#loginForm');
        const registrationForm = document.querySelector('#registrationForm');
        loginForm.addEventListener('submit', handleLogin);
        registrationForm.addEventListener('submit', handleRegistration);