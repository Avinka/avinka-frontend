SHELL := /bin/bash
export PYTHONUNBUFFERED := 1
export BASE := $(shell /bin/pwd)

PYTHON := $(shell /usr/bin/which python{3.6,3.7})

ifneq (,$(findstring 3.6,$(PYTHON)))
    PY_VERSION := 3.6
endif
ifneq (,$(findstring 3.7,$(PYTHON)))
    PY_VERSION := 3.7
endif

PYTHON := $(shell /usr/bin/which python$(PY_VERSION))
VIRTUALENV := $(PYTHON) -m venv
PIP := $(BASE)/.venv/bin/pip

.DEFAULT_GOAL := help

ITEM_NO=1


.PHONY: build
build: ## Install all required packages to run
	$(VIRTUALENV) $(BASE)/.venv
	$(PIP) install --upgrade pip setuptools
	$(PIP) \
		--isolated \
		--disable-pip-version-check \
		install -r requirements.txt

generate: ## generates testdata to our local elasticsearch
	$(BASE)/.venv/bin/python$(PY_VERSION) es_test_data.py \
		--count=$(ITEM_NO) \
		--index_name=actor \
		--format=id:str,name:str,age:int,last_updated:ts
	$(BASE)/.venv/bin/python$(PY_VERSION) es_test_data.py \
		--count=$(ITEM_NO) \
		--index_name=verb \
		--format=id:str,name:str,last_updated:ts
	$(BASE)/.venv/bin/python$(PY_VERSION) es_test_data.py \
		--count=$(ITEM_NO) \
		--index_name=object \
		--format=id:str,name:str,last_updated:ts

view: ## display the indexes and load all contents
	curl -is 'localhost:9200/_cat/indices?v'
	@./list.sh actor | jq
	@./list.sh verb | jq
	@./list.sh object | jq

reset_indexes: ## drop and re-create indexes with mappings about basic properties
	@./index.sh actor
	@./index.sh verb
	@./index.sh object


# Absolutely awesome: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[\.a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; \
			{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

