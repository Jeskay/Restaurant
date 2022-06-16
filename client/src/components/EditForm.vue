<template>
    <div class="container bg-light p-3">
      <div v-if="loading" class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <form v-else @submit.prevent="submitForm">
        <div class="form-inline mb-3">
          <label class="mr-2" for="category">Категория меню</label>
          <select id="category" name="category" class="form-control">
              <option v-for="item in categories" :selected="item.name == category" :key="item.name">{{ item.name }}</option>
          </select>
          <div class="row mx-3">
            <input type="text" v-model="newCategory">
            <button :disabled="newCategory == ''" class="btn btn-secondary" @click="createCategory">Создать категорию</button>
          </div>
          
        </div>
        <div class="form-inline mb-3">
          <label class="mr-2" for="name">Название блюда</label>
          <input id="name" type="text" class="form-control" :disabled="noMutation" v-model="formName" name="dish" placeholder="Name of the dish" >
        </div>
        <div class="form-group">
            <img v-if="url" id="preview" :src="url" class="image-fluid">
            <img v-else :src="image" class="image-fluid">
            <div class="custom-file">
                <input class="custom-file-input" id="fileInput" type="file" name="image" accept="image/*" @change="loadPreview"/>
                <label class="custom-file-label" ref="fileLabel" for="fileInput" data-browse="Загрузить"> {{chosenFile}}</label>
            </div>
        </div>
        <div class="form-group">
          <textarea class="form-control" type="text" v-model="formDescription" name="description" placeholder="Description of the dish" rows="3"></textarea>
        </div>
          <button :disabled="invalidForm" class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
</template>

<script>

export default {
  name: 'EditForm',
  data() {
    return { 
      categories: [], 
      url: null,
      loading: false,
      chosenFile: 'Нет изображения',
      noMutation: false,
      formName: '',
      formDescription: '',
      newCategory: ''
    }
  },
  props: {
    image: String,
    name: String,
    category: String,
    description: String
  },
  created() {
    this.fetchCategories();
    if(this.name)
        this.noMutation = true;
    this.formName = this.name ?? '';
    this.formDescription = this.description ?? '';
  },
  computed: {
    invalidForm(){
        return !((this.image || this.url) && this.formName && this.formDescription)
    }
  },
  methods: {
    fetchCategories() {
        this.axios.get('http://localhost:3020/categories', {headers: {'Content-Type': 'application/json'}}).then(res => {
          console.log(res);
          this.categories = res.data;
          this.loading = false;
        });
    },
    submitForm(submitEvent){
        this.loading = true;
        const formData = new FormData(submitEvent.target);
        this.$emit('submit', formData);
    },
    loadPreview(event) {
        const file = event.target.files[0];
        if(!file) return;
        const url = URL.createObjectURL(file);
        this.url = url;
        this.chosenFile = file.name;
    },
    createCategory() {
        this.loading = true;
        this.axios.post(`http://localhost:3020/categories/${this.newCategory}`).then(res => {
            console.log(res);
            this.fetchCategories();
        });
    }
  }
}
</script>

<style>
    img {
        object-fit: cover; 
        max-height: 50rem;
        margin-bottom: 2rem;
    }
</style>
