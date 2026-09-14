export const parseTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Monterrey",
        dateStyle: "short",
        timeStyle: "medium"
    }).format(new Date(timestamp * 1000));
};