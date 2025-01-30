<template>
  <v-dialog v-bind="$attrs" :width="600">
    <v-card>
      <div class="d-flex align-center justify-space-between px-4">
        <v-card-title class="text-textPrimary"> New Order Item </v-card-title>
        <v-btn variant="text" @click="emit('close')"
          ><v-icon icon="mdi-close"
        /></v-btn>
      </div>

      <v-divider />
      <v-card-text>
        <v-form
          v-if="orderItem"
          class="d-flex flex-column"
          @submit.prevent="emit('on-submit', orderItem)"
        >
          <v-autocomplete
            v-model="orderItem.Material"
            label="Material"
            variant="outlined"
            item-value="Matnr"
            item-title="Maktx"
            :items="materials"
          />
          <v-autocomplete
            v-model="orderItem.Plant"
            label="Plant"
            variant="outlined"
            item-value="PlantNumber"
            item-title="Name1"
            :items="plants"
          />
          <v-text-field
            v-model="orderItem.LineText"
            label="Note"
            variant="outlined"
          />
          <v-text-field
            v-model="orderItem.Price"
            label="Net price"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="orderItem.OrderQuantity"
            label="Quantity"
            type="number"
            variant="outlined"
          />
          <v-date-input
            v-model="orderItem.ScheduleLineDate"
            label="Scheduling Date"
            variant="outlined"
            :prepend-icon="null"
            prepend-inner-icon="mdi-calendar"
          />

          <div class="align-self-end">
            <v-btn
              color="button"
              type="submit"
              text="Add Item"
              class="text-capitalize"
              :disabled="isSubmitDisabled"
              prepend-icon="mdi-plus"
              :style="{
                opacity: isSubmitDisabled ? 0.4 : 1,
              }"
            />
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  plants: {
    type: Array,
    default: () => [],
  },
  materials: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:item", "close"]);
const orderItem = useVModel(props, "item", emit, {
  passive: true,
});

const isSubmitDisabled = computed(() => {
  return (
    !orderItem.value.Material ||
    !orderItem.value.OrderQuantity ||
    !orderItem.value.Price ||
    !orderItem.value.ScheduleLineDate
  );
});
</script>

<style lang="scss" scoped></style>
