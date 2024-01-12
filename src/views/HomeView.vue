<template>
    <div class="todo-app">
    <h1>Employees</h1>

    <table class="todo-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Education</th>
          <th v-if="this.isAdmin">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.mobile }}</td>
          <td>{{ todo.email }}</td>
          <td>{{ todo.education.name }}</td>
          
          <td v-if="this.isAdmin">
            <button v-if="this.isAdmin" @click="openModal(todo)">Edit</button>
            <button v-if="this.isAdmin" @click="deleteEmployee(todo.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>Add New Employees</h2>
    <form @submit.prevent="addEmployee" class="add-todo-form">
      <div class="col-md-12">
        <div>
          <input type="text" v-model="empObject.name" placeholder="Name" />
        </div>
        <br>
        <div>
          <input type="text" v-model="empObject.email" placeholder="Email" />
        </div>
        <br>      
        <div>
          <input type="text" v-model="empObject.mobile" placeholder="Mobile Number" />
        </div> 
        <br>    
        <div>
    <select v-model="empObject.educationId" @change="handleChange" class="form-control" id="dropdown">
      <option value="">-- Select Education --</option>
      <option v-for="item in dropdownValues" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
  </div>
        <br>     
        <div>
          <input type="file" @change="handleFileChange" />
          <img v-if="updatedEmployee.contentType" :src="updatedEmployee.contentType" alt="Current Photo" />
<img v-if="filePreview" :src="filePreview" alt="File Preview" />
                </div>  
        <br>    
        <div>
  <button type="submit">Add Employee</button>
</div>
            </div>
    </form>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Edit Employee</h2>
        <form @submit.prevent="addEmployee" class="add-todo-form">
      <div class="col-md-12">
        <div>
          <input type="text" v-model="updatedEmployee.name" placeholder="Name" />
        </div>
        <br>
        <div>
          <input type="text" v-model="updatedEmployee.email" placeholder="Email" />
        </div>
        <br>      
        <div>
          <input type="text" v-model="updatedEmployee.mobile" placeholder="Mobile Number" />
        </div> 
        <br>    
        <div>
    <select v-model="updatedEmployee.educationId" @change="handleChange" class="form-control" id="dropdown">
      <option value="">-- Select Education --</option>
      <option v-for="item in dropdownValues" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
  </div>
        <br>     
        <div>
          <input type="file" @change="handleFileChange" />
          <img v-if="updatedEmployee.contentType" :src="updatedEmployee.contentType" alt="Current Photo" />
          <img v-if="filePreview" :src="filePreview" alt="File Preview" />
                </div>  
        <br>    
        <div>
</div>
            </div>
    </form>        
    <div class="modal-buttons">
          <button @click="updateEmployee" type="submit" class="save-btn">Save</button>
          <button @click="closeModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const BASE_URL = 'http://localhost:7145/api/Employee/GetAllEmployees'; 
  
  export default {
    data() {
      return {
        filePreview: null,
        photoUrl:'C:/Users/Rock/OneDrive/Desktop/',
        empObject:{
          name:'',
          mobile:'',
          email:'',
          educationId:0,
          imageFile:null
        },
        todos: [],
        isAdmin:false,
        newTodoTitle: '',
        showModal: false,
        dropdownValues: [],
        selectedValue: '',
      updatedEmployee: { id: null
        ,  name:'',
          mobile:'',
          email:'',
          educationId:0,
          imageFile:null},
      };
    },
    mounted() {
      const store = useStore();
      this.getUserData(store);
    },
    methods: {
     async handleFileChange(event) {
      const file = event.target.files[0];
      if (this.updatedEmployee) {
        this.updatedEmployee.imageFile = event.target.files[0];
        this.filePreview = URL.createObjectURL(file);
      }
      this.empObject.imageFile = event.target.files[0];
    },
      async getUserData(store) {
        const route = useRouter();
        try {
          const response = await fetch('http://localhost:7145/api/Identity/GetUser', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });
  
          if (response.ok) {
            const content = await response.json();
            store.dispatch('setAuth', true);
            if (content.roleId==1) {
              this.isAdmin=true;
            }
            else{
              this.isAdmin=false; 
            }
            this.GetAllEmployees();
          } 
          else {
            store.dispatch('setAuth', false);
            await route.push('/login')
          }
        } catch (e) {
          console.error('Error fetching user data:', e);
          store.dispatch('setAuth', false);
          await route.push('/login')
        }
      },
      async GetAllEmployees() {
        try {
          const response = await axios.get(BASE_URL);
          this.todos = response.data;
         const getDropDownValues= await axios.get('http://localhost:7145/api/Employee/GetEducationDropDown');
          this.dropdownValues = getDropDownValues.data;
        } catch (error) {
          console.error('Error fetching employee items:', error);
        }
      },
      async addEmployee() {
        try {
        let formData = new FormData();
      formData.append('name', this.empObject.name);
      formData.append('email', this.empObject.email);
      formData.append('educationId', this.empObject.educationId);
      formData.append('mobile', this.empObject.mobile);
      formData.append('imageFile', this.empObject.imageFile);
      
      await fetch('http://localhost:7145/api/Employee/CreateEmployee',{
        method: 'POST',
        body: formData,
                }).then(async response => {
                  this.GetAllEmployees();
                  alert('Employee Added');
})
          }
         catch (error) {
          alert('Error When Adding Employee');
          console.error('Error adding Employee:', error);
        }     
      },
      async deleteEmployee(id) {
        try {
          await axios.delete(`${'http://localhost:7145/api/Employee'}/${id}`);
          this.todos = this.todos.filter(todo => todo.id !== id);
          alert('Employee Deleted Successfully')
        } catch (error) {
          console.error('Error when deleting Employee:', error);
        }
      },
      openModal(todo) {
      this.updatedEmployee = { ...todo };
      this.showModal = true;
    },
    async updateEmployee() {
      try {
        let formData = new FormData();
        formData.append('id', this.updatedEmployee.id);
      formData.append('name', this.updatedEmployee.name);
      formData.append('email', this.updatedEmployee.email);
      formData.append('educationId', this.updatedEmployee.educationId);
      formData.append('mobile', this.updatedEmployee.mobile);
      formData.append('imageFile', this.updatedEmployee.imageFile);
      
      await fetch('http://localhost:7145/api/Employee/UpdateEmployee',{
        method: 'POST',
        body: formData,
                }).then(async response => {
                  this.GetAllEmployees();
                  alert('Employee Updated Successfully');
})
          }
         catch (error) {
          alert('Error When Updating Employee')
          console.error('Error When Updating Employee:', error);
        }
        
    },
    closeModal() {
      this.showModal = false;
      this.updatedEmployee = { id: null, title: '' }; 
    },
  },
  };
  </script>
  <style>
  .todo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.todo-table th, .todo-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.add-todo-form {
  display: flex;
  margin-bottom: 20px;
}

.add-todo-form input[type="text"] {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

.add-todo-form button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-todo-form button:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  top: 0;
  left: 8pc;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-content input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.modal-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
}

.save-btn {
  background-color: #4caf50;
  color: white;
}

.save-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}
img {
  max-width: 100%;
  max-height: 200px; 
  margin-top: 10px;
}
  </style>
  