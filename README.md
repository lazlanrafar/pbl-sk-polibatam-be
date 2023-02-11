## Template Express.js and Prisma

This Project would provide a set of tools and features that make it easy to build and deploy web applications and APIs using Express.js and Prisma.

### Folder Structure

```
├── app
│   ├── service
│   │   ├── service.controller
│   │   ├── service.middleware
│   │   ├── service.repository
│   │   └── service.route
│   └── (other service)
├── prisma
│   └── schema.prisma
├── routes
│   └── index.js
├── shared
│   └── (shared items)
└── utils
    └── (utils items)
```

### Format Name

<table width="100%">
    <tr>
        <th>Controller</th>
        <th>Repository</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Get</td>
        <td>Fetch</td>
        <td>refers to the process of retrieving data from the database.</td>
    </tr>
    <tr>
        <td>Create</td>
        <td>Store</td>
        <td>refers to the process of inserting new data into the database.</td>
    </tr>
    <tr>
        <td>Edit</td>
        <td>Update</td>
        <td>refers to the process of modifying existing data in the database.</td>
    </tr>
    <tr>
        <td>Delete</td>
        <td>Destroy</td>
        <td>refers to the process of removing data from the database.</td>
    </tr>
</table>

### Stack

- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [Prisma](https://www.prisma.io/express) - A open-source ORM that drastically simplifies data modeling, migrations, and data access for SQL databases in Node.js and TypeScript.
