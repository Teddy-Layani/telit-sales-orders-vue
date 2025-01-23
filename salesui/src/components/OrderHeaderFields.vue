<template>
  <div class="d-flex flex-column ga-2 mt-6">
    <v-row>
      <v-col :lg="2" :md="4" :sm="12">
        <v-text-field
          v-model="order.SoldTo"
          label="Customer Number"
          density="compact"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="4" :md="8" :sm="12">
        <v-text-field
          v-model="order.HeaderText"
          label="General Header Comment"
          density="compact"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          v-model="order.ShipTo"
          label="Ship to Party"
          density="compact"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          v-model="order.PoNumber"
          density="compact"
          label="Purchase Order No."
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          :model-value="purchaseOrderDateFormat"
          density="compact"
          label="PO Date"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          :model-value="reqDeliveryDateFormat"
          density="compact"
          label="Req. Deliv. Date"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { formatJsonDate } from "@/utils/dateUtils";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const order = useVModel(props, "modelValue", emit);

const purchaseOrderDateFormat = computed(() => {
  if (!order.value?.PoDate) {
    return "";
  }

  return formatJsonDate(order.value.PoDate);
});

const reqDeliveryDateFormat = computed(() => {
  if (!order.value?.ReqDateH) {
    return "";
  }

  return formatJsonDate(order.value.ReqDateH);
});
</script>

<style lang="scss" scoped></style>
