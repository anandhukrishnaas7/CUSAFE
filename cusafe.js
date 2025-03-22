document.addEventListener("DOMContentLoaded", function () {
    // Initialize map centered on CUSAT
    const cusatLocation = [10.0468, 76.3287]; // Latitude and Longitude of CUSAT
    const map = L.map('map-container').setView(cusatLocation, 15);

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker for CUSAT
    L.marker(cusatLocation).addTo(map)
        .bindPopup("<b>Cochin University of Science and Technology</b>")
        .openPopup();

    // Try to get user's location
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];

            // Add user location marker
            L.marker(userLocation, { icon: L.divIcon({ className: 'user-marker', html: '📍', iconSize: [20, 20] }) })
                .addTo(map)
                .bindPopup("You are here!")
                .openPopup();

            // Adjust map to show both locations
            const bounds = L.latLngBounds([cusatLocation, userLocation]);
            map.fitBounds(bounds);
        }, function () {
            console.error("Geolocation failed.");
        });
    } else {
        console.error("Geolocation not supported.");
    }

    // Emergency Alert Button Functionality
    document.getElementById("send-alert").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                sessionStorage.setItem("lat", lat);
                sessionStorage.setItem("lng", lng);
                window.location.href = "emergency.html";
            }, () => {
                alert("Geolocation failed. Please enable location services.");
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
});