#!/bin/bash

set -o errexit -o nounset

version=$1

git checkout master

sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" package.json
sed -i -E "s/\"version\":.*?\,/\"version\": \"$version\",/g" bower.json

git add package.json bower.json
git commit -m "Bump version number to ${version}"
git push origin master

git tag v$version
git push origin refs/tags/v${version}
