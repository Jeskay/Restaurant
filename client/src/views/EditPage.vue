<template>
  <!-- <UpdateForm :image="image" :name="name" :description="description" :category="categoryName"></UpdateForm> -->
  <EditForm 
    @submit="sendForm"
    :image="image" 
    :name="name" 
    :description="description" 
    :category="categoryName">
  </EditForm>
</template>

<script>
//import UpdateForm from '../components/UpdateForm.vue'
import EditForm from '../components/EditForm.vue'

export default {
  name: 'EditPage',
  props: {
    name: String,
    image: String,
    description: String,
    categoryName: String,
  },
  components: {
    EditForm
  },
  mounted() {
    console.log('Prop');
    console.log(this.name);
  },
  methods: {
    sendForm(form) {
      this.axios.put(`http://localhost:3020/dishes/${this.name}`, form , {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
        this.$router.push('/');
      });
    }
  }
}
</script>

<style>
</style>
