
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEnglishExam = async (grade: number, unit: string, semester: number) => {
  const prompt = `Bạn là chuyên gia giáo dục Tiếng Anh cấp THCS tại Việt Nam. 
Hãy tạo 01 đề kiểm tra trắc nghiệm Tiếng Anh lớp ${grade} theo sách Global Success, Học kỳ ${semester}, Nội dung tập trung vào: ${unit || 'Tổng hợp'}.

Yêu cầu định dạng JSON chính xác. Tổng cộng 50 câu hỏi với phân bổ:
- Ngữ âm: 3 câu
- Trọng âm: 2 câu
- Từ vựng & Ngữ pháp: 26 câu
- Từ đồng nghĩa: 2 câu
- Từ trái nghĩa: 2 câu
- Giao tiếp: 2 câu
- Tìm lỗi sai: 3 câu
- Đọc hiểu: 8 câu (chia thành 2 đoạn văn)
- Viết câu: 2 câu

Mỗi câu hỏi phải có:
- content: Nội dung câu hỏi
- options: Mảng 4 đáp án [A, B, C, D]
- correctIndex: Chỉ số đáp án đúng (0-3)
- difficulty: 'Nhận biết', 'Thông hiểu', 'Vận dụng' hoặc 'Vận dụng cao'
- type: Loại câu hỏi (Phonetics, Grammar, Reading...)

Ngôn ngữ chuẩn xác theo khung năng lực ngoại ngữ VN, không đánh đố, bám sát SGK Global Success.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                content: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.INTEGER },
                difficulty: { type: Type.STRING },
                type: { type: Type.STRING },
              },
              required: ["content", "options", "correctIndex", "difficulty", "type"],
            },
          },
        },
        required: ["title", "questions"],
      },
    },
  });

  return JSON.parse(response.text);
};
