import {User} from './user';
import {Subject} from './subject';

export interface Classroom{
  id: number;
  name: string;
  location: string;
  capacity: number;
  teacher: User;
  students: User[];
  subject: Subject;
  day: string;
  hour: string;
  month: string;
}

