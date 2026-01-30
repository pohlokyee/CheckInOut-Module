sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.RoomChecklist", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("roomChecklist").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sType = oEvent.getParameter("arguments").type;
            var oHostelModel = this.getView().getModel("hostelData");
            var oCurrentStudent = oHostelModel.getProperty("/currentStudent");
            var aRooms = oHostelModel.getProperty("/rooms");

            // Find assigned room
            var oRoom = aRooms.find(function(room) {
                return room.id === oCurrentStudent.room;
            });

            // Create checklist from room facilities
            var aChecklist = oRoom.facilities.map(function(facility) {
                return {
                    name: facility.name,
                    condition: "Good",
                    description: "",
                    photo: ""
                };
            });

            // Create view model
            var oViewModel = new JSONModel({
                processType: sType,
                checklist: aChecklist
            });
            this.getView().setModel(oViewModel, "view");
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("checkInOut", {
                type: this.getView().getModel("view").getProperty("/processType")
            });
        },

        onConditionChange: function (oEvent) {
            // Trigger view update
            this.getView().getModel("view").updateBindings(true);
        },

        onUploadPhoto: function (oEvent) {
            var oButton = oEvent.getSource();
            var oBindingContext = oButton.getBindingContext("view");
            var sPath = oBindingContext.getPath();

            // Simulate file upload
            MessageBox.confirm("Simulate photo upload for this item?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        var sPhotoName = "photo_" + Date.now() + ".jpg";
                        this.getView().getModel("view").setProperty(sPath + "/photo", sPhotoName);
                        MessageToast.show("Photo uploaded: " + sPhotoName);
                    }
                }.bind(this)
            });
        },

        onSubmitChecklist: function () {
            var oViewModel = this.getView().getModel("view");
            var aChecklist = oViewModel.getProperty("/checklist");
            var sProcessType = oViewModel.getProperty("/processType");

            // Validate checklist
            var bValid = true;
            var sDamagedItems = [];

            aChecklist.forEach(function(item) {
                if (item.condition === "Minor Damage" || item.condition === "Major Damage") {
                    if (!item.description || !item.photo) {
                        bValid = false;
                    }
                    sDamagedItems.push(item);
                }
            });

            if (!bValid) {
                MessageBox.error("Please provide description and photo for all damaged items");
                return;
            }

            // Save checklist and create damage report if needed
            var oHostelModel = this.getView().getModel("hostelData");
            var oCurrentStudent = oHostelModel.getProperty("/currentStudent");

            // Create check-in/out record
            var aRecords = oHostelModel.getProperty("/checkInOutRecords");
            var oNewRecord = {
                id: "CIO" + (aRecords.length + 1).toString().padStart(3, '0'),
                studentId: oCurrentStudent.id,
                studentName: oCurrentStudent.name,
                matricNo: oCurrentStudent.matricNo,
                type: sProcessType,
                room: oCurrentStudent.room,
                date: new Date().toISOString(),
                status: "completed"
            };
            aRecords.push(oNewRecord);
            oHostelModel.setProperty("/checkInOutRecords", aRecords);

            // Update student status
            if (sProcessType === "check-in") {
                oHostelModel.setProperty("/currentStudent/checkInStatus", "completed");
                oHostelModel.setProperty("/currentStudent/checkInDate", new Date().toISOString());
            } else {
                oHostelModel.setProperty("/currentStudent/checkOutStatus", "completed");
                oHostelModel.setProperty("/currentStudent/checkOutDate", new Date().toISOString());
            }

            // Create damage report if there are damaged items
            if (sDamagedItems.length > 0) {
                var aDamageReports = oHostelModel.getProperty("/damageReports");
                var oDamageReport = {
                    id: "DMG" + (aDamageReports.length + 1).toString().padStart(3, '0'),
                    studentId: oCurrentStudent.id,
                    studentName: oCurrentStudent.name,
                    matricNo: oCurrentStudent.matricNo,
                    room: oCurrentStudent.room,
                    type: sProcessType,
                    reportDate: new Date().toISOString(),
                    items: sDamagedItems.map(function(item) {
                        return {
                            facility: item.name,
                            condition: item.condition,
                            description: item.description,
                            photo: item.photo
                        };
                    }),
                    status: "pending",
                    action: null,
                    fineAmount: null,
                    fineReason: null,
                    maintenanceRequest: null,
                    reviewedBy: null,
                    reviewedDate: null
                };
                aDamageReports.push(oDamageReport);
                oHostelModel.setProperty("/damageReports", aDamageReports);
            }

            // Show success message
            var sMessage = sProcessType === "check-in" ? "Check-in" : "Check-out";
            MessageBox.success(sMessage + " completed successfully!", {
                onClose: function() {
                    this.getOwnerComponent().getRouter().navTo("studentHome");
                }.bind(this)
            });
        }
    });
});
