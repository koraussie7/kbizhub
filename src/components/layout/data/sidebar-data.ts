import {
  Construction,
  CreditCard,
  KeyRound,
  BarChart3,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  Command,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'kbizhub admin',
    email: 'admin@kbizhub.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'kbizhub',
      logo: Command,
      plan: 'Business Dashboard',
    },
  ],
  navGroups: [
    {
      title: 'General',
      titleKey: 'general',
      items: [
        {
          title: 'Dashboard',
          titleKey: 'dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          titleKey: 'tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Chats',
          titleKey: 'chats',
          url: '/chats',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          titleKey: 'users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Billing',
          titleKey: 'billing',
          url: '/billing',
          icon: CreditCard,
        },
        {
          title: 'API Keys',
          titleKey: 'apiKeys',
          url: '/api-keys',
          icon: KeyRound,
        },
        {
          title: 'Analytics',
          titleKey: 'analytics',
          url: '/analytics',
          icon: BarChart3,
        },
      ],
    },
    {
      title: 'Pages',
      titleKey: 'pages',
      items: [
        {
          title: 'Auth',
          titleKey: 'auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In',
              titleKey: 'signIn',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              titleKey: 'signIn2Col',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              titleKey: 'signUp',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              titleKey: 'forgotPassword',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              titleKey: 'otp',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          titleKey: 'errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              titleKey: 'unauthorized',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              titleKey: 'forbidden',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              titleKey: 'notFound',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              titleKey: 'internalServerError',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              titleKey: 'maintenanceError',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      titleKey: 'other',
      items: [
        {
          title: 'Settings',
          titleKey: 'settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              titleKey: 'profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              titleKey: 'account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              titleKey: 'appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              titleKey: 'notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              titleKey: 'display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          titleKey: 'helpCenter',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
