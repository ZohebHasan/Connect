# Welcome to Connect!

## Requirements:

- A Linux operating system to ensure consistency among the developers for things like package/environment control
- Make sure you have NodeJS >= 18, Python >= 3, C++ >= 12

## Important Notes:

- Kamrul and Zoheb are the only ones that can push code from the `TestBranch` to the `main`. It's important that you pull and push from the `TestBranch` upon completing your task.
- Commenting your code is very underrated, and we ask all of you to do this as much as possible in the cases of bugs or just trying to understand your work.

## Dependencies:

### Automating the below process:
If you're lazy like me (chrig) and want to automate the dependencies, run the `dependencies.sh` file by doing:
```bash
./dependencies.sh
```
### C++:
To install the C++ dependencies, there will be a `cpprequirements.txt` file in the root directory of the Connect repository. To install, see below:
### Ubuntu (change based on what package manager you're using):
```bash
sudo apt-get install -y $(cat cpprequirements.txt)
```
### Javascript:
```bash
npm install
```
### Python:
```bash
pip install -r requirements.txt
```
