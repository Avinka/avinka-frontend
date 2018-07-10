# LuQS

## Prerequisites

### MacOS

* Install brew dependencies

  ```bash
  brew install icu4c pv pigz
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

## Links

- [The most promising charting lib](https://github.com/apache/incubator-echarts) IMO
- [Where i chose](https://github.com/vuejs/awesome-vue#charts) the charting library from
