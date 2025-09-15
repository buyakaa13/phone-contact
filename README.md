[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/n9JPUTT8)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17968635)
## Final Project January 2025: Contacts Manager Application
Description: Create a contacts management app where users can store and manage their contacts. Use the Node filesystem to store contact details (name, phone, email, etc.) in JSON file.

## Features:
* Add, edit, and delete contacts. Store contacts in a JSON file using the Node filesystem.
  * Use the [`uuid`](https://www.npmjs.com/package/uuid) library to generate a unique `id`.
* View a list of all contacts with details.
* Add a feature to bookmark important contacts, that will always appear on top of the contacts list.
* Search contacts by name, implement a real-time search filter that updates the contact list as the user types (filter contacts at frontend).
* Create a fast-filter feature by the first letter of contact name, display all English alphabets on top, when clicked, filter the contacts accordingly.
* Enable users to export all contacts as `.vcf` files (vCard format) and download all exported `.vcf` files as a single compressed `.zip` file:
  * Use the [`vcf`](https://www.npmjs.com/package/vcf) library to create `.vcf` files.
  * Use the [`archiver`](https://www.npmjs.com/package/archiver) library to create `.zip` files.

## API Endpoints:
* `GET /contacts`: Fetch all contacts.
* `POST /contacts`: Add a new contact.
* `PATCH /contacts/:id`: Update an existing contact.
* `DELETE /contacts/:id`: Delete a contact.
* `GET /contacts/export`: Export all contacts as `.vcf` files, compress and download as a `.zip` file.

## File-Based Storage `contacts.json`:
```typescript
[
  {
    "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "name": "Asaad Saad",
    "phone": "123-456-7890",
    "email": "asaad@miu.edu",
    "bookmarked": false
  }
]
```

## Tech Stack: 
React for the frontend, Express for the backend, and Node filesystem for data persistence.
* Use React Router for navigation between pages.
* Leverage TailwindCSS for quick and responsive styling.
* Use Express API endpoints to handle CRUD operations and interact with the filesystem.
* Validate user inputs on both the frontend and backend to ensure data integrity. (Use [`Zod`](https://www.npmjs.com/package/zod))

<img src="images/ss.png" alt="Screenshot" width="300" />