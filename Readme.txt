To change the theme from light header to dark or vice varsa:
1. change the text '/assets/metronic/admin/layout4/css/themes/light' to  '/assets/metronic/admin/layout4/css/themes/default' in 
 \src\shared\helpers\LocalizedResourcesHelper.ts
2. Change the header component logo image to ...-on-dark.png or ..-on-light.png

to be able to delete nul files from node_modules:
DEL \\.\C:\..\NUL FILE NAME
DEL \\.\C:\Studio\CloudInstinct.DTrack\DTrack.AngularUI\node_modules\datamaps\src\js\data\NUL.JSON
to Install syncfussion essential studio:

npm install syncfusion-javascript --save
npm install ej-angular2 --save
npm install --save-dev @types/jquery
npm install --save-dev @types/ej.web.all

of it using yarn:

yarn add syncfusion-javascript
yarn add ej-angular2
yarn add @types/jquery --dev
yarn add @types/ej.web.all --dev

//not sure if this is causing problems. But the problems I had with SignalR and others that depent on jQuery was solved when I remove the "types" fro tsconfig.json
include "types": [
      "jquery",
      "ej.web.all"] 
in tsconfig.json

Include Syncfusion theme files from node_modules in style section of angular-cli.json file
 "./../node_modules/syncfusion-javascript/Content/ej/web/material/ej.web.all.min.css" 

 Syncfusion JavaScript widgets need window.jQuery to render the Angular components, since, we need to import jQuery in 
 polyfills.ts file as like the below code snippet which we already configured in our webpack angular seed application.

import * as jquery from 'jquery';
window['jQuery'] = jquery;
window['$'] = jquery;


https://aspnetboilerplate.com/Pages/Documents/Zero/Language-Management
https://aspnetzero.com/Documents/Development-Guide-Angular#ide