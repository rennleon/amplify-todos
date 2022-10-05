<template>
  <div class="col-12 col-md-6">
    <h3>Pending todo's</h3>
    
    <div v-if="todos.length === 0" class="text-secondary">
      No todos to show
    </div>

    <ul v-else class="list-group list-group-flush">
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
