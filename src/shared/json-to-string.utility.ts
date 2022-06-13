export const convertStringToJson = (str: string) => {
  return JSON.parse(str);
};

export const convertJsonToString = (jsonObj) => {
  return JSON.stringify(jsonObj);
};
