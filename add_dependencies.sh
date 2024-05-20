#!/bin/bash

# Check if the user provided at least one package name
if [ $# -eq 0 ]; then
  echo "Usage: $0 <package_name1> <package_name2> ... <package_nameN>"
  exit 1
fi

# Loop through all the package names provided as arguments
for PACKAGE_NAME in "$@"
do
  # Install the package
  if sudo apt-get install -y "$PACKAGE_NAME"; then
    # Append the package name to cpprequirements.txt
    echo "$PACKAGE_NAME" >> debianrequirements.txt
    echo "$PACKAGE_NAME has been installed and added to cpprequirements.txt"
  else
    echo "Failed to install $PACKAGE_NAME"
  fi
done

