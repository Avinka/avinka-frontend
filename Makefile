# `Makefile` for LuQS frontend

SHELL := /bin/bash

export BASE := $(shell /bin/pwd)
export PATH := $(shell echo $$PATH):$(BASE)/node_modules/.bin

NODE_VERSION := 10

.DEFAULT_GOAL := yarn.install


# local
# -----

.PHONY: dev.run
dev.run: ## Run the development server
	yarn run dev

.PHONY: yarn.install
yarn.install: var node_modules/.bin/yarn  ## Install all dependencies
	source "$$NVM_DIR/nvm.sh"; nvm use $(NODE_VERSION); \
		nvm exec $(NODE_VERSION) node_modules/.bin/yarn install


node_modules/.bin/yarn:
	source "$$NVM_DIR/nvm.sh"; nvm use $(NODE_VERSION); \
		npm install --no-package-lock yarn@latest

# Absolutely awesome: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[\.a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; \
			{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


# Clean
# -----

var:
	mkdir -p "$(BASE)/var"

.PHONY: clean
clean:
	rm -rf "$(BASE)/dist" "$(BASE)/node_modules"


# Dockerized
# ----------

