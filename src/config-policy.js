function policy({trigger, api, properties}) {
	console.log(" == milestone-properties-policy == ");
	console.log(trigger);
	console.log(api);
	console.log(properties);
	

	// Default state
	if (trigger === null) {
		//api.updateEnabled('hideRequiredIndicator', false);
		//api.updateSectionVisibility('number', false);
		//api.updateVisibility('multiple', false);
	}


	if (trigger === 'mode') {
		api.updateSectionVisibility('record', properties.mode === 'RECORD');
	}
}