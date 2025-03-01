import { createStore } from 'vuex';
import { loginRequest, registerRequest } from '@/utils/api.js'; // Импортируем registerRequest

export default createStore({
    state: {
        token: localStorage.getItem('myAppToken') || '',
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutations: {
        AUTH_SUCCESS: (state, token) => {
            state.token = token;
        },
        AUTH_ERROR: (state) => {
            state.token = '';
        },
        REGISTER_SUCCESS: (state) => {
            // Здесь можно обработать успех регистрации, например, очистить форму
        },
    },
    actions: {
        AUTH_REQUEST: ({ commit }, user) => {
            return new Promise((resolve, reject) => {
                loginRequest(user)
                    .then((token) => {
                        commit('AUTH_SUCCESS', token);
                        localStorage.setItem('myAppToken', token);
                        resolve();
                    })
                    .catch((error) => {
                        commit('AUTH_ERROR');
                        localStorage.removeItem('myAppToken');
                        reject(error);
                    });
            });
        },
        REGISTER_REQUEST: ({ commit }, user) => {
            return new Promise((resolve, reject) => {
                fetch('http://localhost:3000/register', {  // Убедитесь, что URL правильный
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                    .then((response) => response.json())
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            });
        },
    },
});
