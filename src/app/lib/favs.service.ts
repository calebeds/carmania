import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
}) 
export class FavsService {
    constructor(private cookieService: CookieService) {}

    checkFavState(postId: number): boolean {
        if(this.checkFavExists(postId)){
            return false
        }else {
            return true;
        }
    }

    checkFavExists(postId: number): boolean {
        const allCookies = this.getAllCookies();
        return allCookies.includes(postId);
    }

    getAllCookies(): number[] {
        if(this.cookieService.check('favs')){ // If there is the cookie favs, just return it
            return JSON.parse(this.cookieService.get('favs'));
        }
        else {// if it isn't, just create it, and return an empty array
            this.cookieService.set('favs','[]');
            return [];
        }   
    }   

    onToggleFav(postId: number): boolean {
        let state: boolean;
        const allCookies = JSON.parse(this.cookieService.get('favs'));
        if(!this.checkFavExists(postId)){
            // add to favs
            allCookies.push(postId);
            state = false;
        } else {
            allCookies.splice(allCookies.indexOf(postId), 1);
            state = true;
        }

        this.cookieService.set('favs', JSON.stringify(allCookies));// Adding the final version of the array to the cookies
        return state;
    }

    
}