<template>
  <v-dialog v-bind="$attrs" :width="500">
    <v-card>
      <v-card-title v-if="title">{{ title }}</v-card-title>
      <v-card-text class="text-body-1">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          text="Close"
          class="text-capitalize"
          prepend-icon="mdi-close-circle"
          @click="emit('close')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});

const emit = defineEmits(["close"]);
</script>

<style lang="scss" scoped></style>
