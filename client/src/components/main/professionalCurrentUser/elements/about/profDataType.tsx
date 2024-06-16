export interface Media {
    type: 'image' | 'video';
    url: string;
  }
  
  export interface Info {
    title: string;
    type?: string;
    department?: string;
    location: string;
    duration: string;
    description: string;
    media: Media[];
  }
  
  export interface Organization {
    headerType: string;
    organizationName: string;
    organizationLogo: string;
    isVerified: boolean;
    experiences: Info[];
  }
  
  export interface AboutInfoContextData {
    experiences: Organization[];
    education: Organization[];
    leadership: Organization[];
    certifications: Organization[];
    awards: Organization[];
  }
  