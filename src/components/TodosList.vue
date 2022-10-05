<template>
  <div>
    <h1>Pending todo's</h1>
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id" 
        :todo="todo" />
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodosList',
  components: { TodoItem },
  props: { todos: [] },
}
</script>

<style scoped>
</style>
