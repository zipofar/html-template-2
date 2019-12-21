dev:
	npx webpack-dev-server

install:
	yarn install

compose: install dev

lint:
	npx eslint .

build:
	rm -rf ./docs
	NODE_ENV=production npx webpack

deploy: build lint
	git push origin master
