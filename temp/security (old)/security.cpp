#include "header/security.h"

//
// Main Functions
//

std::string readFile(const std::string& fileName) {
    std::ifstream file(fileName);
    std::string str((std::istreambuf_iterator<char>(file)),
                    std::istreambuf_iterator<char>());
    return str;
}

//
// Helper Functions
//

void convertJsxToJson(const std::string command) {
    if (std::system(command.c_str()) != 0) {
        std::cerr << "Failed to execute the conversion script." << std::endl;
        exit(1);
    }
    std::cout << "JSX to JSON conversion completed successfully." << std::endl;
}

json parseJsonFile(const std::string& filePath) {
    std::string fileContents = readFile(filePath);
    return json::parse(fileContents);
}

void deleteJsonFile(const std::string& filePath) {
    if (std::remove(filePath.c_str()) != 0) {
        std::cerr << "Error deleting file: " << filePath << std::endl;
    } else {
        std::cout << "File deleted successfully: " << filePath << std::endl;
    }
}
