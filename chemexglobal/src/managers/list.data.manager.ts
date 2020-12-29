import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IUpComingEvent from "../models/IUpComingEvent";
import IEmployeeSpotlight from "../models/IEmployeeSpotlight";
import IWhatsNew from "../models/IWhatsNew";
import IIconWidget from "../models/IIconWidget";
import ISliderImage from "../models/ISliderImage";
import IRecentNews from '../models/IRecentNews';


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
        UpcomingURL: this.getLinkURL(p.UpcomingURL),
        Date: new Date(p.Date),
      };
    });
    console.log("getUpcomingEventsData", results);
    return results;
  }

  public static async getRecentNewsData(listName: string): Promise<IRecentNews[]> {
    let siteURL = await sp.site.getWebUrlFromPageUrl(window.location.href);
    console.log('Site URL: ', siteURL);
    let list = sp.web.lists.getByTitle(listName);
    const items: any[] = await list.items.get();
    const firstItems: any[] = items.slice(0, 3);
    let results: IRecentNews[] = firstItems.map((p: any) => {
      return {
        ID: p.ID,
        GUID: p.GUID,
        Title: p.Title,
        NewsTitle: p.NewsTitle,
        NewsDescription: p.NewsDescription,
        ArticleLink: this.getLinkURL(p.ArticleLink),
        DatePublished: new Date(p.DatePublished),
        EditLink: this.getEditURL(siteURL, listName, p.ID)
      };
    });
    console.log("getRecentNewsData", results);
    return results;
  }

  public static async getEmployeeSpotlightData(
    listName: string
  ): Promise<IEmployeeSpotlight[]> {
    let siteURL = await sp.site.getWebUrlFromPageUrl(window.location.href);
    let list = sp.web.lists.getByTitle(listName).items;
    const items: any[] = await list.get();
    let results: IEmployeeSpotlight[] = items.map((p: any) => {
      return {
        EventPersonName: p.EventPersonName,
        Description: p.Description,
        EventPersonImage: this.getPictureURL(p.EventPersonImage),
        Date: new Date(p.Date),
        EditLink: this.getEditURL(siteURL, listName, p.ID)
      };
    });
    console.log("getTeamChemexData", results);
    return results;
  }

  public static async getWhatsNewData(listName: string): Promise<IWhatsNew[]> {
    let list = sp.web.lists.getByTitle(listName).items;
    const items: any[] = await list.get();
    console.log("items;", items);
    let results: IWhatsNew[] = items.map((p: any) => {
      return {
        Title: p.Title,
        NewsURL: this.getLinkURL(p.NewsURL),
        NewsImage: this.getPictureURL(p.NewsImage),
        NewsDescription: p.NewsDescription,
        Date: new Date(p.Date),
      };
    });
    console.log("getWhatsNewData", results);
    return results;
  }

  public static async getIconWidgetData(
    listName: string
  ): Promise<IIconWidget[]> {
    let list = sp.web.lists.getByTitle(listName).items;
    const items: any[] = await list.get();
    console.log("items;", items);
    let results: IIconWidget[] = items.map((p: any) => {
      return {
        Title: p.Title,
        IconName: p.IconName,
        IconImage: this.getPictureURL(p.IconImage),
        ApplicationLink: this.getLinkURL(p.ApplicationLink),
      };
    });
    console.log("getIconWidgetData", results);
    return results;
  }
  public static async getSliderWidgetData(
    listName: string
  ): Promise<ISliderImage[]> {
    let list = sp.web.lists.getByTitle(listName).items;
    const items: any[] = await list.get();
    console.log("items;", items);
    let results: ISliderImage[] = items.map((p: any) => {
      return {
        Title: p.Title,
        EventName: p.EventName,
        EventDescription: p.EventDescription,
        EventURL: this.getLinkURL(p.EventURL),
        EventImage: this.getPictureURL(p.EventImage),
      };
    });
    console.log("getSliderWidgetData", results);
    return results;
  }

  private static getLinkURL(link: any): string {
    return link ? link.Url : undefined;
  }

  private static getEditURL(siteURL: string, listName: string, id: string): string {
    listName = listName.split(' ').join('');
    return `${siteURL}/Lists/${listName}/EditForm.aspx?ID=${id}`;
  }

  private static getViewURL(id: string, listName: string): string {
    return `${window.location.origin}/Lists/${listName}/DispForm.aspx?ID=${id}`;
  }

  private static getPictureURL(picture: any): string {
    picture = JSON.parse(picture);
    return picture.serverUrl + picture.serverRelativeUrl;
  }
}
