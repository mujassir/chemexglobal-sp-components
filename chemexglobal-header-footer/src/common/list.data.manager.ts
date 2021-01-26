import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IFooterLink from "./IFooterLink";
import IHeaderLink from "./IHeaderLink";
import IMenuItem from "./IMenuItem";
import Constants from "./constants";
import { Web } from "@pnp/sp/webs";


export default class ListDataManager {

    public static SiteHomePage = '';

    public static async getFooterLinks(listName: string): Promise<IFooterLink[]> {
        let list = sp.web.lists.getByTitle(listName).items;
        const items: any[] = await list.get();
        console.log("items;", items);
        let results: IFooterLink[] = items.map((p: any) => {
            return {
                Title: p.Title,
                URLLinkName: this.getLinkURL(p.URLLinkName),
            };
        });
        console.log("getFooterLinks", results);
        return results;
    }

    public static async getHomePageURL(listName: string): Promise<string> { 
        let homePageURL = await sp.site.getWebUrlFromPageUrl(window.location.href);
        console.log('Home Page URL: ', homePageURL);
        return homePageURL;
    }
    public static async getHeaderLinks(listName: string): Promise<IMenuItem[]> {

        let config = await fetch(Constants.Defaults.GlobalNavigation_Config_URL).then(res => res.json());

        console.log('Config file data: ', config);

        let web = Web(config.SiteURL);
        let list = web.lists.getByTitle(config.ListName).items;
        const items: any[] = await list.get();
        console.log("items;", items);
        let results: IHeaderLink[] = items.map((p: any) => {
            return {
                Title: p.Title,
                ParentTitle: p.ParentTitle,
                ParentNode: p.ParentNode,
                ChildTitle: p.ChildTitle,
                ParentUrl: this.getLinkURL(p.ParentUrl),
                ChildUrl: this.getLinkURL(p.ChildUrl),
            };
        });
        let menu = this.MapToMenuItems(results);
        console.log("getHeaderLinks", menu);
        return menu;
    }

    private static MapToMenuItems(links: IHeaderLink[]): IMenuItem[] {

        let menu: IMenuItem[];

        menu = links.map((item: IHeaderLink) => {
            return {
                LinkTitle: item.ParentTitle,
                LinkUrl: item.ParentUrl,
                ChildItems: []
            };
        });

        links.forEach((item: IHeaderLink) => {
            if (item.ChildTitle && item.ParentNode) {
                let parent = menu.filter(p => p.LinkTitle == item.ParentNode);
                if (parent && parent.length > 0) {
                    parent[0].ChildItems.push({
                        LinkUrl: item.ChildUrl,
                        LinkTitle: item.ChildTitle,
                        ChildItems: []
                    });
                }
            }
        });

        return menu;
    }

    private static getLinkURL(link: any): string {
        return link ? link.Url : undefined;
    }

    private static getPictureURL(picture: any): string {
        picture = JSON.parse(picture);
        return picture.serverUrl + picture.serverRelativeUrl;
    }

}