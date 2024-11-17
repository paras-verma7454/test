# Contact Management App

## 🚀 **PROJECT SUBMISSION**


### **Setup Instructions**:

To run the project locally, follow these steps:

**Step 1: Clone the repository**
```bash
git clone https://github.com/paras-verma7454/Erino.git
cd Erino
```
**Step 2: Setup Backend**
1. Install Backend Dependencies: Navigate to the backend folder and install the dependencies:

```bash
cd backend
npm install
```
2.  Set up the Database:
 - Create a ``` .env``` file in the root directory and add your PostgreSQL database URL:

```bash
DATABASE_URL="your_database_url"
```
 -  Use Prisma to generate the database client and migrate the schema:
```bash
npx prisma migrate dev --name init
```

3. Run the Backend: Start the backend server:
```bash
node index.js
```
The backend API should now be running at ```http://localhost:3000```

**Step 3: Setup Frontend**
1. Install Frontend Dependencies: Navigate to the frontend folder and install the dependencies:
```bash
cd frontend
npm install
```
2. Run the Frontend: Start the React app:
```bash
npm run dev
```


## **Brief Project Description:**

This project is a Contact Management App that allows users to:

- Add, update, delete, and view contacts.
- View contacts in a paginated table.
- Sort contacts based on the first name.

**Technical Decisions:**

- I used React for the frontend to handle the UI and state management.
- Material UI (MUI) was used to style the components and provide a user-friendly design.
- The app connects to a PostgreSQL database, managed via Prisma ORM for database schema and querying.
- The backend is built using Express.js and serves as the API for CRUD operations on the contacts.

**How the App Works:**

- **ContactForm:** Allows users to add new contacts.
- **ContactsTable:** Displays contacts in a table with pagination and sorting by first name.
- **UpdateContactForm:** Allows users to update the information of an existing contact.

## **Challenges and Solutions:**

**Challenge 1: Using MUI for the first time:**

MUI (Material UI) was new to me, and understanding how to use its components like ```Table```, ```TablePagination```, and ```IconButton``` took some time.

**Solution:** I referred to the MUI documentation and example projects to understand the structure and usage of components. I also experimented with different styling options to ensure the app was responsive and visually appealing.

**Challenge 2: Pagination:**

Implementing pagination was a relatively straightforward task. Using ```TablePagination``` from MUI helped simplify the process, and I could easily manage the number of rows per page and the current page using React’s state.

**Solution:** I used the built-in functionality of ```TablePagination``` to handle the paging logic. The slice method in the ContactsTable component helped display the appropriate set of contacts per page.

**Challenge 3: Sorting Functionality:**

Implementing sorting by first name was trickier. I had to ensure that sorting could be toggled between ascending and descending order, and that the table would update accordingly.

**Solution:** I wrote a custom sorting function that compares the values in the first name column and updates the state whenever the sorting order changes. I also used the ```sort``` method to reorder the contacts based on the selected column and direction.

## **Prisma Database Schema:**

This is  Prisma schema for the Contact model, which connects to a PostgreSQL database:

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Contact {
  id              Int @id @default(autoincrement())
  firstName       String
  lastName        String
  email           String @unique
  phone           String
  company         String
  jobTitle        String
}
```
## **Summary of Project Structure:**

- **Frontend:**
   - React components for adding, updating, and displaying contacts.
   - Pagination and sorting features for the contacts table using MUI.
- **Backend:**
  - Express.js server to handle API requests.
  - Prisma ORM to interact with the PostgreSQL database.
  - API endpoints for CRUD operations.
- **Challenges:**
  - Learning how to use Material UI and React together.
  - Implementing sorting and pagination.
