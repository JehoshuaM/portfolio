---
title: Bash Beginner Micro Course
tags: [bash, linux, terminal, beginner, introduction]
level: beginner
---

# Bash Beginner Micro Course

## Executive Summary  
This micro-course teaches the core Bash and Linux terminal commands every beginner should know. It focuses on how to navigate the filesystem, manage files and directories, read and edit text files, use permissions, and combine commands using pipes and redirects. Each concept is explained in simple terms with real terminal examples, common mistakes, and short exercises. The goal is not memorization but making the terminal feel like a controllable workspace instead of a scary black screen.

You’ll learn commands like `ls`, `cd`, `pwd`, `mkdir`, `rm`, `cp`, `mv`, `cat`, `grep`, `chmod`, and how to chain them like a pro using `|` and `>`.

## Table of Contents  
1. [Introduction](#1-introduction)  
2. [What is Bash?](#2-what-is-bash)  
3. [`pwd`, `ls`, `cd`](#3-pwd-ls-cd)  
4. [File Operations](#4-file-operations)  
5. [Reading Files](#5-reading-files)  
6. [Searching (`grep`)](#6-searching-grep)  
7. [Redirection & Pipes](#7-redirection--pipes)  
8. [Permissions (`chmod`)](#8-permissions-chmod)  
9. [Processes (`ps`, `top`, `kill`)](#9-processes-ps-top-kill)  
10. [TL;DR Cheat Sheet](#10-tldr-cheat-sheet)  
11. [Mini-Exam Questions](#11-mini-exam-questions)  
12. [Sources](#12-sources)  

---

## 1. Introduction  
The terminal is a text-based way to control your computer. Instead of clicking folders and buttons, you type commands. Bash is one of the most common shells (command interpreters) used in Linux and macOS.

Think of it like a control panel where every command is a spell that manipulates files, folders, and programs.

Example:
```bash
echo "Hello World"
```

Output:
```
Hello World
```

Here, `echo` simply prints text to the terminal.

---

## 2. What is Bash?  
Bash stands for **Bourne Again Shell** (yes, the name is weird). It is a program that reads what you type and executes it as commands.

You can:
- Move around folders
- Create/delete files
- Run programs
- Manage system processes

When you open a terminal, you’re basically talking to Bash.

---

## 3. `pwd`, `ls`, `cd`

These are your navigation commands.

### `pwd` (Print Working Directory)
Shows where you are.

```bash
pwd
```

Output:
```
/home/user/projects
```

---

### `ls` (List files)
Shows files in current directory.

```bash
ls
```

More detailed:
```bash
ls -l
```

---

### `cd` (Change Directory)
Moves between folders.

```bash
cd Documents
```

Go back:
```bash
cd ..
```

Go home:
```bash
cd ~
```

---

**Common Mistakes:**
- Typing wrong folder names (case matters)
- Forgetting `..` is parent folder
- Using spaces without quotes: `cd My Folder`: NO → `cd "My Folder"`: YES

---

## 4. File Operations

### Create files
```bash
touch file.txt
```

### Create folders
```bash
mkdir my_folder
```

### Copy files
```bash
cp file.txt backup.txt
```

### Move / rename
```bash
mv file.txt newname.txt
```

### Delete files
```bash
rm file.txt
```

Delete folder:
```bash
rm -r my_folder
```

WARNING: `rm -r` is powerful. It deletes everything inside.

---

**Common Mistakes:**
- Accidentally deleting wrong folder
- Forgetting `-r` for folders
- No undo in terminal (rip)

---

## 5. Reading Files

### `cat` (print file)
```bash
cat file.txt
```

### `less` (scroll file)
```bash
less file.txt
```

### `head` (first lines)
```bash
head file.txt
```

### `tail` (last lines)
```bash
tail file.txt
```

---

## 6. Searching (`grep`)

Find text inside files.

```bash
grep "error" log.txt
```

Search recursively:
```bash
grep -r "TODO" .
```

Example output:
```
main.py:10: # TODO fix bug
```

---

**Common Mistakes:**
- Forgetting quotes for multi-word search
- Searching wrong directory
- Case sensitivity (`Error` ≠ `error`)

---

## 7. Redirection & Pipes

This is where Bash gets fun.

### Redirect output to file
```bash
echo "hello" > file.txt
```

Overwrite file.

Append instead:
```bash
echo "hello again" >> file.txt
```

---

### Pipe (`|`)
Send output of one command into another.

```bash
ls | grep ".py"
```

Meaning:
- `ls` lists files
- `grep` filters Python files

---

Think of `|` as a conveyor belt between commands.

---

## 8. Permissions (`chmod`)

Files have permissions: read, write, execute.

### Check permissions
```bash
ls -l
```

### Give execute permission
```bash
chmod +x script.sh
```

### Numeric mode
```bash
chmod 755 file.sh
```

Meaning:
- 7 = read + write + execute
- 5 = read + execute

---

**Common Mistakes:**
- Breaking permissions accidentally
- Using `chmod 777` everywhere (bad idea)
- Not knowing why script won’t run (no execute permission)

---

## 9. Processes (`ps`, `top`, `kill`)

### List processes
```bash
ps
```

### Live view
```bash
top
```

### Kill process
```bash
kill 1234
```

Force kill:
```bash
kill -9 1234
```

---

**Common Mistakes:**
- Killing wrong process
- Not checking PID carefully
- Using `kill -9` too early

---

## 10. TL;DR Cheat Sheet

- `pwd` → where am I  
- `ls` → list files  
- `cd` → move folders  
- `mkdir` → create folder  
- `touch` → create file  
- `cp` → copy  
- `mv` → move/rename  
- `rm` → delete  
- `cat` → show file  
- `grep` → search text  
- `>` → write output to file  
- `>>` → append output  
- `|` → connect commands  
- `chmod` → change permissions  

---

## 11. Mini-Exam Questions

1. What does `pwd` show?
2. Difference between `rm` and `rm -r`?
3. What does `>` do?
4. How do you search text in a file?
5. What does `chmod +x` do?

---

## 12. Sources

- GNU Bash Manual  
- Linux man pages (`man ls`, `man grep`)  
- Linux Foundation documentation  
- Ubuntu Command Line Guide  