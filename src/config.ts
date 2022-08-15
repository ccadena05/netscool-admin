const PROTOCOL = window.location.protocol;
const DOMINIO = window.location.hostname;
//const DOMINIO = 'valledelamentefactura.com';
const WSERVICE = 'ws-vm';
export const config = {
  apiUrlBase:  PROTOCOL + '//' + DOMINIO +'/'+WSERVICE+'/',
  apiUrl:  PROTOCOL + '//' + DOMINIO +'/'+WSERVICE+'/controllers/',
  apiUrlMobile:  PROTOCOL + '//' + DOMINIO +'/'+WSERVICE+'/controllers/',
  cloudName: 'ptsanmiguelense-ghost',
  presets:'valle_mentefactura',
  authRoles: {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'Admin'], // Only SA & Admin has access
    editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  },
  APP_LOCALE_ID:"es-es"
}