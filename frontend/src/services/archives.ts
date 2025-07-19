import apiClient from "./apiClient";
import type { ArchiveStoryType } from "../types/Archive";

export const getAllArchives = async (): Promise<ArchiveStoryType[]> => {
    const response = await apiClient.get("/archives");
    return response.data;
};

export const getArchiveById = async (id: string): Promise<ArchiveStoryType> => {
    const response = await apiClient.get(`/archives/${id}`);
    return response.data;
};

export const addArchive = async (data: ArchiveStoryType): Promise<ArchiveStoryType> => {
    const response = await apiClient.post("/archives", data);
    return response.data;
};

export const updateArchive = async (id: string, data: Partial<ArchiveStoryType>): Promise<ArchiveStoryType> => {
    const response = await apiClient.patch(`/archives/${id}`, data);
    return response.data;
};

export const deleteArchive = async (id: string): Promise<void> => {
    await apiClient.delete(`/archives/${id}`);
};