<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 text-center border-0">
      <div class="card-body">
        <i :class="['bi', icon, 'fs-1', 'text-success']"></i>
        <h5 class="card-title mt-3">{{ title }}</h5>
        <p class="card-text">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'title', 'text']
}
</script>