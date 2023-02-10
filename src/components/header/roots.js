export const userMenu = (orgName) => [
  { name: orgName, href: '#' },
  // { name: 'Billing', route: 'billing' },
  // { name: 'Users', route: 'users' },
  { name: 'Log out' },
]

export const navigation = [
  { name: 'Answers', route: 'answers' },
  { name: 'Questions', route: 'questions' },
  { name: 'Team', route: 'team' },
  // { name: 'Settings', route: 'settings' },
]

export const subNavigation = {
  answers: [{ name: 'Results', route: 'results' }],
  questions: [
    { name: 'Content', route: 'content' },
    { name: 'Schedule', route: 'schedule' },
  ],
  team: [{ name: 'Team management', route: 'team-management' }],
  // admin: [
  //   { name: 'Billing', route: 'billing' },
  //   { name: 'Users', route: 'users' },
  // ],
}
