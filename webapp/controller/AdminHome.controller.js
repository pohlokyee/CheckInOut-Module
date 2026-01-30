sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.AdminHome", {

        onInit: function () {
            // Initialization logic if needed
        },
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },


        onManagePeriods: function () {
            this.getOwnerComponent().getRouter().navTo("adminPeriod");
        },

        onReviewRequests: function () {
            this.getOwnerComponent().getRouter().navTo("adminRequests");
        },

        onReviewDamage: function () {
            this.getOwnerComponent().getRouter().navTo("adminDamage");
        },

        onGenerateReports: function () {
            this.getOwnerComponent().getRouter().navTo("adminReport");
        },

        onSwitchToStudent: function () {
            this.getOwnerComponent().getRouter().navTo("studentHome");
        }
    });
});
