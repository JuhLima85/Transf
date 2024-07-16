// Este environment corresponde ao ambiente
// Servidor de Teste, Homologação ou Produção
export const environment = {
	production: false,
	server: true,
	local: false,
	envName: '__AMBIENTE__', //envName: 'prod',
	backendUrlFromFrontend: false,
	backendHttps: '',
	backendPort: '',
	apiUrl: '__API__',
	//secret: '__KEYCLOAK_CREDENTIAL_SECRET__'
};
