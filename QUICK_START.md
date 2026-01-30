# Quick Start Guide - Hostel Management System

## Starting the Application

```bash
npx ui5 serve --open /index.html
```

## Testing the System

### As a Student

1. **Landing Page**
   - Click "Student Portal"

2. **Test Blocked State** (System Closed)
   - By default, system is closed (`isOpen: false` in hostelData.json)
   - You'll see the blocked message
   - Click "Request Early Check-In/Out"
   - Fill the form and submit

3. **Test Open State** (Enable Access)
   - Option 1: Switch to Admin → Manage Periods → Toggle "System Status" to Open → Save
   - Option 2: Have admin approve your early request
   - Return to Student Portal to see open state

4. **Perform Check-In**
   - Click "Start Check-In Process"
   - Enter QR code: `QR-A-201` (matches student's assigned room)
   - Click "Verify Room"
   - Fill room checklist:
     - Select condition for each item
     - For damaged items: add description and upload photo
   - Click "Submit Checklist"

### As an Administrator

1. **Landing Page**
   - Click "Administrator Portal"

2. **Manage Periods**
   - Click "Manage Periods"
   - Change dates and toggle system status
   - Click "Save Settings"

3. **Review Early Requests**
   - Click "Review Requests"
   - See list of requests (filter by status)
   - Click "Review" on pending request
   - Choose "Approve" or "Reject"

4. **Review Damage Reports**
   - Click "Review Damage Reports"
   - Filter by status
   - Click "Review" on pending report
   - View damage details and photos
   - Take action:
     - Issue Fine → Enter amount and reason
     - Send Maintenance → Enter notes and select priority
     - Close Report → No action needed

5. **Generate Reports**
   - Click "Generate Reports"
   - Select filters (report type, block, semester, status)
   - Click "Generate Report"
   - View summary statistics and data table
   - Try "Export to CSV" or "Export to Excel"

## Sample Test Data

### Student Credentials (Mock)
- **Name**: Ahmad Zaki
- **Matric**: A20EC0001
- **Room**: A-201
- **QR Code**: QR-A-201

### Early Requests Available
- **REQ001**: Ahmad Zaki - Pending (you can approve/reject)
- **REQ002**: Siti Nurul - Already Approved

### Damage Reports Available
- **DMG001**: Siti Nurul - Pending (you can review)
- **DMG002**: Lee Wei - Already Reviewed with Fine

## Tips for Testing

1. **Toggle System Status**: 
   - Admin → Manage Periods → Switch "System Status" toggle
   - This immediately affects student access

2. **Create New Records**:
   - Student → Check-In → Mark some items as damaged
   - This creates new damage report for admin review

3. **Filter Testing**:
   - All list views have filters (pending/reviewed/all)
   - Report page has multiple filter combinations

4. **Navigation**:
   - Use back arrows to navigate
   - Use "Admin View" / "Student View" buttons to switch roles
   - Home icon returns to landing page

## Simulated Features

These features show UI/UX but don't have full implementation:
- File uploads (shows success message)
- Photo uploads (generates dummy filename)
- Evidence viewing (shows toast)
- Export to CSV/Excel (shows info dialog)

## Troubleshooting

**Problem**: Can't see Student Portal content
- **Solution**: Check if system is open OR if student has early access approved

**Problem**: QR code not working
- **Solution**: Use exact code: `QR-A-201` (matches current student's room)

**Problem**: Can't submit checklist
- **Solution**: For damaged items, must provide BOTH description and photo

**Problem**: Changes not persisting
- **Solution**: This is expected - data is in-memory only (refresh loses data)

## Customizing Mock Data

Edit `webapp/model/hostelData.json` to:
- Change system open/closed state
- Add more students, rooms, requests
- Modify current student details
- Add more damage reports

Example - Enable system:
```json
"systemSettings": {
  "currentPeriod": {
    "isOpen": true  // Change to true
  }
}
```

Example - Grant early access to student:
```json
"currentStudent": {
  "hasEarlyAccess": true  // Change to true
}
```

## Key Files to Modify

- **Mock Data**: `webapp/model/hostelData.json`
- **Routing**: `webapp/manifest.json`
- **Styles**: `webapp/css/style.css`
- **Translations**: `webapp/i18n/i18n.properties`

Happy Testing! 🏨
