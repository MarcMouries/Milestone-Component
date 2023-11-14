import { actionTypes } from "@servicenow/ui-core";
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

import { getHttpEffect } from "./getHttpEffect";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import {
  RECORD_FETCH_REQUEST,
  RECORD_FETCH_SUCCESS,
  RECORD_FETCH_FAILURE,
  CHOICES_FETCH_REQUEST,
  CHOICES_FETCH_SUCCESS,
  CHOICES_FETCH_FAILURE,
  DATA_REQUEST_START,
  DATA_REQUEST_PROGRESS,
  MODE_STATIC,
  MODE_RECORD,
} from "./constants";

export default {
  [COMPONENT_BOOTSTRAPPED]: ({ dispatch, updateState, properties, state }) => {
    console.log("%c " + "Action COMPONENT_BOOTSTRAPPED", "font-weight:bold");
    console.log(state);

    const { mode, table, sysId } = properties;
    console.log("MODE = ", mode);

    if (mode === MODE_STATIC) {
      updateState({ stages: properties.stages, currentStage: properties.currentStage, isLoading: false });
    } else if (mode === MODE_RECORD) {
      updateState({
        recordRequested: {
          table: table,
          sysId: sysId,
        },
        shouldRender: false,
      });

      if (table && sysId) {
        //updateState({ isLoading: true });

        dispatch(CHOICES_FETCH_REQUEST, {
          sysparm_query: `name=${table}^element=stage`,
          sysparm_fields: "label,value",
          sysparm_display_value: 'true'
        });
      }
    }
  },

  [CHOICES_FETCH_REQUEST]: createHttpEffect("/api/now/table/sys_choice", {
    method: "GET",
    //queryParams: ["sysparm_query", "sysparm_fields", "sysparm_display_value"],
    queryParams: ["sysparm_query", "sysparm_fields"],
    startActionType: DATA_REQUEST_START,
    progressActionType: DATA_REQUEST_PROGRESS,
    successActionType: CHOICES_FETCH_SUCCESS,
    errorActionType: CHOICES_FETCH_FAILURE,
  }),

  [CHOICES_FETCH_SUCCESS]: ({ action, dispatch, state, updateState }) => {
    const result = action.payload.result;
    if (result) {
      console.log("%c " + " ✅  CHOICES_FETCH_SUCCESS", "font-weight:bold");
      console.log(result);
      let labelsList = result.map((item) => item.label);
      updateState({ stages: labelsList, shouldRender: false });

      const { table, sysId } = state.properties;

      dispatch(RECORD_FETCH_REQUEST, {
        table: table,
        sysId: sysId,
        sysparm_fields: 'number,short_description,stage',
        sysparm_display_value: 'true',

      });
    } else {
      console.log("%c " + " ❌ CHOICES MISSING STAGE FIELD", "font-weight:bold");
    }
  },

  [CHOICES_FETCH_FAILURE]: ({ action, updateState }) => {
    //console.log("%c " + " ❌ CHOICES_FETCH_FAILURE", "font-weight:bold");
    updateState({ isLoading: false });
  },

  [RECORD_FETCH_REQUEST]: getHttpEffect({
    startActionType: DATA_REQUEST_START,
    progressActionType: DATA_REQUEST_PROGRESS,
    successActionType: RECORD_FETCH_SUCCESS,
    errorActionType: RECORD_FETCH_FAILURE,
  }),

  [RECORD_FETCH_SUCCESS]: ({ action, dispatch, updateState }) => {
    //const { payload: { result }} = action;
    const result = action.payload.result;

    console.log("%c " + " ✅  RECORD_FETCH_SUCCESS", "font-weight:bold");
    console.log(result);
    if (!result.stage) {
      console.log("%c " + " ❌ RECORD MISSING STAGE FIELD", "font-weight:bold");
    }
  },

  [RECORD_FETCH_FAILURE]: ({ action, state, updateState }) => {
    console.log("%c " + " ❌ RECORD_FETCH_FAILURE", "font-weight:bold");
    const payload = action.payload;
    const errorDetail = payload.data.error.detail;
    const { recordRequested } = state;
    const errorMessage = `Error: ${errorDetail} for record with sysId: ${recordRequested.sysId} in table: ${recordRequested.table}.`;
    updateState({ isLoading: false, hasError: true, errorMessage: errorMessage });
  },

  [DATA_REQUEST_START]: ({ action, dispatch, updateState }) => {
    console.log("%c " + "  DATA_REQUEST_START", "font-weight:bold");
    const { payload, meta } = action;
    const request = action.meta.request;

    console.log(meta);
    console.log(request);
    console.log(request.params);
  },
  [DATA_REQUEST_PROGRESS]: ({ action, updateState }) => {
    console.log("%c " + " ?? DATA_REQUEST_PROGRESS", "font-weight:bold");
    const payload = action.payload;
    console.log("DATA_REQUEST_PROGRESS", payload);
  },
};