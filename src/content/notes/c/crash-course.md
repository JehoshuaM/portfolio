---
title: C Crash Course for Absolute Beginners
tags: [c, beginner, introduction, crash-course]
level: beginner
---

# C Crash Course for Absolute Beginners

## Executive Summary

This crash course is built for absolute beginners who need to learn C. It starts from zero, explains what C is, how to install a compiler, how to write and run your first program, and then walks through the core pieces that show up in exams: variables, data types, operators, conditions, loops, arrays, strings, functions, pointers, structures, and file handling. Every section keeps the vibe simple: what the symbol means, how the code works, what output to expect, and what usually goes wrong. You will see tiny examples, quick checks, and exam-style practice. The goal is not to turn you into a wizard overnight. The goal is to make C stop looking like a brick wall.

## Table of Contents

1. [What C Is](#1-what-c-is)
2. [Setting Up a C Compiler](#2-setting-up-a-c-compiler)
3. [Your First Program](#3-your-first-program)
4. [Syntax, Semicolons, and Braces](#4-syntax-semicolons-and-braces)
5. [Variables and Data Types](#5-variables-and-data-types)
6. [Input and Output](#6-input-and-output)
7. [Operators](#7-operators)
8. [Decision Making](#8-decision-making)
9. [Loops](#9-loops)
10. [Arrays](#10-arrays)
11. [Strings](#11-strings)
12. [Functions](#12-functions)
13. [Scope and Storage](#13-scope-and-storage)
14. [Pointers](#14-pointers)
15. [Structures and Unions](#15-structures-and-unions)
16. [Dynamic Memory](#16-dynamic-memory)
17. [Files](#17-files)
18. [Common Errors and Debugging](#18-common-errors-and-debugging)
19. [TL;DR Cheat Sheet](#19-tldr-cheat-sheet)
20. [Mini-Exam Questions](#20-mini-exam-questions)
21. [Sources](#21-sources)


## 1. What C Is

C is a general-purpose programming language that has been around for a long time and still shows up everywhere. It is fast, compact, and close to the machine. That makes it powerful, but also a little picky. Think of C like a clean kitchen knife. It is sharp, useful, and respected by serious cooks. It is also not forgiving if you wave it around with no plan. C is compiled, which means you do not usually run it line by line like Python. You write source code, compile it into an executable, then run that executable. The compiler is the middleman that checks your code and turns it into machine-friendly instructions.

Why people learn C:
- It teaches how computers actually handle memory.
- It builds strong logic for interviews and exams.
- It is the parent language of many modern systems tools.
- It makes later languages feel easier.

What C is not:
- Not the friendliest first language for pure beginners.
- Not the place to hide sloppiness.
- Not magic. If your code is broken, C will tell you in the most direct way possible.

A tiny C program looks like this:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

That single program already shows the core shape of C:
- `#include` brings in library code.
- `main()` is where execution starts.
- `{}` wraps a block of code.
- `printf()` prints text.
- `return 0;` says the program ended successfully.

If C had a personality, it would be: “Say exactly what you mean, or I will complain.”

Quick check:
- Compiled language? Yes.
- Sensitive to syntax? Very much.
- Good for learning fundamentals? YES.


## 2. Setting Up a C Compiler

Before you can run C code, you need a compiler. The compiler is the tool that turns `.c` files into programs your computer can execute.

Common compiler names:
- [GCC](https://gcc.gnu.org/install/?utm_source=jehoshua.me)
- [Clang](https://releases.llvm.org/?utm_source=jehoshua.me)
- [MSVC on Windows](https://visualstudio.microsoft.com/downloads/?utm_source=jehoshua.me)

The exact setup depends on your system, but the idea is always the same:
1. Install a compiler.
2. Verify it works.
3. Use a terminal to compile and run files.

On Linux or macOS, `gcc --version` or `clang --version` usually tells you whether a compiler is installed.

On Windows, many beginners use:
- MinGW-w64
- MSYS2
- Visual Studio Build Tools
- WSL with GCC inside Linux

A typical compile command with GCC looks like this:

```bash
gcc hello.c -o hello
```

That means:
- `gcc` is the compiler
- `hello.c` is the source file
- `-o hello` chooses the output program name

Then run it:

```bash
./hello
```

On Windows, you may run:
- `hello.exe`
- or just `hello` depending on the shell

What to check if things fail:
- Did you install the compiler correctly?
- Is the terminal finding `gcc`?
- Did you save the file with `.c` extension?
- Did you spell the filename correctly?
- Are you in the right folder?

Common beginner mistake:
- Writing the C code correctly but forgetting to compile it.

Another one:
- Typing code into a text editor and expecting it to run by itself.
C files need to be compiled and executed.

Mini task:
- Install a compiler.
- Open a terminal.
- Run the version command.
- Write down the output.
- If the compiler is missing, fix that before moving on.


## 3. Your First Program

This is the classic starter program. It prints a message and proves that your setup works.

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

Let us break it down line by line.

`#include <stdio.h>`
- `#include` is a preprocessor directive.
- `<stdio.h>` is the standard input/output header.
- It gives you access to `printf()`.

`int main(void)`
- `main` is the entry point.
- `int` means the function returns an integer.
- `(void)` means it takes no arguments.

`{`
- Starts the body of the function.

`printf("Hello, world!\n");`
- Prints text to the screen.
- `\n` means newline.
- The semicolon ends the statement.

`return 0;`
- Ends the program.
- `0` usually means success.

`}`
- Ends the function body.

Expected output:

```text
Hello, world!
```

Why the `\n` matters:
- Without it, the cursor stays on the same line.
- With it, output moves to the next line.

Try these edits:
- Change the message.
- Print two lines.
- Remove `\n` and see what changes.
- Remove the semicolon and watch the compiler get annoyed.

Common mistakes:
- Forgetting `#include <stdio.h>`
- Misspelling `printf`
- Using curly quotes instead of normal quotes
- Forgetting the semicolon
- Putting code outside `main` by accident

The first program is tiny, but it teaches the whole pipeline:
write, compile, run, observe.
That loop is the whole game.


## 4. Syntax, Semicolons, and Braces

C is strict about punctuation, like one wrong move and the complier starts yelling at you.

Important symbols:
- `;` ends a statement
- `{}` group a block
- `()` hold function parameters and conditions
- `""` make strings
- `#` starts a preprocessor directive
- `//` makes a single-line comment
- `/* ... */` makes a multi-line comment

Example:

```c
#include <stdio.h>

int main(void) {
    int age = 15;
    printf("Age: %d\n", age);
    return 0;
}
```

What the punctuation does:
- `int age = 15;` is one statement.
- `{ ... }` keeps the function body together.
- `printf("Age: %d\n", age);` uses a format placeholder.
- `return 0;` finishes the function.

Comments:

```c
// This is a single-line comment

/*
   This is a
   multi-line comment
*/
```

Comments are ignored by the compiler. They are for humans, not the machine.

Common mistakes:
- Forgetting semicolons
- Forgetting braces around blocks
- Writing `if (x > 3)` and then forgetting the braces for multiple lines
- Using an assignment `=` when you meant comparison `==`

Read this rule twice:
- A semicolon ends a statement.
- A brace block groups statements.
If you mix them up, the compiler gets cranky.

Tiny drill:
- Write a program with one comment.
- Add a second `printf`.
- Remove one semicolon and see what error appears.
- Put the braces on the wrong line and learn the compiler’s mood.


## 5. Variables and Data Types

A variable is a named storage spot. It holds a value that can change while the program runs.

In C, you must usually declare a variable before using it.

Example:

```c
int age = 15;
float score = 98.5f;
char grade = 'A';
```

What each type means:
- `int` stores whole numbers
- `float` stores decimal numbers
- `char` stores a single character
- `double` stores bigger decimal precision
- `_Bool` stores true or false values

Common beginner-friendly types:

| Type | Example | Meaning |
|---|---:|---|
| `int` | `42` | Whole number |
| `float` | `3.14f` | Decimal number |
| `double` | `3.14159` | More precise decimal |
| `char` | `'A'` | One character |
| `_Bool` | `1` or `0` | Boolean value |

Notes:
- `char` uses single quotes.
- Strings use double quotes, but strings are handled differently from single characters.
- `float` often uses an `f` suffix.
- `double` is often the default type for decimal literals like `2.5`.

Example program:

```c
#include <stdio.h>

int main(void) {
    int age = 15;
    float height = 5.6f;
    char initial = 'J';

    printf("Age: %d\n", age);
    printf("Height: %.1f\n", height);
    printf("Initial: %c\n", initial);

    return 0;
}
```

Format placeholders:
- `%d` for `int`
- `%f` for floating-point
- `%c` for `char`
- `%s` for strings

Common mistakes:
- Using `"` instead of `'` for a char
- Forgetting the `f` in a float literal
- Printing an `int` with `%f`
- Printing a `char` with `%d` when you wanted the character itself

Memory-ish idea:
- A variable is like a labeled box.
- The type says what kind of thing the box is allowed to hold.

Quick check:
- `15` is what type?
- `'A'` is what type?
- `3.14` is what type?
- `1` and `0` can stand in for what concept?


## 6. Input and Output

C uses functions for input and output.

The two most famous beginner functions:
- `printf()` for output
- `scanf()` for input

`printf()` example:

```c
printf("Hello, world!\n");
```

`scanf()` example:

```c
int age;
scanf("%d", &age);
```

That `&` is very important. It means “give me the address of this variable.”
For now, think of it like pointing to the box instead of copying the box.

Full example:

```c
#include <stdio.h>

int main(void) {
    int age;

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("You entered %d\n", age);

    return 0;
}
```

What happens here:
- The program asks for input.
- The user types a number.
- `scanf()` reads it into `age`.
- `printf()` shows it back.

If you type `15`, output becomes:

```text
Enter your age: 15
You entered 15
```

Common mistakes:
- Forgetting `&` in `scanf()` for non-array variables
- Using the wrong format specifier
- Expecting `scanf()` to read text into an `int`
- Forgetting that input stays in the buffer sometimes
- Mixing `scanf()` and `fgets()` without understanding leftovers

Safer beginner tip:
- `fgets()` is often better for reading lines of text.
- `scanf()` is fine for basic exam work and small numeric inputs.

Tiny practice:
- Ask for a number.
- Ask for a second number.
- Print their sum.
- Try using `%f` for decimal input.


## 7. Operators

Operators are symbols that do work on values. They are the little machines inside your code.

Main groups:
- Arithmetic operators
- Relational operators
- Logical operators
- Assignment operators
- Increment and decrement

Arithmetic:

```c
a + b
a - b
a * b
a / b
a % b
```

Meaning:
- `+` add
- `-` subtract
- `*` multiply
- `/` divide
- `%` remainder

Example:

```c
int a = 7;
int b = 3;

printf("%d\n", a + b);  // 10
printf("%d\n", a - b);  // 4
printf("%d\n", a * b);  // 21
printf("%d\n", a / b);  // 2
printf("%d\n", a % b);  // 1
```

Relational operators:
- `==` equal to
- `!=` not equal to
- `<` less than
- `>` greater than
- `<=` less than or equal to
- `>=` greater than or equal to

Logical operators:
- `&&` and
- `||` or
- `!` not

Examples:

```c
if (age >= 18 && age <= 60) {
    printf("Eligible\n");
}
```

Assignment operators:
- `=` simple assignment
- `+=` add and assign
- `-=` subtract and assign
- `*=` multiply and assign
- `/=` divide and assign
- `%=` remainder and assign

Example:

```c
int x = 5;
x += 2;   // now x is 7
x *= 3;   // now x is 21
```

Common mistakes:
- Using `=`, not `==`
- Thinking `/` on two integers gives a decimal
- Forgetting that `%` works only with integers
- Messing up operator precedence
- Overusing clever expressions when plain code is clearer

Operator precedence, in plain English:
- Multiplication and division happen before addition and subtraction.
- Parentheses can force the order you want.

Example:

```c
printf("%d\n", 2 + 3 * 4);    // 14
printf("%d\n", (2 + 3) * 4);  // 20
```

Quick check:
- What does `10 % 3` give?
- What does `5 + 2 * 3` give?
- What does `!(1 == 1)` give?


## 8. Decision Making

Conditions let your program choose between paths.

The basic shape:

```c
if (condition) {
    // run this if true
} else {
    // run this if false
}
```

Example:

```c
int score = 82;

if (score >= 50) {
    printf("Pass\n");
} else {
    printf("Fail\n");
}
```

Output:
- `Pass`

Using `else if`:

```c
int marks = 75;

if (marks >= 90) {
    printf("A\n");
} else if (marks >= 75) {
    printf("B\n");
} else if (marks >= 60) {
    printf("C\n");
} else {
    printf("Needs work\n");
}
```

Important syntax:
- `if` needs parentheses around the condition.
- `{}` should wrap the block.
- A condition must be true or false.
- Use `==` for comparison, not `=`.

Example with nesting:

```c
int age = 20;

if (age >= 18) {
    if (age >= 21) {
        printf("Adult and old enough for some other rule\n");
    } else {
        printf("Adult\n");
    }
}
```

Common mistakes:
- Missing braces when the block has more than one line
- Writing `if (x = 5)` instead of `if (x == 5)`
- Using conditions that do not actually test what you think
- Making the branches too complicated

Exam habit:
- Read the condition first.
- Then trace the true branch.
- Then trace the false branch.
- Then check which statements actually run.


## 9. Loops

Loops repeat code without making you copy-paste like a maniac.

Two main kinds:
- `for`
- `while`

`for` loop example:

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", i);
}
```

Output:
```text
0
1
2
3
4
```

What the parts mean:
- `int i = 0` starts the counter
- `i < 5` is the condition
- `i++` increases `i` by 1 after each loop

`while` loop example:

```c
int i = 0;

while (i < 5) {
    printf("%d\n", i);
    i++;
}
```

This does the same thing as the `for` loop, but the setup and update are outside the loop header.

Useful loop tools:
- `break` exits the loop early
- `continue` skips to the next iteration

Example:

```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        continue;
    }
    printf("%d\n", i);
}
```

This prints every number from 1 to 10 except 5.

Infinite loop warning:
- If the condition never becomes false, the loop never ends.
- If you forget `i++` in a `while` loop, that is a classic trap.

Example of danger:

```c
while (1) {
    printf("This never stops\n");
}
```

That loop is intentionally endless.

Common mistakes:
- Off-by-one errors
- Wrong starting value
- Wrong stop condition
- Forgetting to update the counter
- Confusing `i < 5` with `i <= 5`

Quick check:
- How many times does `for (i = 0; i < 3; i++)` run?
- What does `break` do?
- What does `continue` do?


## 10. Arrays

An array stores multiple values of the same type in one chunk of memory.

Think of it like a row of lockers. Each locker has an index number.

Example:

```c
int nums[5] = {10, 20, 30, 40, 50};
```

This means:
- `nums` is the array name
- `[5]` means five elements
- `int` means each element is an integer

Access elements with indexes:
- `nums[0]` is `10`
- `nums[1]` is `20`
- `nums[4]` is `50`

Example program:

```c
#include <stdio.h>

int main(void) {
    int nums[5] = {10, 20, 30, 40, 50};

    printf("%d\n", nums[0]);
    printf("%d\n", nums[4]);

    return 0;
}
```

Output:
```text
10
50
```

Important:
- C arrays start at index 0.
- The last index is size minus 1.
- Going out of bounds is undefined behavior, which is a fancy way of saying “bad things may happen.”

Loop through an array:

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", nums[i]);
}
```

Common mistakes:
- Thinking the first item is at index 1
- Writing past the end of the array
- Forgetting the array size
- Trying to assign one array to another directly

Mini exercise:
- Make an array of 5 marks.
- Print them all.
- Add them up.
- Find the highest value.


## 11. Strings

In C, a string is an array of characters ending with a null character `\0`.

That means strings are not a built-in magical type in the same way they are in some newer languages. C handles them as character arrays.

Example:

```c
char name[] = "Ava";
```

This automatically includes the hidden `\0` at the end.

Another example:

```c
char word[] = {'C', 'o', 'd', 'e', '\0'};
```

Common string functions come from `<string.h>`:
- `strlen()`
- `strcpy()`
- `strcat()`
- `strcmp()`

Example:

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[20] = "Hi";
    printf("%zu\n", strlen(text));
    return 0;
}
```

String input with `fgets()`:

```c
char line[100];
fgets(line, sizeof(line), stdin);
```

Why beginners like `fgets()`:
- Safer for lines of text
- Reads spaces too
- Better than raw `%s` for full sentences

Example with printing a string:

```c
#include <stdio.h>

int main(void) {
    char message[] = "C is strict but fair";
    printf("%s\n", message);
    return 0;
}
```

Common mistakes:
- Forgetting strings need enough space for `\0`
- Using `scanf("%s", ...)` and expecting it to read spaces
- Mixing up a character `'A'` with the string `"A"`
- Forgetting that string functions often need `<string.h>`

Quick check:
- What is the null terminator?
- Why does `fgets()` matter?
- What does `%s` print?


## 12. Functions

Functions are reusable blocks of code. They help you avoid repetition and keep programs tidy.

Basic structure:

```c
return_type function_name(parameters) {
    // body
    return value;
}
```

Example:

```c
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int sum = add(3, 4);
    printf("%d\n", sum);
    return 0;
}
```

Output:
```text
7
```

Parts:
- `int add(int a, int b)` declares a function
- `a` and `b` are parameters
- `return a + b;` sends the result back
- `main()` calls `add(3, 4)`

Void function example:

```c
void greet(void) {
    printf("Hello\n");
}
```

This function does not return a value.

Why functions are useful:
- They reduce repetition
- They make testing easier
- They make code easier to read
- They break a big problem into small pieces

Common mistakes:
- Forgetting to declare the function before using it
- Forgetting a `return` in a non-void function
- Returning the wrong type
- Writing a giant `main()` with no structure

Function prototype example:

```c
int add(int a, int b);

int main(void) {
    printf("%d\n", add(2, 5));
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

That prototype is a promise to the compiler:
“This function exists later.”

Mini practice:
- Write a function that squares a number.
- Write a function that prints a name.
- Write a function that returns the bigger of two numbers.


## 13. Scope and Storage

Scope tells you where a variable can be seen.

Think of it like who can enter a room:
- Some variables live inside one block only
- Some live across the whole function
- Some are available across the entire file

Local variable example:

```c
int main(void) {
    int x = 10;
    printf("%d\n", x);
    return 0;
}
```

`x` exists inside `main()`.

Block scope example:

```c
if (1) {
    int y = 5;
    printf("%d\n", y);
}
```

`y` only exists inside that block.

Trying to use `y` outside the block would fail.

Global variable example:

```c
#include <stdio.h>

int score = 100;

void show(void) {
    printf("%d\n", score);
}

int main(void) {
    show();
    return 0;
}
```

Global variables can be accessed from multiple functions, but overusing them is messy.
Use them carefully.

Storage classes, in beginner terms:
- `auto` is the default for local variables
- `static` keeps a value between function calls
- `extern` refers to something defined elsewhere

Example of `static`:

```c
void count_calls(void) {
    static int count = 0;
    count++;
    printf("%d\n", count);
}
```

Each call remembers the previous value.

Common mistakes:
- Using a variable outside its scope
- Overusing globals
- Assuming a local variable keeps its value automatically
- Confusing scope with lifetime

Quick check:
- Where does a block-scoped variable live?
- What does `static` change?
- Why are globals risky?


## 14. Pointers

Pointers are the part where C stops pretending to be cute.

A pointer stores the address of another variable.

Imagine a house:
- The variable is the house
- The pointer is the address written on a card

Example:

```c
int x = 10;
int *p = &x;
```

What the symbols mean:
- `int *p` says `p` is a pointer to int
- `&x` means “address of x”
- `*p` means “value at the address stored in p”

Example program:

```c
#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;

    printf("%d\n", x);
    printf("%p\n", (void *)p);
    printf("%d\n", *p);

    return 0;
}
```

This shows:
- the value of `x`
- the address stored in `p`
- the value pointed to by `p`

Pointer update example:

```c
int x = 10;
int *p = &x;
*p = 25;
```

Now `x` becomes `25`.
That is the whole point of dereferencing: you can change the original value.

Why pointers matter:
- They let functions modify variables directly
- They are used in arrays and strings
- They are essential for dynamic memory
- They appear everywhere in real C code

Common mistakes:
- Forgetting the `*` in declaration
- Using `*p` when `p` was never assigned
- Dereferencing a null pointer
- Mixing up `&` and `*`
- Thinking a pointer is the same as the value it points to

Tiny rule:
- `&` gets an address
- `*` gets the value at an address

Practice:
- Make a variable and a pointer to it.
- Print the address.
- Change the value through the pointer.


## 15. Structures and Unions

Structures let you group different types together into one custom record.

Imagine a student card:
- name
- age
- marks

A struct can store that as one unit.

Example:

```c
struct Student {
    char name[20];
    int age;
    float marks;
};
```

Using a struct:

```c
#include <stdio.h>

struct Student {
    char name[20];
    int age;
    float marks;
};

int main(void) {
    struct Student s1 = {"Mia", 16, 91.5f};

    printf("%s\n", s1.name);
    printf("%d\n", s1.age);
    printf("%.1f\n", s1.marks);

    return 0;
}
```

Why structs are useful:
- They keep related data together
- They make code clearer
- They are common in menus, records, and data models

Access member using dot:
- `s1.name`
- `s1.age`
- `s1.marks`

Pointers to structs use arrow:
- `ptr->name`
- `ptr->age`

Example:

```c
struct Student *ptr = &s1;
printf("%d\n", ptr->age);
```

Unions are similar to structs, but their members share the same memory.
That means only one member is meaningfully active at a time.

Basic union example:

```c
union Data {
    int i;
    float f;
    char c;
};
```

Beginner note:
- Use structs first.
- Unions are more specialized.
- Exams may ask the definition, but structs are what you will actually use more often.

Common mistakes:
- Forgetting `struct` keyword when declaring variables
- Using `.` when you need `->`
- Assuming union members all store separate memory
- Leaving struct fields uninitialized and expecting magic

Quick check:
- What does `.` do?
- What does `->` do?
- Why is a struct different from an array?


## 16. Dynamic Memory

Dynamic memory means asking the program for memory while it is running.

This is done with:
- `malloc()`
- `calloc()`
- `realloc()`
- `free()`

Include:
- `<stdlib.h>`

Example with `malloc()`:

```c
int *arr = malloc(5 * sizeof(int));
```

This asks for space for 5 integers.

Safer version:

```c
#include <stdlib.h>
#include <stdio.h>

int main(void) {
    int *arr = malloc(5 * sizeof(int));

    if (arr == NULL) {
        printf("Allocation failed\n");
        return 1;
    }

    arr[0] = 10;
    arr[1] = 20;

    printf("%d\n", arr[0]);
    printf("%d\n", arr[1]);

    free(arr);
    return 0;
}
```

Important rules:
- Check whether allocation failed.
- Use the memory.
- Free it when done.
- Do not use it after `free()`.

`calloc()`:
- Like `malloc()`, but initializes memory to zero.

`realloc()`:
- Changes the size of an existing allocation.

Common mistakes:
- Forgetting `free()`
- Using the wrong `sizeof`
- Writing past the allocated space
- Losing the original pointer and leaking memory
- Using freed memory

Memory leak, plain English:
- You asked for memory and never gave it back.
- Enough leaks and your program becomes a hoarder.

Practice:
- Allocate space for 3 integers.
- Store values.
- Print them.
- Free the memory.


## 17. Files

Files let your program save and load data.

Common file functions:
- `fopen()`
- `fclose()`
- `fprintf()`
- `fscanf()`
- `fgets()`

Include:
- `<stdio.h>`

Open a file:

```c
FILE *fp = fopen("data.txt", "r");
```

Modes:
- `"r"` read
- `"w"` write
- `"a"` append
- `"r+"` read and write
- `"w+"` write and read
- `"a+"` append and read

Example:

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("note.txt", "w");

    if (fp == NULL) {
        printf("Could not open file\n");
        return 1;
    }

    fprintf(fp, "Hello file!\n");
    fclose(fp);

    return 0;
}
```

Reading a file line:

```c
char line[100];
fgets(line, sizeof(line), fp);
```

Why files matter:
- Save exam scores
- Store user data
- Read configuration
- Write logs

Common mistakes:
- Forgetting to check `fopen()` result
- Forgetting `fclose()`
- Using the wrong mode
- Trying to read from a file opened only for writing
- Assuming file operations always succeed

Tiny drill:
- Create a file.
- Write one sentence.
- Close it.
- Open it again in read mode.
- Print the sentence.


## 18. Common Errors and Debugging

Every C beginner meets errors. That is not a sign of failure. That is the curriculum.

Common compiler errors:
- Missing semicolon
- Unknown identifier
- Mismatched braces
- Wrong format specifier
- Incompatible types

Common runtime problems:
- Division by zero
- Null pointer dereference
- Out-of-bounds array access
- Memory leaks
- Using uninitialized variables

Debugging habits:
- Read the first error first
- Do not panic-scroll through 20 errors
- Check the exact line number
- Remove one change at a time
- Print values to inspect them
- Make tiny test programs

Useful mental checklist:
- Did I include the right header?
- Did I declare the variable?
- Did I initialize it?
- Did I put `;` in the right place?
- Did I use the right format specifier?
- Did I stay inside the array size?

Example of a common bug:

```c
int x;
printf("%d\n", x);
```

`x` was never initialized, so the result is garbage.

Better:

```c
int x = 0;
printf("%d\n", x);
```

Debugging philosophy:
- Make the problem smaller.
- Prove each piece works.
- Then combine them.
C rewards patience more than confidence.

Another real tip:
- If the compiler is yelling, listen carefully.
- The message often tells you exactly what is wrong.
- The trick is learning to read the message without treating it like ancient prophecy.


## 19. TL;DR Cheat Sheet

### Core Shapes

- `#include <stdio.h>` brings in standard I/O.
- `int main(void)` starts the program.
- `{}` wraps a block.
- `;` ends a statement.
- `printf()` prints output.
- `scanf()` reads input.
- `return 0;` ends successfully.

### Data Types

- `int` = whole number
- `float` = decimal
- `double` = more precise decimal
- `char` = one character
- `char[]` = string
- `struct` = custom grouped data

### Operators

- `+ - * / %`
- `== != < > <= >=`
- `&& || !`
- `= += -= *= /= %=`

### Loops

- `for` for counted repetition
- `while` for condition-based repetition
- `break` exits early
- `continue` skips one iteration

### Pointers

- `&x` gets the address
- `*p` gets the value at the address
- `NULL` means no valid address

### Files

- `fopen()` open
- `fprintf()` write
- `fgets()` read
- `fclose()` close

### Exam Reminder

- Indentation matters for humans.
- Semicolons matter for C.
- `=` is assignment.
- `==` is comparison.
- Arrays start at index 0.
- Strings end with `\0`.
- Free dynamic memory when done.


## 20. Mini-Exam Questions

1. What does `#include <stdio.h>` do?
2. Why do we write `int main(void)` in a basic program?
3. What is the difference between `=` and `==`?
4. What is the output of `printf("%d\n", 5 % 2);`?
5. What is wrong with this code?

```c
int x = 5
if (x > 3) {
    printf("Big\n");
}
```

6. What does `&x` mean in `scanf("%d", &x);`?
7. What is the first index of an array in C?
8. What is the null terminator in a string?
9. What does `break` do in a loop?
10. What does `free()` do?

### Answer Notes

1. It brings in standard input/output functions.
2. It defines the entry point of the program.
3. `=` assigns, `==` compares.
4. It prints `1`.
5. The semicolon after `int x = 5` is missing.
6. It passes the address of `x` so `scanf()` can write into it.
7. Index `0`.
8. `\0`.
9. It stops the loop immediately.
10. It returns allocated memory to the system.


## 21. Sources
- The C Programming Language, Kernighan and Ritchie
- cppreference C documentation
- Standard library headers: `<stdio.h>`, `<stdlib.h>`, `<string.h>`
Study tip:
- Use this course like a notebook.
- That is where the learning sticks.
