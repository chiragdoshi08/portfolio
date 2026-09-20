import { profile, type Offer } from "../content/profile";
export function topmateUrl(offer: Offer) {
  return offer.topmatePath ? `${profile.topmate.replace(/\/$/, "")}/${offer.topmatePath.replace(/^\//, "")}` : profile.topmate;
}
