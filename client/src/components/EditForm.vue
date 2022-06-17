<template>
    <div class="container bg-light p-3">
      <div v-if="loading" class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <form v-else @submit.prevent="submitForm">
        <label class="mr-2" for="category">Категория меню</label>
        <div class="d-flex flex-row mb-3">
          <select id="category" name="category" style="width:fit-content" class="form-select">
              <option v-for="item in categories" :selected="item.name == category" :key="item.name">{{ item.name }}</option>
          </select>
          <div class="mx-3">
            <input type="text" v-model="newCategory">
            <button :disabled="newCategory == ''" class="btn btn-secondary mx-2" @click="createCategory">Создать категорию</button>
          </div>
        </div>
        <div class="mb-3">
          <label class="mr-2 form-label" for="name">Название блюда</label>
          <input id="name" type="text" class="form-control" style="width:fit-content" :disabled="noMutation" v-model="formName" name="dish" placeholder="Ваше блюдо" >
        </div>
        <div v-if="noMutation">
          <div class="hstack gap-3">
            <div v-for="portion in formPortions" :key="portion.measure + portion.amount + portion.cost" class="bg-white p-2">
              <span>{{portion.amount}} {{portion.measure}} / {{portion.cost}} ₽</span>
              <button type="button" :id="portion.id" class="btn-close ms-2" @click="() => removePortion(portion)"></button>
            </div>
          </div>
          <CreatePortionInput @create="addPortion"></CreatePortionInput>
        </div>
        <div class="form-group">
            <img v-if="url" id="preview" :src="url" class="image-fluid">
            <img v-else :src="image" class="image-fluid">
            <div class="custom-file">
                <input class="form-control" id="fileInput" type="file" name="image" accept="image/*" @change="loadPreview"/>
                <label class="form-label" ref="fileLabel" for="fileInput" data-browse="Загрузить"></label>
            </div>
        </div>
        <div class="form-group">
          <textarea class="form-control" type="text" v-model="formDescription" name="description" placeholder="Описание блюда" rows="3"></textarea>
        </div>
          <button :disabled="invalidForm" class="btn btn-success mt-3" type="submit">Отправить</button>
      </form>
    </div>
</template>

<script>
import CreatePortionInput from './CreatePortionInput.vue';

export default {
    name: "EditForm",
    data() {
        return {
            categories: [],
            formPortions: [{ id: 1, amount: 100, cost: 100, measure: "г." }],
            url: null,
            loading: false,
            noMutation: false,
            formName: "",
            formDescription: "",
            newCategory: ""
        };
    },
    props: {
        image: String,
        name: String,
        category: String,
        description: String,
        portions: Object
    },
    created() {
        this.fetchCategories();
        if (this.name)
            this.noMutation = true;
        this.formName = this.name ?? "";
        this.formDescription = this.description ?? "";
    },
    computed: {
        invalidForm() {
            return !((this.image || this.url) && this.formName && this.formDescription);
        }
    },
    methods: {
        fetchCategories() {
            this.axios.get("http://localhost:3020/categories", { headers: { "Content-Type": "application/json" } }).then(res => {
                console.log(res);
                this.categories = res.data;
                this.loading = false;
            });
        },
        async sendPortions() {
          return this.axios.post(`http://localhost:3020/portions/${this.formName}`, this.formPortions, { headers: { "Content-Type": "application/json" }});
        },
        submitForm(submitEvent) {
            this.loading = true;
            const formData = new FormData(submitEvent.target);
            this.sendPortions().then((res) => {
              console.log(res);
              this.$emit("submit", formData);
            });
            
        },
        loadPreview(event) {
            const file = event.target.files[0];
            if (!file)
                return;
            const url = URL.createObjectURL(file);
            this.url = url;
        },
        createCategory() {
            this.loading = true;
            this.axios.post(`http://localhost:3020/categories/${this.newCategory}`).then(res => {
                console.log(res);
                this.fetchCategories();
            });
        },
        removePortion(portion) {
            const index = this.formPortions.findIndex(p => p.amount == portion.amount && p.cost == portion.cost && p.measure == portion.measure);
            this.formPortions.splice(index, 1);
        },
        addPortion(amount, measure, cost) {
          console.log(amount, measure, cost);
          if(this.formPortions.find(p => p.amount == amount && p.cost == cost && p.measure == measure))
            return;
          this.formPortions.push({
            amount: amount,
            measure: measure,
            cost: cost
          })
        }
    },
    components: { CreatePortionInput }
}
</script>

<style>
    img {
        object-fit: cover; 
        max-height: 50rem;
        margin-bottom: 2rem;
    }
</style>
