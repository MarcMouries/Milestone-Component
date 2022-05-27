import { createCustomElement } from '@servicenow/ui-core';
import styles from './styles.scss';

createCustomElement('milestone-details', {
	view: (state) => 
			<div className="milestone-details">
				<h5>Details about {state.properties.milestone}</h5>
				<p>TBD</p>
			</div>
	,
	styles,
	properties: {
		milestone: {}
	}
});