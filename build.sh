# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "production" ]; then
  echo "No production!"

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  echo "No staging!"

else
  echo "No building!"
  
fi