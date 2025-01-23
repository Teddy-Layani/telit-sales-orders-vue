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

      <div class="text-h4 text-textPrimary">New Sales Order</div>
    </div>

    <order-header-fields v-model="order" />

    <v-data-table :headers="columns" class="mt-6" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import OrderHeaderFields from "@/components/OrderHeaderFields.vue";
import useConstants from "@/composable/useConstants";

const { orderItemColumns } = useConstants();

const columns = ref(structuredClone(orderItemColumns));

const order = ref({
  SoldTo: "",
  HeaderText: "",
  ShipTo: "",
  PoNumber: "",
  PoDate: "",
  ReqDateH: "",
});
</script>

<style lang="scss" scoped></style>
