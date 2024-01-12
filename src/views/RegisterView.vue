<template>
    <form @submit.prevent="submit" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputEmail" class="sr-only">Name</label>
      <input v-model="registerViewModel.name" type="text" class="form-control" placeholder="Name" required autofocus>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="registerViewModel.email" type="email" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="registerViewModel.password" type="password" class="form-control" placeholder="Password" required>
      <div>
    <select v-model="registerViewModel.roleId" class="form-control" required id="dropdown">
      <option value="">-- Select Role --</option>
      <option v-for="item in dropdownValues" :key="item['id']" :value="item['id']">{{ item['name'] }}</option>
    </select>
  </div>
  <br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <a class="nav-link" href="/login">I have account, Sign in</a>
    </form>
    </template>
    <script>
    import {reactive} from 'vue';
    import axios from 'axios';
import { useRouter } from 'vue-router';
    export default{
        data(){
            return{
                dropdownValues:[],
            }
       } ,
       mounted() {
      this.GetAllEmployees();
    },
       methods:{
        name:"RegisterView",
        async GetAllEmployees() {
        try {        
         const getDropDownValues= await axios.get('http://localhost:7145/api/Identity/GetRolesDropDown');
          this.dropdownValues = getDropDownValues.data;
        } catch (error) {
          console.error('Error fetching Roles:', error);
        }
      },
    },
        setup(){
            const registerViewModel= reactive({
                name:'',
                email:'',
                password:'',
                roleId:0
            });
            const route = useRouter();
            const submit = async ()=>{
                await fetch('http://localhost:7145/api/Identity/register',{
                    method:'post',
                    headers:{ 'Content-type' : 'application/json'},
                    body:JSON.stringify(registerViewModel),
                }).then(async response => {
                await route.push('/login')
})
.catch(error => {
  // Handle errors
});
            }
            return {registerViewModel,submit};
        }
    }

</script>
