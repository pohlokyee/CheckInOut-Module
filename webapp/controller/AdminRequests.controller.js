sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, Fragment, Filter, FilterOperator, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.AdminRequests", {

        onInit: function () {
            this._selectedRequest = null;
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("adminHome");
        },

        onFilterChange: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            var oTable = this.byId("requestsTable");
            var oBinding = oTable.getBinding("items");
            var aFilters = [];

            if (sKey !== "all") {
                aFilters.push(new Filter("status", FilterOperator.EQ, sKey));
            }

            oBinding.filter(aFilters);
        },

        onRequestSelect: function (oEvent) {
            // Store selected request
        },

        onReviewRequest: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("hostelData");
            this._selectedRequest = oContext;

            var oView = this.getView();

            if (!this._oReviewDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragments.ReviewRequestDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oReviewDialog = oDialog;
                    oView.addDependent(oDialog);
                    this._oReviewDialog.bindElement({
                        path: oContext.getPath(),
                        model: "hostelData"
                    });
                    oDialog.open();
                }.bind(this));
            } else {
                this._oReviewDialog.bindElement({
                    path: oContext.getPath(),
                    model: "hostelData"
                });
                this._oReviewDialog.open();
            }
        },

        onViewRequest: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("hostelData");
            var oRequest = oContext.getObject();

            var sStatus = oRequest.status === "approved" ? "Approved" : "Rejected";
            var sMessage = "Request ID: " + oRequest.id + "\n" +
                          "Status: " + sStatus + "\n" +
                          "Reviewed By: " + oRequest.reviewedBy + "\n" +
                          "Review Date: " + oRequest.reviewedDate;

            MessageBox.information(sMessage, {
                title: "Request Details"
            });
        },

        onApproveRequest: function () {
            var oModel = this.getView().getModel("hostelData");
            var sPath = this._selectedRequest.getPath();
            var oRequest = this._selectedRequest.getObject();

            MessageBox.confirm("Approve this early request?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Update request status
                        oModel.setProperty(sPath + "/status", "approved");
                        oModel.setProperty(sPath + "/reviewedBy", "Admin1");
                        oModel.setProperty(sPath + "/reviewedDate", new Date().toISOString().split('T')[0]);

                        // Grant early access to student if it's the current student
                        var oCurrentStudent = oModel.getProperty("/currentStudent");
                        if (oRequest.studentId === oCurrentStudent.id) {
                            oModel.setProperty("/currentStudent/hasEarlyAccess", true);
                        }

                        MessageToast.show("Request approved and student notified");
                        this._oReviewDialog.close();
                    }
                }.bind(this)
            });
        },

        onRejectRequest: function () {
            var oModel = this.getView().getModel("hostelData");
            var sPath = this._selectedRequest.getPath();

            MessageBox.confirm("Reject this early request?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        oModel.setProperty(sPath + "/status", "rejected");
                        oModel.setProperty(sPath + "/reviewedBy", "Admin1");
                        oModel.setProperty(sPath + "/reviewedDate", new Date().toISOString().split('T')[0]);

                        MessageToast.show("Request rejected and student notified");
                        this._oReviewDialog.close();
                    }
                }.bind(this)
            });
        },

        onViewEvidence: function () {
            MessageToast.show("Opening evidence document...");
        }
    });
});
