<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">Todo title</label>
      <input
        ref="nameInput"
        v-model="name"
        id="name"
        type="text"
        class="form-control" />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        v-model="description" 
        id="description"
        class="form-control" >
      </textarea>
    </div>

    <button
      type="submit"
      class="mt-2 px-3 btn btn-primary btn-sm" >
      create
    </button>
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
