new Vue({
  el: "article",
  data: {
    addressesList: [],
    limitedAddressesNumber: 3
  },
  computed: {
    limitedAddressesList() {
      return this.addressesList.slice(0, this.limitedAddressesNumber);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getAddresses();
    });
  },
  methods: {
    getAddresses() {
      axios.get("./data/addresses.json").then(response => {
        this.addressesList = response.data.result;
      });
    },
    changeAddressesNumber() {
      if (this.limitedAddressesNumber === 3) {
        this.limitedAddressesNumber = this.addressesList.length;
      } else if ((this.limitedAddressesNumber = this.addressesList.length)) {
        this.limitedAddressesNumber = 3;
      }
    }
  }
});
