<template>
  <div class="d-flex flex-column ga-2 mt-6">
    <v-row>
      <v-col :lg="2" :md="4" :sm="12">
        <v-autocomplete
          v-model="order.SoldTo"
          label="Sold to"
          density="compact"
          item-title="Name1"
          item-value="Kunnr"
          :items="customers"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="4" :md="8" :sm="12">
        <v-text-field
          v-model="order.HeaderText"
          label="Comment"
          density="compact"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :lg="2" :md="6" :sm="12">
        <v-autocomplete
          v-model="order.ShipTo"
          label="Ship to"
          density="compact"
          item-title="Name1"
          item-value="Kunnr"
          :items="customers"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          v-model="order.PoNumber"
          density="compact"
          label="Purchase order no."
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          v-if="readonly"
          :model-value="formatJsonDate(order.PoDate)"
          label="PO date"
          density="compact"
          variant="underlined"
        />
        <v-date-input
          v-else
          v-model="order.PoDate"
          density="compact"
          label="PO date"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
          :prepend-icon="null"
          prepend-inner-icon="mdi-calendar"
        />
      </v-col>
      <v-col :lg="2" :md="6" :sm="12">
        <v-text-field
          v-if="readonly"
          :model-value="formatJsonDate(order.ReqDateH)"
          variant="underlined"
          density="compact"
          label="Req. deliv. date"
        />
        <v-date-input
          v-else
          v-model="order.ReqDateH"
          density="compact"
          label="Req. deliv. date"
          :readonly="readonly"
          :variant="readonly ? 'underlined' : 'outlined'"
          :prepend-icon="null"
          prepend-inner-icon="mdi-calendar"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { formatJsonDate } from "@/utils/dateUtils";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const props = defineProps({
  modelValue: {
    type: Object,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  customers: {
    type: Array,
    default: () => [],
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
