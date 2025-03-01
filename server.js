const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

// Подключаем CORS
app.use(cors());

// Разбираем JSON в теле запроса
app.use(bodyParser.json());

// Чтение данных из базы (db.json)
const readDatabase = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            if (!data) {
                resolve([]);  // Возвращаем пустой массив, если данных нет
            } else {
                try {
                    resolve(JSON.parse(data)); // Преобразуем строку JSON в объект
                } catch (e) {
                    reject(new Error('Failed to parse JSON data'));
                }
            }
        });
    });
};

// Запись данных в JSON-файл
const writeDatabase = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            }
            resolve();  // Успешно записали данные
        });
    });
};

// Регистрация нового пользователя
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    readDatabase()
        .then((users) => {
            // Пример проверки на занятый email
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            // Если email не занят, регистрируем пользователя
            const newUser = { email, password };
            users.push(newUser);

            // Записываем обновленный список пользователей в файл
            return writeDatabase(users).then(() => {
                res.status(201).json({ message: 'Registration successful', user: newUser });
            });
        })
        .catch((error) => {
            console.error('Error reading/writing database:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// API для логина
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    readDatabase()
        .then((users) => {
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json({ message: 'Login successful', user_token: 'fake-token' });
        })
        .catch((error) => res.status(500).json({ error: 'Failed to login' }));
});

// Обслуживаем статику для Vue из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Для всех остальных запросов возвращаем основной HTML-файл
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
