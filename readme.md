 Product Analytics Dashboard

A full-stack analytics dashboard built with React, Node.js, Express, and PostgreSQL.

This project allows users to upload a product dataset and explore key insights through interactive charts such as:

- Products per category
- Top reviewed products
- Category-wise average ratings
- Discount distribution histogram

---

 Tech Stack

--Frontend--
- React
- Material UI
- Recharts
- Axios

--Backend--
- Node.js
- Express
- PostgreSQL

---

 Features

- Upload CSV product dataset
- Dynamic data visualization
- Category filtering
- Search functionality
- Minimum rating filter
- Histogram for discount distribution
- Loading states for better UX
- Clean card-based UI layout

---

📁 Project Structure


sales-dashboard/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── db.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── App.js
│ │ └── index.js
│
└── README.md


---

 Setup Instructions

Clone the repository


git clone https://github.com/your-username/sales-dashboard.git

cd sales-dashboard


---

Backend Setup


cd backend
npm install


Create a `.env` file:


DATABASE_URL=connection_name
PORT=5000


Run the server:


npm start


---

Frontend Setup


cd frontend
npm install
npm start


Frontend runs on:


http://localhost:3000


Backend runs on:


http://localhost:5000


---

 API Endpoints

| Endpoint | Description |
| `/api/products/categories` | Products grouped by category |
| `/api/products/top-reviewed` | Top reviewed products |
| `/api/products/avg-rating` | Average rating per category |
| `/api/products/discount-distribution` | Discount histogram data |
| `/api/products/upload` | Upload CSV dataset |

---

Screenshots



---

Future Improvements

- Authentication
- Role-based dashboards
- Export reports (PDF/CSV)
- Dark mode
- Deployment on cloud infrastructure

---