#!/bin/bash


# Javascript

# Install new dependencies from package.json
npm install

# Optionally, update all packages to the latest version 
npm update


# Python

# Activate your virtual environment
source venv/bin/activate

# Install or update dependencies from requirements.txt
pip install -r dependencies/requirements.txt


# C++

# Install C++ requirements
sudo apt-get install -y $(cat dependencies/cpprequirements.txt)
