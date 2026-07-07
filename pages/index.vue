<template>
  <ShopPage />
</template>

<script setup>
// The shop page is the home page. Render its content directly so it is
// server-side rendered (no blank/footer-only flash while a client redirect runs).
import ShopPage from './shop.vue'
</script>
