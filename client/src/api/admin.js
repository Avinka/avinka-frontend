import axios from 'axios';
import Vue from 'vue';

export default {
  async generateData() {
    return axios.get('http://localhost:8080/api/admin/generateData');
  },
  async deleteData() {
    return axios.get('http://localhost:8080/api/admin/deleteData');
  },
  async deleteIndex() {
    return axios.get('http://localhost:8080/api/admin/deleteIndex');
  }
};
