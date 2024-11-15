export default function unknownRoute(req, res, err) {
  res.status(404).json({
    success: false,
    error: "Looks like, the page you are looking for doesn't exist",
  });
}
