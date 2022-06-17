<template>
    <div class="input-group mb-3 my-3" style="width:fit-content">
        <input v-model="amount" type="number" class="form-control" placeholder="Количество">
        <input v-model="measure" type="text" class="form-control" placeholder="Мера измерения">
        <span class="input-group-text">/</span>
        <input v-model="cost" type="number" class="form-control" placeholder="Цена">
        <span class="input-group-text">₽</span>
        <button @click="add" :disabled="emptyInput" type="button" class="btn bg-primary">Добавить</button>
    </div>
</template>

<script>
export default {
  name: 'CreatePortionInput',
  data() {
    return {
        amount: 0,
        measure: 'г.',
        cost: 0,
    }
  },
  computed: {
    emptyInput() {
        return this.amount == 0 || this.measure == '' || this.cost == 0;
    }
  },
  methods: {
    add() {
        this.$emit('create', this.amount, this.measure, this.cost);
        this.amount = 0;
        this.cost = 0;
        this.measure = '';
    }
  }
}
</script>

<style scoped>
    input {
        width:fit-content
    }
</style>
