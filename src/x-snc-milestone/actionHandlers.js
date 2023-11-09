import { actionTypes } from "@servicenow/ui-core";
import { getHttpEffect } from "./getHttpEffect";
import { createHttpEffect } from "@servicenow/ui-effect-http";

const RECORD_FETCH_REQUESTED = "RECORD_FETCH_REQUESTED";
const RECORD_FETCH_SUCCEEDED = "RECORD_FETCH_SUCCEEDED";
const RECORD_FETCH_FAILED = "RECORD_FETCH_FAILED";

const CHOICES_FETCH_REQUESTED = "CHOICES_FETCH_REQUESTED";
const CHOICES_FETCH_SUCCEEDED = "CHOICES_FETCH_SUCCEEDED";
const CHOICES_FETCH_FAILED = "CHOICES_FETCH_FAILED";

const DATA_REQUEST_STARTED = "DATA_REQUEST_STARTED";
const DATA_REQUEST_PROGRESS = "DATA_REQUEST_PROGRESS";

export default {
  [actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch, updateState, properties }) => {
    console.log("%c " + "COMPONENT_BOOTSTRAPPED", "font-weight:bold");
    const { table, sysId } = properties;

    if (table && sysId) {
      //updateState({ isLoading: true });

     dispatch(RECORD_FETCH_REQUESTED, { 
       table: table ,
       sysId: sysId
       });

      dispatch(CHOICES_FETCH_REQUESTED, {
          sysparm_query: `name=${table}^element=stage`,
          sysparm_fields: 'label,value',
         });
     }
  },

  [CHOICES_FETCH_REQUESTED]: createHttpEffect("/api/now/table/sys_choice", {
    method: "GET",
    queryParams: ["sysparm_query", "sysparm_fields"],
    startActionType: DATA_REQUEST_STARTED,
    progressActionType: DATA_REQUEST_PROGRESS,
    successActionType: CHOICES_FETCH_SUCCEEDED,
    errorActionType: CHOICES_FETCH_FAILED,
  }),

  [CHOICES_FETCH_SUCCEEDED]: ({ action, dispatch, updateState }) => {
    const result = action.payload.result;

    console.log("%c " + " ✅  CHOICES_FETCH_SUCCEEDED", "font-weight:bold");
    console.log(result);
    if (!result) {
      console.log("%c " + " ❌ CHOICES MISSING STAGE FIELD", "font-weight:bold");
    }
  },

  [CHOICES_FETCH_FAILED]: ({ action, updateState }) => {
    console.log("%c " + " ❌ CHOICES_FETCH_FAILED", "font-weight:bold");
    updateState({ isLoading: false });
  },

  [RECORD_FETCH_REQUESTED]: getHttpEffect({
    startActionType: DATA_REQUEST_STARTED,
    progressActionType: DATA_REQUEST_PROGRESS,
    successActionType: RECORD_FETCH_SUCCEEDED,
    errorActionType: RECORD_FETCH_FAILED,
  }),

  [RECORD_FETCH_SUCCEEDED]: ({ action, dispatch, updateState }) => {
    //const { payload: { result }} = action;
    const result = action.payload.result;

    console.log("%c " + " ✅  RECORD_FETCH_SUCCEEDED", "font-weight:bold");
    console.log(result);
    if (!result.stage) {
      console.log("%c " + " ❌ RECORD MISSING STAGE FIELD", "font-weight:bold");
    }
  },

  [RECORD_FETCH_FAILED]: ({ action, updateState }) => {
    console.log("%c " + " ❌ RECORD_FETCH_FAILED", "font-weight:bold");
    updateState({ isLoading: false });
  },

  [DATA_REQUEST_STARTED]: ({ action, dispatch, updateState }) => {
    console.log("%c " + "  DATA_REQUEST_STARTED", "font-weight:bold");
    const { payload, meta } = action;
    const request = action.meta.request;

		console.log(action);
		console.log(payload);
		console.log(payload.data);
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
