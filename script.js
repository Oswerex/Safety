const API_URL = "https://script.google.com/macros/s/AKfycbx8mK4aJ0i8goaiKZrefe1_wg_P9Bl1jH4aKDDPxjPeV9xl_wO1AG847T18STCQbrYp/exec";

loadStats();
loadPermits();

function submitPermit() {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      op: "create",
      applicant: applicant.value,
      workType: workType.value,
      location: location.value,
      riskLevel: risk.value
    })
  }).then(() => {
    loadStats();
    loadPermits();
  });
}

function loadPermits() {
  fetch(API_URL + "?op=read")
    .then(r => r.json())
    .then(d => {
      table.innerHTML = "<tr><th>Name</th><th>Type</th><th>Status</th></tr>";
      d.data.forEach(p => {
        table.innerHTML += `<tr>
          <td>${p.applicant}</td>
          <td>${p.workType}</td>
          <td>${p.status}</td>
        </tr>`;
      });
    });
}

function loadStats() {
  fetch(API_URL + "?op=stats")
    .then(r => r.json())
    .then(d => {
      Object.keys(d.stats).forEach(k => {
        document.getElementById(k).innerText = d.stats[k];
      });
    });
}
