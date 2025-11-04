// Anda bisa buat file baru: src/utils/authUtils.js

const decodeToken = (token) => {
    try {
        // JWT Payload adalah bagian kedua dari string (dipisahkan oleh '.')
        // Kita harus decode dari Base64 ke string JSON
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        return JSON.parse(decodedJson).user; // Ambil object 'user' dari payload
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
// Export fungsi ini