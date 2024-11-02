# GPS-Based Attendance System

## Overview

The GPS-Based Attendance System is a modern solution designed to simplify attendance tracking for organizations. Leveraging the MERN stack (MongoDB, Express.js, React.js, Node.js), this system utilizes GPS technology and real-time location tracking to authenticate users and mark attendance accurately.

## Features

- **MAC Address Authentication**: Users' devices' MAC addresses are securely stored in the database during signup for future authentication.
- **Real-Time Location Tracking**: The system verifies the user's location to ensure they are within the specified range set by the administrator before allowing attendance marking.
- **Efficient Attendance Management**: Organizations can bid farewell to manual attendance processes and embrace a seamless, reliable, and efficient solution that saves time and reduces administrative burden.

## File Path Changes Before Running

Before running the project, update the following file paths:

1. **BackEnd/routes/dashboard.js**
2. **BackEnd/routes/history.js**
3. **BackEnd/routes/update.js**

Replace:

```javascript
const filepath = 'LOCAL DIR. PATH/data.json';
```

with your local directory path.

## Steps to Run the Project

### Server Side

1. Navigate to the BackEnd directory:

   ```bash
   cd BackEnd
   ```

2. Start the server using nodemon:

   ```bash
   npx nodemon
   ```

### Client Side

1. Navigate to the FrontEnd directory:

   ```bash
   cd FrontEnd
   ```

2. Navigate to the React app directory:

   ```bash
   cd my-app
   ```

3. Start the React development server:

   ```bash
   npm start
   ```