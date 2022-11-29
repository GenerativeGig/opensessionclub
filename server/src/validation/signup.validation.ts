export function validateSignup(name: string, email: string, password: string) {
  const startWithWhitespace = /^\s+/;
  const endsWithWhitespace = /\s+$/;
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

  if (name.match(startWithWhitespace) || name.match(endsWithWhitespace)) {
    return [
      {
        field: "name",
        message: "name can not start or end with whitespace",
      },
    ];
  }

  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "email is invalid ",
      },
    ];
  }

  if (email.match(startWithWhitespace) || email.match(endsWithWhitespace)) {
    return [
      {
        field: "email",
        message: "email can not start or end with whitespace",
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
