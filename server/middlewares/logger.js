export default function logger(req, res, next) {
  res.on("finish", () => {
    console.log({
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
    });
  });
  next();
}
