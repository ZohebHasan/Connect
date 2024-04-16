# Compiler settings - Can change based on your setup
CXX = g++
CXXFLAGS = -std=c++11 -I/usr/local/include -L/usr/local/lib
LDFLAGS = -lcryptopp

# Your program's name (executable output)
PROGRAM = encryptionProgram

# Source files
SOURCES = encrypt.cpp
OBJECTS = $(SOURCES:.cpp=.o)

# Default target
all: $(PROGRAM)

# Link the program
$(PROGRAM): $(OBJECTS)
	$(CXX) $(CXXFLAGS) -o $(PROGRAM) $(OBJECTS) $(LDFLAGS)

# Compile source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean build files
clean:
	rm -f $(PROGRAM) $(OBJECTS)
