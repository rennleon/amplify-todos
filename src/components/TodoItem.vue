<template>
  <li class="todo-item">
    <h1>{{ todo.name }}</h1>
    <p>{{ todo.description }}</p>
    <small><b>{{ todo.createdAt }}</b></small>

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

export default {
  name: 'TodoItem',
  props: { todo: Object },
  methods: {
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
