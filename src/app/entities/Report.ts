import {Enum} from "./Enum";
import {Student} from "./Student";
import {Teacher} from "./Teacher";

export class Report {
    Id: number = null;
    PageName: string;
    Dscr: string;
    Created_at: string;
    Student: Student;
    Teacher: Teacher;
    BugType: Enum;
}
