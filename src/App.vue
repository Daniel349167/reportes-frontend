<template>
  <div>
    <header class="app-header">
      <div class="logo"></div>
    </header>

    <main>
      <h1 class="title">Generador de reportes TK</h1>
      <ReportList />
    </main>
  </div>
</template>

<script>
import ReportList from '@/components/ReportList.vue'

export default {
  name: 'App',
  components: {
    ReportList
  }
}
</script>
