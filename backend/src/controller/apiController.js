const testApi = (req, res) => {
  return res.status(200).json({ message: "API is working", data: "test data" });
};

const handleSignUp = (req, res, next) => {
  console.log("call:", req.body);
};

export default {
  testApi,
  handleSignUp,
};
