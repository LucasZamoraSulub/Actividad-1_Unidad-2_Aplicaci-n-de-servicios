<template>
  <div class="container">
    <div class="user-card">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"><strong>Nombre:</strong>{{ user.name }}</h5>
          <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
          <!-- <p class="card-text"><strong>Grupo:</strong> {{ user.group }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserService from '@/services/UserService'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const service = new UserService()
const user = service.getUser()

onMounted(async () => {
  const router = useRoute()
  const userId = router.params.id as string
  await service.fetchUser(userId)
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.user-card {
  width: 600px;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease;
}

.card-body {
  border-radius: 10px;
  background-color: #063a75;
  padding: 20px;
}

.card-title {
  text-align: center;
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
