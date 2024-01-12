<template>
    <form @submit.prevent="submit" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="loginViewModel.email" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="loginViewModel.password" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
</template>
<style>
html,
body {
  height: 100%;
}



.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
<script lang="ts">
    import {reactive} from 'vue';
    import axios from 'axios';
import { useRouter } from 'vue-router';
    export default{
        name:"LoginView",
        setup(){
            const loginViewModel= reactive({
                email:'',
                password:''
            });
            const route = useRouter();
            const submit = async ()=>{
                await fetch('http://localhost:7145/api/Identity/Login',{
                    method:'post',
                    headers:{ 'Content-type' : 'application/json'},
                    credentials:'include',
                    body:JSON.stringify(loginViewModel),
                }).then(async response => {
                await route.push('/')
})
.catch(error => {
    debugger
  // Handle errors
});
            }
            return {loginViewModel,submit};
        }
    }

</script>