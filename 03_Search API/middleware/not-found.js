// Used when user enters a invalid route
export const notFound = (req, res) => res.status(404).json({ message: "Page Not Found" });
