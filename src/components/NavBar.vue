<template>
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="auth">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    </template>
    <script lang="ts">
    import {computed} from 'vue';
    import {useStore} from "vuex";
    import { useRouter } from 'vue-router';

    export default {
      name: "NavBarView",
      setup() {
        const store = useStore();
        const route = useRouter();
        const auth = computed(() => store.state.authenticated)
        const logout = async () => {
          await fetch('http://localhost:7145/api/Identity/LogOut', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          }).then(async response => {
                await route.push('/login')
});
        }
    
        return {
          auth,
          logout
        }
      }
    }
    </script>