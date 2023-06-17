type KeyValue = {
  [key in string]: string | number | boolean;
};

export type RequestParameters = {
  pathParameters?: KeyValue;
  queryParameters?: KeyValue;
  body?: KeyValue;
};
