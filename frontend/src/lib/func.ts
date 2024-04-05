const eliminateSpecialChars = (input: string) => {
  const map: {
    [key: string]: string;
  } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  input = input
    .trim()
    .replace(/\\/g, "")
    .replace(/[&<>"']/g, (m) => map[m]);
  return input;
};

function validateEmail(email: string) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

export {
  eliminateSpecialChars as htmlspecialchars,
  validateEmail,
  validatePhone,
};
