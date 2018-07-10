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

.DEFAULT_GOAL := build


.PHONY: build
build:
	$(VIRTUALENV) $(BASE)/.venv
	$(PIP) install --upgrade pip setuptools
	$(PIP) \
		--isolated \
		--disable-pip-version-check \
		install -r requirements.txt

