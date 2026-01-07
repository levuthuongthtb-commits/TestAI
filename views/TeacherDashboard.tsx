
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ICONS } from '../constants';
import { Exam } from '../types';

interface TeacherDashboardProps {
  onNavigate: (view: string, data?: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('exams');
    if (saved) setExams(JSON.parse(saved));
  }, []);

  const deleteExam = (id: string) => {
    const updated = exams.filter(e => e.id !== id);
    setExams(updated);
    localStorage.setItem('exams', JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">EduTest AI</h1>
          <p className="text-slate-500">Quản lý đề thi Tiếng Anh THCS (Công văn 5512)</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate('create')} variant="primary" className="h-12 px-6">
            {ICONS.plus} Tạo đề mới (AI)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-indigo-50 border-indigo-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-lg">{ICONS.book}</div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Tổng số đề</p>
              <p className="text-2xl font-bold text-slate-900">{exams.length}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-emerald-50 border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600 text-white rounded-lg">{ICONS.users}</div>
            <div>
              <p className="text-slate-600 text-sm font-medium">HS đã tham gia</p>
              <p className="text-2xl font-bold text-slate-900">1,248</p>
            </div>
          </div>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-600 text-white rounded-lg">{ICONS.chartLine}</div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Điểm trung bình</p>
              <p className="text-2xl font-bold text-slate-900">7.2</p>
            </div>
          </div>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Danh sách đề thi gần đây</h2>
      {exams.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <div className="text-slate-300 text-5xl mb-4">{ICONS.robot}</div>
          <p className="text-slate-500">Chưa có đề thi nào. Hãy bắt đầu tạo đề với AI!</p>
          <Button onClick={() => onNavigate('create')} variant="ghost" className="mt-4 mx-auto">
            Tạo ngay
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map(exam => (
            <Card key={exam.id} title={exam.title} className="hover:shadow-md transition-shadow">
              <div className="space-y-2 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Khối:</span> <span className="font-medium text-slate-900">{exam.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Học kỳ:</span> <span className="font-medium text-slate-900">{exam.semester}</span>
                </div>
                <div className="flex justify-between">
                  <span>Số câu:</span> <span className="font-medium text-slate-900">{exam.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày tạo:</span> <span className="font-medium text-slate-900">{new Date(exam.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 text-xs px-2" onClick={() => onNavigate('view-exam', exam)}>
                  Chi tiết
                </Button>
                <Button variant="ghost" className="text-xs px-2" onClick={() => onNavigate('assign', exam)}>
                  {ICONS.users} Giao bài
                </Button>
                <Button variant="danger" className="p-2" onClick={() => deleteExam(exam.id)}>
                   <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
