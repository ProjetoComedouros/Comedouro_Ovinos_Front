<!-- components/FeatureCard.vue -->
<template>
  <div class="col-md-4 text-center feature-card">
    <i :class="['bi', icon]"></i>
    <h5 class="mt-3">{{ title }}</h5>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['icon', 'title', 'text']
};
</script>