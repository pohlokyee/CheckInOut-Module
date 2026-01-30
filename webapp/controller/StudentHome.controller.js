sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, Fragment, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.StudentHome", {

        onInit: function () {
            // Initialization logic if needed
        },

        onRequestEarlyAccess: function () {
            var oView = this.getView();
            console.log("Opening early request dialog");

            // Load and open the early request dialog
            if (!this._oEarlyRequestDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragments.EarlyRequestDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oEarlyRequestDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                    console.log("Dialog opened successfully");
                }.bind(this)).catch(function(oError) {
                    console.error("Error loading dialog:", oError);
                    MessageBox.error("Error loading dialog: " + oError.message);
                });
            } else {
                this._oEarlyRequestDialog.open();
                console.log("Dialog already loaded, opening existing dialog");
            }
        },

        onSubmitEarlyRequest: function () {
            var oModel = this.getView().getModel("hostelData");
            var oView = this.getView();
            
            // Get form values
            var sRequestType = oView.byId("requestTypeSelect").getSelectedKey();
            var oRequestedDate = oView.byId("requestedDatePicker").getDateValue();
            var sReason = oView.byId("reasonTextArea").getValue();
            
            // Validate inputs
            if (!sRequestType || !oRequestedDate || !sReason) {
                MessageBox.error("Please fill in all required fields");
                return;
            }

            // Create new request
            var oCurrentStudent = oModel.getProperty("/currentStudent");
            var aRequests = oModel.getProperty("/earlyRequests");
            
            var oNewRequest = {
                id: "REQ" + (aRequests.length + 1).toString().padStart(3, '0'),
                studentId: oCurrentStudent.id,
                studentName: oCurrentStudent.name,
                matricNo: oCurrentStudent.matricNo,
                type: sRequestType,
                requestedDate: oRequestedDate.toISOString().split('T')[0],
                reason: sReason,
                evidence: "uploaded_document.pdf",
                status: "pending",
                submittedDate: new Date().toISOString().split('T')[0],
                reviewedBy: null,
                reviewedDate: null
            };

            aRequests.push(oNewRequest);
            oModel.setProperty("/earlyRequests", aRequests);

            MessageToast.show("Early request submitted successfully!");
            this._oEarlyRequestDialog.close();
            
            // Reset form
            oView.byId("requestTypeSelect").setSelectedKey("");
            oView.byId("requestedDatePicker").setValue("");
            oView.byId("reasonTextArea").setValue("");
        },

        onCancelEarlyRequest: function () {
            this._oEarlyRequestDialog.close();
        },

        onUploadEvidence: function () {
            MessageToast.show("File upload simulated - document would be uploaded here");
        },

        onStartCheckIn: function () {
            this.getOwnerComponent().getRouter().navTo("checkInOut", {
                type: "check-in"
            });
        },

        onStartCheckOut: function () {
            this.getOwnerComponent().getRouter().navTo("checkInOut", {
                type: "check-out"
            });
        },

        onViewRequests: function () {
            MessageToast.show("View Requests functionality - To be implemented");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onSwitchToAdmin: function () {
            this.getOwnerComponent().getRouter().navTo("adminHome");
        }
    });
});
