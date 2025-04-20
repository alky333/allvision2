// =======================
// GRÁFICOS EN TIEMPO REAL
// =======================

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
  rain: crearGrafica('rainChart', 'Lluvia (1=Sí, 0=No)', 'rgba(201, 203, 207, 1)'),
  rain_mm: crearGrafica('rainMMChart', 'Precipitación (mm)', 'rgba(0, 200, 100, 1)')
};

function fetchDataAndUpdate() {
  fetch("datos.php?_=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      const horaActual = new Date().toLocaleTimeString();

      charts.temp.data.labels.push(horaActual);
      charts.temp.data.datasets[0].data.push(data.temperatura);

      charts.hum.data.labels.push(horaActual);
      charts.hum.data.datasets[0].data.push(data.humedad);

      charts.soil.data.labels.push(horaActual);
      charts.soil.data.datasets[0].data.push(data.suelo);

      charts.light.data.labels.push(horaActual);
      charts.light.data.datasets[0].data.push(data.luz);

      charts.wind.data.labels.push(horaActual);
      charts.wind.data.datasets[0].data.push(data.viento_velocidad);

      charts.rain.data.labels.push(horaActual);
      charts.rain.data.datasets[0].data.push(data.lluvia.toLowerCase() === 'sí' ? 1 : 0);

      charts.rain_mm.data.labels.push(horaActual);
      charts.rain_mm.data.datasets[0].data.push(data.lluvia_mm);

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

      document.getElementById("real-hora").textContent = horaActual;
      document.getElementById("real-temp").textContent = data.temperatura;
      document.getElementById("real-hum").textContent = data.humedad;
    });
}

setInterval(fetchDataAndUpdate, 5000);

// =======================
// HISTÓRICO TEMPERATURA
// =======================

function cargarGraficoTemperaturaPorFecha(fecha) {
  fetch(`get_data.php?fecha=${fecha}`)
    .then(res => res.json())
    .then(data => {
      console.log("Datos recibidos para el gráfico:", data);

      const labels = data.map(d => d.hora.slice(0, 5));
      const temps = data.map(d => d.temperatura);

      const ctx = document.getElementById("graficaTemp").getContext("2d");
      if (window.graficaTemp) {
        window.graficaTemp.destroy();
      }

      window.graficaTemp = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Temperatura (°C)",
            data: temps,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: false }
          }
        }
      });

      if (temps.length > 0) {
        const max = Math.max(...temps);
        const min = Math.min(...temps);
        const prom = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        document.getElementById("temp-max").textContent = max;
        document.getElementById("temp-min").textContent = min;
        document.getElementById("temp-prom").textContent = prom;
      } else {
        document.getElementById("temp-max").textContent = "--";
        document.getElementById("temp-min").textContent = "--";
        document.getElementById("temp-prom").textContent = "--";
      }
    });
}

document.getElementById("fechaTemp").addEventListener("change", function () {
  const fecha = this.value;
  if (fecha) {
    cargarGraficoTemperaturaPorFecha(fecha);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  fetch("get_last_date.php")
    .then(res => res.json())
    .then(data => {
      if (data.fecha) {
        const inputFecha = document.getElementById("fechaTemp");
        inputFecha.value = data.fecha;
        cargarGraficoTemperaturaPorFecha(data.fecha);
      }
    });
});
function cargarHistoricoTemperatura() {
  fetch("get_temp_last5days.php")
    .then(res => res.json())
    .then(data => {
      const dias = {};  // { '2025-04-19': [23, 22, ...], ... }
      const horas = Array.from({length: 24}, (_, i) => `${i}:00`);

      data.forEach(d => {
        if (!dias[d.fecha]) dias[d.fecha] = Array(24).fill(null);
        dias[d.fecha][d.hora] = d.promedio;
      });

      const datasets = Object.entries(dias).map(([fecha, valores], index) => ({
        label: fecha,
        data: valores,
        borderColor: `hsl(${index * 60}, 100%, 60%)`,
        backgroundColor: 'transparent',
        spanGaps: true,
        tension: 0.3
      }));

      const ctx = document.getElementById("tempHistoryChart").getContext("2d");
      if (window.tempHistoryChart) window.tempHistoryChart.destroy();
      window.tempHistoryChart = new Chart(ctx, {
        type: "line",
        data: { labels: horas, datasets },
        options: {
          plugins: { title: { display: true, text: "Evolución diaria por hora" } },
          scales: {
            y: { beginAtZero: false, title: { display: true, text: "°C" } },
            x: { title: { display: true, text: "Hora del día" } }
          }
        }
      });

      // Tabla resumen
      const resumen = {};
      data.forEach(d => {
        if (!resumen[d.fecha]) resumen[d.fecha] = { max: d.max, min: d.min, sum: d.promedio, count: 1 };
        else {
          resumen[d.fecha].max = Math.max(resumen[d.fecha].max, d.max);
          resumen[d.fecha].min = Math.min(resumen[d.fecha].min, d.min);
          resumen[d.fecha].sum += d.promedio;
          resumen[d.fecha].count++;
        }
      });

      const table = document.getElementById("temp-summary-table");
      table.innerHTML = "";
      Object.entries(resumen).forEach(([fecha, val]) => {
        const prom = (val.sum / val.count).toFixed(1);
        table.innerHTML += `
          <tr>
            <td>${fecha}</td>
            <td>${val.max} °C</td>
            <td>${val.min} °C</td>
            <td>${prom} °C</td>
          </tr>`;
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarHistoricoTemperatura();
});
