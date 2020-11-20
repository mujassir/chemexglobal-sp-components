import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import IFooterLink from "./IFooterLink";
import IHeaderLink from "./IHeaderLink";


export default class ListDataManager {
    
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

    public static async getHeaderLinks(listName: string): Promise<IHeaderLink[]> {
        let list = sp.web.lists.getByTitle(listName).items;
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
        console.log("getHeaderLinks", results);
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