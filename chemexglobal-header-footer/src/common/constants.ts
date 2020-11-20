
export default class Constants {

    public static Defaults = {

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