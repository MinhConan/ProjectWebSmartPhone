// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost/websmartphone/api/",
  login: "http://localhost/websmartphone/api/user/login.php",
  searchProduct: "http://localhost/websmartphone/api/product/search.php",
  addOrder: "http://localhost/websmartphone/api/orders/add.php",
  getOrderPaging: "http://localhost/websmartphone/api/orders/search.php",
  common:{
    product:{
      show: "product/show.php",
      read: "product/read.php",
      update: "product/update.php",
      delete: "product/delete.php",
      add: "product/add.php"
    },
    brand:{
      show: "brand/show.php",
      read: "brand/read.php",
      update: "brand/update.php",
      delete: "brand/delete.php",
      add: "brand/add.php"
    }
  },
  addOrderDetail: 'http://localhost/websmartphone/api/orderdetail/add.php',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
