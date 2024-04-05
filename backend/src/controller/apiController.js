const testApi = (req, res) => {
  return res.status(200).json({ message: "API is working", data: "test data" });
};

export default {
  testApi,
};
