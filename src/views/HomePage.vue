<template>
  <div>
    <NavbarSection />
    <router-view />
    <HeroSection />
    <ProductSection />
    <HowsWorkSection />
    <TeamSection />
  </div>
</template>

<script>
import NavbarSection from '@/components/HomePage/NavbarSection.vue'
import HeroSection from '@/components/HomePage/HeroSection.vue'
import ProductSection from '@/components/HomePage/ProductSection.vue'
import TeamSection from '@/components/HomePage/TeamSection.vue'
import HowsWorkSection from '@/components/HomePage/HowsWorkSection.vue'

export default {
  components: {
    NavbarSection,
    HeroSection,
    ProductSection,
    HowsWorkSection,
    TeamSection
  }
}
</script>