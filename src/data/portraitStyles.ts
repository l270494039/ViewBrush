export type PortraitStyleId = 'realism' | 'classic' | 'impressionist' | 'bold-expressive';

export type PortraitStyleDefinition = {
  id: PortraitStyleId;
  title: string;
  createTone: string;
  createNote: string;
  landingMood: string;
  landingNote: string;
  reviewOrderLabel: string;
  prompt: string;
};

export const portraitStyles: PortraitStyleDefinition[] = [
  {
    id: 'realism',
    title: 'Realism',
    createTone: 'Detailed and lifelike',
    createNote: 'Closer likeness, refined detail, and a polished finish true to the original photo.',
    landingMood: 'Detailed and lifelike',
    landingNote: 'Closer likeness, refined detail, and a polished finish true to the original photo.',
    reviewOrderLabel: 'Ordered the Realism style',
    prompt:
      'Create a highly detailed realistic painted portrait of the same pet with faithful anatomy, refined fur detail, natural light, and preserved facial likeness and expression.',
  },
  {
    id: 'classic',
    title: 'Classic',
    createTone: 'Timeless portrait warmth',
    createNote: 'Traditional lighting, composed structure, and a warm heirloom finish.',
    landingMood: 'Timeless and collected',
    landingNote: 'Museum-like lighting, composed structure, and a warm heirloom finish.',
    reviewOrderLabel: 'Ordered the Classic style',
    prompt:
      'Create a timeless classical portrait of the same pet with elegant painterly brushwork, warm heirloom lighting, balanced composition, and preserved facial likeness and expression.',
  },
  {
    id: 'impressionist',
    title: 'Impressionist',
    createTone: 'Soft and luminous',
    createNote: 'Airy light, softened edges, and a gentle, poetic finish.',
    landingMood: 'Soft and luminous',
    landingNote: 'Airy daylight, softened edges, and a gentle, poetic finish.',
    reviewOrderLabel: 'Ordered the Impressionist style',
    prompt:
      'Create a luminous impressionist portrait of the same pet with soft brushwork, glowing color transitions, and preserved facial likeness and expression.',
  },
  {
    id: 'bold-expressive',
    title: 'Bold & Expressive',
    createTone: 'Confident brush energy',
    createNote: 'Bold brushwork, stronger color, and a more expressive contemporary finish.',
    landingMood: 'Bold and expressive',
    landingNote: 'Bold brushwork, stronger color, and a more expressive contemporary finish.',
    reviewOrderLabel: 'Ordered the Bold & Expressive style',
    prompt:
      'Create a bold expressive portrait of the same pet with confident painterly strokes, stronger color movement, contemporary energy, and preserved facial likeness and expression.',
  },
];

export const portraitStylePromptMap = Object.fromEntries(portraitStyles.map((style) => [style.id, style.prompt])) as Record<
  PortraitStyleId,
  string
>;
