<template>
  <div class="dashboard-container">
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {

  },
  created() {
    console.log(this.$service);
    this.$service.agreementList({
      current: 1,
      size: 10
    }).then(res => {
      console.log(res);
    })
  }
}
</script>
