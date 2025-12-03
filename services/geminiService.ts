import { GoogleGenAI, Type } from "@google/genai";
import { ModelType } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

/**
 * Analyzes the transcript and generates a new script in one go to maintain context and speed.
 */
export const generateViralScript = async (
  transcript: string, 
  topic: string,
  onProgress?: (status: string) => void
): Promise<{ script: string; analysis: string }> => {
  
  try {
    if (onProgress) onProgress("분석 중...");

    const model = ModelType.FAST; // Using Flash for speed as scripts can be long

    const prompt = `
    당신은 전설적인 유튜브 시나리오 작가이자 알고리즘 전문가입니다.
    
    [작업 목표]
    사용자가 제공한 "성공한 영상(떡상 영상)의 대본"을 분석하여 그 성공 공식(후킹, 전개 속도, 감정선, 리텐션 전략)을 추출하고, 그 공식을 그대로 적용하여 "새로운 주제"에 대한 대본을 작성해 주세요.

    [입력 데이터]
    1. 떡상 영상 대본:
    """
    ${transcript}
    """

    2. 새로 만들 영상 주제:
    """
    ${topic}
    """

    [출력 형식]
    JSON 형식으로 다음 두 가지 필드를 포함하여 출력해 주세요.
    1. "analysis": 원본 대본의 성공 요인 분석 (3~4문장 요약, 마크다운 형식)
    2. "script": 새로운 주제로 작성된 전체 대본 (인트로, 본론, 아웃트로 구분, 촬영 가이드 포함, 마크다운 형식)

    [대본 작성 규칙]
    - 원본의 말투, 호흡, 문장 길이, 유머 코드 등을 모방하세요.
    - 시청 지속 시간을 늘리기 위한 장치(질문 던지기, 반전 등)를 원본과 유사한 타이밍에 배치하세요.
    - 한국어로 작성하세요.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: "The analysis of why the original script was successful."
            },
            script: {
              type: Type.STRING,
              description: "The newly generated script based on the original's formula."
            }
          },
          required: ["analysis", "script"]
        },
        systemInstruction: "You are a professional Korean YouTube script writer specializing in viral content structures."
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini.");
    }

    const jsonResult = JSON.parse(resultText);

    return {
      script: jsonResult.script,
      analysis: jsonResult.analysis
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("대본 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }
};