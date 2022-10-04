<template>
  <form @submit.prevent="onSubmit">
    <input v-model="name" />
    <textarea v-model="description"></textarea>
    <button type="submit">create</button>
  </form>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from '../graphql/mutations';

export default {
  name: 'TodoForm',

  data(){
    return {
      name: '',
      description: '',
    }
  },

  methods: {
    async onSubmit() {
      const todo = {name: this.name, description: this.description};
      await API.graphql({
        query: createTodo,
        variables: { input: todo }
      })
      this.clearForm();
    },
    clearForm() {
      this.name = '';
      this.description = '';
    }
  }
}
</script>

<style scoped>
</style>
