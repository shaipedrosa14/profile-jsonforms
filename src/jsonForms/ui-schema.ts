export const uischema = {
    type: "HorizontalLayout",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/firstname",
          },
          {
            type: "Control",
            scope: "#/properties/lastname",
          },
        ],
      },
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/birthday",
          },
          { // Added a form for the age for the purpose of the condition for the email which is to hide it when age is lower than 18. Age field is always hidden and not part of the specification to be displayed. 
            type: "Control",
            scope: "#/properties/age",
            "rule": {
              "effect": "HIDE",
              "condition": {
                "scope": "#/properties/age"
              }
            }
          },
          {
            type: "Control",
            scope: "#/properties/email",
            "rule": {
              "effect": "HIDE",
              "condition": {
                "scope": "#/properties/age",
                "schema": { maximum : 17  }
              }
            },
          },
        ],
      },
    ]
  };