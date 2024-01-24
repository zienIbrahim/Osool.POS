import { LocallyStoredItemsKeys } from "./LocallyStoredItemsKeys";

export default class AppUtils {

    public static delay(ms: number) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }
 
 
    public static addDays(date: Date, numOfDays: number) {
       date = new Date(new Date().getTime() + (86400000 * numOfDays));
       return date;
    }
 
 
    public static searchItemTerm(term: string, item: any) {
       // Convert the input term to lowercase
       term = term.toLocaleLowerCase();
       // Return search result
       return item.name.toLocaleLowerCase().indexOf(term) > -1 ||
          item.nameAr.toLocaleLowerCase().indexOf(term) > -1;
    }
 
 
    public static disableScrolling() {
       let x = window.scrollX;
       let y = window.scrollY;
       window.onscroll = function () { window.scrollTo(x, y); };
    }
 
 
    public static enableScrolling() {
       window.onscroll = function () { };
    }
 
 
    public static async scrollToTarget(elId:any, scrollOffset = 0): Promise<any> {
       await AppUtils.delay(100);
       const el = document.getElementById(elId);
       if (el == null) return;
       var bodyRect = document.body.getBoundingClientRect(),
          elemRect = el.getBoundingClientRect(),
          offset = elemRect.top - bodyRect.top - 100 + (scrollOffset);
       window.scrollTo({ top: offset, behavior: "smooth" });
    }
 
    public static formatDate(d: any): string | null{
       if (d === null) return null;
       return [
          (d.day < 10 ? ('0' + d.day) : d.day),
          (d.month < 10 ? ('0' + d.month) : d.month),
          d.year
       ].join('-');
    }
 
    public static uuid() {
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
       });
    }
    public static RefreshMasterData() {
      const keys = Object.keys(LocallyStoredItemsKeys)
      keys.forEach((key, _index) => {
         
      })
   }
   public static RefreshDataByKey(key: string) {
      localStorage.removeItem(key)
   }
 
 }
 