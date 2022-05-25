import { createCustomElement } from '@servicenow/ui-core';
import '@servicenow/now-popover';
import '@servicenow/now-button';

import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import properties from './properties'

import '../x-snc-milestone-details';


createCustomElement('x-snc-milestone', {
	renderer: { type: snabbdom },
	view,
	styles,
	properties
});