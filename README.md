# traininglog

## Steps done

``` bash
vue create training
cd training
vue add vuetify
vue add electron-builder
```

## Project setup

``` bash
npm install
```

### Compiles and hot-reloads for development

``` bash
npm run serve
```

### Compiles and hot-reloads for development in Electron

``` bash
npm run electron:serve
```

### Compiles and minifies for production

``` bash
npm run build
```

### Compiles and minifies for production in Electron

``` bash
npm run electron:build
```

### Run your tests

``` bash
npm run test
```

### Lints and fixes files

``` bash
npm run lint
```

### Run your end-to-end tests

``` bash
npm run test:e2e
```

### Run your unit tests

``` bash
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## For Firebase Cloud Functions

Install firebase-tools:

``` bash
npm i -g firebase-tools
```

### Init a project here

1. Login

    ``` bash
    firebase login
    ```

2. Init

    ``` bash
    firebase init functions
    ```

### Deploy the function

``` bash
firebase deploy --only functions
```

## Deploy (and free hosting) with Surge.sh

1. Register a domain - for instance with FreeNom - traininglog.ml

2. Install surge (for static sites only)

    ``` bash
    npm i -g surge
    ```

3. Deploy to traininglog.ml

    ``` bash
    surge ./dist traininglog.ml
    ```

4. Point the domain to the surge hosting IP - 45.55.110.124