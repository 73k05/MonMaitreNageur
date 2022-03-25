export function sessionIntensity(intensity: string): string {
  switch (intensity) {
    case 'LOW':
      return 'Faible';
    case 'MEDIUM':
      return 'Moyenne';
    case 'HARD':
      return 'Forte';
    default:
      return 'Faible';
  }
}
