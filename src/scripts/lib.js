import { keccak_512 } from "js-sha3";

export function convertHash(password) {
  const hash = keccak_512(password);
  return hash.substring(0, 10);
}

export async function checkEmailDetails(email) {
  const apiEndpoint2 = `https://api.xposedornot.com/v1/breach-analytics?email=${encodeURIComponent(
    email
  )}`;

  try {
    // Fetch data from the API endpoint
    const response = await fetch(apiEndpoint2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors", // Ensure CORS mode is set
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the relevant details
    const exposedBreaches = data.ExposedBreaches.breaches_details || [];
    const numberOfBreaches = exposedBreaches.length;

    // Create the result object
    const result = {
      numberOfBreaches: numberOfBreaches,
      breaches: exposedBreaches.map((breach) => ({
        breach: breach.breach,
        details: breach.details,
        logo: breach.logo,
      })),
    };

    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Function to return email breaches
export async function checkEmail(email) {
  const apiEndpoint1 = `https://api.xposedornot.com/v1/check-email/${email}`;
  const apiEndpoint4 = `https://api.xposedornot.com/v1/breaches`;

  try {
    // Fetch data from the first endpoint (check-email)
    const api1Response = await fetch(apiEndpoint1);
    if (!api1Response.ok) {
      throw new Error(
        `Error fetching from ${apiEndpoint1}: ${api1Response.statusText}`
      );
    }
    const emailBreaches = await api1Response.json();

    // Check if breaches array exists and is valid
    if (
      !emailBreaches.breaches ||
      !Array.isArray(emailBreaches.breaches) ||
      emailBreaches.breaches.length === 0
    ) {
      console.warn("No breaches found or invalid data structure.");
      return {};
    }

    const breaches = emailBreaches.breaches[0]; // Extract the breaches array

    // Fetch data from the second endpoint (breaches)
    const api4Response = await fetch(apiEndpoint4);
    if (!api4Response.ok) {
      throw new Error(
        `Error fetching from ${apiEndpoint4}: ${api4Response.statusText}`
      );
    }
    const breachList = await api4Response.json();

    // Check if exposedBreaches exists and is valid
    if (
      !breachList.exposedBreaches ||
      !Array.isArray(breachList.exposedBreaches)
    ) {
      console.warn("No exposed breaches found or invalid data structure.");
      return {};
    }

    const exposedBreaches = breachList.exposedBreaches;

    // Cross-check breaches from the first API with the second API data
    const result = {};

    breaches.forEach((breach) => {
      const matchingBreach = exposedBreaches.find(
        (b) => b.breachID.toLowerCase() === breach.toLowerCase()
      );
      if (matchingBreach) {
        result[breach] = matchingBreach.exposureDescription;
      }
    });

    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Function to return password breaches
export async function checkPassword(pwd) {
  const hash = convertHash(pwd);
  const apiEndpoint3 = `https://passwords.xposedornot.com/api/v1/pass/anon/${hash}`;

  if (hash.trim != "") {
    try {
      const response = await fetch(apiEndpoint3);
      if (response.status == 200) {
        const data = await response.json();
        console.log("Data received from password checking: ", data);
        return data;
      } else if (response.status == 404) {
        return "Password not breached";
      } else {
        return "Unknown status " + response.status;
      }
    } catch (err) {
      console.log("Error Caught: ", err);
      return err;
    }
  }
}

export async function checkDomain(domain) {
  const apiEndpoint5 = `https://api.xposedornot.com/v1/domain-breaches/`;
  const apiKey = "0ef9f49ae62860584f8db06faf3f5bd5"; // API key

  try {
    // Fetch data from the domain-breaches API using POST request
    const response = await fetch(apiEndpoint5, {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Specify content type
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ domain }), // Send domain in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Extract Detailed_Breach_Info from the response
    const detailedBreachInfo = data.metrics?.Detailed_Breach_Info || {};
    return detailedBreachInfo;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Usage example:
//checkDomain("xposedornot.com").then(result => console.log('Domain Breach Details:', result));
//checkEmail("joe@gmail.com").then(result => console.log('Filtered result:', result));
//checkEmailDetails("joe@gmail.com").then(result => console.log('Email Breach Details:', result));
