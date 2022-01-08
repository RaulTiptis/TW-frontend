import {Classroom} from './classroom';

export interface Subject {
  id: number;
  name: string;
  classrooms: Classroom[];
}
