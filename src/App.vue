<template>

<Navbar />
<HomePage />
<Footer />

</template>

<script>

import '@/assets/geral.css'
import Navbar from '@/components/Navbar.vue'
import HomePage from '@/components/HomePage.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    HomePage,
    Footer
  }
};

</script>
