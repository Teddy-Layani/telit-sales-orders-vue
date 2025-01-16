<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="items" height="calc(100vh - 200px)">
      <template #item.ItemNumber="{ item }">
        <span @click="naviagteToItem(item)" class="cursor-pointer">{{ item.ItemNumber }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { getSalesOrders } from '@/core/api';
import { onMounted, ref } from 'vue';


const headers = ref([
  {
    title: 'Item number',
    // title: t('salesOrdersHeaders.itemNum'),
    key: 'orderItem.ItemNumber'
  },
  {
    // title: t('salesOrdersHeaders.price'),
    title: 'Price',
    key: 'orderItem.Price'
  }
]);

const items = ref([]);


onMounted(async () => {
  loadData();
});

const loadData = async () => {
  try {
    const salesOrders = await getSalesOrders({
      $expand: 'SalesItemSet'
    });

    items.value = salesOrders.map(item => {
        let orderItem = null;

        if (item.SalesItemSet.results?.length) {
          orderItem = item.SalesItemSet.results[0];
        } 

        return {
          ...item,
          orderItem
        }
    });
    

  } catch (error) {
    console.log(error);
  }
};

</script>
