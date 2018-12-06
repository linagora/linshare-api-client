#!/bin/bash

set -o errexit -o nounset

version=$1
remote=${2:-origin}

git checkout master

sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" package.json
sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" bower.json

git add package.json bower.json
git commit -m "Bump version number to ${version}"

# for Bower distribution
git checkout -b release-v$version
sed -i -E "/dist\//d" .gitignore
npm run dist
git add dist -f
git commit --amend --no-edit
git tag v$version
git push $remote refs/tags/v${version}
npm publish
git checkout .gitignore

git checkout master
git push $remote master
