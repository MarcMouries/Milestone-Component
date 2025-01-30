import { createCustomElement } from '@servicenow/ui-core';
//import '@servicenow/now-popover';
//import '@servicenow/now-button';

import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import properties from './properties'
import actionHandlers from './actionHandlers';
import '../x-snc-milestone-details';

const {name, version} = require('../../package.json');

console.log(`%c  Milestone Tracker (v${version})      `, 'background: #222; color: #62d84e; font-size: 12px; padding: 2px; border: 1px solid #62d84e;');

createCustomElement('x-snc-milestone', {
	actionHandlers,
	properties,
	setInitialState: () => ({
		isLoading: true
	}),
	renderer: { type: snabbdom },
	styles,
	view
});