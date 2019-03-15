# training


## Steps done:
```
vue create training
cd training
vue add vuetify
vue add electron-builder
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and hot-reloads for development in Electron
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production in Electron
```
npm run electron:build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## For Firebase Cloud Functions:
Install firebase-tools:
```
npm i -g firebase-tools
```

### Init a project here:
1.
```
firebase login
```
2.
```
firebase init fuctions
```

### Deploy the function:
```
firebase deploy --only functions
```


## Deploy (and free hosting) with Surge

1. Register a domain - for instance with FreeNom - traininglog.ml


2. Install surge (for static sites only)
```
npm i -g surge
```

3. Deploy to traininglog.ml
```
surge ./dist traininglog.ml
```

4. Point the domain to the surge hosting IP - 45.55.110.124