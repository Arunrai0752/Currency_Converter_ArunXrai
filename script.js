const from = document.getElementById("from");
const to = document.getElementById("to");

const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

async function convert() {
  const fromCode = from.value.split(",")[0];
  const toCode = to.value.split(",")[0];
  const amt = document.getElementById("original").value.trim();

  if (!amt || isNaN(amt)) {
    document.getElementById("converted").innerText = "Please enter a valid amount.";
    return;
  }

  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode}.json`;

  const response = await fetch(URL);
  const data = await response.json();
  const rates = data[fromCode];

  const newAmt = amt * rates[toCode];
  document.getElementById("converted").innerText = `${newAmt.toFixed(2)} ${toCode.toUpperCase()}`;
}

async function autofill() {
  const response = await fetch("./codes.json");
  const data = await response.json();

  data.forEach((element) => {
    if (element.Currency_Code) {
      const o1 = document.createElement("option");
      o1.value = element.Currency_Code + "," + element.Country_Code;
      o1.innerText = element.Country;
      from.appendChild(o1);

      const o2 = document.createElement("option");
      o2.value = element.Currency_Code + "," + element.Country_Code;
      o2.innerText = element.Country;
      to.appendChild(o2);
    }
  }); 

  from.value = "inr,IN";
  to.value = "usd,US";
  fromFlag.src = "https://flagsapi.com/IN/flat/24.png";
  toFlag.src = "https://flagsapi.com/US/flat/24.png";

  displayCountry();
}

function changeFlag1() {
  const Country = from.value.split(",")[1];
  fromFlag.src = `https://flagsapi.com/${Country}/flat/24.png`;
}

function changeFlag2() {
  const Country = to.value.split(",")[1];
  toFlag.src = `https://flagsapi.com/${Country}/flat/24.png`;
}

function displayCountry() {
  const fromCountryName = from.options[from.selectedIndex].text;
  const toCountryName = to.options[to.selectedIndex].text;
}

from.addEventListener("change", () => {
  changeFlag1();
  displayCountry();
});

to.addEventListener("change", () => {
  changeFlag2();
  displayCountry();
});

autofill();
