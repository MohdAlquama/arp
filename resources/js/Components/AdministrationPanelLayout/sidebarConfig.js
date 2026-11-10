import {
  AppWindow,
  ArrowLeftRight,
  BadgePercent,
  BarChart3,
  ClipboardList,
  Landmark,
  Layers,
  Link2,
  MousePointerClick,
  Paintbrush,
  ShieldCheck, ListTree , 
  Users, Waypoints
} from "lucide-react";

export const MAIN_MENU = [
  {
    key: "users",
    label: "User Accounts",
    icon: Users,
    route: "admin.users.index",
    href: "/admin/users",
  },
  {
    key: "home",
    label: "Home",
    icon: BarChart3,
    children: [
      {
        key: "overview",
        label: "Overview",
        route: "admin.overview",
        href: "/admin/overview",
      },
      {
        key: "Home_Design",
        label: "Home Design",
        route: "admin.website.home.index",
        href: "/admin/website/home",
      }
      
    ],
  },
  {
    key: "Products",
    label: "Products",
    icon: Paintbrush,
    route: "admin.stock.product.index",
    href: "/admin/stock/product",
  },
  {
    key: "reports",
    label: "Reports",
    icon: ClipboardList,
    route: "admin.reports.index",
    href: "/admin/reports",
  },
];

export const PRODUCTS = [
  {
    key: "categories",
    label: "Categories",
    icon: MousePointerClick,
    route: "admin.website.category.index",
    href: "/admin/website/category",
  },
  {
    key: "subcategories",
    label: "SubCategories",
    icon: ListTree,
    route: "admin.website.subcategory.index",
    href: "/admin/website/subcategory",
  },
  {
    key: "attributes",
    label: "Attributes",
    icon: Layers,
    children: [
      {
        key: "size",
        label: "Size",
        route: "admin.website.attributes.size.index",
        href: "/admin/website/attributes/size",
      },
      {
        key: "color",
        label: "Color",
        route: "admin.website.attributes.color.index",
        href: "/admin/website/attributes/color",
      },
    ],
  },
];

export const STOCK_AND_INVENTORY_MANAGEMENT=[
  {
   key: "variant",label: "Variant Management",icon: MousePointerClick,route: "admin.stock.variant.index",href: "/admin/stock/variant",
  },{
   key: "material",label: "Material Management",icon: Waypoints,route: "admin.stock.material.index",href: "/admin/stock/material",

  }
  
]
export const BOTTOM_MENU = [
 
];
