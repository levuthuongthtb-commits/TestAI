
export enum Difficulty {
  NB = 'Nhận biết',
  TH = 'Thông hiểu',
  VD = 'Vận dụng',
  VDC = 'Vận dụng cao'
}

export interface Question {
  id: string;
  type: string; // Phonetics, Grammar, etc.
  content: string;
  options: string[]; // [A, B, C, D]
  correctIndex: number; // 0, 1, 2, 3
  explanation?: string;
  difficulty: Difficulty;
}

export interface Exam {
  id: string;
  title: string;
  grade: number;
  unit?: string;
  semester: number;
  questions: Question[];
  createdAt: string;
  duration: number; // minutes
}

export interface StudentResult {
  id: string;
  examId: string;
  studentName: string;
  studentClass: string;
  answers: number[];
  score: number;
  submittedAt: string;
}

export interface ExamMatrix {
  topic: string;
  nb: number;
  th: number;
  vd: number;
  vdc: number;
}
