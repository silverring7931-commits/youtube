export interface ScriptData {
  originalTranscript: string;
  targetTopic: string;
  generatedScript: string;
  analysis: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  step: 'idle' | 'analyzing' | 'writing' | 'complete';
}

export enum ModelType {
  FAST = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview'
}