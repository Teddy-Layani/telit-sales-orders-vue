<template>
  <v-container
    fluid
    class="py-10 px-16"
    style="position: relative; height: 100%"
  >
    <div class="d-flex align-center ga-2">
      <router-link
        :to="{
          name: 'home',
        }"
      >
        <v-icon icon="mdi-arrow-left" color="textPrimary" :size="32" />
      </router-link>

      <div class="text-h4 text-textPrimary">{{ `Sales Document: ${id}` }}</div>
    </div>

    <v-progress-circular
      indeterminate
      style="position: absolute; left: 45%; top: 40%"
      :size="60"
      v-if="loading"
    />

    <template v-else-if="order">
      <order-header-fields v-model="order" readonly />
      <v-data-table
        class="mt-6"
        height="calc(100vh - 520px)"
        :headers="columns"
        :items="orderItems"
      >
        <template #item.ScheduleLineDate="{ item }">
          {{ formatJsonDate(item.ScheduleLineDate) }}
        </template>

        <template #item.amount="{ item }">
          {{ parseFloat(item.Price * item.OrderQuantity).toLocaleString() }}
        </template>
        <template #item.OrderQuantity="{ item }">
          {{ parseFloat(item.OrderQuantity).toLocaleString() }}
        </template>
        <template #item.Price="{ item }">
          {{ parseFloat(item.Price).toLocaleString() }}
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>

<script setup>
import { getSalesOrder } from "@/core/api";
import { formatJsonDate } from "@/utils/dateUtils";
import { onMounted, ref } from "vue";
import OrderHeaderFields from "@/components/OrderHeaderFields.vue";
import useConstants from "@/composable/useConstants";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const loading = ref(false);
const order = ref(null);
const orderItems = ref([]);

const { orderItemColumns } = useConstants();

const filtersForm = ref({
  customerNumber: "",
});

const columns = ref(structuredClone(orderItemColumns));

onMounted(() => {
  loadorder();
});

const loadorder = async () => {
  try {
    loading.value = true;
    order.value = await getSalesOrder(props.id, {
      $expand: "SalesItemSet",
    });

    orderItems.value = order.value?.SalesItemSet?.results;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
