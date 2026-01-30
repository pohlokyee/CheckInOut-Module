sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.AdminReport", {

        onInit: function () {
            var oViewModel = new JSONModel({
                reportGenerated: false,
                reportTitle: "",
                reportData: [],
                summary: {
                    totalRecords: 0,
                    pending: 0,
                    completed: 0
                }
            });
            this.getView().setModel(oViewModel, "view");
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("adminHome");
        },

        onGenerateReport: function () {
            var oView = this.getView();
            var sReportType = oView.byId("reportTypeSelect").getSelectedKey();
            var sBlock = oView.byId("blockSelect").getSelectedKey();
            var sStatus = oView.byId("statusSelect").getSelectedKey();

            var oHostelModel = this.getView().getModel("hostelData");
            var aReportData = [];
            var sReportTitle = "";

            // Gather data based on report type
            if (sReportType === "all" || sReportType === "checkIn" || sReportType === "checkOut") {
                var aRecords = oHostelModel.getProperty("/checkInOutRecords");
                aRecords.forEach(function(record) {
                    if (sReportType === "all" || record.type === sReportType.replace("checkIn", "check-in").replace("checkOut", "check-out")) {
                        var bInclude = true;
                        
                        // Filter by block
                        if (sBlock !== "all") {
                            var aRooms = oHostelModel.getProperty("/rooms");
                            var oRoom = aRooms.find(r => r.id === record.room);
                            if (!oRoom || oRoom.block !== sBlock) {
                                bInclude = false;
                            }
                        }

                        // Filter by status
                        if (sStatus !== "all" && record.status !== sStatus) {
                            bInclude = false;
                        }

                        if (bInclude) {
                            aReportData.push({
                                id: record.id,
                                name: record.studentName + " (" + record.matricNo + ")",
                                room: record.room,
                                date: this._formatDate(record.date),
                                status: record.status,
                                statusState: record.status === "completed" ? "Success" : "Warning"
                            });
                        }
                    }
                }.bind(this));
                sReportTitle = "Check-In/Out Records";
            }

            if (sReportType === "all" || sReportType === "damage") {
                var aDamageReports = oHostelModel.getProperty("/damageReports");
                aDamageReports.forEach(function(report) {
                    var bInclude = true;

                    // Filter by block
                    if (sBlock !== "all") {
                        var aRooms = oHostelModel.getProperty("/rooms");
                        var oRoom = aRooms.find(r => r.id === report.room);
                        if (!oRoom || oRoom.block !== sBlock) {
                            bInclude = false;
                        }
                    }

                    // Filter by status
                    if (sStatus !== "all" && report.status !== sStatus && 
                        !(sStatus === "completed" && report.status === "reviewed")) {
                        bInclude = false;
                    }

                    if (bInclude) {
                        aReportData.push({
                            id: report.id,
                            name: report.studentName + " (" + report.matricNo + ")",
                            room: report.room + " - " + report.items.length + " item(s)",
                            date: this._formatDate(report.reportDate),
                            status: report.status,
                            statusState: report.status === "reviewed" ? "Success" : "Warning"
                        });
                    }
                }.bind(this));
                if (sReportType === "damage") sReportTitle = "Damage Reports";
            }

            if (sReportType === "all" || sReportType === "earlyRequests") {
                var aRequests = oHostelModel.getProperty("/earlyRequests");
                aRequests.forEach(function(request) {
                    var bInclude = true;

                    // Filter by status
                    if (sStatus !== "all" && request.status !== sStatus) {
                        bInclude = false;
                    }

                    if (bInclude) {
                        aReportData.push({
                            id: request.id,
                            name: request.studentName + " (" + request.matricNo + ")",
                            room: request.type === "check-in" ? "Early Check-In" : "Early Check-Out",
                            date: this._formatDate(request.submittedDate),
                            status: request.status,
                            statusState: request.status === "approved" ? "Success" : 
                                       request.status === "rejected" ? "Error" : "Warning"
                        });
                    }
                }.bind(this));
                if (sReportType === "earlyRequests") sReportTitle = "Early Requests";
            }

            if (sReportType === "all") {
                sReportTitle = "All Records";
            }

            // Calculate summary
            var iTotalRecords = aReportData.length;
            var iPending = aReportData.filter(r => r.status === "pending").length;
            var iCompleted = aReportData.filter(r => r.status === "completed" || r.status === "reviewed" || r.status === "approved").length;

            // Update view model
            var oViewModel = this.getView().getModel("view");
            oViewModel.setProperty("/reportGenerated", true);
            oViewModel.setProperty("/reportTitle", sReportTitle);
            oViewModel.setProperty("/reportData", aReportData);
            oViewModel.setProperty("/summary/totalRecords", iTotalRecords);
            oViewModel.setProperty("/summary/pending", iPending);
            oViewModel.setProperty("/summary/completed", iCompleted);

            MessageToast.show("Report generated: " + iTotalRecords + " records found");
        },

        _formatDate: function(sDate) {
            if (!sDate) return "";
            var oDate = new Date(sDate);
            return oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        },

        onClearFilters: function () {
            var oView = this.getView();
            oView.byId("reportTypeSelect").setSelectedKey("all");
            oView.byId("blockSelect").setSelectedKey("all");
            oView.byId("semesterSelect").setSelectedKey("current");
            oView.byId("statusSelect").setSelectedKey("all");
            
            this.getView().getModel("view").setProperty("/reportGenerated", false);
            MessageToast.show("Filters cleared");
        },

        onExportCSV: function () {
            MessageToast.show("Exporting report to CSV...");
            MessageBox.information("CSV export functionality would download the report data as a CSV file.");
        },

        onExportExcel: function () {
            MessageToast.show("Exporting report to Excel...");
            MessageBox.information("Excel export functionality would download the report data as an Excel file.");
        }
    });
});
