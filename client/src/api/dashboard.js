import axios from 'axios';

export default {
  async getAllDashboards() {
    // TODO error handling
    return axios.get('http://localhost:8080/api/dashboard').data;
  }
};
