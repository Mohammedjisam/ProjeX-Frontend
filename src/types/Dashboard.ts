
  
  export interface Project {
    _id: string;
    name: string;
    clientName: string;
    status: string;
    startDate: string;
    endDate: string;
    projectManager: {
      _id: string;
      name: string;
      email: string;
    } | string;
  }
  
  export interface TransformedProject {
    id: string;
    title: string;
    color: string;
    managerId: string;
    user: {
      name: string;
      avatar: string;
      timeAgo: string;
    };
  }