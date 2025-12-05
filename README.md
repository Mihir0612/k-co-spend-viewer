# K&Co Cloud Spend Viewer — Full-Stack Web Application

A minimal full-stack web app for visualizing AWS/GCP cloud spend with filters, sorting, and summary cards.  
Built with **Node.js + Express** (backend) and **React + Vite** (frontend).

---

## 📁 Project Structure

kco-cloud-spend-viewer/ 

├─ backend/

│ ├─ package.json

│ ├─ server.js

│ └─ data/

│ ├─ sample-spend.json

│ ├─ aws_line_items_12mo.csv

│ └─ gcp_billing_12mo.csv

├─ frontend/

│ ├─ package.json

│ ├─ index.html

│ ├─ vite.config.js

│ └─ src/

│ ├─ App.jsx

│ ├─ main.jsx

│ ├─ styles.css

│ └─ components/

│ ├─ Filters.jsx

│ ├─ SpendTable.jsx

│ └─ Summary.jsx

└─ README.md


---

## 🚀 Features

### ✅ Backend (Express)
- Loads AWS/GCP billing files (CSV or JSON)
- Converts data to clean objects
- Filters supported:
  - cloud provider
  - team
  - environment
  - month (YYYY-MM)
- Sorting supported:
  - by date  
  - by cloud  
  - by cost (asc/desc)
- API endpoint:

GET /api/spend?cloud=AWS&team=Core&env=prod&month=2025-01&sort=cost_usd&order=desc

---

## 🎨 Frontend (React + Vite)

### UI Components:
- **Filters** → dropdowns & month selector
- **Summary** → total cost + cloud breakdown
- **SpendTable** → sortable columns
- **Empty / Loading states**
- Clean responsive layout with simple CSS

---

## 🛠 Install & Run (Local Development)

### 1️⃣ Install backend
```bash
cd backend
npm install
npm run dev  

cd ../frontend
npm install
npm run dev

```