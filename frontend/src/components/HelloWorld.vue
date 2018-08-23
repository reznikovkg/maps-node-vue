<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ myinf }}</h2>
  </div>
</template>

<script>
    import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
        myinf: 1
    }
  },
  mounted: function () {
    axios.get('http://localhost:8083/api/get')
      .then((response) => {
          console.log(response.data);
          this.myinf = response.data.user;
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
