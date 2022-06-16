<template>
    <div v-if="loading" class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="card mx-auto my-5 p-4" style="max-width:50rem;">
        <img :src="dish.image" class="card-img-top img-fluid" style="object-fit: cover; max-height: 50rem;">
        <div class="card-body">
            <h5 class="card-title"> {{dish.name}}</h5>
            <p class="card-text">{{dish.description}}</p>
        </div>
        <button @click="editDish" class="btn btn-primary btn-lg mr-5" style=" width:fit-content">Редактировать</button>
        <button @click="deleteDish" class="btn btn-secondary btn-lg mt-3 mr-5" style=" width:fit-content">Удалить</button>
    </div>
</template>

<script>

export default {
  name: 'DishCard',
  props: {
    dish: Object
  },
  data() {
    return {loading: false}
  },
  methods: {
    editDish() {
      console.log('1');
      console.log(this.dish);
       this.$router.push({
          name: 'edit', 
          params:{
            name: this.dish.name,
            image: this.dish.image,
            description: this.dish.description,
            categoryName: this.dish.categoryName,
          }
       })
    },
    deleteDish() {
      this.loading = true;
      this.$emit('delete', this.dish.name); 
    }
  }
}
</script>

<style>

</style>
