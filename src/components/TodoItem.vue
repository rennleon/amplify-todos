<template>
  <li class="todo-item">
    <h1>{{ todo.name }}</h1>
    <p>{{ todo.description }}</p>
    <small><b>{{ todo.createdAt }}</b></small>
    <input type="checkbox" :checked="todo.done" />
    <button @click="onDelete">delete</button>
  </li>
</template>

<script>
import { API } from 'aws-amplify';
import { deleteTodo } from '../graphql/mutations';

export default {
  name: 'TodoItem',
  props: { todo: Object },
  methods: {
    onDelete() {
      API.graphql({
        query: deleteTodo,
        variables: { input: { id: this.todo.id } }
      })
    }
  }
}
</script>

<style scoped>
</style>
