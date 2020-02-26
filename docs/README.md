# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ aws s3 sync build/ s3://docs.strongsaltqa.com/
```

This command syncs the contents of the build directory to the QA s3 bucket

s3 endpoint can be viewed at http://docs.strongsaltqa.com.s3-website-us-east-1.amazonaws.com

remove "qa" for instructions above for production
