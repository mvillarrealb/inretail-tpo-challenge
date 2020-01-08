// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseconfig: {
        apiKey: 'AIzaSyDELDlhnezBO1dJtt8EVxwL0YN0C05Ji7Y',
        authDomain: 'web-application-challeng-28802.firebaseapp.com',
        databaseURL: 'https://web-application-challeng-28802.firebaseio.com',
        projectId: 'web-application-challeng-28802',
        storageBucket: 'web-application-challeng-28802.appspot.com',
        messagingSenderId: '156886613129',
        appId: '1:156886613129:web:57b3180dc4ae8f97'
    },
    messages: {
        title: {
            success: 'Exito!',
            warningDelete: '¿Está seguro de eliminar el registro?'
        },
        text: {
            success: 'Se registro correctamente su información',
            successDelete: 'Se elimino correctamente la información.',
            warningDelete: 'Se eliminara toda la informacion del registro seleccionado.'
        },
        type: {
            success: 'success',
            warning: 'warning'
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
