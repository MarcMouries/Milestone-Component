
import {DEFAULT_STEP_LIST} from './sample_data';

export default {
		items: {
			required: true,
			schema: {type: 'array'},
			default: DEFAULT_STEP_LIST
		},
		current: {
			required: true,
			schema: {type: 'string'},
			default: "Triage"
		}
	}
