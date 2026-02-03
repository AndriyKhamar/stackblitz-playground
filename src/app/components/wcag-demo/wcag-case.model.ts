export type A11yPillarKey = 'perceptible' | 'operable' | 'comprensible' | 'robusto';

export interface WCAGCase {
  id: string;
  criterion: string;
  pillar: A11yPillarKey;
  name: string;
  description: string;
  inaccessibleExample: string;
  accessibleExample: string;
  explanation: string;
}
