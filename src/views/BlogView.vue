<template>
  <section class="blog-view">
    <ol class="user-list">
      <li v-for="(user, index) in users" :key="index" class="user-item">
        <!-- nota: no jalo con el id, pero el email si -->
        <!-- <RouterLink :to="{ name: 'user', params: { id: user.id } }">
                    {{ user.name }}
                </RouterLink> -->
        <RouterLink :to="{ name: 'user', params: { id: user.email } }" class="user-link">
          {{ user.name }}
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<script lang="ts" setup>
import type IUser from '@/interfaces/IUser'
import UserService from '@/services/UserService'
import { onMounted, type Ref } from 'vue'

const service = new UserService()
const users: Ref<IUser[]> = service.getUsers()

onMounted(async () => {
  await service.fetchAll()
})
</script>

<style scoped>
.blog-view {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espacio entre los elementos */
}

.user-item {
  text-align: center;
  width: calc(50% - 10px); /* La mitad del espacio menos el margen */
  margin-bottom: 20px;
  background-color: #135bad;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
}

.user-link {
  color: #fffefe;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.user-link:hover {
  color: #000000;
}
</style>
