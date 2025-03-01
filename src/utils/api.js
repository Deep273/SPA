const API = process.env.VUE_APP_API;  // URL из переменной окружения

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        reject(`Error: ${response.status} - ${text}`);
                    });
                }
                return response.json();
            })
            .then((result) => resolve(result.data.user_token))
            .catch((error) => reject(`Error: ${error}`));
    });
};

export const registerRequest = (user) => {
    return new Promise((resolve, reject) => {
        console.log("Sending request to:", `${API}/register`);
        console.log("User data:", user);

        fetch(`${API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        reject(`Server error: ${response.status} - ${text}`);
                    });
                }
                return response.json(); // Преобразуем ответ в JSON, если код статуса 2xx
            })
            .then((result) => resolve(result))
            .catch((error) => reject(`Error: ${error}`));
    });
};
