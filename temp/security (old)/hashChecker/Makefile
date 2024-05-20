# Compiler settings - Can change based on your setup
CXX = g++
CXXFLAGS = -std=c++11 -I/usr/local/include -L/usr/local/lib
LDFLAGS = -lcryptopp

# Directories
OBJDIR = object/
EXECDIR = exec/

# Your program's name (executable output)
PROGRAM = $(EXECDIR)hashCheckProgram

# Source files
SOURCES = hashCheckMain.cpp ../security.cpp
OBJECTS = $(SOURCES:.cpp=.o)
OBJECTS := $(addprefix $(OBJDIR),$(OBJECTS))

# Default target
all: $(PROGRAM)

# Link the program
$(PROGRAM): $(OBJECTS)
	$(CXX) $(CXXFLAGS) -o $(PROGRAM) $(OBJECTS) $(LDFLAGS)

# Compile source files into object files
$(OBJDIR)%.o: %.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean build files
clean:
	rm -f $(PROGRAM) $(OBJECTS)
	@rm -rf $(OBJDIR)