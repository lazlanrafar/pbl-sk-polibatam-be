module.exports = {
  Ok: (res, data, message) => {
    const response = {
      status: 200,
      message: message ?? "Berhasil",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  Created: (res, data, message) => {
    const response = {
      status: 201,
      message: message ?? "Berhasil",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  BadRequest: (res, data, message) => {
    const response = {
      status: 400,
      message: message ?? "Bad Request",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  Unauthorized: (res, data, message) => {
    const response = {
      status: 401,
      message: message ?? "Unauthorized",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  Forbidden: (res, data, message) => {
    const response = {
      status: 403,
      message: message ?? "Forbidden",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  NotFound: (res, data, message) => {
    const response = {
      status: 404,
      message: message ?? "Not Found",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
  InternalServerError: (res, data, message) => {
    const response = {
      status: 500,
      message: message ?? "Internal Server Error",
      data: data ?? {},
    };
    res.status(response.status).json(response);
  },
};
