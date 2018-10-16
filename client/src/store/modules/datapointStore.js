import datapointApi from '../../api/datapointApi';
import _ from 'lodash';

const state = {
  datapoints: []
};

// getters
const getters = {
  getByDataseriesIds: (state) => (ids) => {
    return state.datapoints.filter((datapoint) => ids.includes(datapoint.dataseriesId));
  }
};

// actions
const actions = {
  async getDataPointsByDataseriesIds({commit}, dataseriesIds) {
    const datapoints = await datapointApi.getDataPointsByDataseriesIds(dataseriesIds);
    commit('addDatapoints', datapoints);
  }
};

const mutations = {
  addDatapoints(state, datapoints) {
    _.forEach(Object.values(datapoints), (newDatapointObj) => {
      const index = state.datapoints.findIndex((datapoint) => {
        return newDatapointObj.dataseriesId === datapoint.dataseriesId;
      });
      if (index !== -1) {
        state.datapoints[index] = newDatapointObj;
      } else {
        state.datapoints.push(newDatapointObj);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
