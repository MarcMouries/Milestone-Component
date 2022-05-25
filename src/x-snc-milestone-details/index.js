import { createCustomElement } from '@servicenow/ui-core';

createCustomElement('milestone-details', {
	view: (state) => 
			<div className="milestone-details">
				<h5>Details about {state.properties.milestone}</h5>
				<p>TBD</p>
			</div>
	,
	styles: "* {margin: 10px}  .milestone-details {display: flex; flex-direction: column;}",
	properties: {
		milestone: {}
	}
});