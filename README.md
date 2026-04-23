# 🚗 SmartPark — Parking & Valet Visibility System

## 📌 Overview

SmartPark is a frontend-based smart mobility prototype designed to solve two common urban problems:

* 🚘 Drivers wasting time searching for parking in crowded areas
* 🅿️ Valet users lacking visibility of where their car is parked

This project provides a **map-based interface with simulated real-time updates** to visualize parking availability and valet vehicle tracking.

---

## 🎯 Problem Statements

1. **Parking Discovery Problem**
   Drivers circle busy markets for long periods due to a lack of real-time parking availability.

2. **Valet Visibility Problem**
   Users have no transparency after handing over their car to valet services.

---

## 💡 Solution

SmartPark provides:

* 📍 Real-time (simulated) parking availability on a map
* 🚗 Valet tracking system with moving vehicle simulation
* 📊 Interactive UI for booking and monitoring parking

---

## 🚀 Features

### 🗺️ Smart Parking Map

* Integrated with Google Maps Platform
* Color-coded parking markers:

  * 🟢 Available
  * 🔴 Occupied
  * 🟡 Limited

---

### 📦 Booking System (Frontend Simulation)

* Click parking spot → view details
* Book parking via modal
* Multi-step booking UI

---

### 🚗 Valet Tracking (Core Feature)

* Use valet option
* Track car on map
* Simulated real-time movement
* Status updates:

  * Parked
  * Retrieving
  * Arriving

---

### 🔄 Real-Time Simulation

* Dynamic parking availability updates
* Car movement using timed coordinate changes

---

### 🎨 UI/UX Features

* Responsive dashboard layout
* Navbar + sidebar navigation
* Modals, cards, and panels
* Skeleton loaders, empty & error states
* Toast notifications

---

### 🌗 Theme System

* Light / Dark mode
* Stored using localStorage

---

### ⚙️ State Management

* Redux Toolkit for global state
* Parking and valet state handling

---

### 🔁 Fake API Layer

* Simulated backend using async functions
* Handles loading and error states

---

### 📊 Additional Features

* Search & filter parking spots
* Booking history (UI)
* Notifications system
* Heatmap (optional visualization)

---

## 🧱 Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS, MUI
* **State Management:** Redux Toolkit
* **Maps:** Google Maps API
* **Forms:** Formik + Yup

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── features/
 │    ├── parking/
 │    ├── valet/
 ├── hooks/
 ├── services/
 ├── utils/
```

---

## 🧠 How It Works

* Parking data is stored locally and managed via Redux
* API calls are simulated using Promises
* Real-time behavior is mimicked using setInterval
* Car movement is achieved by updating coordinates over time

---

## 📸 Screenshots / Demo

> figma.com/design/tcbq1AsxRmYeQGcp6CEE2r/Untitled?t=v39RPohvDzYp5TV4-0

---

## 🔧 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/smartpark.git

# Navigate to project
cd smartpark

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 📌 Future Improvements

* Backend integration (Node.js / Firebase)
* Real-time GPS tracking
* Payment integration
* AI-based parking prediction

---

## 🎓 Learning Outcomes

* Built a scalable frontend architecture
* Implemented map-based UI with real-time simulation
* Applied industry practices (Redux, modular structure, UX states)

---

## 💬 Project Statement

> “SmartPark reduces parking search time and improves valet transparency using map-based visualization and simulated real-time tracking.”

---

## 📄 License

This project is for educational and demonstration purposes.
