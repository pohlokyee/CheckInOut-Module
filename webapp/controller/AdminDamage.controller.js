sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat"
], function (Controller, Fragment, Filter, FilterOperator, MessageToast, MessageBox, DateFormat) {
    "use strict";

    return Controller.extend("project1.controller.AdminDamage", {

        formatDateTime: function(sDate) {
            if (!sDate) return "";
            var oDateFormat = DateFormat.getDateTimeInstance({pattern: "dd/MM/yyyy HH:mm"});
            return oDateFormat.format(new Date(sDate));
        },

        onInit: function () {
            this._selectedReport = null;
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("adminHome");
        },

        onFilterChange: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            var oTable = this.byId("damageTable");
            var oBinding = oTable.getBinding("items");
            var aFilters = [];

            if (sKey !== "all") {
                aFilters.push(new Filter("status", FilterOperator.EQ, sKey));
            }

            oBinding.filter(aFilters);
        },

        onReviewDamage: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("hostelData");
            this._selectedReport = oContext;

            var oView = this.getView();

            if (!this._oReviewDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragments.ReviewDamageDialog",
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

        onViewDamage: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("hostelData");
            var oReport = oContext.getObject();

            var sAction = oReport.action === "fine" ? "Fine Issued: RM" + oReport.fineAmount :
                         oReport.action === "maintenance" ? "Maintenance Request Sent" :
                         "Report Closed - No Action";

            var sMessage = "Report ID: " + oReport.id + "\n" +
                          "Action: " + sAction + "\n" +
                          "Reviewed By: " + oReport.reviewedBy + "\n" +
                          "Review Date: " + this.formatDateTime(oReport.reviewedDate);

            MessageBox.information(sMessage, {
                title: "Damage Report Details"
            });
        },

        onIssueFine: function () {
            MessageBox.prompt("Enter fine amount (RM) and reason:", {
                title: "Issue Fine",
                initialValue: "100",
                onClose: function(sAction, sValue) {
                    if (sAction === MessageBox.Action.OK && sValue) {
                        var iFineAmount = parseFloat(sValue);
                        if (isNaN(iFineAmount) || iFineAmount <= 0) {
                            MessageBox.error("Please enter a valid fine amount");
                            return;
                        }

                        MessageBox.prompt("Enter reason for fine:", {
                            title: "Fine Reason",
                            initialValue: "Damage to hostel property",
                            onClose: function(sAction2, sReason) {
                                if (sAction2 === MessageBox.Action.OK && sReason) {
                                    this._updateDamageReport("fine", {
                                        fineAmount: iFineAmount,
                                        fineReason: sReason
                                    });
                                }
                            }.bind(this)
                        });
                    }
                }.bind(this)
            });
        },

        onSendMaintenance: function () {
            MessageBox.prompt("Enter maintenance details (damage type and notes):", {
                title: "Send Maintenance Request",
                initialValue: "Repair required for damaged facility",
                onClose: function(sAction, sNotes) {
                    if (sAction === MessageBox.Action.OK && sNotes) {
                        MessageBox.confirm("Select priority level:\n\nHigh - Urgent repair needed\nMedium - Standard repair\nLow - Minor repair", {
                            title: "Select Priority",
                            actions: ["High", "Medium", "Low", MessageBox.Action.CANCEL],
                            onClose: function(sPriority) {
                                if (sPriority !== MessageBox.Action.CANCEL) {
                                    this._updateDamageReport("maintenance", {
                                        maintenanceNotes: sNotes,
                                        maintenancePriority: sPriority
                                    });
                                }
                            }.bind(this)
                        });
                    }
                }.bind(this)
            });
        },

        onCloseReport: function () {
            MessageBox.confirm("Close this report without taking action?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        this._updateDamageReport("closed", {});
                    }
                }.bind(this)
            });
        },

        _updateDamageReport: function(sAction, oData) {
            var oModel = this.getView().getModel("hostelData");
            var sPath = this._selectedReport.getPath();

            // Update report
            oModel.setProperty(sPath + "/status", "reviewed");
            oModel.setProperty(sPath + "/action", sAction);
            oModel.setProperty(sPath + "/reviewedBy", "Admin1");
            oModel.setProperty(sPath + "/reviewedDate", new Date().toISOString());

            if (sAction === "fine") {
                oModel.setProperty(sPath + "/fineAmount", oData.fineAmount);
                oModel.setProperty(sPath + "/fineReason", oData.fineReason);
                MessageToast.show("Fine issued and student notified");
            } else if (sAction === "maintenance") {
                oModel.setProperty(sPath + "/maintenanceRequest", {
                    notes: oData.maintenanceNotes,
                    priority: oData.maintenancePriority
                });
                MessageToast.show("Maintenance request sent");
            } else {
                MessageToast.show("Report closed");
            }

            this._oReviewDialog.close();
        },

        onCancelReview: function () {
            this._oReviewDialog.close();
        },

        onViewPhoto: function (oEvent) {
            var oLink = oEvent.getSource();
            var sPhoto = oLink.getText();
            MessageToast.show("Viewing photo: " + sPhoto);
        }
    });
});
