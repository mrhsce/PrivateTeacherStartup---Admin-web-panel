import {Enum} from "./Enum";
import {Student} from "./Student";
import {Lesson} from "./Lesson";
import {Teacher} from "./Teacher";

export class Request {
    Id: number;
    StartTime: string;
    Created_at: string;
    District: string;
    TeacherId: number;
    Price: number;
    StudentCount: Enum;
    AllowAllGender: boolean;
    Duration: Enum;
    Address: string;
    Latitude: number;
    Longitude: number;
    Description: string;
    Student: Student;
    Teacher: Teacher;
    Lesson: Lesson;
    Gender: Enum;
    TRStatus: Enum;
    Status: Enum;
}
