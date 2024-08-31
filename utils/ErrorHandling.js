export default class ErrorHandling {
    static handleError(res, error, customMessage) {
        if (!res.headersSent) {
            console.error(customMessage, error);
            res.status(500).json({ error: customMessage });
        }
    }

    static handleValidationError(res, message) {
        res.status(400).json({ error: message })
    }

    static handleNotFound(res, message) {
        res.status(404).json({ error: message });
    }

    static handleConflict(res, message) {
        res.status(409).json({ error: message })
    }
}