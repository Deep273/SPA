<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const user = {
        email: this.username,  // здесь предполагается, что username это email
        password: this.password,
      };

      // Отправляем запрос на сервер
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Login failed: ' + response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Login successful', data);
            // Сохраняем токен или другую информацию, если нужно
            localStorage.setItem('user_token', data.user_token);
            this.$router.push('/');  // Перенаправляем на главную страницу
          })
          .catch((error) => {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);  // Показываем ошибку пользователю
          });
    },
  },
};
</script>
