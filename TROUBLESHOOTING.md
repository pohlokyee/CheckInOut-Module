# Troubleshooting Guide - Hostel Management System

## Common Issues & Solutions

### Issue 1: Landing Page Buttons Not Working

**Symptoms:**
- Clicking "Student Portal" or "Administrator Portal" buttons doesn't navigate
- Buttons appear to be disabled

**Solutions:**

1. **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete` 
   - Clear all cache data
   - Refresh the page (F5)

2. **Check Console for Errors**
   - Press `F12` to open Developer Tools
   - Go to "Console" tab
   - Look for any JavaScript errors in red
   - Report exact error message

3. **Verify Router Initialization**
   - The router should initialize automatically
   - Check if navigation works by manually going to: `http://localhost:8080/student`
   - Or try: `http://localhost:8080/admin`

### Issue 2: Request Early Check-In/Out Dialog Doesn't Open

**Symptoms:**
- Clicking "Request Early Check-In/Out" button does nothing
- No error message appears

**Solutions:**

1. **Ensure Fragment is Loaded**
   - Check that file exists: `webapp/view/fragments/EarlyRequestDialog.xml`
   - Verify path in controller matches file location

2. **Check Controller Method**
   - Open browser console (F12)
   - The button should trigger `onRequestEarlyAccess` method
   - Check if there are any JavaScript errors

3. **Verify Dialog ID**
   - Dialog ID should be: `earlyRequestDialog`
   - All child element IDs should be unique

### Issue 3: System Appears Closed When It Should Be Open

**Symptoms:**
- Student sees "Check-In/Out is not available" message
- System should be open based on configuration

**Solutions:**

1. **Check Current System Status**
   - Go to Admin Portal
   - Click "Manage Periods"
   - Verify "System Status" toggle is ON (green)
   - If not, toggle it and click "Save Settings"

2. **Modify Mock Data Directly**
   - Edit: `webapp/model/hostelData.json`
   - Find: `"isOpen": false`
   - Change to: `"isOpen": true`
   - Save file and refresh browser

3. **Verify Period Dates**
   - Check that today's date falls within period ranges
   - Or set dates to past/future dates as needed

### Issue 4: QR Code Verification Not Working

**Symptoms:**
- Entering QR code and clicking "Verify Room" does nothing
- Room doesn't verify as valid

**Solutions:**

1. **Use Correct QR Code**
   - Current student's room: `A-201`
   - Required QR code: `QR-A-201`
   - Exactly as shown - case sensitive

2. **Check Room Assignment**
   - In `hostelData.json`, verify:
     - `currentStudent.room` matches a room in `rooms` array
     - Room ID matches expected value: `A-201`

3. **Verify Room Facilities**
   - Each room must have `facilities` array
   - Facilities should have: name, condition, etc.

### Issue 5: Checklist Items Not Showing Damage Fields

**Symptoms:**
- Selecting "Minor Damage" or "Major Damage" doesn't show description/photo fields
- Form doesn't expand properly

**Solutions:**

1. **Check Binding Context**
   - Open browser console (F12)
   - Verify data is being bound correctly
   - Look for binding errors

2. **Verify View Binding**
   - Confirm checklist data is in view model as `/checklist`
   - Each item should have: `name`, `condition`, `description`, `photo`

3. **Check Segmented Button**
   - Ensure all three options are available:
     - Good
     - Minor Damage
     - Major Damage
   - Test each one individually

## Testing Checklist

- [ ] App loads without console errors
- [ ] Landing page displays with both portal buttons
- [ ] Student portal button navigates correctly
- [ ] Admin portal button navigates correctly
- [ ] Student home page shows blocked/open state correctly
- [ ] Request Early button opens dialog
- [ ] Dialog form accepts input
- [ ] Submit button saves request
- [ ] Blocked state shows when system is closed
- [ ] Open state shows when system is open or early access granted
- [ ] QR code verification works with correct code
- [ ] Checklist displays all 10 items
- [ ] Damage fields show/hide based on selection
- [ ] Form submission completes successfully
- [ ] Admin dashboard shows all statistics
- [ ] Period management page loads
- [ ] Early request review shows pending requests
- [ ] Damage report review shows pending reports
- [ ] Report generation works with filters

## Quick Debug Commands

### Check Router State
```javascript
// In browser console (F12):
sap.ui.getCore().byId("app").getController().oRouter
```

### Check Model Data
```javascript
// In browser console:
var oModel = sap.ui.getCore().getModel("hostelData");
oModel.getData();
```

### Check Current Route
```javascript
// In browser console:
sap.ui.getCore().byId("app").getController().getOwnerComponent().getRouter().getCurrentRoute()
```

### Force Navigation
```javascript
// In browser console:
sap.ui.getCore().byId("app").getController().getOwnerComponent().getRouter().navTo("studentHome");
```

## File Locations

- **Views**: `webapp/view/`
- **Controllers**: `webapp/controller/`
- **Models**: `webapp/model/`
- **Fragments**: `webapp/view/fragments/`
- **Styles**: `webapp/css/style.css`
- **Configuration**: `webapp/manifest.json`

## Browser Developer Tools Tips

1. **Console Tab**: Shows JavaScript errors
2. **Network Tab**: Shows HTTP requests and their status
3. **Elements/Inspector Tab**: Shows HTML structure
4. **Storage Tab**: Shows local storage and session data
5. **Sources Tab**: Allows setting breakpoints for debugging

## Performance Tips

- UI5 views are loaded asynchronously - be patient
- First load may be slower due to library loading
- Clear cache if experiencing issues after code changes
- Use browser's hard refresh: `Ctrl + F5`

## Contacting Support

When reporting an issue, please provide:
1. Exact steps to reproduce
2. Screenshot/error message
3. Browser console errors (F12 → Console)
4. Browser version and OS
5. Whether you cleared cache

