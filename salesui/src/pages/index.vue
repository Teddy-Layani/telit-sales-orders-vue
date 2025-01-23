<template>
  <v-container fluid class="py-10 px-16">
    <div class="d-flex flex-column" style="gap: 2rem">
      <div class="text-h4 text-textPrimary">Sales Document Overview</div>
      <div>
        <v-btn
          rounded
          flat
          color="button"
          class="text-capitalize"
          :to="{
            name: 'new-order',
          }"
        >
          <v-icon icon="mdi-plus" />
          <span>Create New Order</span>
        </v-btn>
      </div>
    </div>

    <v-data-table
      class="mt-8"
      height="calc(100vh - 400px)"
      :items="items"
      :headers="columns"
      :loading="loading"
      @click:row="onRowClick"
      hover
    >
      <template #item.PoDate="{ item }">
        {{ formatJsonDate(item.PoDate) }}
      </template>
      <template #item.ReqDateH="{ item }">
        {{ formatJsonDate(item.ReqDateH) }}
      </template>
    </v-data-table>

    <!-- <v-data-table :headers="headers" :items="items" height="calc(100vh - 200px)" :loading="loading">
      <template #item.ItemNumber="{ item }">
        <span @click="naviagteToItem(item)" class="cursor-pointer">{{ item.ItemNumber }}</span>
      </template>
</v-data-table> -->
  </v-container>
</template>

<script setup>
import { getSalesOrders } from "@/core/api";
import { onMounted, ref } from "vue";
import { useLocale } from "vuetify";
import { formatJsonDate } from "@/utils/dateUtils";
import { useRouter } from "vue-router";

const { t } = useLocale();
const router = useRouter();

const loading = ref(false);

const columns = ref([
  {
    title: "Customer Number",
    key: "SoldTo",
  },
  {
    title: "Ship to Party",
    key: "ShipTo",
  },
  {
    title: "Purhcase Order No.",
    key: "PoNumber",
  },
  {
    title: "PO Date",
    key: "PoDate",
  },
  {
    title: "Req. Deliv. Date",
    key: "ReqDateH",
  },
]);

const items = ref([]);

onMounted(async () => {
  loadData();
});

const onRowClick = (evt, { item }) => {
  router.push({
    name: "item",
    params: {
      id: item.Vbeln,
    },
  });
};

const loadData = async () => {
  try {
    loading.value = true;
    const salesOrders = await getSalesOrders({
      $expand: "SalesItemSet",
    });

    items.value = salesOrders.map((item) => {
      let orderItem = null;

      if (item.SalesItemSet.results?.length) {
        orderItem = item.SalesItemSet.results[0];
      }

      return {
        ...item,
        orderItem,
      };
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
