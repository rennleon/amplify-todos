<template>
  <div>
    <h1>History</h1>

    <ul>
      <li v-for="todo in sortedTodos" :key="todo.id">
        <h5>{{ todo.title }}</h5>
        <small><b>done at:</b> {{ parseDate(todo.updatedAt) }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { deleteTodo } from '../graphql/mutations';
import { parseDate } from '../utils/date-utils.js'

export default {
  name: 'TodosHistory',
  props: { todos: [] },
  
  computed: {
    sortedTodos() {
      this.deleteExtraTodos();
      return [...this.todos].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
  },
  
  methods: {
    parseDate,

    deleteTodo(id) {
      API.graphql({
        query: deleteTodo,
        variables: { input: { id } }
      });
    },

    deleteExtraTodos() {
      this.todos
        .slice(10)
        .forEach(t => this.deleteTodo(t.id));
    }
  },
}
</script>

<style scoped>
</style>
