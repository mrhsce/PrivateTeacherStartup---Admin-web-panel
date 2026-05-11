# Alefoba Admin Panel

An open-source Angular admin panel for a private-teacher marketplace concept: a platform that connects private teachers with students in a way similar to how Uber connects drivers with passengers.

This repository contains the **admin dashboard** used to manage the marketplace operations, including teachers, students, lessons, service requests, documents, and reports.

> Note: this project was originally built on top of the Akveo **ngx-admin** template and customized for the Alefoba use case.

## What this project does

Alefoba is designed to help an education marketplace operator manage the supply and demand side of tutoring:

- **Teachers** register or are onboarded into the platform
- **Students** are tracked and managed in the admin panel
- **Lessons** define the subject catalog and pricing factors
- **Requests** represent student requests that need to be matched with a teacher
- **Reports** capture issues or bug reports submitted from the platform
- **Documents** can be uploaded and managed for teachers

The UI is an administrative back office, not the public student/teacher app.

## Tech stack

- **Angular 8**
- **Nebular UI**
- **Bootstrap 4**
- **RxJS**
- **TypeScript**
- **Leaflet / Google Maps / ECharts / Chart.js** for map and chart features inherited from the base admin template

## Main features in this codebase

### Alefoba-specific modules

- `teachers` — list, edit, activate/deactivate, and ban teachers
- `students` — list and manage students
- `lessons` — manage lessons and levels
- `requests` — inspect student requests and assign or remove teachers manually
- `reports` — view bug reports and admin feedback

### Supporting platform features

- Authentication pages under `/auth`
- Dashboard and sample admin pages inherited from the ngx-admin template
- Theme/layout system based on Nebular
- Menu-driven navigation in Persian for the Alefoba admin workflow

## Project structure

Important folders and files:

- `src/app/app.module.ts` — root Angular module and global providers
- `src/app/app-routing.module.ts` — top-level routing and auth guards
- `src/app/auth/` — login flow
- `src/app/pages/` — authenticated application pages
- `src/app/pages/alefoba/` — Alefoba business modules
- `src/app/services/` — HTTP services used to talk to the backend API
- `src/app/entities/` — data models used by the admin panel
- `src/environments/` — environment configuration, including the API endpoint

## Application flow

The app has two main areas:

1. **Authentication area**
   - `/auth/login`
   - Uses Nebular auth components
   - Login submits credentials using a password-grant style request
   - Successful login stores user metadata in `localStorage`

2. **Admin pages area**
   - `/pages/*`
   - Protected by an auth guard
   - Contains teacher, student, lesson, request, and report management pages

## Business domain model

The key entities used by the panel are:

- `Teacher` — teacher profile and status data
- `Student` — student profile and status data
- `Lesson` — lesson catalog items
- `TeacherLesson` — teacher-to-lesson assignment plus level/factor information
- `Request` — a tutoring request, including student, teacher, lesson, address, price, duration, and status
- `Report` — issue/bug reports submitted from the platform
- `Document` — teacher documents and uploaded files
- `Enum` / `Level` — backend-driven lookup values

## API integration

This admin panel communicates with a backend API through Angular `HttpClient` services.

The current environment files point to:

```ts
http://94.184.176.163
```

Backend calls are made under routes such as:

- `/api/admin/getteachers`
- `/api/admin/getteacherlessons`
- `/api/admin/setteacherlessonlevel`
- `/api/admin/activateteacher`
- `/api/request/getrequests`
- `/api/document/upload/`
- `/api/bug/getbugs/`

### Important setup note

Before deploying or opening the project to the public, you should replace the hardcoded API host in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

with your own backend URL.

## Prerequisites

Because this is an Angular 8-era project, use a Node.js version compatible with Angular 8 and the package lock/dependencies in this repository. If you are starting fresh, test with an LTS version that still supports the older toolchain.

You will need:

- Node.js
- npm
- A running backend API for Alefoba

## Setup

### 1) Clone the repository

```bash
git clone <your-fork-or-repo-url>
cd alefoba-admin-panel-master
```

### 2) Install dependencies

```bash
npm install
```

If dependency installation fails because of the older Angular toolchain, try using a Node.js version compatible with Angular 8.

### 3) Configure the backend API

Edit the environment files:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Update `apiEndpoint` to the address of your backend.

Example:

```ts
export const environment = {
  production: false,
  apiEndpoint: 'https://api.your-domain.com',
};
```

### 4) Start the development server

```bash
npm start
```

The app is configured to run on:

```text
http://localhost:4000
```

### 5) Build for production

```bash
npm run build:prod
```

The production output is written to `dist/`.

### 6) Run tests

```bash
npm test
```

## Available npm scripts

From `package.json`:

- `npm start` — run the dev server
- `npm run build` — build the app
- `npm run build:prod` — production build
- `npm test` — run unit tests
- `npm run lint` — run linting
- `npm run e2e` — run end-to-end tests
- `npm run docs` — generate component documentation

## Routing summary

### Public/auth routes

- `/auth/login`

### Protected admin routes

- `/pages/teachers`
- `/pages/teacher/:id`
- `/pages/students`
- `/pages/student/:id`
- `/pages/lessons`
- `/pages/requests`
- `/pages/request/:id`
- `/pages/reports`
- `/pages/dashboard`
- `/pages/iot-dashboard`

Additional demo/template routes from ngx-admin also exist under sections like layout, forms, tables, charts, maps, and editors.

## Navigation menu

The admin sidebar is defined in `src/app/pages/pages-menu.ts` and includes Persian labels for the Alefoba workflow:

- مدیریت افراد — people management
- معلمان — teachers
- دانش‌آموزان — students
- دروس — lessons
- درخواست‌ها — requests
- گزارش‌ها — reports

The template also includes sample sections from ngx-admin such as charts, maps, editors, and tables.

## Contributing

Contributions are welcome. A good first set of improvements would be:

1. Move the API endpoint into environment variables or a deployment configuration file
2. Replace hardcoded credentials/legacy auth assumptions
3. Clean up template pages that are not part of the Alefoba product
4. Add more tests around the Alefoba-specific modules
5. Improve the English/Persian documentation for public use

## License

This repository currently uses the MIT license, as declared in `package.json`.
