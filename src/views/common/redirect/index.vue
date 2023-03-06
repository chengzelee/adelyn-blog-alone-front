<script>
export default {
  created() {
    console.log(111)
    this.$router.replace({ path: '/order/order' })
  }
}
</script>
