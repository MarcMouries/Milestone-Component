import {actionTypes} from '@servicenow/ui-core';
import {getHttpEffect} from './getHttpEffect';

const RECORD_FETCH_REQUESTED = 'RECORD_FETCH_REQUESTED';
const RECORD_FETCH_SUCCEEDED = 'RECORD_FETCH_SUCCEEDED';
const RECORD_FETCH_FAILED = 'RECORD_FETCH_FAILED';


export default {

	[actionTypes.COMPONENT_BOOTSTRAPPED]: ({
		dispatch,
		updateState,
		properties
	}) => {
        console.log("%c " + "COMPONENT_BOOTSTRAPPED", 'font-weight:bold');
		const {table, sysid} = properties;

		if (table && sysid) {
			updateState({isLoading: true});
			dispatch(RECORD_FETCH_REQUESTED, {sysId: sysid, table});
		}
	},

	[RECORD_FETCH_REQUESTED]: getHttpEffect({
		successActionType: RECORD_FETCH_SUCCEEDED,
		errorActionType: RECORD_FETCH_FAILED
	}),

	[RECORD_FETCH_SUCCEEDED]: ({action, dispatch, updateState}) => {
		const {
			payload: {result}
		} = action;

		console.log("%c " + " ✅  RECORD_FETCH_SUCCEEDED", 'font-weight:bold');
		console.log(result);
	},

	[RECORD_FETCH_FAILED]: ({updateState}) => {
		console.log("%c " + " ❌ RECORD_FETCH_FAILED", 'font-weight:bold');
		updateState({isLoading: false});
	}

}