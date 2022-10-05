<template>
  <li class="list-group-item list-group-item-action">
    <div class="d-flex justify-content-between">
      <h5 class="mb-1">{{ todo.title }}</h5>
      <small class="text-muted">{{ parseDate(todo.createdAt) }}</small>
    </div>

    <p class="mb-1">{{ todo.description }}</p>
    
    <div class="form-group form-check">
      <input
        ref="doneCheckbox"
        id="doneCheckbox"
        type="checkbox"
        :checked="todo.done"
        @click="onMarkAsDone"
        class="form-check-input" />
      <label class="form-check-label" for="doneCheckbox">done</label>
    </div>

    <div class="d-flex justify-content-end">
      <button
        ref="deleteBtn"
        @click="onDelete"
        class="btn btn-sm btn-outline-danger"
        >
        delete
      </button>
    </div>
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
