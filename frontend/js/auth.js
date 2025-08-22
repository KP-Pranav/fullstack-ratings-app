import { setToken } from "./common.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.token) {
    setToken(data.token);
    if (data.role === "ADMIN") location.href = "admin.html";
    else if (data.role === "USER") location.href = "user.html";
    else if (data.role === "OWNER") location.href = "owner.html";
  } else {
    alert(data.error);
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = signupName.value;
  const email = signupEmail.value;
  const address = signupAddress.value;
  const password = signupPassword.value;
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, address, password }),
  });
  const data = await res.json();
  if (data.id) {
    alert("Signup successful! Please login.");
  } else {
    alert(data.error);
  }
});
