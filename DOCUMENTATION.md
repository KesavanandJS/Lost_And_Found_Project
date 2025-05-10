# Lost and Found System Documentation

## 1. Project Overview

The Lost and Found system is a web application designed to help users report lost and found items, search for items, and allow administrators to moderate and update item statuses. The system consists of a backend API built with Node.js, Express, and MongoDB, and a frontend user interface built with React.

### Technologies Used
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, React Router, Bootstrap CSS
- Communication: RESTful API

---

## 2. Backend

### Setup Instructions

1. Navigate to the `backend-node` directory:
   ```bash
   cd backend-node
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure MongoDB is running locally or update the connection string in `index.js`:
   ```js
   const mongoURI = 'mongodb://localhost:27017/lostandfound';
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   The server will run on port 5000 by default.

### MongoDB Connection

The backend connects to a MongoDB database named `lostandfound`. The connection uses Mongoose with the following schema for items:

- `referenceId`: String (unique identifier)
- `type`: String (`lost` or `found`)
- `category`: String
- `description`: String
- `location`: String
- `reportedBy`: String
- `status`: String (e.g., `reported`, `matched`, `returned`, `resolved`)

### API Endpoints

- **POST /api/items/lost**  
  Report a lost item.  
  Request body example:
  ```json
  {
    "category": "Electronics",
    "description": "Black smartphone",
    "location": "Library",
    "reportedBy": "John Doe"
  }
  ```
  Response: Created item with generated `referenceId`.

- **POST /api/items/found**  
  Report a found item.  
  Request body similar to lost item.

- **GET /api/items/search?type=lost&category=Electronics**  
  Search items by type and optional category.  
  Response: Array of matching items.

- **PUT /api/items/:id/status?status=matched**  
  Update the status of an item by ID.

- **GET /api/admin/items**  
  Get all items (admin access).

- **PUT /api/admin/items/:id/status?status=returned**  
  Update item status (admin access).

---

## 3. Frontend

### Setup Instructions

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

### Main Components Overview

- **AdminPanel**  
  Displays all reported items in a table. Allows admins to update item statuses via dropdown.

- **ReportItem**  
  Form to report lost or found items with fields for type, category, description, location, and reporter name.

- **SearchItems**  
  Form to search for lost or found items by type and optional category. Displays search results.

- **Header**  
  Navigation bar with links to Admin Panel, Report Item, and Search Items pages.

### Routing Structure

- `/` - Admin Panel
- `/report` - Report Item form
- `/search` - Search Items form

---

## 4. Usage

### Reporting Lost or Found Items

- Navigate to the "Report Item" page.
- Select the type (Lost or Found).
- Fill in the category, description, location, and your name.
- Submit the form to report the item. A reference ID will be generated.

### Searching Items

- Navigate to the "Search Items" page.
- Select the type (Lost or Found).
- Optionally enter a category to filter.
- Submit the form to view matching items.

### Admin Panel

- Navigate to the Admin Panel.
- View all reported items with details.
- Use the dropdown in the "Update Status" column to change the status of an item.
- Status options include: Reported, Matched, Returned, Resolved.

---

## 5. Additional Notes

### Environment Variables

- `REACT_APP_BACKEND_URL` (optional): URL of the backend API. Defaults to `http://localhost:5000`.

### Possible Improvements

- Add user authentication and authorization.
- Enhance UI/UX with better styling and feedback.
- Add email notifications for matched or returned items.
- Implement pagination for large item lists.
- Add image upload for items.

---

This documentation provides an overview and instructions to set up, run, and use the Lost and Found system.
