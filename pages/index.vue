<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Categories Section -->
    <CategoriesSection />
    
    <!-- Featured Products -->
    <FeaturedProductsSection />
    
    <!-- Features Section -->
    <FeaturesSection />
    
    <!-- CTA Section -->
    <CTASection />
    
    <!-- Stats Section -->
    <StatsSection />
  </div>
</template>

<script setup>
// Import components
import HeroSection from '~/components/HeroSection.vue'
import CategoriesSection from '~/components/CategoriesSection.vue'
import FeaturedProductsSection from '~/components/FeaturedProductsSection.vue'
import FeaturesSection from '~/components/FeaturesSection.vue'
import CTASection from '~/components/CTASection.vue'
import StatsSection from '~/components/StatsSection.vue'
import index from './admin/index.vue'
</script>
