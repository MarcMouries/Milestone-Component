import { actionTypes } from "@servicenow/ui-core";
const { COMPONENT_BOOTSTRAPPED, COMPONENT_PROPERTY_CHANGED } = actionTypes;

import { getHttpEffect } from "./getHttpEffect";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import { CURRENT_STAGE_REQUEST, CURRENT_STAGE_SUCCESS, CURRENT_STAGE_FAILURE } from "./constants";
import { STAGE_CHOICES_REQUEST, STAGE_CHOICES_SUCCESS, STAGE_CHOICES_FAILURE } from "./constants";
import { DATA_FETCH_START, DATA_FETCH_PROGRESS } from "./constants";
import { MODE_STATIC, MODE_RECORD } from "./constants";

// Define the debug mode toggle and log function
const debugModeIsOn = true;

function log(message) {
  console.log(message);
}

export default {

  [COMPONENT_PROPERTY_CHANGED]: ({ action, updateState, state }) => {
    console.log("%c " + "Action COMPONENT_PROPERTY_CHANGED", "font-weight:bold");
    const propertyUpdated = action.payload.name;
    const propertyNewValue = action.payload.value;
    console.log("New value for " + propertyUpdated + " = " + propertyNewValue);

    updateState({ [propertyUpdated]: propertyNewValue, shouldRender: false });
    updateState({ shouldRender: true });
  },

  [COMPONENT_BOOTSTRAPPED]: ({ dispatch, updateState, properties, state }) => {
    if (properties.mode === MODE_STATIC) {
      // For MODE_STATIC, set isLoading to false and use properties for stages and currentStage
      // initialize the component's state with properties passed to the component.
      updateState({
        ...state,
        ...properties,
        isLoading: false,
        shouldRender: true,
      });
    } else if (properties.mode === MODE_RECORD && properties.table && properties.sysId) {
      // For MODE_RECORD, set isLoading to true and dispatch STAGE_CHOICES_REQUEST
      updateState({
        ...state,
        ...properties,
        isLoading: true,
        shouldRender: false,
        recordRequested: { table: properties.table, sysId: properties.sysId },
      });

      dispatch(STAGE_CHOICES_REQUEST, {
        sysparm_query: `name=${properties.table}^element=stage^ORDERBYsequence`,
        sysparm_fields: "label,value",
        sysparm_display_value: "true",
      });
    } 
  },

  [STAGE_CHOICES_REQUEST]: createHttpEffect("/api/now/table/sys_choice", {
    queryParams: ["sysparm_query", "sysparm_fields", "sysparm_display_value"],
    startActionType: DATA_FETCH_START,
    progressActionType: DATA_FETCH_PROGRESS,
    successActionType: STAGE_CHOICES_SUCCESS,
    errorActionType: STAGE_CHOICES_FAILURE,
  }),

  [STAGE_CHOICES_SUCCESS]: ({ action, dispatch, state, updateState }) => {
    const result = action.payload.result;

    if (result) {
      updateState({ stages: result, shouldRender: false });

      const { table, sysId } = state.properties;

      dispatch(CURRENT_STAGE_REQUEST, {
        table: table,
        sysId: sysId,
        sysparm_fields: "number,short_description,stage",
        sysparm_display_value: "true",
      });
    } else {
      console.log("%c " + " ❌ The fetched stage choices are missing the stage field.", "font-weight:bold");
    }
  },

  [CURRENT_STAGE_REQUEST]: getHttpEffect({
    startActionType: DATA_FETCH_START,
    progressActionType: DATA_FETCH_PROGRESS,
    successActionType: CURRENT_STAGE_SUCCESS,
    errorActionType: CURRENT_STAGE_FAILURE,
  }),

  [CURRENT_STAGE_SUCCESS]: ({ action, dispatch, updateState }) => {
    console.log("%c " + " ✅  CURRENT_STAGE_SUCCESS", "font-weight:bold");
    const result = action.payload.result;
    console.log(" - record.stage = " + result.stage);

    if (result.stage) {
      updateState({ currentStage: result.stage, isLoading: false });
    } else {
      console.log("%c ❌ The fetched record is missing the stage field.", "font-weight:bold");
      updateState({ isLoading: false, hasError: true, errorMessage: "The fetched record is missing the stage field. Please ensure the record contains a valid stage field." });
    }
  },

  [STAGE_CHOICES_FAILURE]: ({ action, state, updateState }) => {
    console.log("%c " + " ❌ STAGE_CHOICES_FAILURE", "font-weight:bold");
    console.log(" payload ", action.payload);

    const error = action.payload.data.error;
    console.log(" error ", error);

    const { recordRequested } = state;
    const errorMessage = `Failed to fetch stage choices for table "${recordRequested.table}". Error: ${error.message}. Details: ${error.detail}. Record sysId: ${recordRequested.sysId}.`;
    console.log(" errorMessage ", errorMessage);
    updateState({ isLoading: false, hasError: true, errorMessage: errorMessage });
  },

  [CURRENT_STAGE_FAILURE]: ({ action, state, updateState }) => {
    console.log("%c " + " ❌ CURRENT_STAGE_FAILURE", "font-weight:bold");
    const payload = action.payload;
    const errorDetail = payload.data.error.detail;
    const { recordRequested } = state;
    const errorMessage = `Failed to fetch the record from table "${recordRequested.table}". Error Details: ${errorDetail}. Record sysId: ${recordRequested.sysId}.`;
    updateState({ isLoading: false, hasError: true, errorMessage: errorMessage });
  },

  [DATA_FETCH_START]: ({ action, dispatch, updateState }) => {
    const request = action.meta.request;
    //console.log("%c " + "  DATA_FETCH_START: " + request.url, "font-weight:bold");
    //console.log("request = ", request);
  },

  [DATA_FETCH_PROGRESS]: ({ action, updateState }) => {
    console.log("%c " + " ?? DATA_FETCH_PROGRESS", "font-weight:bold");
    const payload = action.payload;
    console.log("DATA_FETCH_PROGRESS", payload);
  },
};
