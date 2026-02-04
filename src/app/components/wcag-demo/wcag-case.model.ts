export type A11yPillarKey = 'perceptible' | 'operable' | 'comprensible' | 'robusto';

export interface WCAGCase {
  id: string;
  criterion: string;
  pillar: A11yPillarKey;
  name: string;
  important: boolean;
  description: string;
  inaccessibleTemplateKey?: string;
  accessibleTemplateKey?: string;
  explanation: string;
}
