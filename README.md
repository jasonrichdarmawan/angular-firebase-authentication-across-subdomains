# How to do manual deployment

Note: GitHub Actions will do automatic deployment when there is a change in specific folder.

For example, if there is a new commit on folder `projects/account`, it will re-deploy the account site.

## Account

1. build with `$ npx ng build --project account`
2. deploy with `$ npx firebase-tools deploy --only hosting:account`

## Experiences

1. build with `$ npx ng build --project experiences`
2. deploy with `$ npx firebase-tools deploy --only hosting:experiences`

## Checkout

1. build with `$ npx ng build --project checkout`
2. deploy with `$ npx firebase-tools deploy --only hosting:checkout`

# AngularFirebaseAuthenticationAcrossSubdomains

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
