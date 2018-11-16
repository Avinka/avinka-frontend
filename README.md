# Avinka Server

## Prerequisites

### MacOS

* Install brew dependencies

  ```bash
  brew install jq pv pigz
  ```

* Uninstall all non-`nvm` NodeJS installations and `nvm` installs from `brew` as those installations
  are unsupported.

  ```bash
  brew uninstall --force node node@10 nvm
  ```

* [Install `nvm`](https://github.com/creationix/nvm#install-script)

* Install the current projects NodeJS version

  ```bash
  nvm install 10
  ```

## Build and Run

First, start the backend services

```bash
docker login registry.gitlab.com

docker-compose pull
docker-compose up
```

Create testdata

```bash
cd testdata
make build reset_indexes generate
```

Then our frontend application

```bash
make 
make dev.run
```

### Production Build Locally

We can create a production build and test this via a Docker container locally. This 
works by calling `make prod.run`.

## Create Testdata

```bash
cd testdata
make build generate 
```

## Create a tag and push it to the remote repository
```
yarn version $VERSION
git push origin $VERSION
```


## Links

- [The most promising charting lib](https://github.com/apache/incubator-echarts) IMO
- [Where i chose](https://github.com/vuejs/awesome-vue#charts) the charting library from
- Echarts [showcase](https://ecomfe.github.io/echarts-examples/public/index.html)
  - [Vue-echarts-v3](https://github.com/xlsdg/vue-echarts-v3)
