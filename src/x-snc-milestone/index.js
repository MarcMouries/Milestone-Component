import { createCustomElement } from '@servicenow/ui-core';
import '@servicenow/now-popover';
import '@servicenow/now-button';

import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import properties from './properties'
import actionHandlers from './actionHandlers';


import '../x-snc-milestone-details';


createCustomElement('x-snc-milestone', {
	actionHandlers,
	properties,
	renderer: { type: snabbdom },
	styles,
	view
});