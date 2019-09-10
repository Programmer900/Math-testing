<template>
    <div>
        {{name}} {{ mySpace() }}
    </div>
</template>

<script>
  export default {
    name: "Raiting",
    data: ()=>({

    }),
    methods: {
      mySpace() {
        console.log('My')
      }
    }
  }
</script>

<style scoped>

</style>