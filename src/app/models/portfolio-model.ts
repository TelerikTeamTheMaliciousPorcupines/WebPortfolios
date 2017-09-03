export class Portfolio {

    constructor(portfolio: any) {
        this.id = !!portfolio.id ? portfolio.id : null;
        this.email = !!portfolio.email ? portfolio.email : '';
        this.imgUrl = !!portfolio.imgUrl ? portfolio.imgUrl : '';
        this.firstName = !!portfolio.firstName ? portfolio.firstName : '';
        this.lastName = !!portfolio.lastName ? portfolio.lastName : '';
        this.age = !!portfolio.age ? portfolio.age : null;
        this.profession = !!portfolio.profession ? portfolio.profession : '';
        if (Array.isArray(portfolio.interests)) {
            this.interests = portfolio.interests;
        } else {
            this.interests = [];
            if (!!portfolio.interests) {
                const keys = Object.keys(portfolio.interests);
                for (const key of keys) {
                    this.interests.push(portfolio.interests[key]);
                }
            }

        }
        this.workingExperience = !!portfolio.workingExperience ? portfolio.workingExperience : null;
        if (Array.isArray(portfolio.languages)) {
            this.languages = portfolio.languages;
        } else {
            this.languages = [];
            if (!!portfolio.languages) {
                const keys = Object.keys(portfolio.languages);
                for (const key of keys) {
                    this.languages.push(portfolio.languages[key]);
                }
            }
        }
        if (Array.isArray(portfolio.projects)) {
            this.projects = portfolio.projects;
        } else {
            this.projects = [];
            if (!!portfolio.projects) {
                const keys = Object.keys(portfolio.projects);
                for (const key of keys) {
                    this.projects.push(portfolio.projects[key]);
                }
            }
        }
        if (Array.isArray(portfolio.hobbies)) {
            this.hobbies = portfolio.hobbies;
        } else {
            this.hobbies = [];
            if (!!portfolio.hobbies) {
                const keys = Object.keys(portfolio.hobbies);
                for (const key of keys) {
                    this.hobbies.push(portfolio.hobbies[key]);
                }
            }
        }
        this.additionalInfo = !!portfolio.additionalInfo ? portfolio.additionalInfo : '';
    }
    email: string;
    imgUrl: string;
    firstName: string;
    lastName: string;
    age: number;
    profession: string;
    interests: string[];
    workingExperience: number;
    languages: string[];
    projects: string[];
    hobbies: string[];
    additionalInfo: string;
    rating: number;
    id: string;
}
