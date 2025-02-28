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
        username: this.username,
        password: this.password,
      };

      // Ожидаем результата от dispatch и обрабатываем ошибку
      this.$store.dispatch('AUTH_REQUEST', user)
          .then(() => {
            this.$router.push('/'); // Перенаправляем на главную страницу после успешного входа
          })
          .catch((error) => {
            console.error("Login failed:", error);  // Логируем ошибку
            alert('Login failed: ' + error.message); // Показываем ошибку пользователю
          });
    },
  },
};
</script>
