# System Testing Guide - Matching Design Mockups

## Overview
This guide walks you through testing all system flows matching the provided design screenshots.

---

## Test Flow 1: System Closed State (Screenshots 1 & 2)

### Step 1: Access Student Portal with System Closed

1. Open browser and navigate to app
2. Click **"Student Portal"** button
3. **Expected Result**: See "Check-In/Out is not available" blocked state (matching mockup #1)
   - Lock icon visible
   - "Official Check-In Period: 2026-02-01" message shown
   - Yellow **"Request Early Check-In/Out"** button visible

### Step 2: Open Early Request Dialog

1. From blocked state page, click **"Request Early Check-In/Out"** button
2. **Expected Result**: Dialog opens (matching mockup #2) with:
   - Title: "Request Early Check-In/Out"
   - Form fields:
     - "Request Type" dropdown (select "Early Check-In")
     - "Requested Start Date" date picker
     - "Requested End Date" date picker  
     - "Reason for Request" text area
     - "Supporting Documents" file upload section
   - "Submit Request" button (yellow)
   - "Cancel" button

### Step 3: Fill and Submit Request

1. In the form:
   - **Request Type**: Select "Early Check-In"
   - **Start Date**: Select a date (e.g., 2026-01-25)
   - **End Date**: Select a date (e.g., 2026-01-28)
   - **Reason**: Type "Early orientation program attendance"
   - **Upload**: Click "Upload File" button (simulated)
2. Click **"Submit Request"** button
3. **Expected Result**:
   - Toast message: "Early request submitted successfully!"
   - Dialog closes
   - Returns to blocked state page

---

## Test Flow 2: System Open State (Screenshot 3)

### Step 1: Enable System (As Admin)

1. From main landing page, click **"Administrator Portal"**
2. Click **"Manage Periods"**
3. Scroll to "System Status" field
4. Toggle switch to **ON** (enable system)
5. Click **"Save Settings"**
6. **Expected Result**: Toast message "Settings saved"

### Step 2: Access Student Portal with System Open

1. Click back button or go to home
2. Click **"Student Portal"**
3. **Expected Result**: See open state page (matching mockup #3) with:
   - Student info card showing:
     - Name: Ahmad Zaki
     - Matric: A20EC0001
     - Room: A-201
     - Block: Block A
   - Status section showing:
     - Check-In: Pending (warning status)
     - Check-Out: Pending (warning status)
   - Blue **"Start Check-In Process"** button
   - Blue **"Start Check-Out Process"** button
   - **"View My Requests"** button

---

## Test Flow 3: QR Code Verification (Screenshot 4)

### Step 1: Start Check-In Process

1. From student open state page, click **"Start Check-In Process"** button
2. **Expected Result**: Navigate to QR code scanning page (matching mockup #4) with:
   - Step progress indicator showing:
     - Step 1: Scan Room QR Code (active/blue)
     - Step 2: Complete Room Checklist (inactive)
     - Step 3: Submit (inactive)
   - Large camera/QR icon
   - Instruction text: "Scan Your Room QR Code"
   - Text: "Please scan the QR code located at your room door"
   - Input field for QR code (or manual entry)
   - Blue **"Verify Room"** button

### Step 2: Verify QR Code

1. In the input field, enter: **QR-A-201** (exact code for room A-201)
2. Click **"Verify Room"** button
3. **Expected Result**: Success message shown (matching mockup #4 verification) with:
   - Green checkmark icon
   - "Verification Successful!" title
   - Room details displayed:
     - Room ID: A-201
     - Block: Block A
   - Green **"Continue to Checklist"** button appears
   - Progress updates to show Step 2 active

### Step 3: Invalid QR Code Test

1. Go back (optional test)
2. Enter wrong code: **QR-B-101**
3. Click **"Verify Room"** button
4. **Expected Result**: Error message:
   - "This room (B-101) is not assigned to you. Your assigned room is A-201"
   - Red/error message indicator

---

## Test Flow 4: Room Condition Checklist (Screenshots 5 & 6)

### Step 1: View Checklist Page

1. After verification succeeds, click **"Continue to Checklist"** or auto-navigate
2. **Expected Result**: Room Condition Checklist page appears (matching mockup #5) with:
   - Student Information panel:
     - Room: A-201
     - Block: Block A
   - Information text: "Please inspect each item carefully and mark its condition..."
   - "Room Condition Checklist" panel with 10 items listed:
     1. Bed
     2. Table
     3. Chair
     4. Fan
     5. Light
     6. Wall
     7. Floor
     8. Window
     9. Socket
     10. Door

### Step 2: Mark Items as Good

1. For most items (Bed, Table, Fan, Light, Wall, Floor, Window, Socket), click **"Good"** button
2. **Expected Result**: Each item shows green checkmark next to "Good"

### Step 3: Mark Item as Minor Damage (Conditional Fields)

1. For "Chair" item, click **"Minor Damage"** button
2. **Expected Result**: Conditional fields appear (matching mockup #6) with:
   - "Description *" label with red asterisk (required)
   - Text area for damage description
   - **"Upload Photo"** button
   - Placeholder text: "Describe the damage"
3. In description field, type: **"Leg is slightly loose"**
4. Click **"Upload Photo"** button
5. **Expected Result**: Toast shows "Photo uploaded: photo_[timestamp].jpg"

### Step 4: Mark Item as Major Damage

1. For "Door" item, click **"Major Damage"** button
2. **Expected Result**: Same conditional fields appear with:
   - Description field
   - Photo upload button
3. Type description: **"Door lock mechanism broken"**
4. Click **"Upload Photo"** to simulate upload

### Step 5: Submit Checklist

1. After marking all items, scroll to bottom
2. Click **"Submit Checklist"** button
3. **Expected Result**: Success message (matching mockup #7) showing:
   - Green checkmark icon
   - "Check-In Completed!" title
   - Confirmation message: "Your room condition checklist has been submitted successfully. Welcome to your new room!"
   - Submission time displayed
   - Blue **"Return to Home"** button
   - Progress indicator shows all 3 steps complete (green)

---

## Test Flow 5: Admin Damage Report Review

### Step 1: Access Damage Report Review (As Admin)

1. From any page, navigate to **"Administrator Portal"**
2. Click **"Review Damage Reports"**
3. **Expected Result**: Damage report list page showing:
   - Pending damage reports
   - Filter options (All/Pending/Reviewed)
   - Table with columns: ID, Student, Room, Type, Report Date, Status, Action
   - **"Review"** button for pending reports

### Step 2: Review Damage Report

1. Find a pending damage report in list
2. Click **"Review"** button
3. **Expected Result**: Dialog opens showing:
   - Student information
   - Damage items list:
     - Facility name
     - Condition (Minor/Major with color coding)
     - Description
     - Photo link
   - Three action buttons (Split button):
     - **Issue Fine** 
     - **Send Maintenance Request**
     - **Close Report (No Action)**

### Step 3: Take Action - Issue Fine

1. Click dropdown arrow next to "Take Action" button
2. Select **"Issue Fine"**
3. Enter fine amount: **150**
4. Enter reason: **"Severe damage to hostel property"**
5. Click confirm
6. **Expected Result**:
   - Report status changes to "reviewed"
   - Action shown as "fine"
   - Toast: "Fine issued and student notified"
   - Dialog closes

### Step 4: Take Action - Send Maintenance

1. Open another damage report
2. Click "Take Action" → **"Send Maintenance Request"**
3. Enter details: **"Air conditioner not cooling properly"**
4. Select priority: **"High"**
5. Click confirm
6. **Expected Result**:
   - Toast: "Maintenance request sent"
   - Report status changes to "reviewed"

---

## Test Flow 6: Generate Operational Reports

### Step 1: Access Report Generation

1. From **"Administrator Portal"**, click **"Generate Reports"**
2. **Expected Result**: Report generation page with:
   - Filter options:
     - Report Type (All Data / Check-In / Check-Out / Damage / Early Requests)
     - Block (All / Block A / Block B / Block C)
     - Semester (Current / Sem 1 / Sem 2)
     - Status (All / Pending / Completed / Reviewed)
   - Generate Report button

### Step 2: Generate Report

1. Select filters:
   - Report Type: "All Data"
   - Block: "All Blocks"
   - Status: "All Status"
2. Click **"Generate Report"** button
3. **Expected Result**: Report displays with:
   - Summary statistics:
     - Total Records: (number)
     - Pending: (number)
     - Completed/Reviewed: (number)
   - Data table with all records
   - Export buttons: "Export to CSV" / "Export to Excel"

### Step 3: Filter and Export

1. Change Report Type to "Damage Reports"
2. Change Status to "Pending"
3. Click **"Generate Report"** again
4. Click **"Export to CSV"**
5. **Expected Result**: Toast shows "Exporting report to CSV..."

---

## Summary of Key Test Points

✅ **System Access Control**
- Blocked state shows when system closed
- Open state shows when system open
- Request button works when system closed

✅ **QR Verification**
- Correct code (QR-A-201) verifies successfully
- Wrong code shows appropriate error
- Room details display after verification

✅ **Checklist Process**
- All 10 facilities display
- Good selection works
- Minor/Major damage shows conditional fields
- Damage fields are required when damage selected
- Submit button completes flow

✅ **Admin Functions**
- Can manage periods and toggle system
- Can review and act on damage reports
- Can generate filtered reports
- Export functions work

---

## Debug Tips

If any flow doesn't work:

1. **Open browser console** (F12) and look for errors
2. **Check system status** in Admin → Manage Periods
3. **Verify QR code** is exactly: **QR-A-201**
4. **Clear cache** if UI looks old (Ctrl + Shift + Delete)
5. **Hard refresh** page (Ctrl + F5)
6. **Check file paths** match exactly in manifest

## Expected File Modifications

After running through all tests:
- Mock data in `hostelData.json` will have:
  - New early requests
  - New check-in/out records
  - New damage reports
  - Updated system status
  - (All changes are in-memory only - refresh will reset)

