import { Developer, DeveloperFormData, DeveloperResponse ,AddDeveloperResponse} from '../../types/Manager/Developer'
import managerAxiosInstance from '../../utils/ManagerAxiosInstance';

export const fetchDevelopers = async (): Promise<Developer[]> => {
  const response = await managerAxiosInstance.get<DeveloperResponse>('/getalldeveloper');
  if (response.data?.success && response.data.data) {
    return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
  }
  throw new Error(response.data?.message || 'Failed to fetch developers');
};

export const createDeveloper = async (data: DeveloperFormData): Promise<Developer> => {
  const response = await managerAxiosInstance.post<DeveloperResponse>('/adddeveloper', data);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to create developer');
};

export const updateDeveloper = async (id: string, data: Partial<DeveloperFormData>): Promise<Developer> => {
  const response = await managerAxiosInstance.put<DeveloperResponse>(`/getalldeveloper/${id}`, data);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to update developer');
};

export const toggleDeveloperStatus = async (id: string): Promise<Developer> => {
  const response = await managerAxiosInstance.patch<DeveloperResponse>(`/developers/${id}/status`);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Failed to toggle developer status');
};

export const deleteDeveloper = async (id: string): Promise<void> => {
  const response = await managerAxiosInstance.delete<DeveloperResponse>(`/getalldeveloper/${id}`);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to delete developer');
  }
};
export const addNewDeveloper = async (data: DeveloperFormData): Promise<AddDeveloperResponse> => {
  const response = await managerAxiosInstance.post('/addnewdeveloper', data);
  if (response.data?.success) {
    return response.data;
  }
  throw new Error(response.data?.message || 'Failed to add developer');
};