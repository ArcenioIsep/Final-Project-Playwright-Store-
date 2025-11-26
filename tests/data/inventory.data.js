export const INVENTORY_DATA = {
  ADD: {
    scenario: "Add new product",
    product: {
      name: "Water Bottle",
      price: 12,
      quantity: 1,
    },
  },

  STOCK: {
    scenario: "Increase and decrease stock",
    product: {
      name: "Running Shoes",
      price: 89,
      quantity: 2,
    },
  },

  LIMIT: {
    scenario: "Quantity cannot go below 0",
    product: {
      name: "Protein Bar",
      price: 3,
      quantity: 1,
    },
  },
};
