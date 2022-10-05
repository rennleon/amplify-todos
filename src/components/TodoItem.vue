<template>
  <li class="todo-item">
    <h1>{{ todo.title }}</h1>
    <p>{{ todo.description }}</p>
    <small><b>created at:</b> {{ parseDate(todo.createdAt) }}</small>

    <input
      ref="doneCheckbox"
      type="checkbox"
      :checked="todo.done"
      @click="onMarkAsDone"  />

    <button
      ref="deleteBtn"
      @click="onDelete"
      >
      delete
    </button>
  </li>
</template>

<script>
import { API } from 'aws-amplify';
import { updateTodo, deleteTodo } from '../graphql/mutations';
import { parseDate } from '../utils/date-utils.js'

export default {
  name: 'TodoItem',
  props: { todo: Object },
  methods: {
    parseDate,

    onDelete() {
      this.$refs.deleteBtn.disabled = true;
      API.graphql({
        query: deleteTodo,
        variables: { input: { id: this.todo.id } }
      });
    },

    onMarkAsDone() {
      this.$refs.doneCheckbox.disabled = true;
      API.graphql({
        query: updateTodo,
        variables: { input: { id: this.todo.id, done: true } }
      });
    }
  }
}
</script>

<style scoped>
</style>
