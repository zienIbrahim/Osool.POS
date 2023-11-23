import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavItem } from '../../models/navigation.model';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent {

  @Input() isExpanded: boolean  = false;

  public routeLinks = [
    { link: "/Tenant/List", name: "Tenant", icon: "location_city" },
    { link: "/Tenant/GroupType", name: "Group Type", icon: "group_work" },
    { link: "/Plan/Option", name: "Options", icon: "grade" },
    { link: "/Plan/Offer", name: "Offers", icon: "local_offer" },
    { link: "/Plan/Software", name: "Software", icon: "bookmark" },
    { link: "/Plan/Plan", name: "Plan", icon: "category" },
    { link: "/Tenant/TenantUser/List", name: "Tenant User", icon: "account_box" },
    { link: "/Subscription/Order", name: "Order", icon: "shopping_cart" },
  ];


}
