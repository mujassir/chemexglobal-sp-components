import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IUpComingEvent from "../models/IUpComingEvent";
import IEmployeeSpotlight from "../models/IEmployeeSpotlight";
import IWhatsNew from "../models/IWhatsNew";
import IIconWidget from "../models/IIconWidget";
import ISliderImage from "../models/ISliderImage";


export default class ListDataManager {

    public static async getUpcomingEventsData(listName: string): Promise<IUpComingEvent[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        let results: IUpComingEvent[] = items.map((p: any) => {
            return {
                ID: p.ID,
                GUID: p.GUID,
                Title: p.Title,
                EventName: p.EventName,
                EventDescription: p.EventDescription,
                Date: new Date(p.Date),
            };
        });
        console.log("getUpcomingEventsData", results);
        return results;
    }

    public static async getEmployeeSpotlightData(listName: string): Promise<IEmployeeSpotlight[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        let results: IEmployeeSpotlight[] = items.map((p: any) => {
            return {
                EmployeeName: p.EmployeeName,
                EmployeePicture: this.getPictureURL(p.EmployeePicture),
                Date: new Date(p.Date),
            };
        });
        console.log("getEmployeeSpotlightData", results);
        return results;
    }

    public static async getWhatsNewData(listName: string): Promise<IWhatsNew[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        console.log("items;", items);
        let results: IWhatsNew[] = items.map((p: any) => {
            return {
                Title: p.Title,
                NewsImage: this.getPictureURL(p.NewsImage),
                NewsDescription: p.NewsDescription,
                Date: new Date(p.Date),
            };
        });
        console.log("getWhatsNewData", results);
        return results;
    }

    public static async getIconWidgetData(listName: string): Promise<IIconWidget[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        console.log("items;", items);
        let results: IIconWidget[] = items.map((p: any) => {
            return {
                Title: p.Title,
                ApplicationLink: this.getLinkURL(p.ApplicationLink),
                IconImage: this.getPictureURL(p.IconImage),
            };
        });
        console.log("getIconWidgetData", results);
        return results;
    }
    public static async getSliderWidgetData(listName: string): Promise<ISliderImage[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        console.log("items;", items);
        let results: ISliderImage[] = items.map((p: any) => {
            return {
                Title: p.Title,
                EventName: p.EventName,
                EventDescription: p.EventDescription,
                EventImage: this.getPictureURL(p.EventImage),
            };
        });
        console.log("getSliderWidgetData", results);
        return results;
    }

    private static getLinkURL(link: any): string {
        return link ? link.Url : undefined;
    }

    private static getPictureURL(picture: any): string {
        picture = JSON.parse(picture);
        return picture.serverUrl + picture.serverRelativeUrl;
    }

}