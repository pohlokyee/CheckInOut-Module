sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        
        onStudentPortal() {
            this.getOwnerComponent().getRouter().navTo("studentHome");
        },

        onAdminPortal() {
            this.getOwnerComponent().getRouter().navTo("adminHome");
        },

        onPortalChange(oEvent) {
            const sKey = oEvent.getSource().getSelectedKey();
            if (sKey === "student") {
                this.getOwnerComponent().getRouter().navTo("studentHome");
            } else {
                this.getOwnerComponent().getRouter().navTo("adminHome");
            }
        }
    });
});