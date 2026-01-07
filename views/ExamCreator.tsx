
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { GRADES, SEMESTERS, ICONS } from '../constants';
import { generateEnglishExam } from '../services/geminiService';
import { Exam } from '../types';

interface ExamCreatorProps {
  onBack: () => void;
  onSuccess: (exam: Exam) => void;
}

export const ExamCreator: React.FC<ExamCreatorProps> = ({ onBack, onSuccess }) => {
  const [grade, setGrade] = useState(6);
  const [semester, setSemester] = useState(1);
  const [unit, setUnit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await generateEnglishExam(grade, unit, semester);
      const newExam: Exam = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || `Đề Kiểm tra Tiếng Anh Lớp ${grade} - HK ${semester}`,
        grade,
        semester,
        unit,
        questions: data.questions,
        createdAt: new Date().toISOString(),
        duration: 45
      };
      
      const saved = JSON.parse(localStorage.getItem('exams') || '[]');
      localStorage.setItem('exams', JSON.stringify([newExam, ...saved]));
      
      onSuccess(newExam);
    } catch (err: any) {
      setError('Lỗi khi tạo đề: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <i className="fa-solid fa-arrow-left"></i> Quay lại
      </Button>

      <Card title="Cấu hình Đề thi AI (Công văn 5512)">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Chọn Lớp</label>
              <select 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
              >
                {GRADES.map(g => <option key={g} value={g}>Lớp {g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Học kỳ</label>
              <select 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
              >
                {SEMESTERS.map(s => <option key={s} value={s}>Học kỳ {s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unit / Nội dung trọng tâm</label>
            <input 
              type="text"
              placeholder="Ví dụ: Unit 1, 2, 3 hoặc My hobbies..."
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            <p className="font-semibold mb-2 underline">Phân bổ chuẩn (50 câu):</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              <li>Phát âm/Trọng âm: 5 câu</li>
              <li>Ngữ pháp & Từ vựng: 26 câu</li>
              <li>Đồng/Trái nghĩa: 4 câu</li>
              <li>Đọc hiểu (2 bài): 8 câu</li>
              <li>Giao tiếp/Viết: 7 câu</li>
            </ul>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button 
            className="w-full h-14 text-lg" 
            onClick={handleGenerate} 
            disabled={isLoading}
          >
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> AI đang soạn thảo đề...</>
            ) : (
              <>{ICONS.robot} Bắt đầu tạo đề AI</>
            )}
          </Button>
          
          <p className="text-center text-xs text-slate-400">
            AI bám sát SGK Global Success và cấu trúc kiểm tra định kỳ 5512.
          </p>
        </div>
      </Card>
    </div>
  );
};
