---
title: Linux Survival Cheat Sheet
tags: [linux, bash, terminal, cheat-sheet, beginner]
level: beginner
---

# Linux Survival Cheat Sheet

Quick reference for surviving and working in the Linux terminal without getting lost.

---

## Navigation
```bash
pwd            # show current directory
ls             # list files
ls -l          # detailed list
ls -a          # include hidden files

cd folder      # enter folder
cd ..          # go back one level
cd ~           # home directory
```

---

## Files and Folders
```bash
mkdir name         # create folder
touch file.txt     # create file

cp a b             # copy file
mv a b             # move or rename
rm file            # delete file
rm -r folder       # delete folder recursively
```

Important: `rm -r` permanently deletes files. No recovery.

---

## Reading Files
```bash
cat file.txt       # print entire file
less file.txt      # scroll through file
head file.txt      # first 10 lines
tail file.txt      # last 10 lines
```

---

## Searching
```bash
grep "text" file.txt        # search inside file
grep -r "text" .            # search recursively in directory
```

---

## Pipes and Redirection
```bash
command > file.txt      # overwrite file
command >> file.txt     # append to file

ls | grep ".js"         # filter output
```

Key idea:
- `>` overwrites
- `>>` appends
- `|` connects commands

---

## Permissions
```bash
ls -l              # view permissions
chmod +x file.sh   # make file executable
chmod 755 file     # common full-permission setup
```

Permission meanings:
- r = read
- w = write
- x = execute

---

## Processes
```bash
ps             # list processes
top            # live process view

kill PID       # stop process
kill -9 PID    # force stop process
```

---

## System Info
```bash
whoami         # current user
uname -a       # system information
df -h          # disk usage
free -h        # memory usage
```

---

## Emergency Commands
```bash
clear          # clear terminal screen
history        # show command history
ctrl + c       # stop running command
ctrl + l       # clear screen
```

---

## Command Structure
```bash
command [options] [target]
```

Examples:
```bash
ls -l /home
grep -r "TODO" .
chmod +x script.sh
```

---

## Core Mental Model

- Everything is treated as a file
- Commands take input, process it, and output results
- Commands can be chained using pipes
- The terminal executes exactly what you type

---

## Must-Know Commands

```bash
ls
cd
pwd
mkdir
rm
cp
mv
cat
grep
chmod
```

If you know these, you can handle most basic terminal tasks.