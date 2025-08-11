<template>
  <div>
    <NavbarSection />
    <router-view />
    <HeroSection />
    <FeatureCard
      v-for="(feature, index) in features"
      :key="index"
      :icon="feature.icon"
      :title="feature.title"
      :text="feature.text"
    />
    <ProductSection />
    <HowsWorkSection />
    <TeamSection />
  </div>
</template>

<script>
import NavbarSection from '@/components/HomePage/NavbarSection.vue'
import HeroSection from '@/components/HomePage/HeroSection.vue'
import ProductSection from '@/components/HomePage/ProductSection.vue'
import FeatureCard from '@/components/HomePage/FeatureCard.vue'
import TeamSection from '@/components/HomePage/TeamSection.vue'
import HowsWorkSection from '@/components/HomePage/HowsWorkSection.vue'

export default {
  components: {
    NavbarSection,
    HeroSection,
    ProductSection,
    HowsWorkSection,
    TeamSection,
    FeatureCard
  }
}
</script>