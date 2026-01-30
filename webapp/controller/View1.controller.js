sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        
        onStudentPortal() {
            this.getOwnerComponent().getRouter().navTo("studentHome");
        },
        
        onAdminPortal() {
            this.getOwnerComponent().getRouter().navTo("adminHome");
        }
    });
});