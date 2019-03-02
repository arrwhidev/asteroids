#!/bin/zsh

last_tag=$(git describe --tags)
last_version=$(echo ${last_tag} | cut -d"." -f2)
next_version=$((last_version+1))
next_tag="RELEASE/v0.${next_version}" 

git tag -a $next_tag -m "Tagging ${next_tag}"
git push --tags
echo "Released ${next_tag}"