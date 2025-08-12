<template>
  <div>
    <NavbarSection />
    <router-view />
    <HeroSection />

    <BeneficiosSection />



    <HowsWorkSection />

    <TeamSection />

    <Footer />
  </div>
</template>

<script>
import NavbarSection from '@/components/HomePage/NavbarSection.vue'
import HeroSection from '@/components/HomePage/HeroSection.vue'
import BeneficiosSection from '@/components/HomePage/BenefitsSection.vue'
import TeamSection from '@/components/HomePage/TeamSection.vue'
import HowsWorkSection from '@/components/HomePage/HowsWorkSection.vue'
import Footer from '@/components/HomePage/Footer.vue'

export default {
  components: {
    NavbarSection,
    HeroSection,
    BeneficiosSection,
    HowsWorkSection,
    TeamSection,
    Footer
  }
};
</script>