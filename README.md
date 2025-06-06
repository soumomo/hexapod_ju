# Hexapod Project Website

A collaborative website for the Jadavpur University Mechatronics Club's hexapod robot project for RoboFest Gujarat 2025.

## Features

- **Team Management**: Separate dashboards for Hardware, Software, and Electronics teams
- **Member Management**: Add/remove team members for each section
- **Content Sharing**: Post updates, share links, and upload files
- **Resource Library**: Access project documentation and resources
- **Timeline Tracking**: Monitor project progress and milestones
- **Responsive Design**: Works on both desktop and mobile devices

## Team Members

### Hardware Team
- Ayushman
- Sagnik Sen

### Software Team
- Soumodeep
- Arka
- Rajanya

### Electronics Team
- Pratyush
- Krishnendu
- Kalpak
- Remon
- Sagnik De

## File Structure

```
/
├── index.html          # Main homepage
├── hardware.html       # Hardware team dashboard
├── software.html       # Software team dashboard
├── electronics.html    # Electronics team dashboard
├── css/
│   └── style.css      # Main stylesheet
└── js/
    ├── app.js         # Main application logic
    ├── hardware.js    # Hardware team functionality
    ├── software.js    # Software team functionality
    └── electronics.js # Electronics team functionality
```

## How to Run

### Method 1: Python HTTP Server (Recommended)
1. Open a terminal in the project directory
2. Run: `python3 -m http.server`
3. Open your browser and go to: `http://localhost:8000`

### Method 2: Direct File Access
1. Simply open `index.html` in your web browser
2. Note: Some features may not work properly due to CORS restrictions

## Usage

1. **Navigation**: Use the sidebar to navigate between different sections
2. **Team Dashboards**: Click on team cards in the "Teams" section to access individual team dashboards
3. **Adding Members**: Click "Add Member" button in any team dashboard
4. **Posting Content**: Use the form in each team dashboard to share updates or resources
5. **File Uploads**: Select files to share with your team (file names will be displayed)

## Data Storage

- All data is stored locally in your browser's localStorage
- No backend database is required
- Data persists between browser sessions
- To reset data, clear your browser's localStorage for the site

## Technical Notes

- No login/authentication system (internal use only)
- Frontend-only implementation using vanilla JavaScript
- Uses localStorage for data persistence
- Responsive design with mobile-friendly navigation
- Modern CSS with CSS custom properties (variables)

## Future Enhancements

- Backend integration for persistent data storage
- Real file upload functionality
- User authentication system
- Real-time collaboration features
- Integration with project management tools

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires a modern browser with JavaScript enabled.
# hexapod_ju
# hexapod_ju
