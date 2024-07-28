# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "production" ]; then
  echo "0"

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  echo "1"

else
  echo "2"
  
fi