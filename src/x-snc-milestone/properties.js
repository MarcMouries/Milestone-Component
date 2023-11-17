import { DEFAULT_STAGE_LIST, DEFAULT_CURRENT_STAGE } from "./sample_data";

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
      //dispatch(customActions.INITIALIZE_MAP);
      console.log("%c " + "Property stages changed", "font-weight:bold");
      console.log(" previousValue : " + previousValue);
      console.log(" currentValue  : " + currentValue);
    },
  },
  currentStage: {
    required: false,
    schema: { type: "string" },
    default: DEFAULT_CURRENT_STAGE,
    onChange(currentValue, previousValue, dispatch) {
      console.log("%c " + "Property currentStage changed", "font-weight:bold");
      console.log(" previousValue : " + previousValue);
      console.log(" currentValue  : " + currentValue);    },
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