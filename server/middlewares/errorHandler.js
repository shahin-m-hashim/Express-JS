export default function errorHandler(err, req, res) {
  res.status(500).json({
    success: false,
    error: "An unknown error occurred.",
  });
}
