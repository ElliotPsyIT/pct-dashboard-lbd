<template>
  <table class="table">
    <thead>
      <tr>
        <slot name="columns">
          <th v-for="(column, index) in columns" :key="index">{{column}}</th>
        </slot>
      </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <div v-if="hasValue(item, column)" >
          <td v-for="(column,index) in columns" :key="index" >{{itemValue(item, column)}}</td>
        </div>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      }
    }
  }
</script>
<style>
</style>
