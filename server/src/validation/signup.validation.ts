export function validateSignup(name: string, email: string, password: string) {
  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "email is invalid ",
      },
    ];
  }
  if (name.length <= 2) {
    return [
      {
        field: "name",
        message: "name has to be at least 3 characters long",
      },
    ];
  }
  if (name.includes("@")) {
    return [
      {
        field: "name",
        message: "name can not contain the @ symbol",
      },
    ];
  }

  if (password.length <= 7) {
    return [
      {
        field: "password",
        message: "password has to be at least 8 characters long",
      },
    ];
  }

  return null;
}
