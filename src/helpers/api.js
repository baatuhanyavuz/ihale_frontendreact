// api.js

const BASE_API_URL = "https://localhost:7163/api";

// GET metodu için istek gönderen fonksiyon
export async function sendGetRequest(endpoint) {
    const apiUrl = `${BASE_API_URL}${endpoint}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error sending GET request:", error);
        throw error;
    }
}

// POST metodu için istek gönderen fonksiyon
export async function sendPostRequest(endpoint, body) {
    const apiUrl = `${BASE_API_URL}${endpoint}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error sending POST request:", error);
        throw error;
    }
}

// PUT metodu için istek gönderen fonksiyon
export async function sendPutRequest(endpoint, body) {
    const apiUrl = `${BASE_API_URL}${endpoint}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error sending PUT request:", error);
        throw error;
    }
}

// DELETE metodu için istek gönderen fonksiyon
export async function sendDeleteRequest(endpoint) {
    const apiUrl = `${BASE_API_URL}${endpoint}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error sending DELETE request:", error);
        throw error;
    }
}
