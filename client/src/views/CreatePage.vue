<template>
  <!--<CreateForm></CreateForm>-->
  <EditForm @submit="sendForm"></EditForm>
</template>

<script>
//import CreateForm from '../components/CreateForm.vue'
import EditForm from '../components/EditForm.vue';

export default {
  name: 'CreatePage',
  components: {
    EditForm
  },
  methods: {
    sendForm(form) {
      this.axios.post('http://localhost:3020/dishes', form , {
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
