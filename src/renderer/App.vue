<template>
  <div id="app">
    <b-container fluid>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 身份證字號: 
									123
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input v-model="id"
                      type="text"
                      size="sm">
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-2">
              單程 回程
      </b-row>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 起站: 
          </label>
        </b-col>
        <b-col sm="10">
           <b-form-select v-model="selected_from_station" :options="alloptions.from_station" class="mb-3" size="sm" />
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 到站: 
          </label>
        </b-col>
        <b-col sm="10">
           <b-form-select v-model="selected_to_station" :options="alloptions.to_station" class="mb-3" size="sm" />
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 起始日期: 
          </label>
        </b-col>
        <b-col sm="10">
           <b-form-select v-model="selected_getin_date" :options="alloptions.getin_date" class="mb-3" size="sm" />
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 截止時間: 
          </label>
        </b-col>
        <b-col sm="10">
           <b-form-select v-model="selected_getin_date2" :options="alloptions.getin_date2" class="mb-3" size="sm" />
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="2">
          <label for="input-small"> 訂票張數: 
          </label>
        </b-col>
        <b-col sm="10">
           <b-form-select v-model="selected_order_qty_str" :options="alloptions.order_qty_str" class="mb-3" size="sm" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'my-project',
    data() {
      return {
       id: "",
       alloptions: {},
       selected_from_station: '',
       selected_to_station: '',
       selected_getin_date: '',
       selected_getin_date2: '',
       selected_order_qty_str: '',
      }
    },
    methods: {
      getOptions() {
        var self = this
        axios.get("http://127.0.0.1:3000/getalloptions").then(res => {
          console.log(res.data)
          self.alloptions = res.data 
       })
      },
    },
    mounted() {
      this.getOptions()
    }
  }
</script>

<style>
  /* CSS */
</style>
