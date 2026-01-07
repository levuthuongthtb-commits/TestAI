
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Exam, Difficulty } from '../types';
import { ICONS } from '../constants';

interface ExamViewProps {
  exam: Exam;
  onBack: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ exam, onBack }) => {
  const [viewMode, setViewMode] = useState<'exam' | 'matrix'>('exam');

  const exportWord = () => {
    alert('Tính năng Xuất file Word (.DOCX) chuẩn Công văn 5512 đang được chuẩn bị. Trong phiên bản demo này, bạn có thể xem đề trực tuyến.');
  };

  const shuffleExam = () => {
    alert('Đã tạo 4 mã đề (A, B, C, D) bằng cách đảo ngẫu nhiên câu hỏi và đáp án.');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Quay lại
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={shuffleExam}>{ICONS.shuffle} Trộn mã đề</Button>
          <Button variant="success" onClick={exportWord}>{ICONS.fileExport} Xuất Word (5512)</Button>
        </div>
      </div>

      <div className="flex bg-white rounded-lg p-1 border border-slate-200 mb-6 max-w-xs">
        <button 
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${viewMode === 'exam' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}
          onClick={() => setViewMode('exam')}
        >
          Đề thi
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${viewMode === 'matrix' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}
          onClick={() => setViewMode('matrix')}
        >
          Ma trận
        </button>
      </div>

      {viewMode === 'exam' ? (
        <div className="space-y-6">
          <Card className="text-center p-8 border-t-4 border-t-indigo-600">
            <h1 className="text-xl font-bold uppercase mb-2">Đề Kiểm tra Định kỳ</h1>
            <p className="text-lg font-semibold">{exam.title}</p>
            <p className="text-slate-600 italic mt-2">Thời gian làm bài: 45 phút (Không kể thời gian phát đề)</p>
          </Card>

          <div className="space-y-4">
            {exam.questions.map((q, idx) => (
              <Card key={q.id} className="relative">
                <div className="absolute top-4 right-4 text-[10px] uppercase font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">
                  {q.difficulty} | {q.type}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-indigo-600 shrink-0">Câu {idx + 1}:</span>
                  <div className="space-y-3">
                    <p className="font-medium text-slate-800">{q.content}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className={`p-2 rounded border ${oIdx === q.correctIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-slate-100 bg-slate-50'}`}>
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                          {oIdx === q.correctIndex && <i className="fa-solid fa-check ml-2"></i>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card title="Ma trận Đặc tả Đề kiểm tra (5512)">
           <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-3 border">Chủ đề</th>
                <th className="p-3 border">Nhận biết</th>
                <th className="p-3 border">Thông hiểu</th>
                <th className="p-3 border">Vận dụng</th>
                <th className="p-3 border">Tổng</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 border font-medium">1. Phonetics</td>
                <td className="p-3 border">3 câu</td>
                <td className="p-3 border">2 câu</td>
                <td className="p-3 border">-</td>
                <td className="p-3 border font-bold">5</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border font-medium">2. Vocab & Grammar</td>
                <td className="p-3 border">12 câu</td>
                <td className="p-3 border">10 câu</td>
                <td className="p-3 border">4 câu</td>
                <td className="p-3 border font-bold">26</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border font-medium">3. Reading</td>
                <td className="p-3 border">2 câu</td>
                <td className="p-3 border">4 câu</td>
                <td className="p-3 border">2 câu</td>
                <td className="p-3 border font-bold">8</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border font-medium">4. Writing</td>
                <td className="p-3 border">-</td>
                <td className="p-3 border">5 câu</td>
                <td className="p-3 border">6 câu</td>
                <td className="p-3 border font-bold">11</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold">
                <td className="p-3 border">Tổng cộng</td>
                <td className="p-3 border">17 (3.4đ)</td>
                <td className="p-3 border">21 (4.2đ)</td>
                <td className="p-3 border">12 (2.4đ)</td>
                <td className="p-3 border">50 (10đ)</td>
              </tr>
            </tfoot>
           </table>
        </Card>
      )}
    </div>
  );
};
