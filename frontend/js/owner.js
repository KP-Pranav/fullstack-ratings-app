import { getToken } from "./common.js";

async function loadDashboard() {
  const res = await fetch("/api/owner/dashboard", {
    headers: { Authorization: "Bearer " + getToken() },
  });
  const data = await res.json();
  avgRating.innerText = data.avg_rating;
  ratingsTable.innerHTML =
    "<tr><th>User</th><th>Email</th><th>Rating</th><th>Date</th></tr>" +
    data.ratings
      .map(
        (r) =>
          `<tr><td>${r.user_name}</td><td>${r.email}</td><td>${r.rating}</td><td>${r.updated_at}</td></tr>`
      )
      .join("");
}

loadDashboard();
