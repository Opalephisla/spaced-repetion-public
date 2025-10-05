export const parseQuestionsFromText = (text) => {
  const questions = [];
  const pattern = /(\d{4})\.\s+(.*?)\s*A\.\s*(.*?)\s*B\.\s*(.*?)\s*C\.\s*(.*?)\s*D\.\s*(.*?)\s*Answer:\s*([A-D])/gis;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const [
      ,
      questionId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswerLetter
    ] = match;

    const options = [
      optionA.trim(),
      optionB.trim(),
      optionC.trim(),
      optionD.trim()
    ];

    if (questionText.trim() && options.every(opt => opt)) {
      const correctIndex = correctAnswerLetter.toUpperCase().charCodeAt(0) - 65;
      
      questions.push({
        id: `imported_${questionId}_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        topic: 'Imported',
        question: questionText.trim(),
        options,
        correctAnswer: correctIndex,
        explanation: 'Imported from text - review source material for detailed explanation.',
        createdAt: new Date().toISOString()
      });
    }
  }

  return questions;
};

export const validateQuestionFormat = (text) => {
  const pattern = /\d{4}\.\s+.*?\s*A\.\s*.*?\s*B\.\s*.*?\s*C\.\s*.*?\s*D\.\s*.*?\s*Answer:\s*[A-D]/i;
  return pattern.test(text);
};