# UTM Hostel Management System

A comprehensive hostel management module for university digital ecosystem built with SAP UI5. This prototype demonstrates digital check-in/check-out processes for students and administrative management tools for hostel staff.

## Features

### Student Functions

#### 1. System Access Control
- **Blocked State**: When check-in/out period is not active and no early access is granted
  - Displays blocked message with official start date
  - Option to request early access
- **Open State**: When period is active or early access is approved
  - Shows student information
  - Displays check-in/out status
  - Provides action buttons

#### 2. Early Check-In/Out Request
- Students can request early access before official period
- Form includes:
  - Request type (check-in or check-out)
  - Requested date
  - Detailed reason
  - File upload for supporting evidence
- Request submitted to admin for review

#### 3. Digital Check-In/Out Process
- **Step 1**: QR Code Scanning
  - Simulated QR code scanner for room verification
  - Manual QR code entry option
  - Validates room assignment
- **Step 2**: Room Condition Checklist
  - Comprehensive facility inspection
  - Three condition options: Good / Minor Damage / Major Damage
  - Required fields for damaged items:
    - Description of damage
    - Photo evidence upload
- **Step 3**: Submission
  - Creates check-in/out record
  - Generates damage report if items are damaged
  - Updates student status

### Admin Functions

#### 1. Period Management
- Set academic year and semester
- Configure check-in and check-out date ranges
- Toggle system open/closed status
- Automatic access control for students

#### 2. Early Request Review
- View all early check-in/out requests
- Filter by status (pending/approved/rejected)
- Review dialog shows:
  - Student information
  - Request details and reason
  - Supporting evidence
- Actions: Approve or Reject
- Automatic notification to students

#### 3. Damage Report Review
- List of all damage reports with filtering
- Filter by status (pending/reviewed)
- Review dialog displays:
  - Student and room information
  - Detailed damage items with photos
  - Report metadata
- Three action options:
  1. **Issue Fine**: Enter amount and reason
  2. **Send Maintenance Request**: Create work order with priority
  3. **Close Report**: Mark as reviewed with no action

#### 4. Operational Reports
- Generate reports with multiple filters:
  - Report type (all data, check-in, check-out, damage, early requests)
  - Block (A, B, C)
  - Semester
  - Status
- Summary statistics dashboard
- Detailed data table
- Export functionality (CSV/Excel simulation)

## Project Structure

```
webapp/
├── controller/
│   ├── AdminDamage.controller.js       # Damage report review
│   ├── AdminHome.controller.js         # Admin dashboard
│   ├── AdminPeriod.controller.js       # Period management
│   ├── AdminReport.controller.js       # Report generation
│   ├── AdminRequests.controller.js     # Early request review
│   ├── CheckInOut.controller.js        # QR scanning process
│   ├── RoomChecklist.controller.js     # Room condition checklist
│   ├── StudentHome.controller.js       # Student main page
│   └── View1.controller.js             # Landing page
├── model/
│   ├── hostelData.json                 # Mock data
│   └── models.js                       # Model initialization
├── view/
│   ├── AdminDamage.view.xml
│   ├── AdminHome.view.xml
│   ├── AdminPeriod.view.xml
│   ├── AdminReport.view.xml
│   ├── AdminRequests.view.xml
│   ├── CheckInOut.view.xml
│   ├── RoomChecklist.view.xml
│   ├── StudentHome.view.xml
│   ├── View1.view.xml
│   └── fragments/
│       ├── EarlyRequestDialog.xml      # Early request form
│       ├── ReviewDamageDialog.xml      # Damage review dialog
│       └── ReviewRequestDialog.xml     # Request review dialog
└── manifest.json                        # App configuration & routing
```

## How to Run

1. Ensure you have Node.js and npm installed

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx ui5 serve --open /index.html
   ```

4. The application will open in your default browser

## Navigation Flow

### Landing Page
- Choose between Student Portal or Administrator Portal

### Student Portal Flow
1. StudentHome → View blocked/open state
2. If blocked → Request Early Access
3. If open → Start Check-In/Out
4. QR Scanner → Scan/Enter room QR code
5. Room Checklist → Inspect facilities
6. Submit → Complete process

### Administrator Portal Flow
1. AdminHome → Dashboard with quick stats
2. Manage Periods → Set check-in/out dates
3. Review Requests → Approve/reject early requests
4. Review Damage → Take action on damage reports
5. Generate Reports → Create filtered operational reports

## Mock Data

The system includes sample data:
- 1 current student (Ahmad Zaki, A-201)
- 2 early requests (1 pending, 1 approved)
- 2 damage reports (1 pending, 1 reviewed)
- Room facilities checklist (10 items)
- System period settings

## Key Features Demonstrated

✅ Conditional access control based on period settings  
✅ Multi-step workflow with validation  
✅ Dynamic forms with conditional fields  
✅ File upload simulation  
✅ Data filtering and sorting  
✅ Status tracking and notifications  
✅ Multiple admin action options  
✅ Report generation with filters  
✅ Responsive UI design  
✅ Navigation between modules  

## Technology Stack

- **Framework**: SAP UI5 (OpenUI5)
- **Language**: JavaScript
- **Data Binding**: JSON Model
- **UI Controls**: sap.m library
- **Routing**: sap.m.routing.Router
- **Patterns**: MVC (Model-View-Controller)

## Future Enhancements

- Real backend integration with database
- Actual QR code scanning with device camera
- Email/SMS notifications
- Real-time updates using WebSockets
- Advanced reporting with charts
- Multi-language support
- Mobile app version
- Photo gallery for damage evidence
- Document management system
- Integration with student information system

## Notes

This is a **prototype/simulation** designed to demonstrate functional behavior and user interactions. All data is stored in client-side JSON models and resets on page refresh. For production use, integrate with a proper backend API and database system.

## License

Educational/Academic Use
