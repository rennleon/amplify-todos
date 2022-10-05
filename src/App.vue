<template>
  <div id="app">
    <TodoForm />

    <ul>
      <TodoItem
        v-for="todo in doneTodos"
        :key="todo.id" 
        :todo="todo" />
    </ul>

    <ul>
      <TodoItem
        v-for="todo in pendingTodos"
        :key="todo.id" 
        :todo="todo" />
    </ul>
    
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listTodos } from './graphql/queries';
import { onCreateTodo, onDeleteTodo } from './graphql/subscriptions';

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

  computed: {
    doneTodos() {
      return this.todos.filter(t => t.done);
    },
    pendingTodos() {
      return this.todos.filter(t => !t.done);
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
    },

    subscribeToDeletedTodo() {
      API.graphql({ query: onDeleteTodo })
        .subscribe({
          next: (evData) => {
            const deletedTodo = evData.value.data.onDeleteTodo;
            this.todos = this.todos.filter(t => t.id !== deletedTodo.id);
          }
        })
    }
  },

  beforeMount() {
    this.subscribeToNewTodo();
    this.subscribeToDeletedTodo();
    this.fetchTodos();
  }
}
</script>

<style>
#app {}
</style>
