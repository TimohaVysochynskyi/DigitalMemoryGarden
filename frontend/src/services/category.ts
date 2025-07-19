import apiClient from "./apiClient";

export const getAllCategories = async (): Promise<{ _id: string; name: string }[]> => {
    const response = await apiClient.get("/categories");
    return response.data;
};

export const addCategory = async (data: { name: string }): Promise<{ _id: string; name: string }> => {
    const response = await apiClient.post("/categories", data);
    return response.data;
};

export const updateCategory = async (id: string, data: { name: string }): Promise<{ _id: string; name: string }> => {
    const response = await apiClient.patch(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
};