export interface NavItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavSection {
  id: string;
  name: string;
  iconPath: string;
  href: string;
  description?: string;
  items: NavItem[];
}

export interface NavGroup {
  label: string;
  sections: NavSection[];
}

export const navigationData: NavGroup[] = [
  {
    label: 'Operations',
    sections: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        iconPath: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V5.83333C11.6667 6.29357 12.0398 6.66667 12.5 6.66667H16.6667C17.1269 6.66667 17.5 6.29357 17.5 5.83333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z" stroke="currentColor" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.6667 10H12.5C12.0398 10 11.6667 10.3731 11.6667 10.8333V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V10.8333C17.5 10.3731 17.1269 10 16.6667 10Z" stroke="currentColor" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 13.3333H3.33333C2.8731 13.3333 2.5 13.7064 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7064 7.96024 13.3333 7.5 13.3333Z" stroke="currentColor" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        href: '/dashboard',
        description: 'Overview of key metrics and system status',
        items: []
      },
      {
        id: 'transactions',
        name: 'Transactions',
        iconPath: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6666 14.1666L3.33328 14.1666" stroke="#033069" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.1666 11.6667C14.1666 11.6667 16.6666 13.5079 16.6666 14.1667C16.6666 14.8255 14.1666 16.6667 14.1666 16.6667" stroke="#033069" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.16661 5.83324L16.6666 5.83324" stroke="#033069" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83326 3.33333C5.83326 3.33333 3.33329 5.17455 3.33328 5.83335C3.33327 6.49215 5.83328 8.33333 5.83328 8.33333" stroke="#033069" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        href: '/transactions',
        description: 'Manage all transaction records',
        items: [
          { name: 'Passenger Transaction', href: '/transactions/passenger-transaction', description: 'Process passenger entry and exit through border control' },
          { name: 'Vehicle Transactions', href: '/transactions/vehicle-transactions', description: 'Process vehicle entry and exit through border control' },
          { name: 'Escalated Sessions', href: '/transactions/escalated-sessions', description: 'Review and resolve escalated transaction sessions' }
        ]
      }
    ]
  },

];
