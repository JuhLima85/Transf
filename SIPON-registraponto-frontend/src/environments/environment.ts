// Este environment corresponde ao
// ambiente Local de Desenvolvimento

import 'zone.js/plugins/zone-error';


export const environment = {
	production:false,
	server: false,
	local: true,
	envName: 'loc',
	baseURL: 'http://localhost:8080/sipon-api/rest/',
	backendUrlFromFrontend: false,
	backendHttps: false,
	backendPort: 8080,
	apiUrl: 'http://localhost:8080'
};
