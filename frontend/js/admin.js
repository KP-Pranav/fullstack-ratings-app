import { getToken } from "./common.js";

async function loadStats() {
  const res = await fetch("/api/admin/stats", {
    headers: { Authorization: "Bearer " + getToken() },
  });
  const data = await res.json();
  stats.innerHTML = `Users: ${data.total_users}, Stores: ${data.total_stores}, Ratings: ${data.total_ratings}`;
}

async function loadUsers() {
  const res = await fetch("/api/admin/users", {
    headers: { Authorization: "Bearer " + getToken() },
  });
  const users = await res.json();
  usersTable.innerHTML =
    "<tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Rating</th></tr>" +
    users
      .map(
        (u) =>
          `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.address}</td><td>${u.role}</td><td>${u.rating || ""}</td></tr>`
      )
      .join("");
}

async function loadStores() {
  const res = await fetch("/api/admin/stores", {
    headers: { Authorization: "Bearer " + getToken() },
  });
  const stores = await res.json();
  storesTable.innerHTML =
    "<tr><th>Name</th><th>Email</th><th>Address</th><th>Rating</th></tr>" +
    stores
      .map(
        (s) =>
          `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.address}</td><td>${s.rating}</td></tr>`
      )
      .join("");
}

loadStats();
loadUsers();
loadStores();
