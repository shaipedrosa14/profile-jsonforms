export const schema = {
    properties: {
      firstname: {
        type: "string",
        minLength: 2,
        description: "first name",
      },
      lastname: {
        type: "string",
        minLength: 2,
        description: "last name",
      },
      description: {
        title: "Long Description",
        type: "string",
      },
      birthday: {
        type: "string",
        format: "date",
        description: "birthday",
      },
      age: {
        type: "number",
        description: "age",
      },
      email: {
        type: "string",
        format: "email",
        description: "email address",
      },
    },
  };