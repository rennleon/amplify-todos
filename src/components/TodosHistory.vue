<template>
  <div class="col-12 col-md-3 text-secondary">
    <h5>History</h5>

    <div v-if="todos.length === 0" class="text-secondary">
      Empty history
    </div>

    <ul v-else class="list-group list-group-flush">
      <li
        v-for="todo in sortedTodos"
        :key="todo.id"
        class="list-group-item text-secondary"
        >
        <h6>{{ todo.title }}</h6>
        <small>{{ parseDate(todo.updatedAt) }}</small>
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
  h6 {
    margin-bottom: 0;
  }

  small {
    font-size: 10px;
    padding: 0;
    margin: 0;
  }
</style>
