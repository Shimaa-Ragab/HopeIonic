export interface ICountryModel {
  Countries: [
    {
      CountryName: string;
      States: [
        {
          StateName: string;
          Cities: [string];
        }
      ];
    }
  ];
}
