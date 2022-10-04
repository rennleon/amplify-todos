<template>
  <div class="todo-item">
    <h1>{{ todo.name }}</h1>
    <small><b>{{ todo.createdAt }}</b></small>
    <input type="checkbox" :checked="todo.done" />
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: { todo: Object }
}
</script>

<style scoped>
</style>
