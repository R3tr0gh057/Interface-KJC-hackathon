import { keccak_512 } from "js-sha3";

function convertHash(password) {
    const hash = keccak_512(password);
    return hash.substring(0, 10);
}

// Function to return email breaches
async function checkEmail(email) {
    const apiEndpoint1 = `https://api.xposedornot.com/v1/check-email/${email}`;
    const apiEndpoint4 = `https://api.xposedornot.com/v1/breaches`;

    try {
        // Fetch data from the first endpoint (check-email)
        const api1Response = await fetch(apiEndpoint1);
        const emailBreaches = await api1Response.json();
        const breaches = emailBreaches.breaches[0]; // Extract the breaches array

        // Fetch data from the second endpoint (breaches)
        const api4Response = await fetch(apiEndpoint4);
        const breachList = await api4Response.json();
        const exposedBreaches = breachList.exposedBreaches;

        // Cross-check breaches from first API with the second API data
        const result = {};

        breaches.forEach(breach => {
            const matchingBreach = exposedBreaches.find(b => b.breachID.toLowerCase() === breach.toLowerCase());
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
async function checkPassword(pwd) {
    const apiEndpoint3 = `https://passwords.xposedornot.com/api/v1/pass/anon/${pwd}`;
    hash = convertHash(pwd)
    if (hash.trim != '') {
        try {
            const response = await fetch(apiEndpoint3)
            if (response.status == 200) {
                const data = await response.json();
                console.log("Data received from password checking: ", data)
                return data;
            } else if (response.status == 404) {
                return "Password not breached";
            } else {
                return "Unknown status " + response.status;
            }
        }

        catch (err) {
            console.log("Error Caught: ", err);
            return err;
        }
    }
}

