---
title: Core Algorithms in Java (Search + Sorting)
tags: [java, dsa, algorithms, search, sorting, beginner-to-intermediate]
level: intermediate
---

# Core Algorithms in Java

This note covers the three most important building blocks in DSA: Linear Search, Binary Search, and QuickSort.

These show up everywhere in coding interviews and competitive programming.

---

# Linear Search

Linear search checks each element one by one until it finds the target. It works on both sorted and unsorted arrays, but it's slow for large inputs.

Time complexity: O(n)

```java
public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}
````

---

# Binary Search

Binary search works only on sorted arrays. It cuts the search space in half every step, making it much faster than linear search.

Time complexity: O(log n)

```java
public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }
}
```

---

# QuickSort

QuickSort is a divide-and-conquer sorting algorithm. It picks a pivot, partitions the array, and recursively sorts both sides.

Average case: O(n log n)
Worst case: O(n²)

```java
public class QuickSort {

    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);

            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }
}
```

---

# Key Takeaway

* Use Linear Search when data is small or unsorted
* Use Binary Search when data is sorted and you need speed
* Use QuickSort for general-purpose fast sorting