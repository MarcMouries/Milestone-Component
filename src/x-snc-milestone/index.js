import { createCustomElement } from '@servicenow/ui-core';
import '@servicenow/now-popover';
import '@servicenow/now-button';

import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import properties from './properties'

createCustomElement('milestone-content', {
	view: (state) => 
			<form>
				<h5>Details about {state.properties.milestone}</h5>
				
			</form>
	,
	styles: "* {margin: 10px}",
	properties: {
		milestone: {}
	}
});

createCustomElement('x-snc-milestone', {
	renderer: { type: snabbdom },
	view,
	styles,
	properties
});