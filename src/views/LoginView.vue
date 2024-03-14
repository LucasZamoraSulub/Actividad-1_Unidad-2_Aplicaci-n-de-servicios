<template>
    <div class="container">
      <form class="form" @submit.prevent="submit">
        <p class="title">Inicio de sesión</p>
        <div class="form-camp">
          <label for="email">Correo Electrónico:</label>
          <input v-model="email" type="email" id="email" @input="validateEmail" />
          <p v-if="errors.some((error) => error.field === 'email')" class="error">
            {{ errors.find((error) => error.field === 'email')?.message }}
          </p>
        </div>
        <div class="form-camp">
          <label for="password">Contraseña:</label>
          <input v-model="password" type="password" id="password" @input="validatePassword" />
          <p v-if="errors.some((error) => error.field === 'password')" class="error">
            {{ errors.find((error) => error.field === 'password')?.message }}
          </p>
        </div>
        <button class="submit" :disabled="!isFormValid">Crear</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import UserService from '@/services/UserService'
  import { ref, computed } from 'vue'
  
  const service = new UserService()
  const email = ref('')
  const password = ref('')
  // nota: se tuvo que modificar por que TypeScript no puede inferir correctamente el tipo de los elementos en el array errors
  // const errors = ref([]);
  const errors = ref<Array<{ field: string; message: string }>>([])

  const validateEmail = () => {
    if (!email.value) {
      errors.value.push({ field: 'email', message: 'El correo es requerido' })
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errors.value.push({ field: 'email', message: 'El correo no es válido' })
    } else {
      errors.value = errors.value.filter((error) => error.field !== 'email')
    }
  }
  
  const validatePassword = () => {
    if (!password.value) {
      errors.value.push({ field: 'password', message: 'La contraseña es requerida' })
    } else if (password.value.length < 6) {
      errors.value.push({
        field: 'password',
        message: 'La contraseña debe tener al menos 6 caracteres'
      })
    } else {
      errors.value = errors.value.filter((error) => error.field !== 'password')
    }
  }
  
  const validateForm = () => {
    validateEmail()
    validatePassword()
  }
  
  const isFormValid = computed(() => {
    return (
      email.value &&
      /^\S+@\S+\.\S+$/.test(email.value) &&
      password.value &&
      errors.value.length === 0
    )
  })
  
  const submit = async () => {
    validateForm()
  
    if (errors.value.length === 0) {
      const user = {
        // nota: se comento el id, porque esta comentado dentro de la interfaz
        // id: id
        email: email.value,
        password: password.value
      }
      await service.loginUser(user)
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form {
    background-color: #160564;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
  }
  
  .title {
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-camp {
    margin-bottom: 20px;
  }
  
  label {
    color: rgb(255, 255, 255);
    font-weight: bold;
  }
  
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    background-color: rgb(122, 117, 117);
    width: 100%;
    padding: 10px;
    border: 1px solid #ada7a7;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  .error {
    color: #9c9999;
    font-weight: bold;
    margin-top: 5px;
  }
  
  .submit {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .submit:hover {
    background-color: #45a049;
  }
  
  .submit:disabled {
    color: rgb(163, 160, 160);
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .submit:disabled:hover {
    background-color: #cccccc;
  }
  </style>
  