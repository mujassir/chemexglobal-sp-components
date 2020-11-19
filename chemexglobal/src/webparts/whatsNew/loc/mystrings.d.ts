declare interface IWhatsNewWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  ListNameFieldLabel: string;
}

declare module 'WhatsNewWebPartStrings' {
  const strings: IWhatsNewWebPartStrings;
  export = strings;
}
