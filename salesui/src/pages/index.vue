<template>
  <v-container fluid>
    <v-icon icon="mdi-pencil" />
    <!-- <v-data-table :headers="headers" :items="items" height="calc(100vh - 200px)" :loading="loading">
      <template #item.ItemNumber="{ item }">
        <span @click="naviagteToItem(item)" class="cursor-pointer">{{ item.ItemNumber }}</span>
      </template>
    </v-data-table> -->
  </v-container>
</template>

<script setup>
import { getSalesOrders } from '@/core/api';
import { onMounted, ref } from 'vue';
import { useLocale } from 'vuetify';

const { t } = useLocale();


const loading = ref(false);

const headers = ref([
  {
    title: t('salesOrdersHeaders.itemNum'),
    key: 'orderItem.ItemNumber'
  },
  {
    title: t('salesOrdersHeaders.price'),
    key: 'orderItem.Price'
  }
]);

const items = ref([]);


onMounted(async () => {
  loadData();
});

const loadData = async () => {
  try {
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
};

</script>
