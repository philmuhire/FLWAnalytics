




export const validateCrop = (values) => {
  console.log("...crop state values up for validation")
  console.log(values)
  const errors = {};
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.description) {
    errors.description = "description is required!";
  }
  if (!values.quantityUnit) {
    errors.quantityUnit = "quantity Unit is required!";
  }

  return errors;
};

export const validateStage = (values) => {
  console.log("...stage state values up for validation")
  console.log(values)
  const errors = {};
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.description) {
    errors.description = "description is required!";
  }

  return errors;
};

export const validateProcess = (values) => {
  console.log("...stage state values up for validation")
  console.log(values)
  const errors = {};
  if (!values.name) {
    errors.name = "name is required!";
  }
  if (!values.description) {
    errors.description = "description is required!";
  }
  if (!values.stageId) {
    errors.stageId = "stage is required!";
  }


  return errors;
};

export const validateFP = (values) => {
  console.log("...stage state values up for validation")
  console.log(values)
  const errors = {};
  if (!values.processId) {
    errors.processId = "field can not be empty!";
  }
  if (!values.foodId) {
    errors.foodId = "field can not be empty";
  }
  if (!values.countryName) {
    errors.countryName = "field can not be empty!";
  }
  if (!values.produce) {
    errors.produce = "field can not be empty!";
  }
  if (!values.lossPercentage) {
    errors.lossPercentage = "field can not be empty";
  }
  if (!values.lossQuantity) {
    errors.lossQuantity = "field can not be empty!";
  }
  if (!values.year) {
    errors.year = "field can not be empty!";
  }



  return errors;
};
