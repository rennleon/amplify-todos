<template>
  <div id="app">
    <TodoForm />

    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id" 
        :todo="todo" />
    </ul>
    
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions';

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
    },

    subscribeToNewTodo() {
      API.graphql({ query: onCreateTodo })
        .subscribe({
          next: (evData) => {
            const newTodo = evData.value.data.onCreateTodo;
            if (this.todos.find(t => t.id === newTodo.id)) return;
            this.todos = [newTodo, ...this.todos];
          }
        })
    }
  },

  beforeMount() {
    this.subscribeToNewTodo();
    this.fetchTodos();
  }
}
</script>

<style>
#app {}
</style>
