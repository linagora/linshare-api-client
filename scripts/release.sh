#!/bin/bash

set -o errexit -o nounset

version=$1

git checkout master

sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" package.json
sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" bower.json

git add package.json bower.json
git commit -m "Bump version number to ${version}"

# for Bower distribution
git checkout -b release-v$version
npm run dist
git add dist -f
git commit --amend --no-edit
git tag v$version
git push origin refs/tags/v${version}

git checkout master
git push origin master
