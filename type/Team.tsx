export  interface InfoTeam{
    id: string;
    name: string;
    role: string;
    image: string;
    bio: string;
    email: string;
    phone: string;
    social: {
        linkedin: string;
        github: string;
    };
    skills: string[];
}