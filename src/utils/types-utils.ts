export type HeroIcon = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;
