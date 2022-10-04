<template>
  <div id="app">
    <TodoForm />

    <TodoItem
      v-for="todo in todos"
      :key="todo.id" 
      :todo="todo" />
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listTodos } from './graphql/queries';

import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',
  components: { TodoItem, TodoForm },

  data(){
    return {
      todos: []
    }
  },

  methods: {
    async fetchTodos() {
      const { data } = await API.graphql({ query: listTodos })
      this.todos = data?.listTodos?.items ?? [];
    }
  },

  beforeMount() {
    this.fetchTodos();
  }
}
</script>

<style>
#app {}
</style>
