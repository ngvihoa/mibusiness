import { toast } from "react-toastify";

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

function handleError(status: number) {
  switch (status) {
    // authentication (token related issues)
    case 401: {
      toast.error("Unauthorized access!");
      break;
    }

    // forbidden (permission related issues)
    case 403: {
      toast.error("No permission to access the resources!");
      break;
    }

    // bad request
    case 400: {
      // no toast for custom toast in component
      break;
    }

    // not found
    case 404: {
      toast.error("Not found resources!");
      break;
    }

    // conflict
    case 409: {
      break;
    }

    // unprocessable
    case 422: {
      break;
    }

    // generic api error (server related) unexpected
    default: {
      toast.error("Server error!");
      break;
    }
  }
  return status;
}

export {
  eliminateSpecialChars as htmlspecialchars,
  validateEmail,
  validatePhone,
  handleError,
};
