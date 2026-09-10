import { cn } from '~/lib/utils';

export interface SectionAppearance {
  textSize: string;
  spacing: string;
  alignment: string;
  background: string;
  textColor: string;
  visible: boolean;
}

const textSizes: Record<string, string> = {
  'text-2xl': '!text-2xl sm:!text-2xl lg:!text-2xl', 'text-3xl': '!text-3xl sm:!text-3xl lg:!text-3xl', 'text-4xl': '!text-4xl sm:!text-4xl lg:!text-4xl', 'text-5xl': '!text-5xl sm:!text-5xl lg:!text-5xl', 'text-6xl': '!text-6xl sm:!text-6xl lg:!text-6xl',
};
const spacings: Record<string, string> = {
  'py-8': '!py-8 sm:!py-8 lg:!py-8', 'py-12': '!py-12 sm:!py-12 lg:!py-12', 'py-16': '!py-16 sm:!py-16 lg:!py-16', 'py-20': '!py-20 sm:!py-20 lg:!py-20', 'py-24': '!py-24 sm:!py-24 lg:!py-24', 'py-32': '!py-32 sm:!py-32 lg:!py-32',
};
const alignments: Record<string, string> = {
  'text-left': 'text-left', 'text-center': 'text-center', 'text-right': 'text-right',
};
const backgrounds: Record<string, string> = {
  'bg-background': '!bg-background bg-none', 'bg-card': '!bg-card bg-none', 'bg-muted': '!bg-muted bg-none', 'bg-accent': '!bg-accent bg-none', 'bg-primary': '!bg-primary bg-none',
};
const textColours: Record<string, string> = {
  'text-foreground': 'text-foreground', 'text-muted-foreground': 'text-muted-foreground', 'text-primary-foreground': 'text-primary-foreground',
};

/** Resolve only the finite utilities declared by the template contract. */
export function sectionAppearance(appearance?: SectionAppearance) {
  return {
    root: cn(
      appearance && backgrounds[appearance.background],
      appearance && textColours[appearance.textColor],
      appearance?.visible === false && 'hidden',
    ),
    body: appearance ? spacings[appearance.spacing] : undefined,
    heading: cn(
      appearance && textSizes[appearance.textSize],
      appearance && alignments[appearance.alignment],
    ),
  };
}
