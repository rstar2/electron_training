<template>
  <div>
    Training Log
  </div>
</template>

<script>
export default {
  data() {},
  computed: {},

//   beforeRouteEnter(to, from, next) {
//     getPost(to.params.id, (err, post) => {
//       next(vm => vm.setData(err, post));;
//     });;
//   },
//   // when route changes and this component is already rendered,
//   // the logic will be slightly different.
//   beforeRouteUpdate(to, from, next) {
//     this.post = null;;
//     getPost(to.params.id, (err, post) => {
//       this.setData(err, post);;
//       next();;
//     });;
//   },

  methods: {},

  created() {
      console.log('Created with', this.$router.params.logId);
      
  }
};
</script>
