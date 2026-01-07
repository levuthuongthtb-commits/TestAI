
import React, { useState } from 'react';
import { TeacherDashboard } from './views/TeacherDashboard';
import { ExamCreator } from './views/ExamCreator';
import { ExamView } from './views/ExamView';
import { StudentTest } from './views/StudentTest';
import { Exam, StudentResult } from './types';
import { Card } from './components/Card';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'view-exam' | 'student-test' | 'result'>('dashboard');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [lastResult, setLastResult] = useState<StudentResult | null>(null);

  const navigateTo = (view: any, data?: any) => {
    if (view === 'view-exam' || view === 'assign') {
      setActiveExam(data);
      if (view === 'assign') {
        setCurrentView('student-test');
      } else {
        setCurrentView('view-exam');
      }
    } else {
      setCurrentView(view);
    }
  };

  const handleExamCreated = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentView('view-exam');
  };

  const handleTestFinished = (result: StudentResult) => {
    setLastResult(result);
    setCurrentView('result');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              EduTest AI
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Tài liệu 5512</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Hướng dẫn</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Trợ giúp</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {currentView === 'dashboard' && <TeacherDashboard onNavigate={navigateTo} />}
        {currentView === 'create' && <ExamCreator onBack={() => setCurrentView('dashboard')} onSuccess={handleExamCreated} />}
        {currentView === 'view-exam' && activeExam && <ExamView exam={activeExam} onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'student-test' && activeExam && <StudentTest exam={activeExam} onFinish={handleTestFinished} />}
        
        {currentView === 'result' && lastResult && (
          <div className="max-w-md mx-auto py-16 px-4">
            <Card className="text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Hoàn thành bài thi!</h2>
              <p className="text-slate-500 mb-8">Chúc mừng <span className="font-bold text-slate-800">{lastResult.studentName}</span> đã hoàn thành bài thi.</p>
              
              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <p className="text-sm text-slate-500 uppercase font-bold tracking-widest mb-1">Điểm số của bạn</p>
                <p className="text-6xl font-black text-indigo-600">{lastResult.score}</p>
                <p className="text-sm text-slate-400 mt-2">Đã nộp lúc: {new Date(lastResult.submittedAt).toLocaleTimeString('vi-VN')}</p>
              </div>

              <Button className="w-full" onClick={() => setCurrentView('dashboard')}>
                Về trang chủ
              </Button>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <span className="text-lg font-bold text-white">EduTest AI</span>
            </div>
            <p className="text-sm">Hệ thống AI thông minh hỗ trợ giáo viên THCS soạn đề, chấm bài và quản lý chất lượng giáo dục theo CV 5512.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-bold text-white uppercase tracking-wider text-xs">Pháp lý</p>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-white uppercase tracking-wider text-xs">Liên hệ</p>
              <p>Facebook</p>
              <p>Zalo: 09xx xxx xxx</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          © 2024 EduTest AI. Developed with ❤️ for Teachers.
        </div>
      </footer>
    </div>
  );
};

export default App;
