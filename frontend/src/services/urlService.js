import API from "./api";

export const createUrl = async (urlData) => {
const response = await API.post(
"/urls/create",
urlData
);

return response.data;
};

export const getMyUrls = async () => {
const response = await API.get(
"/urls/my-urls"
);

return response.data;
};

export const deleteUrl = async (id) => {
const response = await API.delete(
`/urls/${id}`
);

return response.data;
};

export const updateUrl = async (
id,
urlData
) => {
const response = await API.put(
`/urls/${id}`,
urlData
);

return response.data;
};

export const getUrlById = async (id) => {
const response = await API.get(
`/urls/${id}`
);

return response.data;
};
