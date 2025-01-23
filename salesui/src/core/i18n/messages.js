import { he, en } from "vuetify/locale";

const messages = {
  en: {
    $vuetify: {
      ...en,
    },
  },
  he: {
    $vuetify: {
      ...he,
    },
    edit: "עריכה",
    save: "שמירה",
    cancel: "ביטול",
    title: "הזמנות לקוח",
    salesOrdersHeaders: {
      itemNum: "מספר רשומה",
      price: "מחיר",
    },
  },
};

export default messages;
