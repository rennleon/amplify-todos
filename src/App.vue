<template>
  <div id="app">
    <TodoForm />

    <TodosList :todos="pendingTodos" />

    <TodosHistory :todos="doneTodos" />    
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listTodos } from './graphql/queries';
import { onCreateTodo, onUpdateTodo, onDeleteTodo } from './graphql/subscriptions';

import TodoForm from './components/TodoForm.vue'
import TodosList from './components/TodosList.vue'
import TodosHistory from './components/TodosHistory.vue'

export default {
  name: 'App',
  components: { TodoForm, TodosList, TodosHistory },

  data() {
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

      const todos = data?.listTodos?.items ?? [];
      todos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      this.todos = todos;
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
    },

    subscribeToUpdatedTodo() {
      API.graphql({ query: onUpdateTodo })
        .subscribe({
          next: (evData) => {
            const updatedTodo = evData.value.data.onUpdateTodo;
            this.todos = this.todos.map(t => (t.id !== updatedTodo.id)? t: {...updatedTodo});
          }
        })
    }
  },

  mounted() {
    this.subscribeToNewTodo();
    this.subscribeToUpdatedTodo();
    this.subscribeToDeletedTodo();
    this.fetchTodos();
  }
}
</script>

<style>
#app {}
</style>
