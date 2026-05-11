import {Enum} from "./Enum";

export class Teacher {
    Id: number;
    Name: string;
    Family: string;
    Gender: boolean = true;
    Email: string;
    PhoneNumber: string;
    Mobile: string;
    FieldOfStudy: string;
    Degree: string;
    Availability: boolean;
    UserId: string;
    UserName: string;
    Status: Enum;
}
