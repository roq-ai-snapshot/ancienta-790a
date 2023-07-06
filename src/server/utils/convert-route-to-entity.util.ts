const mapping: Record<string, string> = {
  comments: 'comment',
  favorites: 'favorite',
  organizations: 'organization',
  photos: 'photo',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
