function crearGrafica(idCanvas, label, color) {
  const ctx = document.getElementById(idCanvas).getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        backgroundColor: color + '33',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

const charts = {
  temp: crearGrafica('tempChart', 'Temperatura (°C)', 'rgba(255, 99, 132, 1)'),
  hum: crearGrafica('humChart', 'Humedad (%)', 'rgba(54, 162, 235, 1)'),
  soil: crearGrafica('soilChart', 'Humedad del Suelo (%)', 'rgba(75, 192, 192, 1)'),
  light: crearGrafica('lightChart', 'Luz (lux)', 'rgba(255, 206, 86, 1)'),
  wind: crearGrafica('windChart', 'Velocidad del Viento (km/h)', 'rgba(153, 102, 255, 1)'),
  rain: crearGrafica('rainChart', 'Lluvia (1=Sí, 0=No)', 'rgba(201, 203, 207, 1)')
};

function fetchDataAndUpdate() {
  fetch("datos.php?_=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      const now = new Date().toLocaleTimeString();
      charts.temp.data.labels.push(now);
      charts.temp.data.datasets[0].data.push(data.temperatura);
      charts.hum.data.labels.push(now);
      charts.hum.data.datasets[0].data.push(data.humedad);
      charts.soil.data.labels.push(now);
      charts.soil.data.datasets[0].data.push(data.suelo);
      charts.light.data.labels.push(now);
      charts.light.data.datasets[0].data.push(data.luz);
      charts.wind.data.labels.push(now);
      charts.wind.data.datasets[0].data.push(data.viento_velocidad);
      charts.rain.data.labels.push(now);
      charts.rain.data.datasets[0].data.push(data.lluvia.toLowerCase() === 'sí' ? 1 : 0);

      Object.values(charts).forEach(chart => {
        if (chart.data.labels.length > 10) {
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }
        chart.update();
      });

      document.getElementById("res-temp").textContent = `${data.temperatura} °C`;
      document.getElementById("res-hum").textContent = `${data.humedad} %`;
      document.getElementById("res-soil").textContent = `${data.suelo} %`;
      document.getElementById("res-light").textContent = `${data.luz} lux`;
      document.getElementById("res-wind").textContent = `${data.viento_velocidad} km/h (${data.viento_direccion})`;
      document.getElementById("res-rain").textContent = data.lluvia;

      const intensidad = data.estado_lluvia ?? "No disponible";
      document.getElementById("res-rain-intensidad").textContent =
        data.lluvia.toLowerCase() === "sí"
          ? "Intensidad: " + intensidad
          : "Sin lluvia";
    });
}

setInterval(fetchDataAndUpdate, 5000);
