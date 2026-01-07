
import React from 'react';

export const QUESTION_DISTRIBUTION = [
  { label: 'Ngữ âm (phát âm)', count: 3, key: 'Phonetics' },
  { label: 'Trọng âm', count: 2, key: 'Stress' },
  { label: 'Từ vựng – Ngữ pháp', count: 26, key: 'VocabGrammar' },
  { label: 'Từ gần nghĩa', count: 2, key: 'Synonym' },
  { label: 'Từ trái nghĩa', count: 2, key: 'Antonym' },
  { label: 'Giao tiếp', count: 2, key: 'Communication' },
  { label: 'Tìm lỗi sai', count: 3, key: 'ErrorID' },
  { label: 'Đọc hiểu', count: 8, key: 'Reading' },
  { label: 'Viết câu / hoàn chỉnh câu', count: 2, key: 'Writing' },
];

export const GRADES = [6, 7, 8, 9];
export const SEMESTERS = [1, 2];

export const ICONS = {
  robot: <i className="fa-solid fa-robot"></i>,
  fileExport: <i className="fa-solid fa-file-export"></i>,
  chartLine: <i className="fa-solid fa-chart-line"></i>,
  users: <i className="fa-solid fa-users"></i>,
  clock: <i className="fa-solid fa-clock"></i>,
  check: <i className="fa-solid fa-check-circle"></i>,
  xmark: <i className="fa-solid fa-circle-xmark"></i>,
  shuffle: <i className="fa-solid fa-shuffle"></i>,
  plus: <i className="fa-solid fa-plus"></i>,
  chevronRight: <i className="fa-solid fa-chevron-right"></i>,
  book: <i className="fa-solid fa-book-open"></i>,
};
