// db.js Module for MokeSell. 🔥🔥🔥
const FIREBASE_API_URL = "https://test123-91bbb-default-rtdb.asia-southeast1.firebasedatabase.app";

async function apiRequest(method, endpoint, data = null) {
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    options.signal = controller.signal;

    try {
        const response = await fetch(`${FIREBASE_API_URL}${endpoint}.json`, options);
        clearTimeout(timeoutId);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API ERROR: ", response.status, errorData);
            throw new Error(`API ERROR: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('API Request timed out');
        }
        throw error;
    }
}

export async function getDocuments(collection) {
    return apiRequest(
        "GET",
        `/${collection}`
    );
}

export async function getDocumentByID(collection, id) {
    return apiRequest(
        "GET",
        `/${collection}/${id}`
    );
}

export async function createDocument(collection, data) {
    return apiRequest(
        "POST",
        `/${collection}`,
        data
    );
}

export async function updateDocument(collection, id, data) {
    return apiRequest(
        "PATCH",
        `/${collection}/${id}`,
        data
    );
}

export async function deleteDocument(collection, id) {
    return apiRequest(
        "DELETE",
        `/${collection}/${id}`
    );
}