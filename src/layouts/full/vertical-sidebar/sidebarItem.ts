import {
  HomeIcon,
  BrandGravatarIcon,
  MenuIcon,
  CircleIcon,
  ShapeIcon,
  CircleOffIcon,
  BoxMultipleIcon,
  FormsIcon,
  ChartDotsIcon,
  PictureInPictureIcon,
  ClipboardCheckIcon,
  WindmillIcon,
  Receipt2Icon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  LayoutGridAddIcon,
  BrandFramerIcon,
  KeyIcon,
  BugIcon,
  TableIcon,
  BrushIcon,
  ToolsIcon,
  BasketIcon,
  MessagesIcon,
  UserCheckIcon,
  NfcIcon,
  MailIcon,
  LayoutKanbanIcon,
  CalendarIcon,
  DashboardIcon,
  DeviceAnalyticsIcon,
  ChartArcsIcon,
  ClipboardIcon,
  ChartInfographicIcon,
  BellRingingIcon,
  PhoneCallIcon,
  QuestionMarkIcon,
  ShieldLockIcon,
  BrandChromeIcon,
  HelpIcon,
  SitemapIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Recent',
    icon: BrushIcon,
    to: '/app/user',
    children: [
      {
        title: 'Social Profile',
        icon: CircleIcon,
        to: '/app/user/social/posts'
      },
      {
        title: 'Account Profile',
        icon: CircleIcon,
        to: '/app/user/account-profile',
        children: [
          {
            title: 'Profile 01',
            icon: CircleIcon,
            to: '/app/user/account-profile/profile1'
          },
          {
            title: 'Profile 02',
            icon: CircleIcon,
            to: '/app/user/account-profile/profile2'
          },
          {
            title: 'Profile 03',
            icon: CircleIcon,
            to: '/app/user/account-profile/profile3'
          }
        ]
      },
      {
        title: 'Cards',
        icon: CircleIcon,
        to: '/app/user/card',
        children: [
          {
            title: 'Style 01',
            icon: CircleIcon,
            to: '/app/user/card/card1'
          },
          {
            title: 'Style 02',
            icon: CircleIcon,
            to: '/app/user/card/card2'
          },
          {
            title: 'Style 03',
            icon: CircleIcon,
            to: '/app/user/card/card3'
          }
        ]
      },
    ]
  },
  {
    title: 'Favourite',
    icon: WindmillIcon,
    to: '/customer/',
    children: [
      {
        title: 'Customer List',
        icon: CircleIcon,
        to: '/customer/customerlist'
      },
      {
        title: 'Create Invoice',
        icon: CircleIcon,
        to: '/app/customer/create-invoice'
      },
      {
        title: 'Order Details',
        icon: CircleIcon,
        to: '/app/customer/order-details'
      },
      {
        title: 'Order List',
        icon: CircleIcon,
        to: '/customer/orderlist'
      },
      {
        title: 'Product List',
        icon: CircleIcon,
        to: '/customer/productlist'
      },
      {
        title: 'Product Review',
        icon: CircleIcon,
        to: '/customer/productreview'
      }
    ]
  },
];

export default sidebarItem;
