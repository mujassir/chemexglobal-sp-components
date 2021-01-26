
export default class Constants {

    public static Defaults = {

        GlobalNavigation_Config_URL: 'https://chemex.sharepoint.com/sites/AppCatalog/_layouts/15/download.aspx?UniqueId=684542198cf14b7fa0c0a434b65a12ba&e=Jx7pMX',

        Footer: {
            ListName: 'Footer Widget'
        },
        Header: {
            ListName: 'GlobalNavigation'
        },
        WhatsNew:{
            Title: 'What\'s New',
            ListName: 'What\'s New Widget',
        },
        EmployeeSpotlight:{
            Title: 'Employee Spotlight',
            ListName: 'Employee Spotlight Widget',
        },

        IconWidget:{
            Title: 'Icon Widget',
            ListName: 'Icon Based Widget',
        },

        UpcomingEvents:{
            Title: 'Upcoming Events',
            ListName: 'Upcoming Events Widget',
            Description_MaxLength: 27,
        },

        Loader: {
            type:'ThreeDots',
            color:'#1f2553',
            height: 25,
            width: 25
          },
    };

    public static Errors = {
        ListError: 'You may not have access to the list or it might be delete, please contact with your administrator.'
    };

}