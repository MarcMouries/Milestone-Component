import { createHttpEffect } from '@servicenow/ui-effect-http';

export const getHttpEffect = ({ startActionType, progressActionType, successActionType, errorActionType }) => {

    return createHttpEffect('/api/now/table/:table/:sysId', {
        method: 'GET',
        pathParams: ['table', 'sysId'],
        queryParams: ['sysparm_query', 'sysparm_fields', 'sysparm_display_value'],
        startActionType,
        successActionType,
        errorActionType,
        progressActionType
    });
};