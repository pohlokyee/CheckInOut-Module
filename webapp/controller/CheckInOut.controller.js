sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.CheckInOut", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("checkInOut").attachPatternMatched(this._onRouteMatched, this);

            // Create view model
            var oViewModel = new JSONModel({
                processType: "check-in",
                currentStep: 1,
                scannedRoom: null
            });
            this.getView().setModel(oViewModel, "view");
        },

        _onRouteMatched: function (oEvent) {
            var sType = oEvent.getParameter("arguments").type;
            this.getView().getModel("view").setProperty("/processType", sType);
            this.getView().getModel("view").setProperty("/currentStep", 1);
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("studentHome");
        },

        onVerifyQRCode: function () {
            var oView = this.getView();
            var sQRCode = oView.byId("qrCodeInput").getValue();
            var oHostelModel = this.getView().getModel("hostelData");
            var oCurrentStudent = oHostelModel.getProperty("/currentStudent");
            var aRooms = oHostelModel.getProperty("/rooms");
            var oMessageStrip = oView.byId("verificationMessage");

            // Validate input
            if (!sQRCode) {
                MessageBox.error("Please enter or scan a QR code");
                return;
            }

            // Find room by QR code
            var oRoom = aRooms.find(function(room) {
                return room.qrCode === sQRCode;
            });

            if (!oRoom) {
                oMessageStrip.setType("Error");
                oMessageStrip.setText("Invalid QR code. Please scan a valid room QR code.");
                oMessageStrip.setVisible(true);
                return;
            }

            // Check if room matches student assignment
            if (oRoom.id !== oCurrentStudent.room) {
                oMessageStrip.setType("Error");
                oMessageStrip.setText("This room (" + oRoom.id + ") is not assigned to you. Your assigned room is " + oCurrentStudent.room);
                oMessageStrip.setVisible(true);
                return;
            }

            // Success - proceed to checklist
            oMessageStrip.setType("Success");
            oMessageStrip.setText("Room verified successfully! Proceeding to checklist...");
            oMessageStrip.setVisible(true);

            // Save scanned room and navigate to checklist
            this.getView().getModel("view").setProperty("/scannedRoom", oRoom);
            
            setTimeout(function() {
                this.getOwnerComponent().getRouter().navTo("roomChecklist", {
                    type: this.getView().getModel("view").getProperty("/processType")
                });
            }.bind(this), 1500);
        }
    });
});
