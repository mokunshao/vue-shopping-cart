new Vue({
  el: "#app",
  data: {
    productList: []
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("./data/cart.json").then(response => {
        this.productList = response.data.result.list;
      });
    }
  }
});
