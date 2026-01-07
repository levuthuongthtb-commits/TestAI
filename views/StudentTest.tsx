
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Exam, StudentResult } from '../types';
import { ICONS } from '../constants';

interface StudentTestProps {
  exam: Exam;
  onFinish: (result: StudentResult) => void;
}

export const StudentTest: React.FC<StudentTestProps> = ({ exam, onFinish }) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [answers, setAnswers] = useState<number[]>(new Array(exam.questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isStarted) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!studentName || !studentClass) {
      alert('Vui lòng nhập tên và lớp!');
      return;
    }
    setIsStarted(true);
  };

  const selectAnswer = (qIdx: number, aIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = aIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === exam.questions[idx].correctIndex) correctCount++;
    });

    const score = (correctCount / exam.questions.length) * 10;
    const result: StudentResult = {
      id: Math.random().toString(36).substr(2, 9),
      examId: exam.id,
      studentName,
      studentClass,
      answers,
      score: Math.round(score * 10) / 10,
      submittedAt: new Date().toISOString()
    };

    onFinish(result);
  };

  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <Card title="Thông tin Thí sinh">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-indigo-600">{exam.title}</h1>
              <p className="text-slate-500 text-sm">Thời gian: {exam.duration} phút | {exam.questions.length} câu</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="Nguyễn Văn A"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lớp</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="6A1"
                value={studentClass}
                onChange={e => setStudentClass(e.target.value)}
              />
            </div>
            <Button className="w-full h-12" onClick={handleStart}>
              Bắt đầu làm bài
            </Button>
            <p className="text-xs text-center text-slate-400">Hệ thống tự động nộp bài khi hết giờ.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 max-w-3xl mx-auto">
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-10 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="font-bold text-slate-800 truncate max-w-[50%]">{studentName} - {studentClass}</div>
        <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`}>
          {ICONS.clock} {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mt-16 space-y-6">
        {exam.questions.map((q, idx) => (
          <Card key={idx}>
            <div className="flex gap-3">
              <span className="font-bold text-slate-400">Câu {idx + 1}</span>
              <div className="space-y-4 flex-1">
                <p className="font-medium text-slate-800 leading-relaxed">{q.content}</p>
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => selectAnswer(idx, aIdx)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        answers[idx] === aIdx 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + aIdx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10 flex justify-center shadow-lg">
        <Button className="w-full max-w-md h-12 text-lg" onClick={() => {
          if (confirm('Bạn có chắc chắn muốn nộp bài?')) handleSubmit();
        }}>
          Nộp bài ngay
        </Button>
      </div>
    </div>
  );
};
