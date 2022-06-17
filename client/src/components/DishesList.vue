<template>
  <div class="container">
    <div class="text-center" style="border-bottom: 2px solid black; padding: 2rem;">
      <h3> Выберите категорию меню </h3>
      <select class="custom-select" @change="selectCategory">
        <option v-for="category in categories" :key="category.name" :value="category.name" >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div>
      <DishCard v-for="item in dishes" :key="item.name" :dish="item" @delete="deleteDish">
      </DishCard>
    </div>
  </div>
</template>

<script>
import DishCard from './DishCard.vue'

export default {
  name: 'DishesList',
  data() {
    return { 
      categories: [], 
      dishes: [],
      selectedCategory: ''
    }
  },
  beforeMount() {
    this.fetchCategories().then(() => {
      this.fetchDishes(this.selectedCategory);
    });
  },
  components: {
    DishCard
  },
  methods: {
    getImageUrl(img) {
        return require(img);
    },
    selectCategory(event) {
      this.selectedCategory = event.target.value;
      this.fetchDishes(this.selectedCategory);
    },
    fetchCategories() {
      console.log('fetching...');
      return this.axios.get('http://localhost:3020/categories', {headers: {'Content-Type': 'application/json'}}).then(res => {
        console.log(res);
        this.categories = res.data;
        this.selectedCategory = this.categories[0].name;
      });
    },
    fetchDishes(category) {
      console.log(category);
        this.axios.get(`http://localhost:3020/dishes/${category}`, {
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
          console.log('dishes:', res);
          this.dishes = res.data;
        });
    },
    deleteDish(name) {
      this.axios.delete(`http://localhost:3020/dishes/${name}`, {
          headers: {'Content-Type': 'application/json'},
      }).then(res => {
        console.log('dishes:', res);
        this.fetchDishes(this.selectedCategory);
      });
    }
  }
}
</script>

<style scoped>

  .container {
    background-color: #fffef8 !important;
  }
  @media only screen and (max-width: 720px) {
    .container{
      width: 80vh;
    }
  }
  select {
    max-width: fit-content;
  }
</style>
