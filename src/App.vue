<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header class="menu">
      <nav>
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/register">Registro</RouterLink>
          <RouterLink to="/login">Login</RouterLink>

        </div>
      </nav>
    </header>
    <div class="components"></div>
    <RouterView />
  </div>
</template>

<style scoped>
.menu {
  background-color: #333;
  color: white;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}
.components {
  margin-top: 100px;
}

.menu nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  justify-content: space-between;
  width: 60%;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media screen and (max-width: 768px) {
  .menu nav {
    flex-direction: column;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    margin: 5px 0;
  }
}
</style>
