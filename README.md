# 🗺️ Maply

A front-end workout tracking application inspired by the **Mapty project from Jonas Schmedtmann**, rebuilt with a completely custom UI and extended with my own design and functionality.

This project was built as a learning project to practice **JavaScript, DOM manipulation, events, objects, arrays, browser storage, geolocation, and working with external libraries**.

> 🎨 The entire UI and styling are custom-built and are not a copy of the original Mapty design.

> ### 🗺️ Project Preview
<img width="2016" height="1043" alt="design" src="https://github.com/user-attachments/assets/a667f115-3f9f-4b66-ac77-9097fc812b6a" />
## ✨ Features

### 📍 Workout Tracking

- Select a starting point and finishing point directly on the map
- Automatically calculate the distance between two points
- Display the workout route as a line on the map
- Add custom workout information
- Support for:
  - 🏃 Running
  - 🚴 Cycling
  - 🚶 Walking

### 📝 Workout Details

Each workout stores:

- Workout type
- Distance in kilometers
- Duration in minutes
- Cadence in steps per minute
- Starting location
- Finishing location

### ✏️ Workout Management

- Add new workouts
- Edit existing workouts
- Delete workouts
- Click on a workout to automatically locate its route on the map

### 💾 Local Storage

- Workout data is stored using `localStorage`
- Workouts remain available after refreshing the page
- Existing workouts are automatically loaded when the application starts

### 🗺️ Interactive Map

- Interactive map powered by **Leaflet**
- User's current location is detected using the browser's Geolocation API
- Dark-themed map
- Custom pink location markers
- Custom purple workout routes
- Automatically zoom to a selected workout

### 🎨 Custom UI

- Completely custom-designed interface
- Dark visual style
- Custom workout cards
- Custom icons and buttons
- Hand-crafted CSS without UI frameworks

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** — hand-crafted, no CSS frameworks
- **JavaScript (ES6+)** — Vanilla JavaScript
- **DOM Manipulation**
- **Geolocation API**
- **Leaflet.js**
- **OpenStreetMap / CartoDB**
- **Browser Storage** — `localStorage`

---

## 📁 Project Structure

```text
maply/
│
├── index.html          # Main application
├── style.css           # Application styles
├── script.js           # Application logic
│
└── img/
    ├── logo.png
    ├── pencil.png
    ├── trash-bin.png
    ├── arrow-entry.png
    └── pink-marker.png

```
## 🚀 Getting Started

This project has **no backend or build process**, so you can run it directly in your browser.

### 1. Clone the repository

```bash
git clone https://github.com/zarghn/maply
```

### 2. Open the project

You can either:

* Open `index.html` directly in your browser
* Or use the **Live Server** extension in VS Code

> 📍 Location access may be required for the map to detect your current position.

---

## 🗺️ How It Works

1. Allow the browser to access your location.
2. Click on the map to select the **starting point**.
3. Click again to select the **finishing point**.
4. Maply automatically:

   * Calculates the distance
   * Draws the route
   * Adds the location markers
   * Enables the workout form
5. Enter the workout information.
6. Click **Entry** to save the workout.
7. The workout is stored in `localStorage`.

You can later **edit, delete, or locate** any saved workout.

---

## ⚠️ Current Limitations

This is a **front-end-only workout tracking application**.

There is currently no backend, API for user accounts, or real database. Workout information is stored entirely in the browser using `localStorage`.

This means:

* Workout data is stored only on the current browser/device
* There is no user authentication
* There is no cloud synchronization
* Data can be lost if browser storage is cleared
* Routes are manually selected instead of being recorded using GPS
* The application does not continuously track a workout

> 🚨 This project is primarily a learning project and is not intended to be a production-level fitness tracking application.

---

## 🗺️ Roadmap

Future improvements I'd like to make:

* Add workout dates
* Add automatic workout statistics
* Calculate average speed
* Calculate pace for running and walking
* Add calories burned estimation
* Add workout sorting and filtering
* Add workout search
* Improve workout editing
* Add route editing
* Add more workout types
* Add a statistics dashboard
* Add charts for workout history
* Improve mobile responsiveness
* Connect the application to a backend
* Add user accounts and cloud synchronization

---

## 📚 What I Practiced

This project helped me practice and understand several JavaScript concepts, including:

* DOM manipulation
* Event handling
* Event delegation
* Objects and arrays
* `map()`, `filter()`, and `find()`
* Form handling
* Dynamic HTML generation
* Conditional logic
* Managing application state
* Working with `localStorage`
* `JSON.stringify()`
* `JSON.parse()`
* Browser Geolocation API
* Working with coordinates
* Calculating distances between coordinates
* Working with Leaflet.js
* Creating markers and polylines
* Managing dynamically generated elements
* Editing and deleting stored data

---

## 🙏 Inspired By

The core concept of this project is inspired by the **Mapty project from Jonas Schmedtmann's JavaScript course 2025**.

However, this project was rebuilt with:

* A completely different UI
* Custom CSS and layout
* Custom colors and visual design
* A dark-themed map
* Custom pink map markers
* Custom workout cards
* `localStorage` persistence
* My own implementation and modifications

This project is primarily an exercise in taking concepts learned from a course and rebuilding them into something more personal.

---

## 📄 License

This project is created for **learning and educational purposes**.

Feel free to explore the code and use it as inspiration for your own learning projects.
