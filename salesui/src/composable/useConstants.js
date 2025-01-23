export default function useConstants() {
  const orderItemColumns = [
    {
      title: "Item",
      key: "ItemNumber",
    },
    {
      title: "Material",
      key: "Material",
    },
    {
      title: "Description",
      key: "MaterialDesc",
    },
    {
      title: "Net Price",
      key: "Price",
    },
    {
      title: "Amount",
      key: "amount",
    },
    {
      title: "Scheduling Date",
      key: "ScheduleLineDate",
    },
    {
      title: "Quantity",
      key: "OrderQuantity",
    },
  ];
  return {
    orderItemColumns,
  };
}
