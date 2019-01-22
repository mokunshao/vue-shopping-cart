new Vue({
  el: "article",
  data: {
    addressesList: [],
    limitedAddressesNumber: 3,
    currentIndex: 0,
    shippingMethod: 1
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
      fetch("./data/addresses.json").then(res => {
        if (res.ok) {
          res.json().then(data => {
            this.addressesList = data.result;
          });
        }
      });
    },
    changeAddressesNumber() {
      if (this.limitedAddressesNumber === 3) {
        this.limitedAddressesNumber = this.addressesList.length;
      } else if ((this.limitedAddressesNumber = this.addressesList.length)) {
        this.limitedAddressesNumber = 3;
      }
    },
    setDefault(addressId) {
      this.addressesList.forEach(address => {
        if (address.id === addressId) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      });
    },
    deleteAddress(address) {
      let index = this.addressesList.indexOf(address);
      this.addressesList.splice(index, 1);
    }
  }
});
