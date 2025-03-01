<template>
  <div>
    <h2>Register</h2>

    <!-- Форма регистрации -->
    <form @submit.prevent="registerUser">
      <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
      />
      <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
      />
      <button type="submit" :disabled="isLoading">Register</button>
    </form>

    <!-- Сообщения об ошибке или успешной регистрации -->
    <div v-if="isLoading">Registering...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    registerUser() {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.isLoading = true; // Показываем индикатор загрузки
      this.errorMessage = null; // Сброс ошибок
      this.successMessage = null; // Сброс сообщений об успехе

      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then((response) => response.json())  // Преобразуем ответ в JSON
          .then((data) => {
            this.isLoading = false; // Скрыть индикатор загрузки
            if (data.message === 'Registration successful') {
              this.successMessage = 'Registration successful! Please log in.';
              setTimeout(() => {
                this.$router.push('/login');  // Перенаправляем на страницу логина через 2 секунды
              }, 2000);
            }
          })
          .catch((error) => {
            this.isLoading = false; // Скрыть индикатор загрузки
            this.errorMessage = 'Registration failed: ' + error.message;  // Отображаем ошибку
          });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.success {
  color: green;
  font-weight: bold;
}
</style>
