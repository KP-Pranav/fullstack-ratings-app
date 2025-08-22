import { getToken } from "./common.js";

async function loadStores() {
  const res = await fetch("/api/user/stores", {
    headers: { Authorization: "Bearer " + getToken() },
  });
  const stores = await res.json();
  storesTable.innerHTML =
    "<tr><th>Name</th><th>Address</th><th>Overall Rating</th><th>Your Rating</th></tr>" +
    stores
      .map(
        (s) =>
          `<tr>
            <td>${s.name}</td>
            <td>${s.address}</td>
            <td>${s.rating}</td>
            <td>
              <input type='number' min='1' max='5' value='${s.user_rating || ""}' 
                     onchange='rateStore(${s.id}, this.value)'/>
            </td>
          </tr>`
      )
      .join("");
}

window.rateStore = async (id, rating) => {
  await fetch("/api/user/stores/" + id + "/rate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify({ rating }),
  });
  loadStores();
};

loadStores();
