# `Makefile` for LuQS frontend

SHELL := /bin/bash

export BASE := $(shell /bin/pwd)
export PATH := $(shell echo $$PATH):$(BASE)/node_modules/.bin

NODE_VERSION := 10

.DEFAULT_GOAL := yarn.install


# local
# -----

.PHONY: yarn.install
yarn.install: var node_modules/.bin/yarn
	source "$$NVM_DIR/nvm.sh"; nvm use $(NODE_VERSION); \
		nvm exec $(NODE_VERSION) node_modules/.bin/yarn install

.PHONY: dev.run
dev.run:
	yarn run dev



node_modules/.bin/yarn:
	source "$$NVM_DIR/nvm.sh"; nvm use $(NODE_VERSION); \
		npm install --no-package-lock yarn@latest



# Clean
# -----

var:
	mkdir -p "$(BASE)/var"

.PHONY: clean
clean:
	rm -rf "$(BASE)/dist" "$(BASE)/node_modules"


# Dockerized
# ----------

