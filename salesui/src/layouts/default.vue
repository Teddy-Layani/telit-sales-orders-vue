<template>
  <v-main>
    <v-app-bar color="primary" :height="100" class="px-10">
      <img :src="logo" :height="68" />
    </v-app-bar>
    <router-view />
  </v-main>
</template>

<script setup>
import logo from '@/assets/telit-logo.svg';
//
</script>
