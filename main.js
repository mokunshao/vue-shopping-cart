new Vue({
  el: "#app",
  data: {
    productList: [],
    isCheckAll: false,
    totalPrice: 0,
    showDialog: false,
    currentProduct: null,
    showWarning: false
  },
  filters: {
    currency(value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      axios.get("./data/cart.json").then(response => {
        this.productList = response.data.result.list;
      });
    },
    selectProduct(item) {
      if (typeof item.isChecked === "undefined") {
        this.$set(item, "isChecked", true);
      } else {
        item.isChecked = !item.isChecked;
      }
      this.calcTotalPrice();
    },
    CheckAll() {
      this.isCheckAll = !this.isCheckAll;
      this.productList.forEach(item => {
        if (typeof item.isChecked === "undefined") {
          this.$set(item, "isChecked", true);
        } else {
          item.isChecked = this.isCheckAll;
        }
      });
      this.calcTotalPrice();
    },
    calcTotalPrice() {
      this.totalPrice = 0;
      this.productList.forEach(item => {
        if (item.isChecked) {
          this.totalPrice += item.price * item.amount;
        }
      });
      if (this.totalPrice !== 0) {
        this.showWarning = false;
      }
    },
    minus(item) {
      item.amount > 1 ? item.amount-- : 1;
      this.calcTotalPrice();
    },
    add(item) {
      item.amount++;
      this.calcTotalPrice();
    },
    tryToDelete(item) {
      this.currentProduct = item;
      this.showDialog = true;
    },
    cancelDelete() {
      this.currentProduct = null;
      this.showDialog = false;
    },
    deleteItem() {
      let index = this.productList.indexOf(this.currentProduct);
      this.$delete(this.productList, index);
      // 另外一种写法 this.productList.splice(index,1);
      this.showDialog = false;
    },
    nextStep() {
      if (this.totalPrice !== 0) {
        window.location.href =
          "./address.html";
      } else if (this.totalPrice === 0) {
        this.showWarning = true;
      }
    }
  }
});
