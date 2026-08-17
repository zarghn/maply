const zoom = 13;
let map;
let inputType = document.querySelector("#inputType");
let inputDuration = document.querySelector("#inputDuration");
let inputCadence = document.querySelector("#inputCadence");
let btnEntry = document.querySelector("#btnEntry");
let inputDistance = document.querySelector("#inputDistance");
let workoutForm = document.querySelector("#workoutForm");
let workoutsList = document.querySelector("#workoutsList");
let pinky = L.icon({
  iconUrl: "img/pink-marker.png",
  iconSize: [50, 50],
  iconAnchor: [10, 10],
});

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let edittt = null;

let workoutLine;
let startMarker;
let finishMarker;

let workoutId = Date.now();

navigator.geolocation.getCurrentPosition(
  function success(data) {
    let coords = [data.coords.latitude, data.coords.longitude];

    map = L.map("map").setView(coords, zoom);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    ).addTo(map);

    let startPoint;
    let finishPoint;

    workouts.forEach(function (workout) {
      L.marker(workout.startPoint, {
        icon: pinky,
      }).addTo(map);

      L.marker(workout.finishPoint, {
        icon: pinky,
      }).addTo(map);

      L.polyline([workout.startPoint, workout.finishPoint], {
        color: "#9749e6",
        weight: 4,
      }).addTo(map);
    });

    workoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (edittt !== null) {
        let existWorkout = workouts.find(function (workout) {
          return Number(workout.id) === Number(edittt);
        });

        existWorkout.type = inputType.value;
        existWorkout.distance = Number(inputDistance.value);
        existWorkout.duration = Number(inputDuration.value);
        existWorkout.cadence = Number(inputCadence.value);

        edittt = null;
      } else {
        let workout = {
          id: workoutId++,
          type: inputType.value,
          distance: Number(inputDistance.value),
          duration: Number(inputDuration.value),
          cadence: Number(inputCadence.value),
          startPoint,
          finishPoint,
        };

        workouts.push(workout);
      }

      localStorage.setItem("workouts", JSON.stringify(workouts));

      workoutsList.innerHTML = "";

      workouts.forEach(function (workout) {
        createWorkout(workout);
      });

      workoutForm.reset();

      inputType.disabled = true;
      inputDistance.disabled = true;
      inputDuration.disabled = true;
      inputCadence.disabled = true;
      btnEntry.disabled = true;

      startPoint = null;
      finishPoint = null;

      startMarker = null;
      finishMarker = null;
      workoutLine = null;
    });

    map.on("click", function (e) {
      if (!startPoint) {
        startPoint = e.latlng;

        startMarker = L.marker(e.latlng, {
          icon: pinky,
        }).addTo(map);
      } else if (!finishPoint) {
        finishPoint = e.latlng;

        finishMarker = L.marker(e.latlng, {
          icon: pinky,
        }).addTo(map);

        inputType.disabled = false;
        inputDuration.disabled = false;
        inputCadence.disabled = false;
        btnEntry.disabled = false;

        workoutLine = L.polyline([startPoint, finishPoint], {
          color: "#9749e6",
          weight: 4,
        }).addTo(map);

        inputDistance.value = (
          startPoint.distanceTo(finishPoint) / 1000
        ).toFixed(1);
      }
    });
  },

  function error(data) {
    alert("we can't get your location :(");
  },
);

function createWorkout(workout) {
  let workoutElement = document.createElement("li");

  workoutElement.classList.add("workout-card", `workout--${workout.type}`);

  workoutElement.dataset.id = workout.id;

  workoutElement.innerHTML = `
    <div class="workout-header">

      <h2 class="workout-title">
        ${workout.type}
      </h2>

      <button class="btn-icon btn-edit" aria-label="Edit workout">
        <img src="img/pencil.png" alt="Edit" />
      </button>

    </div>

    <div class="workout-details">

      <div class="workout-detail workout-distance">
        <span class="detail-icon">📍</span>
        <span class="detail-value">${workout.distance}</span>
        <span class="detail-unit">km</span>
      </div>

      <div class="workout-detail workout-duration">
        <span class="detail-icon">⏱️</span>
        <span class="detail-value">${workout.duration}</span>
        <span class="detail-unit">min</span>
      </div>

      <div class="workout-detail workout-pace">
        <span class="detail-icon">⚡</span>
        <span class="detail-value">${workout.cadence}</span>
        <span class="detail-unit">STEP/MIN</span>
      </div>

      <button class="btn-icon btn-delete" aria-label="Delete workout">
        <img src="img/trash-bin.png" alt="Delete" />
      </button>

    </div>
  `;

  workoutsList.append(workoutElement);
}

workouts.forEach(function (workout) {
  createWorkout(workout);
});

workoutsList.addEventListener("click", function (e) {
  let deleteButton = e.target.closest(".btn-delete");

  if (!deleteButton) return;

  let workoutElement = deleteButton.closest(".workout-card");

  let id = Number(workoutElement.dataset.id);

  workouts = workouts.filter(function (workout) {
    return Number(workout.id) !== id;
  });

  localStorage.setItem("workouts", JSON.stringify(workouts));

  workoutElement.remove();
});

workoutsList.addEventListener("click", function (e) {
  let editButton = e.target.closest(".btn-edit");

  if (!editButton) return;

  let workoutElement = editButton.closest(".workout-card");

  let id = Number(workoutElement.dataset.id);

  let workout = workouts.find(function (workout) {
    return Number(workout.id) === id;
  });

  edittt = id;

  inputDistance.value = workout.distance;
  inputCadence.value = workout.cadence;
  inputDuration.value = workout.duration;
  inputType.value = workout.type;

  inputType.disabled = false;
  inputDuration.disabled = false;
  inputCadence.disabled = false;
  btnEntry.disabled = false;
});

workoutsList.addEventListener("click", function (e) {
  let workoutElement = e.target.closest(".workout-card");

  if (!workoutElement) return;

  let id = Number(workoutElement.dataset.id);

  let workout = workouts.find(function (workout) {
    return Number(workout.id) === id;
  });

  if (!workout) return;

  map.fitBounds([workout.startPoint, workout.finishPoint]);
});