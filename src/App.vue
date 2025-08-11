<template>
  <router-view />
</template>

<script>
import '@/assets/geral.css'
import Navbar from '@/components/Navbar.vue'
import HomePage from '@/views/HomePage.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { Navbar, HomePage, Footer }
}
</script>
