---
title: Understanding Permission-Based Access Control in Frontend Applications
description: How I implemented a flexible permission system using Pinia to control access to pages, links, and actions across an application.
date: 2026-06-11
image: https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg
minRead: 4
author: Saeed
name: Saeed
avatar:
src: 
alt: article image
---

<!-- ---
title: Understanding Permission-Based Access Control in Frontend Applications
description: How I implemented a flexible permission system using Pinia to control access to pages, links, and actions across an application.
date: 2026-06-11
image: https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg
minRead: 4
author:
name: Saeed
avatar:
src: https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop
alt: Saeed
--- -->

One of the most common requirements in business applications is controlling what users can see and do based on their role. Administrators, managers, and regular users often have different levels of access, which means certain pages, buttons, or navigation links must be restricted.

To solve this, I implemented a permission-based access control system using Pinia. Every authenticated user receives a list of permissions from the backend, and those permissions are used throughout the application to determine what they can access.

The foundation of the system is a simple helper function:

```ts
const canAccess = (rule: string): boolean => {
  return userPermissions.value?.includes(rule) || false;
};
```

This method lives inside the authentication store and checks whether a specific permission exists in the user's permission list. It returns a boolean value that can be used anywhere in the application.

For scenarios where multiple permissions can grant access to the same feature, I created another helper:

```ts
const canAccessMany = (rules: string[]): boolean => {
  const permissions = userPermissions.value;

  if (permissions && permissions.length > 0) {
    return rules.some((rule) => permissions.includes(rule));
  }

  return false;
};
```

Instead of checking a single permission, this method verifies whether the user owns at least one permission from a list of permissions.

The permission system is divided into three main categories:

## Actions

Actions control access to interactive elements such as buttons, forms, dropdown options, and other user operations.

For example, a user may be able to view a customer but not edit or delete them. In that case, the Edit and Delete buttons would only be rendered if the required permission exists.

## Links

Links control visibility inside navigation menus and sidebars.

A user without the required permission should not see links that lead to restricted areas of the application. This keeps the interface clean and prevents confusion by only displaying features that are relevant to that user's role.

## Pages (Middleware)

Hiding links alone is not enough.

Even if a link is removed from the navigation menu, users can still manually type a URL into the browser. To prevent unauthorized access, permissions must also be validated at the routing level.

This is typically handled through middleware that runs before a page is loaded. If the required permission is missing, the user can be redirected to an unauthorized page or another safe location within the application.

By combining action-level checks, navigation-level checks, and middleware protection, the application remains secure while providing a tailored experience for each user role. This approach keeps permission logic centralized, reusable, and easy to maintain as the application grows.

