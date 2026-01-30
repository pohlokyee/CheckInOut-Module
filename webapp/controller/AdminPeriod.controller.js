sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.AdminPeriod", {

        onInit: function () {
            // Initialization logic if needed
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("adminHome");
        },

        onSavePeriod: function () {
            var oModel = this.getView().getModel("hostelData");
            
            // Validate dates
            var oCheckInStart = new Date(oModel.getProperty("/systemSettings/currentPeriod/checkInStart"));
            var oCheckInEnd = new Date(oModel.getProperty("/systemSettings/currentPeriod/checkInEnd"));
            var oCheckOutStart = new Date(oModel.getProperty("/systemSettings/currentPeriod/checkOutStart"));
            var oCheckOutEnd = new Date(oModel.getProperty("/systemSettings/currentPeriod/checkOutEnd"));

            if (oCheckInStart >= oCheckInEnd) {
                MessageBox.error("Check-in end date must be after start date");
                return;
            }

            if (oCheckOutStart >= oCheckOutEnd) {
                MessageBox.error("Check-out end date must be after start date");
                return;
            }

            // Save settings
            MessageBox.success("Period settings saved successfully! Student access has been updated accordingly.", {
                onClose: function() {
                    MessageToast.show("Settings saved");
                }
            });
        },

        onReset: function () {
            MessageBox.confirm("Reset all changes to last saved values?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        this.getView().getModel("hostelData").updateBindings(true);
                        MessageToast.show("Changes reset");
                    }
                }.bind(this)
            });
        }
    });
});
