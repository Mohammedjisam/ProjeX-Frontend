import { Manager,ManagerFormData  } from '../../types/Manager';
import companyadminAxiosInstance from '../../utils/CompanyAdminAxiosInstance';

export const fetchManagers = async (): Promise<Manager[]> => {
    const response = await companyadminAxiosInstance.get('/getallmanager');
    if (response.data?.success) {
      return response.data.data;
    }
    throw new Error('Failed to fetch managers');
  };

  export const deleteManager = async (id: string): Promise<void> => {
    await companyadminAxiosInstance.delete(`/getallmanager/${id}`);
  };
  
  export const addManager = async (managerData: ManagerFormData) => {
    const response = await companyadminAxiosInstance.post('/addnewmanager', managerData);
    return response.data;
  };