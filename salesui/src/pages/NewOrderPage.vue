<template>
  <v-container
    fluid
    class="py-10 px-16"
    style="position: relative; height: 100%"
  >
    <v-overlay v-model="loading" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate :size="60" color="white" />
    </v-overlay>
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

    <order-header-fields v-model="order" :customers="customers" />

    <v-data-table :headers="columns" class="mt-6" :items="order.SalesItemSet">
      <template #top>
        <div class="d-flex justify-end">
          <v-btn style="max-width: 50px" color="button" @click="onAddItem"
            ><v-icon icon="mdi-plus"
          /></v-btn>
        </div>
      </template>
      <template #item.actions="{ item }">
        <v-btn variant="flat" @click="onDeleteOrderItem(item)"
          ><v-icon icon="mdi-trash-can" color="error"
        /></v-btn>
      </template>
      <template #item.MaterialDesc="{ item }">
        <span>{{ getMaterialDescription(item.Material) }}</span>
      </template>
      <template #item.ScheduleLineDate="{ item }">
        <span>{{ format(item.ScheduleLineDate, "dd/MM/yyyy") }}</span>
      </template>
    </v-data-table>
    <order-item-dialog
      v-if="showItemDialog"
      v-model="showItemDialog"
      v-model:item="orderItem"
      :plants="plants"
      :materials="materials"
      @on-submit="onSubmit"
      @close="showItemDialog = false"
    />
    <v-footer fixed rounded="lg" class="pa-4 mt-8" border>
      <v-spacer />
      <v-btn
        prepend-icon="mdi-send"
        color="button"
        variant="elevated"
        class="text-capitalize"
        text="Create Order"
        size="large"
        rounded="xl"
        @click="onCreateOrder"
      />
    </v-footer>

    <prompt-dialog
      v-if="successPromptDialog.show"
      v-model="successPromptDialog.show"
      v-bind="successPromptDialog"
      @close="onSuccessDialogClose"
    />
  </v-container>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import OrderHeaderFields from "@/components/OrderHeaderFields.vue";
import useConstants from "@/composable/useConstants";
import OrderItemDialog from "@/components/OrderItemDialog.vue";
import PromptDialog from "@/components/PromptDialog.vue";
import {
  createSalesOrder,
  getCustomers,
  getMaterials,
  getPlants,
} from "@/core/api";
import { formatJsonDate, formatToOData } from "@/utils/dateUtils";
import cloneDeep from "lodash.clonedeep";
import { format } from "date-fns";
import { useRouter } from "vue-router";

const { orderItemColumns } = useConstants();

const columns = ref(structuredClone(orderItemColumns));

const initialOrderItem = {
  ItemNumber: "",
  Material: "",
  MaterialDesc: "",
  OrderQuantity: "",
  Price: "",
  Plant: "",
  LineText: "",
  ScheduleLineDate: null,
};

const loading = ref(false);

const successPromptDialog = ref({
  show: false,
  message: "Sales order has been created successfully",
});

Object.freeze(initialOrderItem);

const orderItem = ref(structuredClone(initialOrderItem));

const showItemDialog = ref(false);

const order = ref({
  SoldTo: "",
  HeaderText: "",
  ShipTo: "",
  PoNumber: "",
  PoDate: null,
  ReqDateH: null,
  SalesItemSet: [],
});

const customers = ref([]);
const materials = ref([]);
const plants = ref([]);
const router = useRouter();

onMounted(() => {
  loadValueHelps();
});

const onAddItem = () => {
  showItemDialog.value = true;
};

const loadValueHelps = async () => {
  customers.value = await getCustomers();
  materials.value = await getMaterials({
    $filter: `Maktx eq 'GE864-QUAD V2'`,
  });
  plants.value = await getPlants();
};

const onDeleteOrderItem = (item) => {
  const index = order.value.SalesItemSet.indexOf(item);
  order.value.SalesItemSet.splice(index, 1);
};

const getMaterialDescription = (materialId) => {
  const material = materials.value.find((item) => item.Matnr === materialId);
  if (material) {
    return material.Maktx;
  } else {
    return "";
  }
};

const onSuccessDialogClose = () => {
  nextTick(() => {
    router.replace({
      name: "home",
    });
  });
};

const onSubmit = async () => {
  showItemDialog.value = false;
  order.value.SalesItemSet.push(orderItem.value);
  orderItem.value = structuredClone(initialOrderItem);
};

const onCreateOrder = async () => {
  try {
    const orderCopy = cloneDeep(order.value);
    orderCopy.SalesItemSet.forEach((item) => {
      item.ScheduleLineDate = formatToOData(item.ScheduleLineDate);
    });

    orderCopy.PoDate = formatToOData(orderCopy.PoDate);
    orderCopy.ReqDateH = formatToOData(orderCopy.ReqDateH);

    await createSalesOrder(orderCopy);

    successPromptDialog.value.show = true;
  } finally {
  }
};
</script>

<style lang="scss" scoped></style>
