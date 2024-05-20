#!/bin/bash


# Javascript



#Client Side

# Install new dependencies from package.json
npm -C client/ install

# Optionally, update all packages to the latest version 
npm update


#Server Side

# Install new dependencies from package.json
npm -C server/ install


# Optionally, update all packages to the latest version 
npm update


# Python

# Activate your virtual environment
source venv/bin/activate

# Install or update dependencies from requirements.txt
pip install -r requirements.txt


# Debian

# Install C++ requirements
# sudo apt-get install -y $(cat debianrequirements.txt)

