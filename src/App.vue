<template>
  <toolbar></toolbar>
  <router-view></router-view>
</template>

<script>
import toolbar from '@/components/ToolBar.vue'

export default {
  name: 'App',
  components: {
    toolbar,
  }
}
</script>