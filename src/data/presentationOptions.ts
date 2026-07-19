export type FinishType = 'rolled-canvas' | 'gallery-wrap' | 'framed';

export type FinishOption = {
  id: FinishType;
  label: string;
  title: string;
  description: string;
};

export const finishOptions: FinishOption[] = [
  {
    id: 'rolled-canvas',
    label: 'Rolled Canvas',
    title: 'Rolled canvas only',
    description: 'Ships unframed in a protective tube for local stretching or framing later.',
  },
  {
    id: 'gallery-wrap',
    label: 'Gallery Wrap',
    title: 'Stretched gallery wrap',
    description: 'Mounted on stretcher bars with clean wrapped edges and no outer frame.',
  },
  {
    id: 'framed',
    label: 'Framed',
    title: 'Outer frame finish',
    description: 'Adds a finished outer frame around the wrapped canvas for a more formal wall presence.',
  },
];

export function getFinishLabel(finishType: FinishType) {
  return finishOptions.find((option) => option.id === finishType)?.label ?? finishOptions[0].label;
}

export function getPresentationSummary(finishLabel: string, frameLabel?: string | null) {
  return frameLabel ? `${finishLabel} · ${frameLabel}` : finishLabel;
}
