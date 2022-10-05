<template>
  <form @submit.prevent="onSubmit">
    <input ref="nameInput" v-model="name" />
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
    onSubmit() {
      this.$refs.nameInput.focus();
      const todo = this.getNewTodo();
      API.graphql({
        query: createTodo,
        variables: { input: todo }
      })
      this.clearForm();
    },

    getNewTodo() {
      return {
        done: false,
        name: this.name,
        description: this.description
      }
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
