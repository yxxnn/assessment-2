// db.js Module for MokeSell RestDB. 🔥🔥🔥

const RESTDB_API_URL = "https://mokesell-3139.restdb.io/rest";
const RESTDB_API_KEY = "67921ce352b8e1b73a5efd62";

// main function to handle API requests
// source: Teacher's Code from a lesson.
async function apiRequest(method, endpoint, data = null) {
    const headers = {
        "Content-Type": "application/json", 
        "x-apikey": RESTDB_API_KEY,
        "Cache-Control": "no-cache",
    };

    const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    // added timeout handler to handle API taking too long issues.
    // hard to explain but yeah its a good practice.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    options.signal = controller.signal;

    try {
        const response = await fetch(`${RESTDB_API_URL}${endpoint}`, options);
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

// all these are just public functions to interact with the API.
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
        "PUT",
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