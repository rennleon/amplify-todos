<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">Todo title</label>
      <input
        ref="titleInput"
        v-model="title"
        id="title"
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

import { alertCreatingTodo, alertError } from '../utils/alerts.js';

export default {
  name: 'TodoForm',

  data() {
    return {
      title: '',
      description: '',
    }
  },

  methods: {
    onSubmit() {
      this.$refs.titleInput.focus();
      const rawTodo = this.getTodoData();
      const todo = this.clearTodoFields(rawTodo);
      if (!this.isValidTodo(todo)) {
        alertError('Title is required');
        return;
      }

      alertCreatingTodo();

      API.graphql({
        query: createTodo,
        variables: { input: todo }
      })
      this.clearForm();
    },

    clearTodoFields(todo) {
      return {
        ...todo,
        title: todo.title?.trim(),
        description: todo.description?.trim(),
      };
    },

    isValidTodo(todo) {
      return !!todo.title;
    },

    getTodoData() {
      return {
        done: false,
        title: this.title,
        description: this.description
      }
    },

    clearForm() {
      this.title = '';
      this.description = '';
    }
  }
}
</script>

<style scoped>
</style>
