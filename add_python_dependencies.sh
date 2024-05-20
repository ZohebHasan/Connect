#!/bin/bash

# Check if the user provided at least one package name
if [ $# -eq 0 ]; then
  echo "Usage: $0 <package_name1> <package_name2> ... <package_nameN>"
  exit 1
fi

# Activate your virtual environment
source env/bin/activate

# Install package(s) passed as arguments to the script
pip install "$@"

# Update requirements.txt file
pip freeze > requirements.txt


