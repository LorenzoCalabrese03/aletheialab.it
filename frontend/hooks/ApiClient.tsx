/**
 * Funzione `apiClient` per effettuare richieste HTTP generiche.
 * Standardizza la comunicazione con il backend API, gestendo `JSON` e `FormData`.
 *
 * @param {string} endpoint - Endpoint dell'API (es: "users/login").
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method - Metodo HTTP (default: 'GET').
 * @param {any} [body] - Corpo della richiesta per i metodi POST, PUT, ecc. (default: `null`).
 * @param {Record<string, string>} [headers] - Intestazioni personalizzate per la richiesta.
 * @param {boolean} [includeCredentials=false] - Includere credenziali (cookie, sessioni) nella richiesta.
 * @param {boolean} [useHeaders=false] - Usare intestazioni personalizzate (default: false).
 * @returns {Promise<any>} - Una promessa che restituisce il risultato della richiesta (JSON o risposta grezza).
 */
export const apiClient = async (
    endpoint: string, // Endpoint relativo dell'API, es. "users/login".
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', // Metodo HTTP, default: 'GET'.
    body?: any, // Corpo della richiesta, ad esempio dati per il login (può essere omesso per GET).
    headers: Record<string, string> = {}, // Intestazioni personalizzate, es. Authorization token.
    includeCredentials: boolean = true, // Specifica se includere credenziali (cookie/sessione).
    useHeaders: boolean = false // Specifica se aggiungere intestazioni personalizzate.
): Promise<any> => {
    try {
        // Configurazione delle opzioni per la richiesta HTTP
        const options: RequestInit = {
            method, // Imposta il metodo HTTP (GET, POST, PUT, DELETE)
            credentials: includeCredentials ? 'include' : undefined, // Include cookie/sessioni se necessario
            headers: useHeaders && !(body instanceof FormData) // Imposta le intestazioni solo se il body NON è `FormData`
                ? {
                    'Content-Type': 'application/json', // Necessario per l'invio di JSON
                    ...headers,
                }
                : headers, // Se è `FormData`, il browser gestisce `Content-Type` automaticamente
        };

        // Aggiunge il corpo della richiesta, verificando se è `FormData` o JSON
        if (body) {
            options.body = body instanceof FormData ? body : JSON.stringify(body);
        }

        // 🔍 DEBUG: Logga la richiesta inviata al backend
        console.log("📡 Invio richiesta API:");

        // Se il body è `FormData`, visualizza i dati inviati
        // if (body instanceof FormData) {
        //   for (const pair of body.entries()) {
        //     console.log(`📦 ${pair[0]}:`, pair[1]);
        //   }
        // }

        // Base URL per l'API (es. localhost durante lo sviluppo)
        const baseUrl=process.env.BACKEND_URL;// ⚠️ Cambia in base all'env che viene usato

        // Effettua la richiesta HTTP
        const response = await fetch(`${baseUrl}/${endpoint}`, options);

        // Se la risposta non è OK (status HTTP 2xx), lancia un errore con il dettaglio
        if (!response.ok) {
            const errorText = await response.text(); // Recupera il messaggio di errore dal server
            console.error(`❌ Errore nella richiesta (${response.status}):`, errorText);
            throw new Error(`Errore ${response.status}: ${errorText}`);
        }

        // Controlla se la risposta è in formato JSON
        const isJson = response.headers.get('Content-Type')?.includes('application/json');

        // 🔍 DEBUG: Logga la risposta ricevuta
        console.log("✅ Risposta ricevuta:");

        // Restituisce il risultato in formato JSON se disponibile, altrimenti la risposta grezza
        return isJson ? response.json() : response;
    } catch (error) {
        console.error("❌ Errore durante la richiesta API:", error);
        throw error; // Propaga l'errore in modo che possa essere gestito dal chiamante
    }
};

/**
 * 📌 **ESEMPI DI UTILIZZO**
 *
 * 1. **Richiesta GET semplice:**
 *    - Recupera i dati di tutti gli utenti.
 *    ```typescript
 *    const data = await apiClient('users', 'GET');
 *    console.log(data);
 *    ```
 *
 * 2. **Richiesta POST con un corpo JSON:**
 *    - Crea un nuovo utente inviando i dati di registrazione.
 *    ```typescript
 *    const newUser = { name: 'John Doe', email: 'john@example.com' };
 *    const response = await apiClient('users', 'POST', newUser, {}, true, true);
 *    console.log(response);
 *    ```
 *
 * 3. **Richiesta POST con FormData:**
 *    - Carica un file e altri dati.
 *    ```typescript
 *    const formData = new FormData();
 *    formData.append('file', selectedFile);
 *    formData.append('description', 'Immagine profilo');
 *
 *    const response = await apiClient('upload', 'POST', formData);
 *    console.log(response);
 *    ```
 *
 * 4. **Richiesta con intestazioni personalizzate (es. token JWT):**
 *    - Recupera una risorsa protetta utilizzando un token di autorizzazione.
 *    ```typescript
 *    const headers = { Authorization: 'Bearer token' };
 *    const response = await apiClient('protected/resource', 'GET', undefined, headers, true, true);
 *    console.log(response);
 *    ```
 */

