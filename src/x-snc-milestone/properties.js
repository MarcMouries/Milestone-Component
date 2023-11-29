import { DEFAULT_STAGE_LIST, DEFAULT_CURRENT_STAGE } from "./sample_data";
import { CURRENT_STAGE_CHANGED } from "./constants";

export default {
  mode : {
    schema: { type: "string" },
    default: "STATIC",
    onChange(currentValue, previousValue, dispatch) {
      //dispatch(customActions.INITIALIZE_MAP);
      console.log("%c " + "Property stages changed", "font-weight:bold");
      console.log(" previousValue : " + previousValue);
      console.log(" currentValue  : " + currentValue);
    },
  },
  stages: {
    required: false,
    schema: { type: "array" },
    default: DEFAULT_STAGE_LIST,
    onChange(currentValue, previousValue, dispatch) {
      console.log("%c " + "Property stages changed", "font-weight:bold");
      console.log(" previousValue : " + previousValue);
      console.log(" currentValue  : " + currentValue);
    },
  },
  currentStage: {
    required: false,
    schema: { type: "string" },
    default: DEFAULT_CURRENT_STAGE,
    onChange(currentValue, previousValue, dispatch, updateState) {
      console.log("%c " + "Property currentStage changed", "font-weight:bold");
      console.log(" previousValue : " + previousValue);
      console.log(" currentValue  : " + currentValue);
      console.log(" CALLING updateState with " + currentValue);

      //dispatch(CURRENT_STAGE_CHANGED);
      updateState({ currentStage: currentValue });
    },
  },
  table: {
    required: false,
    default: ""
  },
  sysId: {
    required: false,
    default: ""
  }
};