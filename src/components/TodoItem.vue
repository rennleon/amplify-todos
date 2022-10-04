<template>
  <div class="todo-item">
    <h1>{{ name }}</h1>
    <small><b>{{ new Date().toISOString() }}</b></small>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    id: String,
    name: String,
    description: String,
  }
}
</script>

<style scoped>
</style>
