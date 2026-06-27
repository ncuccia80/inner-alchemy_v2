export const colors = {
  backgroundTop: '#101433',
  background: '#080b18',
  backgroundBottom: '#030510',
  surface: 'rgba(255,255,255,0.08)',
  surfaceStrong: 'rgba(255,255,255,0.13)',
  border: 'rgba(255,255,255,0.16)',
  borderStrong: 'rgba(255,255,255,0.28)',
  text: '#f7f0ff',
  muted: '#b7aec9',
  dim: '#7e7891',
  accent: '#ffcf70',
  accentPink: '#ff8bc8',
  accentCyan: '#7be7ff',
  success: '#99f2bd',
  warning: '#ffd28d',
  danger: '#ff8d9c'
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32
};

export const orbPalette = [
  '#ff8bc8',
  '#8aa7ff',
  '#ff936f',
  '#8bd3ff',
  '#ffd86d',
  '#9ef0c0',
  '#c5a3ff',
  '#ffbd80'
];

export function getOrbColor(index: number) {
  return orbPalette[index % orbPalette.length];
}
