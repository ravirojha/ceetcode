// 52 C programming problems organized by topic.
// Each problem has LeetCode-style description, examples, constraints,
// starter C code, curated reference links, and Run/Submit test cases
// (loaded from ./tests.js).

import tests from "./tests.js";

const BEEJ = "https://beej.us/guide/bgc/";
const BEEJ_HTML = "https://beej.us/guide/bgc/html/split/";
const CS50X = "https://cs50.harvard.edu/x/";
const VALGRIND_QS = "https://valgrind.org/docs/manual/quick-start.html";

const problems = [
  // ===========================================================
  // SECTION 1 — Variables, Types & Control Flow
  // ===========================================================
  {
    id: 1,
    number: "01",
    title: "Print sizes of all types",
    difficulty: "Easy",
    topic: "Variables, Types & Control Flow",
    description: `Write a C program that prints the size, in bytes, of every fundamental built-in type: \`char\`, \`short\`, \`int\`, \`long\`, \`long long\`, \`float\`, and \`double\`. Use the \`sizeof\` operator to obtain each size at compile time and print one type per line.

Understanding the actual byte width of every primitive type is foundational to writing correct kernel and systems code: struct layout, ABI compatibility, integer overflow, alignment, and pointer arithmetic all depend on it. Sizes are *implementation-defined*, so the same code can produce different output on a 32-bit microcontroller versus a 64-bit Linux server.

The output format does not have to match exactly, but each line should clearly identify the type and its size.`,
    examples: [
      {
        input: "(no input)",
        output: `char: 1 bytes
short: 2 bytes
int: 4 bytes
long: 8 bytes
long long: 8 bytes
float: 4 bytes
double: 8 bytes`,
        explanation: "Output on a typical 64-bit macOS/Linux system. On Windows or 32-bit targets `long` is often 4 bytes — that's the point of the exercise."
      }
    ],
    constraints: [
      "Use the `sizeof` operator — do not hardcode values.",
      "Print the size as a decimal integer (use `%zu` for `size_t`).",
      "Compile with `-Wall -Wextra` and produce no warnings."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    // Print the size in bytes of each fundamental type.
    // Hint: use sizeof() and the %zu format specifier.

    return 0;
}
`,
    references: [
      { title: "Beej's Guide to C — Types & sizeof", url: BEEJ },
      { title: "cppreference — sizeof operator", url: "https://en.cppreference.com/w/c/language/sizeof" },
      { title: "cppreference — Fundamental types", url: "https://en.cppreference.com/w/c/language/types" }
    ]
  },

  {
    id: 2,
    number: "02",
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "Variables, Types & Control Flow",
    description: `Print the integers from 1 to 100, one per line, with these substitutions:
- Multiples of 3 → \`Fizz\`
- Multiples of 5 → \`Buzz\`
- Multiples of both 3 and 5 (i.e., multiples of 15) → \`FizzBuzz\`
- All other numbers → the number itself

This is the classic interview warm-up. The trick is checking the "both" case *first*, before the individual divisibility checks, so you don't miss it.`,
    examples: [
      {
        input: "(no input)",
        output: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
...`,
        explanation: "15 is divisible by both 3 and 5, so it is replaced by `FizzBuzz`."
      }
    ],
    constraints: [
      "Use a `for` loop from 1 through 100 inclusive.",
      "Use the modulo operator `%`.",
      "Each line should contain either an integer, `Fizz`, `Buzz`, or `FizzBuzz` — nothing else."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 100; i++) {
        // Your code here
    }
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Control flow (if / for / while)", url: BEEJ },
      { title: "cppreference — Operators (% modulo)", url: "https://en.cppreference.com/w/c/language/operator_arithmetic" }
    ]
  },

  {
    id: 3,
    number: "03",
    title: "Number to binary string",
    difficulty: "Easy",
    topic: "Variables, Types & Control Flow",
    description: `Read an unsigned integer from standard input and print its binary representation as a string of \`0\`s and \`1\`s. You may **not** use \`printf\` format specifiers like \`%b\` or any helper library.

Use repeated division and modulo by 2 (or right-shift and bitwise AND) to extract bits one at a time. Note that the bits will be produced in reverse order — you'll need to either store them in an array and print backwards, or use recursion to flip the order naturally.

You may print a trailing newline. Leading zeros may be omitted (so 5 prints as \`101\`, not \`00000101\`).`,
    examples: [
      { input: "5", output: "101", explanation: "5 = 4 + 1 = 2² + 2⁰." },
      { input: "0", output: "0", explanation: "Special case — explicitly handle zero." },
      { input: "255", output: "11111111", explanation: "All 8 lowest bits set." }
    ],
    constraints: [
      "Input is a non-negative integer ≤ 2³¹ - 1.",
      "No `%b`, no `itoa`, no library binary formatters.",
      "Handle 0 as a special case — it should print `0`, not an empty string."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    unsigned int n;
    if (scanf("%u", &n) != 1) return 1;

    // TODO: print n in binary using only / and % (or >> and &)

    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Bitwise operators", url: BEEJ },
      { title: "Wikipedia — Binary number system", url: "https://en.wikipedia.org/wiki/Binary_number" }
    ]
  },

  {
    id: 4,
    number: "04",
    title: "Sum of digits",
    difficulty: "Easy",
    topic: "Variables, Types & Control Flow",
    description: `Read a non-negative integer from standard input and print the sum of its decimal digits. Use a \`while\` loop with the modulo operator to peel off one digit at a time.

The loop body is the canonical "digit extraction" pattern that shows up in many problems: \`digit = n % 10\` extracts the last digit, \`n /= 10\` removes it. Keep going until \`n\` is zero.`,
    examples: [
      { input: "1234", output: "10", explanation: "1 + 2 + 3 + 4 = 10." },
      { input: "0", output: "0", explanation: "Loop never runs; the sum stays at its initial 0." },
      { input: "9999", output: "36", explanation: "9 × 4 = 36." }
    ],
    constraints: [
      "Input fits in a regular `int` (≤ 2³¹ - 1).",
      "Use only `while`, `%`, and `/` — no string conversion.",
      "Handle 0 correctly."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;

    int sum = 0;
    // TODO: peel off digits with % and /

    printf("%d\\n", sum);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Loops & arithmetic", url: BEEJ },
      { title: "cppreference — Arithmetic operators", url: "https://en.cppreference.com/w/c/language/operator_arithmetic" }
    ]
  },

  {
    id: 5,
    number: "05",
    title: "Celsius to Fahrenheit table",
    difficulty: "Easy",
    topic: "Variables, Types & Control Flow",
    description: `Print a temperature conversion table from \`-40°C\` through \`100°C\` inclusive, in steps of 5°C. Each row should contain the Celsius value and the corresponding Fahrenheit value, formatted in two right-aligned columns of width 8 with one decimal place.

The conversion formula is \`F = C * 9/5 + 32\`. Be careful: \`9/5\` in integer division is \`1\`, not \`1.8\`. Use floating-point arithmetic (e.g., \`9.0 / 5.0\`) to get the correct value.`,
    examples: [
      {
        input: "(no input)",
        output: `   -40.0    -40.0
   -35.0    -31.0
   -30.0    -22.0
...
    95.0    203.0
   100.0    212.0`,
        explanation: "Note that -40°C is the only point where Celsius equals Fahrenheit."
      }
    ],
    constraints: [
      "Step size is exactly 5°C.",
      "Use `printf` width and precision specifiers (e.g., `%8.1f`).",
      "Inclusive bounds: print both -40 and 100."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    for (int c = -40; c <= 100; c += 5) {
        // double f = ...
        // printf("%8.1f %8.1f\\n", (double)c, f);
    }
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — printf format specifiers", url: BEEJ },
      { title: "cppreference — fprintf / printf", url: "https://en.cppreference.com/w/c/io/fprintf" }
    ]
  },

  // ===========================================================
  // SECTION 2 — Functions & Recursion
  // ===========================================================
  {
    id: 6,
    number: "06",
    title: "Recursive factorial",
    difficulty: "Easy",
    topic: "Functions & Recursion",
    description: `Implement \`factorial(n)\` two ways:
1. \`fact_recursive(int n)\` — defined as \`fact(0) = 1\` and \`fact(n) = n * fact(n - 1)\`.
2. \`fact_iterative(int n)\` — using a single \`for\` loop.

Read \`n\` from stdin and print \`rec=X iter=X\` so both implementations are exercised side-by-side. Use \`unsigned long long\` for the result — \`13!\` already overflows 32-bit \`int\`, and \`20!\` is the largest factorial that fits in 64 bits.

The point isn't just to compute factorials — it's to feel the difference between the two styles. Recursion eats stack space (one frame per call), while the loop runs in constant stack. In a kernel where the stack is small (often 8 KiB), unbounded recursion is a real bug.`,
    examples: [
      { input: "0",  output: "rec=1 iter=1",                       explanation: "0! = 1 by definition." },
      { input: "5",  output: "rec=120 iter=120",                   explanation: "5! = 5·4·3·2·1." },
      { input: "20", output: "rec=2432902008176640000 iter=2432902008176640000", explanation: "20! is the largest factorial that fits in `unsigned long long`." }
    ],
    constraints: [
      "0 ≤ n ≤ 20 (21! overflows `unsigned long long`).",
      "Recursive version must terminate at `n == 0`.",
      "Iterative version must use a loop, not recursion.",
      "Both functions must return the same value for every input."
    ],
    starterCode: `#include <stdio.h>

unsigned long long fact_recursive(int n) {
    // Base case: n == 0 → 1
    // Recursive case: n * fact_recursive(n - 1)
    return 0;
}

unsigned long long fact_iterative(int n) {
    // for-loop accumulator
    return 0;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("rec=%llu iter=%llu\\n",
           fact_recursive(n), fact_iterative(n));
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Functions & recursion", url: BEEJ },
      { title: "Wikipedia — Factorial", url: "https://en.wikipedia.org/wiki/Factorial" },
      { title: "Wikipedia — Recursion (computer science)", url: "https://en.wikipedia.org/wiki/Recursion_(computer_science)" }
    ]
  },

  {
    id: 7,
    number: "07",
    title: "Recursive Fibonacci",
    difficulty: "Easy",
    topic: "Functions & Recursion",
    description: `Implement the naive recursive Fibonacci function:
\`\`\`
fib(0) = 0
fib(1) = 1
fib(n) = fib(n - 1) + fib(n - 2)
\`\`\`

Add a \`static int call_count = 0;\` counter that increments on every entry to \`fib\`. Compute \`fib(10)\` and \`fib(30)\` and print both the result *and* the number of calls.

Watch the call count explode — it grows roughly as \`2ⁿ\`. This is the canonical example of why naive recursion can be catastrophically slow without memoisation.`,
    examples: [
      {
        input: "(no input)",
        output: `fib(10) = 55  (calls: 177)
fib(30) = 832040  (calls: 2692537)`,
        explanation: "Each `fib(n)` call branches into two more calls, so the tree has roughly 2ⁿ nodes."
      }
    ],
    constraints: [
      "Use plain recursion — no memoisation, no loop.",
      "Counter must be reset between the two test calls.",
      "0 ≤ n ≤ 35 (above that the runtime gets uncomfortable)."
    ],
    starterCode: `#include <stdio.h>

static long call_count = 0;

long fib(int n) {
    call_count++;
    // base cases & recursive call
    return 0;
}

int main(void) {
    long r10 = fib(10);
    printf("fib(10) = %ld  (calls: %ld)\\n", r10, call_count);

    call_count = 0;
    long r30 = fib(30);
    printf("fib(30) = %ld  (calls: %ld)\\n", r30, call_count);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Recursion", url: BEEJ },
      { title: "Wikipedia — Fibonacci sequence", url: "https://en.wikipedia.org/wiki/Fibonacci_sequence" },
      { title: "Wikipedia — Memoization", url: "https://en.wikipedia.org/wiki/Memoization" }
    ]
  },

  {
    id: 8,
    number: "08",
    title: "Power function",
    difficulty: "Easy",
    topic: "Functions & Recursion",
    description: `Implement \`double my_pow(double base, int exp)\` without including \`<math.h>\`. The function must:
- Return \`1.0\` for \`exp == 0\` (including \`pow(0, 0)\` — by convention).
- Multiply \`base\` by itself \`exp\` times for positive \`exp\`.
- For negative \`exp\`, return \`1.0 / my_pow(base, -exp)\`.

Read \`base\` (\`double\`) and \`exp\` (\`int\`) from stdin and print the result with \`%g\`. Bonus: implement an O(log n) "fast exponentiation" version using the identity \`x^n = (x²)^(n/2)\` when \`n\` is even.`,
    examples: [
      { input: "2 10", output: "1024",  explanation: "2¹⁰ = 1024." },
      { input: "2 -3", output: "0.125", explanation: "2⁻³ = 1/8 = 0.125." },
      { input: "5 0",  output: "1",     explanation: "Anything to the 0 is 1 — by convention even 0⁰." }
    ],
    constraints: [
      "Do not include `<math.h>` or call `pow`.",
      "`exp` may be negative — return a `double`, not an `int`.",
      "Handle `exp == 0` correctly (including `0^0 == 1`)."
    ],
    starterCode: `#include <stdio.h>

double my_pow(double base, int exp) {
    // Handle exp == 0, exp > 0, exp < 0
    return 0.0;
}

int main(void) {
    double base;
    int exp;
    if (scanf("%lf %d", &base, &exp) != 2) return 1;
    printf("%g\\n", my_pow(base, exp));
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Functions", url: BEEJ },
      { title: "Wikipedia — Exponentiation by squaring", url: "https://en.wikipedia.org/wiki/Exponentiation_by_squaring" }
    ]
  },

  {
    id: 9,
    number: "09",
    title: "Function pointers — basic calculator",
    difficulty: "Medium",
    topic: "Functions & Recursion",
    description: `Build a minimal calculator that uses an **array of function pointers** to dispatch operations.

1. Define four functions with the same signature: \`int add(int, int)\`, \`int sub(int, int)\`, \`int mul(int, int)\`, \`int divide(int, int)\`.
2. Declare an array \`int (*ops[4])(int, int) = { add, sub, mul, divide };\`.
3. Read three inputs from stdin: an integer \`a\`, an integer \`op\` in \`[0..3]\`, and an integer \`b\`. Call \`ops[op](a, b)\` and print the result.

This is exactly how the Linux kernel dispatches to driver-specific functions — every \`file_operations\` struct is a table of function pointers, and the kernel calls \`f_op->read(file, ...)\` polymorphically. Mastering this pattern is non-negotiable for kernel work.`,
    examples: [
      { input: "10 0 3", output: "13", explanation: "op=0 → add → 10 + 3." },
      { input: "10 2 3", output: "30", explanation: "op=2 → mul → 10 × 3." },
      { input: "10 3 4", output: "2",  explanation: "op=3 → divide → 10 / 4 (integer division)." }
    ],
    constraints: [
      "Use an array of function pointers — do not use `if`/`switch` to dispatch.",
      "All four functions must share the signature `int f(int, int)`.",
      "Guard against division by zero in `divide`.",
      "0 ≤ op ≤ 3 (you may assume valid input)."
    ],
    starterCode: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int divide(int a, int b) { return b == 0 ? 0 : a / b; }

int main(void) {
    int (*ops[4])(int, int) = { add, sub, mul, divide };

    int a, op, b;
    if (scanf("%d %d %d", &a, &op, &b) != 3) return 1;

    // TODO: dispatch via ops[op]
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Function pointers", url: BEEJ },
      { title: "Wikipedia — Function pointer", url: "https://en.wikipedia.org/wiki/Function_pointer" },
      { title: "LWN — file_operations and the Linux driver model", url: "https://lwn.net/Articles/444910/" }
    ]
  },

  // ===========================================================
  // SECTION 3 — Pointers
  // ===========================================================
  {
    id: 10,
    number: "10",
    title: "Swap using pointers",
    difficulty: "Easy",
    topic: "Pointers",
    description: `Write a function \`void swap(int *a, int *b)\` that exchanges the values pointed to by \`a\` and \`b\`. Inside \`main\`, declare two ints, call \`swap(&x, &y)\`, and print both values *and* their addresses before and after the call.

If you instead write \`void swap(int a, int b)\` and swap inside the function, the originals are unaffected — C is pass-by-value. The whole point of this exercise is to feel that distinction by watching the addresses stay the same while the values flip.`,
    examples: [
      {
        input: "(no input — hardcode x = 5, y = 10)",
        output: `Before: x = 5 @ 0x7ffeec...3c,  y = 10 @ 0x7ffeec...38
After:  x = 10 @ 0x7ffeec...3c, y = 5 @ 0x7ffeec...38`,
        explanation: "Addresses don't change — the same two memory cells just have different contents now."
      }
    ],
    constraints: [
      "`swap` must take pointers, not values.",
      "Use a temporary variable inside `swap`.",
      "Print addresses with `%p` and cast pointers to `(void *)`."
    ],
    starterCode: `#include <stdio.h>

void swap(int *a, int *b) {
    // TODO
}

int main(void) {
    int x = 5, y = 10;
    printf("Before: x = %d @ %p, y = %d @ %p\\n",
           x, (void *)&x, y, (void *)&y);
    swap(&x, &y);
    printf("After:  x = %d @ %p, y = %d @ %p\\n",
           x, (void *)&x, y, (void *)&y);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Pointers chapter", url: BEEJ },
      { title: "cppreference — Pointer declaration", url: "https://en.cppreference.com/w/c/language/pointer" }
    ]
  },

  {
    id: 11,
    number: "11",
    title: "Pointer arithmetic on arrays",
    difficulty: "Easy",
    topic: "Pointers",
    description: `Read whitespace-separated integers from stdin into a local array, then print every element twice:
1. Once using subscript syntax \`arr[i]\`.
2. Once using pointer arithmetic \`*(arr + i)\`.

The two outputs must be identical. This is because in C, \`arr[i]\` is *defined* as syntactic sugar for \`*(arr + i)\` — they compile to the same instructions. Internalising this equivalence is essential for understanding what \`arr + 1\` actually means: it's \`(char *)arr + sizeof(int)\`, not \`(char *)arr + 1\`.`,
    examples: [
      {
        input: "10 20 30 40 50",
        output: `Subscript: 10 20 30 40 50
Pointer:   10 20 30 40 50`,
        explanation: "Both methods access the exact same bytes; the compiler generates identical machine code."
      }
    ],
    constraints: [
      "Iterate with a single `for` loop using a counter `i`.",
      "Use `*(arr + i)` exactly — not `*arr++` or `arr[i]`.",
      "The array must be local (stack-allocated)."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>

int main(void) {
    int arr[1024];
    size_t n = 0;
    int x;
    while (n < 1024 && scanf("%d", &x) == 1) arr[n++] = x;

    printf("Subscript: ");
    for (size_t i = 0; i < n; i++) {
        // print arr[i]
    }
    printf("\\nPointer:   ");
    for (size_t i = 0; i < n; i++) {
        // print *(arr + i)
    }
    printf("\\n");
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Pointers and arrays", url: BEEJ },
      { title: "cppreference — Array subscript operator", url: "https://en.cppreference.com/w/c/language/operator_member_access" }
    ]
  },

  {
    id: 12,
    number: "12",
    title: "Array of pointers",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Read five integers from stdin into five **separate** \`int\` variables \`a\`, \`b\`, \`c\`, \`d\`, \`e\`. Build an array \`int *ptrs[5]\` whose elements point to those variables. Iterate over \`ptrs\` and *double* the value at each pointer (\`*ptrs[i] *= 2\`). Print all five originals after the loop and confirm they were modified through the pointer array.

This is the data structure behind \`char **argv\` (an array of pointers to C-strings), and the basic shape of the hash-table buckets you'll build in problem #45.`,
    examples: [
      {
        input: "1 2 3 4 5",
        output: "2 4 6 8 10",
        explanation: "Each value was doubled in place via its pointer in the `ptrs` array."
      }
    ],
    constraints: [
      "Five distinct `int` variables, *not* an array of ints.",
      "`ptrs` must have type `int *[5]`.",
      "Mutate originals through the pointer array."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    int a, b, c, d, e;
    if (scanf("%d %d %d %d %d", &a, &b, &c, &d, &e) != 5) return 1;
    int *ptrs[5] = { &a, &b, &c, &d, &e };

    // double each value via *ptrs[i]

    printf("%d %d %d %d %d\\n", a, b, c, d, e);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Arrays of pointers", url: BEEJ },
      { title: "cppreference — Array declaration", url: "https://en.cppreference.com/w/c/language/array" }
    ]
  },

  {
    id: 13,
    number: "13",
    title: "Reverse an array in-place using pointers",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Reverse an \`int\` array **in-place** using two pointers walking towards each other:
- \`left\` starts at the first element.
- \`right\` starts at the last element.
- Swap \`*left\` and \`*right\`, then advance \`left\` and decrement \`right\` until they meet.

You may not allocate a second array. You may not use array indexing — operate exclusively on \`int *\` pointers (\`*left\`, \`left++\`, \`right--\`).

Read whitespace-separated ints from stdin, reverse the buffer, then print the reversed array space-separated.

The two-pointer pattern is everywhere: palindrome checks, partition steps in quicksort, the merge phase of mergesort, in-place compaction.`,
    examples: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Three swaps; the middle element doesn't move." },
      { input: "1 2 3 4",    output: "4 3 2 1",    explanation: "Two swaps." }
    ],
    constraints: [
      "Reverse in-place — no extra array.",
      "Use `int *` pointers, not subscripts.",
      "Stop when `left >= right`."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>

void reverse(int *arr, size_t n) {
    if (n < 2) return;
    int *left = arr;
    int *right = arr + n - 1;
    // swap *left and *right, then left++, right--
}

int main(void) {
    int a[1024];
    size_t n = 0;
    int x;
    while (n < 1024 && scanf("%d", &x) == 1) a[n++] = x;
    reverse(a, n);
    for (size_t i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Pointer arithmetic", url: BEEJ },
      { title: "Wikipedia — In-place algorithm", url: "https://en.wikipedia.org/wiki/In-place_algorithm" }
    ]
  },

  {
    id: 14,
    number: "14",
    title: "Implement memcpy",
    difficulty: "Hard",
    topic: "Pointers",
    description: `Implement your own \`void *my_memcpy(void *dest, const void *src, size_t n)\` that copies \`n\` bytes from \`src\` to \`dest\` and returns \`dest\`.

Real \`memcpy\` semantics:
- The function operates on raw bytes — it does not care about the type of the data.
- Behaviour is **undefined** if the source and destination regions overlap. (\`memmove\`, the next problem, handles overlap.)
- The return value is always \`dest\`.

Implementation hint: cast both pointers to \`unsigned char *\` and copy one byte at a time.

The driver reads a single line from stdin, copies it into a fresh buffer with \`my_memcpy\` (including the trailing \`'\\0'\`), and prints the destination.`,
    examples: [
      { input: "hello", output: "hello", explanation: "Copies 6 bytes — five characters plus the null terminator." },
      { input: "",      output: "",      explanation: "Empty line: only the null terminator is copied." }
    ],
    constraints: [
      "Signature must be `void *my_memcpy(void *dest, const void *src, size_t n)`.",
      "Cast through `unsigned char *` to copy bytes.",
      "Return `dest`.",
      "Caller guarantees `dest` and `src` do not overlap — `my_memmove` (next problem) is what handles overlap."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>
#include <string.h>

void *my_memcpy(void *dest, const void *src, size_t n) {
    unsigned char       *d = (unsigned char *)dest;
    const unsigned char *s = (const unsigned char *)src;
    // copy n bytes
    return dest;
}

int main(void) {
    char src[1024];
    if (!fgets(src, sizeof src, stdin)) src[0] = '\\0';
    src[strcspn(src, "\\n")] = '\\0';
    char dst[1024] = {0};
    my_memcpy(dst, src, strlen(src) + 1);
    printf("%s\\n", dst);
    return 0;
}
`,
    references: [
      { title: "cppreference — memcpy", url: "https://en.cppreference.com/w/c/string/byte/memcpy" },
      { title: "Linux man page — memcpy(3)", url: "https://man7.org/linux/man-pages/man3/memcpy.3.html" },
      { title: "Beej's Guide — void pointers and memory", url: BEEJ }
    ]
  },

  {
    id: 15,
    number: "15",
    title: "Implement memmove",
    difficulty: "Hard",
    topic: "Pointers",
    description: `Extend problem #14 to handle the case where \`src\` and \`dest\` *overlap*. Signature:

\`void *my_memmove(void *dest, const void *src, size_t n);\`

The trick: if \`dest > src\` and they overlap, copying forward from byte 0 will overwrite bytes you haven't copied yet. Copy from the end instead. If \`dest < src\` (or no overlap), forward copy is fine.

This is exactly what the standard library's \`memmove\` does, and it's used heavily inside the kernel — for instance to shift the tail of a buffer left or right when inserting/removing data.

The driver reads a buffer on the first line, then three integers \`src dst n\` on the second line, and runs \`my_memmove(buf + dst, buf + src, n)\`. It prints the buffer afterwards.`,
    examples: [
      { input: "ABCDEFGH\n0 2 5", output: "ABABCDEH", explanation: "memmove(buf+2, buf, 5) — dst > src, copy from the end so unread bytes aren't clobbered." },
      { input: "ABCDEFGH\n2 0 5", output: "CDEFGFGH", explanation: "memmove(buf, buf+2, 5) — dst < src, forward copy is safe." },
      { input: "ABCDEFGH\n0 0 8", output: "ABCDEFGH", explanation: "Same region — bytes are unchanged." }
    ],
    constraints: [
      "Signature must be `void *my_memmove(void *dest, const void *src, size_t n)`.",
      "Detect overlap direction with `dest < src` vs `dest > src`.",
      "Return `dest`.",
      "Do not call standard `memmove` — implement it yourself."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>
#include <string.h>

void *my_memmove(void *dest, const void *src, size_t n) {
    unsigned char       *d = (unsigned char *)dest;
    const unsigned char *s = (const unsigned char *)src;

    // if (d < s) forward copy
    // else       copy from the end

    return dest;
}

int main(void) {
    /* line 1: buffer; line 2: src dst n (byte offsets and length) */
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    int src_off, dst_off, n;
    if (scanf("%d %d %d", &src_off, &dst_off, &n) != 3) return 1;
    my_memmove(buf + dst_off, buf + src_off, (size_t)n);
    printf("%s\\n", buf);
    return 0;
}
`,
    references: [
      { title: "cppreference — memmove", url: "https://en.cppreference.com/w/c/string/byte/memmove" },
      { title: "Linux man page — memmove(3)", url: "https://man7.org/linux/man-pages/man3/memmove.3.html" },
      { title: "Difference between memcpy and memmove (StackOverflow canonical)", url: "https://stackoverflow.com/questions/4415910/memcpy-vs-memmove" }
    ]
  },

  // ===========================================================
  // SECTION 4 — Arrays & Strings
  // ===========================================================
  {
    id: 16,
    number: "31",
    title: "Implement strlen",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Implement \`size_t my_strlen(const char *s)\` that returns the number of characters in a C-string *not counting* the terminating \`'\\0'\`.

Walk a pointer through the string until it points to \`'\\0'\`, counting steps. Do not call the standard \`strlen\`.

C-strings are not "string objects" — they are raw byte arrays whose end is marked by a null terminator. \`strlen\` therefore runs in O(n), not O(1) — a fact that has surprising consequences for performance-sensitive code.`,
    examples: [
      { input: '"hello"', output: "5", explanation: "Five non-null characters." },
      { input: '""',      output: "0", explanation: "Empty string — first byte is already `\\0`." },
      { input: '"a"',     output: "1", explanation: "Single character." }
    ],
    constraints: [
      "Signature must be `size_t my_strlen(const char *s)`.",
      "No call to standard `strlen` or any other libc string function.",
      "Use pointer walking (`while (*p) p++;`)."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>
#include <string.h>

size_t my_strlen(const char *s) {
    const char *p = s;
    // walk until *p == '\\0'
    return (size_t)(p - s);
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    printf("%zu\\n", my_strlen(buf));
    return 0;
}
`,
    references: [
      { title: "cppreference — strlen", url: "https://en.cppreference.com/w/c/string/byte/strlen" },
      { title: "Beej's Guide — Strings", url: BEEJ },
      { title: "Linux man page — strlen(3)", url: "https://man7.org/linux/man-pages/man3/strlen.3.html" }
    ]
  },

  {
    id: 17,
    number: "32",
    title: "Implement strcpy and strncpy",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Implement two functions:
1. \`char *my_strcpy(char *dest, const char *src)\` — copies the bytes of \`src\` (including the \`'\\0'\`) into \`dest\`. Returns \`dest\`. The caller is responsible for ensuring \`dest\` is large enough.
2. \`char *my_strncpy(char *dest, const char *src, size_t n)\` — like \`strcpy\` but copies at most \`n\` bytes. **Always** null-terminate \`dest\` (this is a stricter contract than the standard \`strncpy\`, which famously does not always terminate).

The unbounded \`strcpy\` is one of the most exploited functions in C history — buffer overruns from missing length checks are a classic vulnerability. This is why the kernel uses \`strscpy\`/\`strncpy\` everywhere instead.`,
    examples: [
      { input: 'src = "hello", dest size = 16',           output: 'dest = "hello"',  explanation: "Five chars + null." },
      { input: 'src = "hello", n = 3, dest size = 16',    output: 'dest = "hel"',    explanation: "Truncated to 3 then null-terminated (your version always terminates)." }
    ],
    constraints: [
      "Both functions must return `dest`.",
      "`my_strncpy` must always write a `'\\0'` at `dest[n-1]` if it had to truncate.",
      "No calls to standard `strcpy` / `strncpy`."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>
#include <string.h>

char *my_strcpy(char *dest, const char *src) {
    char *d = dest;
    while ((*d++ = *src++)) ;
    return dest;
}

char *my_strncpy(char *dest, const char *src, size_t n) {
    // copy up to n - 1 bytes, then write '\\0'
    return dest;
}

int main(void) {
    char src[1024];
    if (!fgets(src, sizeof src, stdin)) src[0] = '\\0';
    src[strcspn(src, "\\n")] = '\\0';
    char dst[1024];
    my_strcpy(dst, src);
    printf("%s\\n", dst);
    return 0;
}
`,
    references: [
      { title: "cppreference — strcpy", url: "https://en.cppreference.com/w/c/string/byte/strcpy" },
      { title: "cppreference — strncpy (and its pitfalls)", url: "https://en.cppreference.com/w/c/string/byte/strncpy" },
      { title: "Linux kernel — strscpy() rationale", url: "https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#string-manipulation" }
    ]
  },

  {
    id: 18,
    number: "33",
    title: "Implement strcmp",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Implement \`int my_strcmp(const char *a, const char *b)\` that returns:
- A negative value if \`a\` is lexicographically less than \`b\`.
- Zero if they are equal.
- A positive value if \`a\` is greater than \`b\`.

The canonical implementation walks both pointers in lockstep until either characters differ or one of them is \`'\\0'\`, then returns the byte-difference of the current characters cast through \`unsigned char\`.

Why \`unsigned char\`? Because the standard says \`strcmp\` compares bytes as if they were \`unsigned\` — using \`signed char\` would order \`'\\xff'\` before \`'\\0'\`, which is wrong.`,
    examples: [
      { input: '"abc", "abc"', output: "0",    explanation: "Equal." },
      { input: '"abc", "abd"', output: "< 0",  explanation: "First differing pair: c (99) < d (100)." },
      { input: '"abc", "ab"',  output: "> 0",  explanation: "After 'b' the second string ends; first is longer." }
    ],
    constraints: [
      "Signature must be `int my_strcmp(const char *a, const char *b)`.",
      "Compare bytes as `unsigned char`.",
      "No call to standard `strcmp`."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

int my_strcmp(const char *a, const char *b) {
    while (*a && (*a == *b)) { a++; b++; }
    return (unsigned char)*a - (unsigned char)*b;
}

int main(void) {
    char a[1024], b[1024];
    if (!fgets(a, sizeof a, stdin)) a[0] = '\\0';
    if (!fgets(b, sizeof b, stdin)) b[0] = '\\0';
    a[strcspn(a, "\\n")] = '\\0';
    b[strcspn(b, "\\n")] = '\\0';
    printf("%d\\n", my_strcmp(a, b));
    return 0;
}
`,
    references: [
      { title: "cppreference — strcmp", url: "https://en.cppreference.com/w/c/string/byte/strcmp" },
      { title: "Linux man page — strcmp(3)", url: "https://man7.org/linux/man-pages/man3/strcmp.3.html" }
    ]
  },

  {
    id: 19,
    number: "34",
    title: "Reverse a string in-place",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Reverse a writable C-string **in-place** using two pointers — left at the start, right at the byte before the \`'\\0'\`. Swap and converge until they meet.

Same algorithm as problem #13, but on \`char\`. The reason it's a separate problem: you must locate the end (without including the \`'\\0'\`), then operate on \`char *\`, not \`int *\`. Use \`strlen\` (or your own \`my_strlen\`) to find the end.`,
    examples: [
      { input: '"hello"',  output: '"olleh"',   explanation: "Five-letter string, two swaps." },
      { input: '"abcd"',   output: '"dcba"',    explanation: "Even-length, two swaps." },
      { input: '""',       output: '""',        explanation: "Empty string — left == right immediately." }
    ],
    constraints: [
      "Reverse in-place — do not allocate a new buffer.",
      "Operate on `char *`, not `int`.",
      "Do not move or remove the trailing `'\\0'`."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

void reverse_str(char *s) {
    size_t n = strlen(s);
    if (n < 2) return;
    char *l = s;
    char *r = s + n - 1;
    // swap *l and *r, l++, r--
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    reverse_str(buf);
    printf("%s\\n", buf);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Strings & arrays", url: BEEJ },
      { title: "cppreference — strlen", url: "https://en.cppreference.com/w/c/string/byte/strlen" }
    ]
  },

  {
    id: 20,
    number: "35",
    title: "Check if a string is a palindrome",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Write \`int is_palindrome(const char *s)\` that returns 1 if \`s\` reads the same forwards and backwards, 0 otherwise.

Use two pointers — \`left\` from the start, \`right\` from the end (\`strlen(s) - 1\`). Walk inward, comparing \`*left\` and \`*right\` at each step. Stop when they meet.

For this exercise, treat the string case-sensitively and don't ignore non-letter characters. \`"Anna"\` is *not* a palindrome (capital A ≠ lowercase a).`,
    examples: [
      { input: '"madam"',  output: "1", explanation: "Reads the same both ways." },
      { input: '"hello"',  output: "0", explanation: "h ≠ o on the first comparison." },
      { input: '"a"',      output: "1", explanation: "Single character is trivially a palindrome." },
      { input: '""',       output: "1", explanation: "Empty string is also trivially a palindrome." }
    ],
    constraints: [
      "Use pointer comparison, not array indices.",
      "Case-sensitive, no character class filtering.",
      "Empty string returns 1."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

int is_palindrome(const char *s) {
    size_t n = strlen(s);
    if (n < 2) return 1;
    const char *l = s;
    const char *r = s + n - 1;
    while (l < r) {
        // compare *l and *r
    }
    return 1;
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    printf("%d\\n", is_palindrome(buf));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Palindrome", url: "https://en.wikipedia.org/wiki/Palindrome" },
      { title: "Beej's Guide — Strings", url: BEEJ }
    ]
  },

  {
    id: 21,
    number: "36",
    title: "Word count in a string",
    difficulty: "Medium",
    topic: "Arrays & Strings",
    description: `Implement \`int word_count(const char *s)\` that returns the number of whitespace-separated words in \`s\`. Multiple consecutive spaces, leading spaces, and trailing spaces must all be handled correctly.

Algorithm sketch: walk the string with a state machine — you're either currently *inside* a word or *outside* one. Increment the count every time you transition from "outside" to "inside". This collapses any run of spaces into a single boundary.

Use \`isspace()\` from \`<ctype.h>\` to recognise spaces, tabs, and newlines uniformly.`,
    examples: [
      { input: '"hello world"',          output: "2", explanation: "Two words separated by one space." },
      { input: '"  hello   world  "',    output: "2", explanation: "Extra whitespace ignored." },
      { input: '""',                     output: "0", explanation: "Empty string — zero words." },
      { input: '"   "',                  output: "0", explanation: "Whitespace only — zero words." }
    ],
    constraints: [
      "Treat any `isspace()` character as a separator.",
      "Multiple consecutive spaces count as a single separator.",
      "Leading and trailing whitespace must not affect the count."
    ],
    starterCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int word_count(const char *s) {
    int count = 0;
    int in_word = 0;
    while (*s) {
        // toggle in_word and increment count on each outside→inside transition
        s++;
    }
    return count;
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    printf("%d\\n", word_count(buf));
    return 0;
}
`,
    references: [
      { title: "cppreference — isspace", url: "https://en.cppreference.com/w/c/string/byte/isspace" },
      { title: "Beej's Guide — ctype.h", url: BEEJ }
    ]
  },

  {
    id: 22,
    number: "37",
    title: "Implement atoi",
    difficulty: "Medium",
    topic: "Arrays & Strings",
    description: `Implement \`int my_atoi(const char *s)\` that converts a numeric string to an integer. Behaviour:
1. Skip any leading whitespace (\`isspace\`).
2. Optional single \`+\` or \`-\` sign.
3. Read digits one by one and accumulate \`result = result * 10 + digit\`.
4. Stop at the first non-digit character (do **not** error — just return what you have).
5. Apply the sign at the end.

You don't have to handle overflow gracefully for this exercise (real \`atoi\` is undefined on overflow, and \`strtol\` is the modern replacement that *does* report overflow).`,
    examples: [
      { input: '"1234"',          output: "1234",    explanation: "Standard digit accumulation." },
      { input: '"   -42abc"',     output: "-42",     explanation: "Skip whitespace, sign applied, stop at 'a'." },
      { input: '"+0"',            output: "0",       explanation: "Optional plus sign." },
      { input: '"abc"',           output: "0",       explanation: "No digits read at all." }
    ],
    constraints: [
      "Signature must be `int my_atoi(const char *s)`.",
      "Handle leading whitespace and optional sign.",
      "Stop reading at the first non-digit.",
      "No call to standard `atoi` / `strtol`."
    ],
    starterCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int my_atoi(const char *s) {
    while (isspace((unsigned char)*s)) s++;
    int sign = 1;
    if (*s == '+' || *s == '-') { sign = (*s == '-') ? -1 : 1; s++; }
    int n = 0;
    while (isdigit((unsigned char)*s)) {
        n = n * 10 + (*s - '0');
        s++;
    }
    return sign * n;
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    printf("%d\\n", my_atoi(buf));
    return 0;
}
`,
    references: [
      { title: "cppreference — atoi (and why strtol is preferred)", url: "https://en.cppreference.com/w/c/string/byte/atoi" },
      { title: "cppreference — strtol", url: "https://en.cppreference.com/w/c/string/byte/strtol" },
      { title: "Linux man page — atoi(3)", url: "https://man7.org/linux/man-pages/man3/atoi.3.html" }
    ]
  },

  {
    id: 23,
    number: "38",
    title: "2D array — matrix multiplication",
    difficulty: "Medium",
    topic: "Arrays & Strings",
    description: `Multiply two 3×3 \`int\` matrices \`A\` and \`B\` and store the result in a third matrix \`C\`. Definition: \`C[i][j] = Σ A[i][k] * B[k][j]\` for \`k\` in \`0..2\`. Print \`A\`, \`B\`, and \`C\` in a clean grid layout (use \`printf("%4d ", x)\`).

Triple-nested loop: outer \`i\` over rows of \`A\`, middle \`j\` over columns of \`B\`, innermost \`k\` over the shared dimension. Always initialise \`C[i][j] = 0\` before the inner sum.`,
    examples: [
      {
        input: `A = | 1 2 3 |    B = | 7 8 9 |
    | 4 5 6 |        | 1 2 3 |
    | 7 8 9 |        | 4 5 6 |`,
        output: `C = |  21  21  27 |
    |  57  57  72 |
    |  93  93 117 |`,
        explanation: "C[0][0] = 1·7 + 2·1 + 3·4 = 21, etc."
      }
    ],
    constraints: [
      "Both matrices are 3×3.",
      "Use a triple-nested loop — no flattening tricks needed for this exercise.",
      "Print each matrix on its own labeled grid."
    ],
    starterCode: `#include <stdio.h>

int main(void) {
    int A[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int B[3][3] = {{7,8,9},{1,2,3},{4,5,6}};
    int C[3][3] = {0};

    // C[i][j] = sum over k of A[i][k] * B[k][j]

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) printf("%4d ", C[i][j]);
        printf("\\n");
    }
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Matrix multiplication", url: "https://en.wikipedia.org/wiki/Matrix_multiplication" },
      { title: "Beej's Guide — Multidimensional arrays", url: BEEJ }
    ]
  },

  // ===========================================================
  // SECTION 5 — Structs
  // ===========================================================
  {
    id: 24,
    number: "44",
    title: "Student record struct",
    difficulty: "Easy",
    topic: "Structs",
    description: `Define \`struct Student { char name[32]; int age; double grade; };\`. Create an array of 5 \`Student\`s with hardcoded values. Find and print the student with the **highest grade**.

If multiple students share the top grade, the first one wins. Print the winner as \`name age grade\` on one line.`,
    examples: [
      {
        input: `5 students with grades [88.0, 91.5, 73.0, 91.5, 80.0]`,
        output: `Top: Bob 20 91.5`,
        explanation: "Two students tie at 91.5; the first one (Bob) wins."
      }
    ],
    constraints: [
      "5 students, fixed in code.",
      "Use a single linear scan to find the max.",
      "Tie-break by earliest index."
    ],
    starterCode: `#include <stdio.h>

struct Student {
    char   name[32];
    int    age;
    double grade;
};

int main(void) {
    struct Student arr[5] = {
        {"Alice", 19, 88.0},
        {"Bob",   20, 91.5},
        {"Carol", 21, 73.0},
        {"Dave",  20, 91.5},
        {"Eve",   22, 80.0},
    };
    // find the student with the highest grade and print them
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Structs", url: BEEJ },
      { title: "cppreference — struct declaration", url: "https://en.cppreference.com/w/c/language/struct" }
    ]
  },

  {
    id: 25,
    number: "45",
    title: "Struct padding and size",
    difficulty: "Medium",
    topic: "Structs",
    description: `Declare three structs containing the same fields (a \`char\`, an \`int\`, a \`char\`) in three different orders, then print \`sizeof\` each.

\`\`\`
struct A { char a; int b; char c; };       // expect 12
struct B { char a; char c; int b; };       // expect 8
struct C { int b; char a; char c; };       // expect 8
\`\`\`

The compiler inserts **padding bytes** so each member is properly aligned (\`int\` typically on a 4-byte boundary). When you put a small type, then a big type, then a small type again, you waste bytes on padding. Reordering members from largest to smallest minimises the struct's footprint — a hot optimisation in kernel data structures where you have millions of instances.`,
    examples: [
      {
        input: "(no input)",
        output: `sizeof(A) = 12
sizeof(B) = 8
sizeof(C) = 8`,
        explanation: "A wastes 3 padding bytes after `a` and 3 trailing bytes after `c`. B and C group the chars together so only 2 trailing pad bytes are needed."
      }
    ],
    constraints: [
      "Three structs, identical members, different order.",
      "Use `sizeof` to print each.",
      "Output format: `sizeof(X) = N`."
    ],
    starterCode: `#include <stdio.h>

struct A { char a; int b; char c; };
struct B { char a; char c; int b; };
struct C { int b; char a; char c; };

int main(void) {
    printf("sizeof(A) = %zu\\n", sizeof(struct A));
    printf("sizeof(B) = %zu\\n", sizeof(struct B));
    printf("sizeof(C) = %zu\\n", sizeof(struct C));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Data structure alignment", url: "https://en.wikipedia.org/wiki/Data_structure_alignment" },
      { title: "Beej's Guide — Structs and alignment", url: BEEJ },
      { title: "Eric S. Raymond — The Lost Art of C Structure Packing", url: "http://www.catb.org/esr/structure-packing/" }
    ]
  },

  {
    id: 26,
    number: "46",
    title: "Pointer to struct",
    difficulty: "Easy",
    topic: "Structs",
    description: `Define \`struct Point { int x; int y; };\`. Write a function \`void move(struct Point *p, int dx, int dy)\` that updates the point in place. Inside \`move\`, access fields with the arrow operator: \`p->x += dx; p->y += dy;\`.

\`p->x\` is precisely equivalent to \`(*p).x\` — the arrow operator is just a more readable form when you have a pointer.`,
    examples: [
      {
        input: "Point{1, 2}, move(+3, -1)",
        output: "Point{4, 1}",
        explanation: "1 + 3 = 4, 2 + (-1) = 1."
      }
    ],
    constraints: [
      "Take a `struct Point *`, not a copy.",
      "Use the arrow operator `->`.",
      "Mutate the original — the caller must see the new values."
    ],
    starterCode: `#include <stdio.h>

struct Point { int x; int y; };

void move(struct Point *p, int dx, int dy) {
    // p->x += dx; p->y += dy;
}

int main(void) {
    struct Point p = {1, 2};
    move(&p, 3, -1);
    printf("(%d, %d)\\n", p.x, p.y);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — struct pointers and ->", url: BEEJ },
      { title: "cppreference — Member access operators", url: "https://en.cppreference.com/w/c/language/operator_member_access" }
    ]
  },

  {
    id: 27,
    number: "47",
    title: "Nested structs",
    difficulty: "Medium",
    topic: "Structs",
    description: `Build:
\`\`\`
struct Point { int x; int y; };
struct Rectangle { struct Point tl; struct Point br; };  // tl = top-left, br = bottom-right
\`\`\`

Write \`int area(const struct Rectangle *r)\` that returns the absolute area: \`abs(br.x - tl.x) * abs(br.y - tl.y)\`. Use chained dot/arrow accessors (\`r->tl.x\`).

Bonus: write \`int contains(const struct Rectangle *r, struct Point p)\` that returns 1 if \`p\` lies inside the rectangle.`,
    examples: [
      {
        input: "tl = (0,0), br = (5,3)",
        output: "area = 15",
        explanation: "5 × 3 = 15."
      },
      {
        input: "tl = (10,10), br = (3,4)",
        output: "area = 42",
        explanation: "|3-10| × |4-10| = 7 × 6 = 42 — order of corners doesn't matter."
      }
    ],
    constraints: [
      "Nest `Point` *by value* inside `Rectangle`.",
      "Use absolute differences so the result is non-negative.",
      "Function takes `const struct Rectangle *`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Point { int x; int y; };
struct Rectangle { struct Point tl; struct Point br; };

int area(const struct Rectangle *r) {
    int w = abs(r->br.x - r->tl.x);
    int h = abs(r->br.y - r->tl.y);
    return w * h;
}

int main(void) {
    // Reads tl.x tl.y br.x br.y from stdin (4 ints, any whitespace).
    struct Rectangle r;
    if (scanf("%d %d %d %d", &r.tl.x, &r.tl.y, &r.br.x, &r.br.y) != 4) return 1;
    printf("%d\\n", area(&r));
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Nested structs", url: BEEJ },
      { title: "cppreference — struct (data structures)", url: "https://en.cppreference.com/w/c/language/struct" }
    ]
  },

  {
    id: 28,
    number: "48",
    title: "Struct with function pointer",
    difficulty: "Hard",
    topic: "Structs",
    description: `Build a tiny "polymorphism" pattern using a struct that contains a function pointer:

\`\`\`
struct Animal {
    const char *name;
    void (*speak)(void);
};
\`\`\`

Define two free functions \`void dog_speak(void)\` (prints "Woof!") and \`void cat_speak(void)\` (prints "Meow!"). Create two \`Animal\` instances — a Dog and a Cat — each wired to its own \`speak\`. Iterate over an array of both and call \`a->speak()\` on each.

This is **exactly** how the Linux kernel's \`file_operations\`, \`net_device_ops\`, etc. work. Each driver fills in a struct of function pointers; the kernel calls through them without knowing or caring which driver is on the other side. Mastering this is non-negotiable for any kernel work.`,
    examples: [
      {
        input: "(no input)",
        output: `Rex says: Woof!
Whiskers says: Meow!`,
        explanation: "Same call site (`a->speak()`), different behaviour — dispatched through the struct's function pointer."
      }
    ],
    constraints: [
      "`speak` field type must be `void (*)(void)`.",
      "Both `speak` functions must have signature `void f(void)`.",
      "Iterate over an array of `Animal` and dispatch through the pointer."
    ],
    starterCode: `#include <stdio.h>

struct Animal {
    const char *name;
    void (*speak)(void);
};

void dog_speak(void) { printf("Woof!\\n"); }
void cat_speak(void) { printf("Meow!\\n"); }

int main(void) {
    struct Animal animals[] = {
        {"Rex",      dog_speak},
        {"Whiskers", cat_speak},
    };
    for (int i = 0; i < 2; i++) {
        printf("%s says: ", animals[i].name);
        animals[i].speak();
    }
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Function pointers in structs", url: BEEJ },
      { title: "Wikipedia — Function pointer", url: "https://en.wikipedia.org/wiki/Function_pointer" },
      { title: "Linux Kernel — file_operations (struct of fn ptrs)", url: "https://www.kernel.org/doc/html/latest/filesystems/vfs.html#the-file-operations-structure" }
    ]
  },

  // ===========================================================
  // SECTION 6 — Dynamic Memory
  // ===========================================================
  {
    id: 29,
    number: "49",
    title: "Dynamic array",
    difficulty: "Easy",
    topic: "Dynamic Memory",
    description: `Read an integer \`n\` from stdin. Allocate an \`int\` array of \`n\` elements on the heap with \`malloc(n * sizeof(int))\`. Fill it with squares: \`arr[i] = i * i\`. Print all values. Free with \`free(arr)\`.

Run under valgrind:
\`\`\`
gcc -g main.c -o main && valgrind --leak-check=full ./main
\`\`\`
You should see "All heap blocks were freed -- no leaks are possible".`,
    examples: [
      {
        input: "5",
        output: "0 1 4 9 16",
        explanation: "Squares of 0..4."
      }
    ],
    constraints: [
      "Always check the return value of `malloc` for `NULL`.",
      "`free` exactly once at the end.",
      "Verify under valgrind — no leaks."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 1;

    int *arr = malloc((size_t)n * sizeof *arr);
    if (!arr) return 1;

    // fill arr[i] = i * i and print

    free(arr);
    return 0;
}
`,
    references: [
      { title: "cppreference — malloc", url: "https://en.cppreference.com/w/c/memory/malloc" },
      { title: "Beej's Guide — Manual memory allocation", url: BEEJ },
      { title: "Valgrind quick start", url: VALGRIND_QS }
    ]
  },

  {
    id: 30,
    number: "50",
    title: "Dynamic string duplication",
    difficulty: "Easy",
    topic: "Dynamic Memory",
    description: `Implement \`char *my_strdup(const char *s)\` that:
1. Computes \`strlen(s)\`.
2. Allocates exactly \`strlen(s) + 1\` bytes (the +1 is for the \`'\\0'\`).
3. Copies the bytes.
4. Returns the new buffer (or \`NULL\` on allocation failure).

The caller is responsible for freeing the returned pointer. The standard library provides this as \`strdup\` (POSIX) — your job is to write it from scratch.

The driver reads a line from stdin, calls \`my_strdup\`, prints the duplicate, then \`free\`s it. Run under valgrind to confirm zero leaks.`,
    examples: [
      { input: "hello", output: "hello", explanation: "6 bytes allocated: 5 chars + null." },
      { input: "",      output: "",      explanation: "Empty string: just one byte (the null) copied." }
    ],
    constraints: [
      "Allocate exactly `strlen(s) + 1` bytes.",
      "Return `NULL` if `malloc` fails.",
      "Caller frees the result.",
      "No leaks under valgrind."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    size_t n = strlen(s) + 1;
    char *p = malloc(n);
    if (!p) return NULL;
    memcpy(p, s, n);
    return p;
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\\0';
    buf[strcspn(buf, "\\n")] = '\\0';
    char *s = my_strdup(buf);
    if (s) {
        printf("%s\\n", s);
        free(s);
    }
    return 0;
}
`,
    references: [
      { title: "Linux man page — strdup(3)", url: "https://man7.org/linux/man-pages/man3/strdup.3.html" },
      { title: "Beej's Guide — Strings + heap memory", url: BEEJ }
    ]
  },

  {
    id: 31,
    number: "51",
    title: "Growing array with realloc",
    difficulty: "Medium",
    topic: "Dynamic Memory",
    description: `Build a "vector"-style container that grows on demand.

1. Start with capacity 4: \`int *arr = malloc(4 * sizeof(int)); int cap = 4, n = 0;\`.
2. Read integers from stdin in a loop until EOF.
3. Whenever \`n == cap\`, double the capacity with \`realloc(arr, cap * 2 * sizeof(int))\`.
4. Append the new element. Increment \`n\`.
5. After EOF, print all \`n\` elements, then \`free\` the array.

Always **check the return value of \`realloc\`** before overwriting the original pointer — \`realloc\` can return \`NULL\` and leave your original allocation alive. Forgetting this is a classic memory leak.`,
    examples: [
      { input: "1 2 3 4 5 6 7", output: "1 2 3 4 5 6 7", explanation: "Capacity grows: 4 → 8 (after the 5th input)." }
    ],
    constraints: [
      "Initial capacity 4, doubling on each grow.",
      "Use `realloc` correctly — never reassign before NULL-checking.",
      "Free at the end. Verify with valgrind."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int cap = 4, n = 0;
    int *arr = malloc((size_t)cap * sizeof *arr);
    if (!arr) return 1;

    int x;
    while (scanf("%d", &x) == 1) {
        if (n == cap) {
            int new_cap = cap * 2;
            int *tmp = realloc(arr, (size_t)new_cap * sizeof *arr);
            if (!tmp) { free(arr); return 1; }
            arr = tmp; cap = new_cap;
        }
        arr[n++] = x;
    }

    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);
    return 0;
}
`,
    references: [
      { title: "cppreference — realloc", url: "https://en.cppreference.com/w/c/memory/realloc" },
      { title: "Beej's Guide — realloc and growing buffers", url: BEEJ },
      { title: "Valgrind quick start", url: VALGRIND_QS }
    ]
  },

  {
    id: 32,
    number: "52",
    title: "2D dynamic array",
    difficulty: "Medium",
    topic: "Dynamic Memory",
    description: `Allocate an \`m × n\` \`int\` matrix on the heap as an **array of pointers to rows**:

\`\`\`
int **mat = malloc(m * sizeof(int *));
for (int i = 0; i < m; i++)
    mat[i] = malloc(n * sizeof(int));
\`\`\`

Read \`m\` and \`n\` from stdin. Fill \`mat[i][j] = i * j\`. Print as a grid (one row per line, values space-separated). Then **free in reverse order**: each row, then the array of pointers.

Note that this layout is *not* contiguous in memory — each row may be in a different region. For tight numerical code, prefer one big \`malloc(m * n * sizeof(int))\` and access as \`mat[i*n + j]\` instead. This problem teaches the more flexible (and more verbose) layout because it shows up wherever rows have different lengths (e.g., jagged arrays, hash buckets).`,
    examples: [
      {
        input: "3 4",
        output: `0 0 0 0
0 1 2 3
0 2 4 6`,
        explanation: "mat[i][j] = i * j."
      },
      { input: "1 1", output: "0", explanation: "Smallest non-empty matrix." }
    ],
    constraints: [
      "Two-step allocation: outer + per-row.",
      "Two-step free: per-row + outer.",
      "1 ≤ m, n.",
      "Verify with valgrind: zero leaks."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int m, n;
    if (scanf("%d %d", &m, &n) != 2 || m <= 0 || n <= 0) return 1;
    int **mat = malloc((size_t)m * sizeof *mat);
    if (!mat) return 1;
    for (int i = 0; i < m; i++) {
        mat[i] = malloc((size_t)n * sizeof *mat[i]);
        if (!mat[i]) {
            for (int k = 0; k < i; k++) free(mat[k]);
            free(mat);
            return 1;
        }
    }

    // fill mat[i][j] = i*j and print

    for (int i = 0; i < m; i++) free(mat[i]);
    free(mat);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Multi-dimensional dynamic allocation", url: BEEJ },
      { title: "cppreference — malloc", url: "https://en.cppreference.com/w/c/memory/malloc" }
    ]
  },

  // ===========================================================
  // SECTION 7 — Linked List
  // ===========================================================
  {
    id: 33,
    number: "53",
    title: "Singly linked list — insert and print",
    difficulty: "Medium",
    topic: "Linked List",
    description: `Define:
\`\`\`
struct Node { int value; struct Node *next; };
\`\`\`

Implement three functions:
- \`void insert_head(struct Node **head, int value)\` — O(1) prepend.
- \`void insert_tail(struct Node **head, int value)\` — O(n) append.
- \`void print_list(struct Node *head)\` — print "v1 -> v2 -> ... -> NULL".

Note the **\`Node **head\`** in the insert signatures. You need a pointer-to-pointer because you may modify the head itself (when the list is initially empty, or when prepending).

The driver reads \`h V\` (insert head) or \`t V\` (insert tail) commands until EOF, then prints the final list. Allocate each node with \`malloc\`. Don't worry about freeing yet — that comes in problem #34.`,
    examples: [
      {
        input: `h 3
h 2
h 1
t 4`,
        output: `1 -> 2 -> 3 -> 4 -> NULL`,
        explanation: "Three prepends in reverse order build up `1->2->3`; the tail insert appends 4."
      },
      { input: "(no input)", output: "NULL", explanation: "Empty list prints as `NULL`." }
    ],
    constraints: [
      "Each insert allocates exactly one node.",
      "Use `Node **head` so the function can update the caller's head pointer.",
      "Print format: `v1 -> v2 -> ... -> NULL`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int value; struct Node *next; };

void insert_head(struct Node **head, int value) {
    struct Node *n = malloc(sizeof *n);
    n->value = value;
    n->next  = *head;
    *head = n;
}

void insert_tail(struct Node **head, int value) {
    // walk to the tail, append a new node
}

void print_list(struct Node *head) {
    while (head) { printf("%d -> ", head->value); head = head->next; }
    printf("NULL\\n");
}

int main(void) {
    struct Node *head = NULL;
    char cmd[8];
    int v;
    while (scanf("%7s %d", cmd, &v) == 2) {
        if      (strcmp(cmd, "h") == 0) insert_head(&head, v);
        else if (strcmp(cmd, "t") == 0) insert_tail(&head, v);
    }
    print_list(head);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Linked list", url: "https://en.wikipedia.org/wiki/Linked_list" },
      { title: "Beej's Guide — Linked lists", url: BEEJ },
      { title: "Linux kernel — list.h walkthrough (LWN)", url: "https://lwn.net/Articles/336255/" }
    ]
  },

  {
    id: 34,
    number: "54",
    title: "Linked list — delete a node",
    difficulty: "Medium",
    topic: "Linked List",
    description: `Extend problem #33 with \`int delete_value(struct Node **head, int value)\` that removes the first node whose \`value\` equals \`value\`. Return 1 if a node was deleted, 0 if not found.

Three cases to handle correctly:
1. **Empty list** — return 0.
2. **Head match** — update \`*head\` to \`(*head)->next\`, then \`free\` the old head.
3. **Middle/tail match** — walk with two pointers (\`prev\`, \`curr\`) until \`curr->value == value\`, then \`prev->next = curr->next; free(curr);\`.

Always free the deleted node. Run under valgrind to confirm no leaks.`,
    examples: [
      { input: `list = 1->2->3->4, delete(2)`, output: `1->3->4, returns 1`, explanation: "Middle deletion." },
      { input: `list = 1->2->3, delete(1)`,    output: `2->3,   returns 1`, explanation: "Head deletion — `*head` is updated." },
      { input: `list = 1->2->3, delete(99)`,   output: `1->2->3, returns 0`, explanation: "Not found." }
    ],
    constraints: [
      "Return value is 1 (deleted) or 0 (not found).",
      "Take `Node **head` so head deletion works.",
      "Free the deleted node — verify with valgrind."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int value; struct Node *next; };

int delete_value(struct Node **head, int value) {
    // handle empty list, head match, and walk-and-delete
    return 0;
}

/* ---- test driver: reads list values then a target ---- */
static void append(struct Node **head, int v) {
    struct Node *n = malloc(sizeof *n);
    n->value = v; n->next = NULL;
    if (!*head) { *head = n; return; }
    struct Node *t = *head;
    while (t->next) t = t->next;
    t->next = n;
}
static void print_list(struct Node *h) {
    while (h) { printf("%d -> ", h->value); h = h->next; }
    printf("NULL\\n");
}

int main(void) {
    struct Node *head = NULL;
    char line[1024];
    if (!fgets(line, sizeof line, stdin)) line[0] = '\\0';
    char *p = line;
    int v, n;
    while (sscanf(p, "%d%n", &v, &n) == 1) { append(&head, v); p += n; }

    int target = 0;
    if (scanf("%d", &target) != 1) target = 0;
    int r = delete_value(&head, target);
    printf("deleted=%d\\n", r);
    print_list(head);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Linked list operations", url: "https://en.wikipedia.org/wiki/Linked_list#Singly_linked_lists" },
      { title: "Beej's Guide — Pointers to pointers", url: BEEJ }
    ]
  },

  {
    id: 35,
    number: "55",
    title: "Reverse a linked list in-place",
    difficulty: "Hard",
    topic: "Linked List",
    description: `Reverse a singly linked list **by relinking nodes** — do not allocate new nodes, do not move values around, do not build a second list.

The canonical three-pointer dance:
\`\`\`
prev = NULL;
curr = head;
while (curr) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
}
return prev;   // new head
\`\`\`

After the loop, every node's \`next\` points to its previous neighbour, and the old tail is the new head.`,
    examples: [
      { input: `1 -> 2 -> 3 -> 4 -> NULL`, output: `4 -> 3 -> 2 -> 1 -> NULL`, explanation: "Each node's next pointer was flipped; no allocations." },
      { input: `(empty)`,                    output: `(empty)`,                  explanation: "Returns NULL." },
      { input: `1 -> NULL`,                  output: `1 -> NULL`,                explanation: "Single node — already 'reversed'." }
    ],
    constraints: [
      "No `malloc` allowed inside `reverse`.",
      "Return the new head pointer.",
      "O(n) time, O(1) extra space."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int value; struct Node *next; };

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    while (curr) {
        // next = curr->next; curr->next = prev; prev = curr; curr = next;
    }
    return prev;
}

/* ---- test driver: reads list values, reverses, prints ---- */
static void append(struct Node **head, int v) {
    struct Node *n = malloc(sizeof *n);
    n->value = v; n->next = NULL;
    if (!*head) { *head = n; return; }
    struct Node *t = *head;
    while (t->next) t = t->next;
    t->next = n;
}
static void print_list(struct Node *h) {
    while (h) { printf("%d -> ", h->value); h = h->next; }
    printf("NULL\\n");
}

int main(void) {
    struct Node *head = NULL;
    char line[1024];
    if (!fgets(line, sizeof line, stdin)) line[0] = '\\0';
    char *p = line;
    int v, n;
    while (sscanf(p, "%d%n", &v, &n) == 1) { append(&head, v); p += n; }

    head = reverse(head);
    print_list(head);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Linked list (reversing)", url: "https://en.wikipedia.org/wiki/Linked_list#Linked_list_operations" },
      { title: "Beej's Guide — Linked list manipulation", url: BEEJ }
    ]
  },

  {
    id: 36,
    number: "56",
    title: "Detect a cycle in a linked list",
    difficulty: "Hard",
    topic: "Linked List",
    description: `Given the head of a singly linked list, return 1 if the list contains a cycle (some node's \`next\` points back to a node you've already seen), 0 otherwise.

Use **Floyd's tortoise-and-hare algorithm**:
- \`slow\` advances one step at a time.
- \`fast\` advances two steps at a time.
- If there's a cycle, \`fast\` will eventually catch up to \`slow\` (because the gap closes by 1 per iteration once both are on the cycle).
- If there's no cycle, \`fast\` reaches \`NULL\`.

This is O(n) time and O(1) extra space — better than the naive "store visited nodes in a hash set" approach. The same idea underlies linked-list cycle bugs in the Linux kernel that have been spotted by automated static analysis.`,
    examples: [
      { input: `1 -> 2 -> 3 -> 4 -> 2 (cycle to node 2)`, output: "1", explanation: "Floyd's algorithm detects the cycle." },
      { input: `1 -> 2 -> 3 -> NULL`,                      output: "0", explanation: "No cycle — fast reaches NULL." }
    ],
    constraints: [
      "O(n) time, O(1) extra space.",
      "Do not modify the list.",
      "Return exactly 1 or 0."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int value; struct Node *next; };

int has_cycle(struct Node *head) {
    struct Node *slow = head;
    struct Node *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}

/* ---- test driver: reads list values then a cycle index (-1 = no cycle) ---- */
int main(void) {
    struct Node *head = NULL, *tail = NULL;
    struct Node *nodes[1024];
    int count = 0;

    char line[1024];
    if (!fgets(line, sizeof line, stdin)) line[0] = '\\0';
    char *p = line;
    int v, n;
    while (sscanf(p, "%d%n", &v, &n) == 1) {
        struct Node *node = malloc(sizeof *node);
        node->value = v; node->next = NULL;
        if (!head) head = node;
        if (tail) tail->next = node;
        tail = node;
        nodes[count++] = node;
        p += n;
    }

    int idx;
    if (scanf("%d", &idx) != 1) idx = -1;
    if (idx >= 0 && idx < count && tail) tail->next = nodes[idx];

    printf("%d\\n", has_cycle(head));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Cycle detection (Floyd's algorithm)", url: "https://en.wikipedia.org/wiki/Cycle_detection" },
      { title: "Beej's Guide — Linked lists", url: BEEJ }
    ]
  },

  // ===========================================================
  // SECTION 8 — File I/O
  // ===========================================================
  {
    id: 37,
    number: "61",
    title: "Write and read structs to a binary file",
    difficulty: "Medium",
    topic: "File I/O",
    description: `Define \`struct Student { char name[32]; int age; double grade; };\`. Build an array of 5 \`Student\`s. Write them to a binary file with \`fwrite(arr, sizeof(struct Student), 5, f)\`. Close the file.

Then reopen it for reading. Allocate a fresh array, read all 5 students with \`fread\`, and print them. Verify the values round-trip exactly.

Binary I/O is dramatically faster than text serialisation, but it's also non-portable — endianness, padding, and \`int\` size differences will all break a binary file when moved between platforms. For real-world use, prefer a documented format like Protocol Buffers, FlatBuffers, or even just JSON.`,
    examples: [
      {
        input: "(no input — five hardcoded students)",
        output: "Five round-tripped student records printed back identically",
        explanation: "fwrite + fread preserves the bytes verbatim."
      }
    ],
    constraints: [
      "Use `fwrite` / `fread`, not text I/O.",
      "File mode `\"wb\"` for write, `\"rb\"` for read.",
      "Verify equality after the round trip."
    ],
    starterCode: `#include <stdio.h>

struct Student {
    char   name[32];
    int    age;
    double grade;
};

int main(void) {
    struct Student arr[5] = {
        {"Alice", 19, 88.0},
        {"Bob",   20, 91.5},
        {"Carol", 21, 73.0},
        {"Dave",  20, 91.5},
        {"Eve",   22, 80.0},
    };

    FILE *fw = fopen("students.bin", "wb");
    fwrite(arr, sizeof(struct Student), 5, fw);
    fclose(fw);

    struct Student in[5];
    FILE *fr = fopen("students.bin", "rb");
    fread(in, sizeof(struct Student), 5, fr);
    fclose(fr);

    for (int i = 0; i < 5; i++)
        printf("%s %d %.1f\\n", in[i].name, in[i].age, in[i].grade);
    return 0;
}
`,
    references: [
      { title: "cppreference — fwrite", url: "https://en.cppreference.com/w/c/io/fwrite" },
      { title: "cppreference — fread", url: "https://en.cppreference.com/w/c/io/fread" },
      { title: "Beej's Guide — Binary file I/O", url: BEEJ }
    ]
  },

  // ===========================================================
  // SECTION 9 — Bitwise Operations
  // ===========================================================
  {
    id: 38,
    number: "62",
    title: "Bit manipulation toolkit",
    difficulty: "Easy",
    topic: "Bitwise Operations",
    description: `Implement four functions that operate on a single bit at position \`pos\` (0-indexed, where 0 is the least significant bit):

- \`unsigned set_bit(unsigned n, int pos)\`    → \`n | (1u << pos)\`
- \`unsigned clear_bit(unsigned n, int pos)\`  → \`n & ~(1u << pos)\`
- \`unsigned toggle_bit(unsigned n, int pos)\` → \`n ^ (1u << pos)\`
- \`int      check_bit(unsigned n, int pos)\`  → \`(n >> pos) & 1u\`

Read \`n\` (\`unsigned\`) and \`pos\` (0–31) from stdin and print all four operations using the same \`pos\`.`,
    examples: [
      {
        input: "10 0",
        output: `set    : 11
clear  : 10
toggle : 11
check  : 0`,
        explanation: "n = 0b1010, pos = 0. Bit 0 is off; setting/toggling makes it 11; clearing leaves 10; check returns 0."
      },
      {
        input: "10 1",
        output: `set    : 10
clear  : 8
toggle : 8
check  : 1`,
        explanation: "Bit 1 is on; set is a no-op; clear/toggle drop it; check returns 1."
      }
    ],
    constraints: [
      "Use `unsigned` types so right-shift is logical, not arithmetic.",
      "Each function is a one-liner.",
      "0 ≤ pos < 32."
    ],
    starterCode: `#include <stdio.h>

unsigned set_bit   (unsigned n, int pos) { return n | (1u << pos); }
unsigned clear_bit (unsigned n, int pos) { return n & ~(1u << pos); }
unsigned toggle_bit(unsigned n, int pos) { return n ^ (1u << pos); }
int      check_bit (unsigned n, int pos) { return (n >> pos) & 1u; }

int main(void) {
    unsigned n;
    int pos;
    if (scanf("%u %d", &n, &pos) != 2) return 1;
    printf("set    : %u\\n", set_bit(n, pos));
    printf("clear  : %u\\n", clear_bit(n, pos));
    printf("toggle : %u\\n", toggle_bit(n, pos));
    printf("check  : %d\\n", check_bit(n, pos));
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Bitwise operators", url: BEEJ },
      { title: "Wikipedia — Bitwise operation", url: "https://en.wikipedia.org/wiki/Bitwise_operation" },
      { title: "cppreference — Bitwise operators", url: "https://en.cppreference.com/w/c/language/operator_arithmetic" }
    ]
  },

  {
    id: 39,
    number: "63",
    title: "Count set bits (popcount)",
    difficulty: "Easy",
    topic: "Bitwise Operations",
    description: `Count the number of 1-bits in a 32-bit unsigned integer. Implement **two** versions:

1. **Naive shift loop** — walk all 32 bits, increment counter when \`n & 1\` is set, then \`n >>= 1\`. Always 32 iterations.
2. **Brian Kernighan's trick** — \`n &= n - 1\` clears the lowest set bit each iteration. Loop until \`n == 0\`. Number of iterations equals the popcount, so this is fast on sparse inputs.

Both must produce the same answer. Read whitespace-separated unsigned values from stdin until EOF and print one line per value: \`N naive=X kernighan=X\`.`,
    examples: [
      { input: "0",          output: "0 naive=0 kernighan=0",   explanation: "No bits set." },
      { input: "7",          output: "7 naive=3 kernighan=3",   explanation: "0b111." },
      { input: "4294967295", output: "4294967295 naive=32 kernighan=32", explanation: "All 32 bits set (0xFFFFFFFF)." }
    ],
    constraints: [
      "Use `unsigned` for `n`.",
      "Implement both algorithms.",
      "Their outputs must match for every input."
    ],
    starterCode: `#include <stdio.h>

int popcount_naive(unsigned n) {
    int c = 0;
    for (int i = 0; i < 32; i++) {
        if (n & 1) c++;
        n >>= 1;
    }
    return c;
}

int popcount_kernighan(unsigned n) {
    int c = 0;
    while (n) { n &= n - 1; c++; }
    return c;
}

int main(void) {
    unsigned n;
    while (scanf("%u", &n) == 1) {
        printf("%u naive=%d kernighan=%d\\n",
               n, popcount_naive(n), popcount_kernighan(n));
    }
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Hamming weight (popcount)", url: "https://en.wikipedia.org/wiki/Hamming_weight" },
      { title: "Sean Anderson — Bit Twiddling Hacks", url: "https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan" }
    ]
  },

  {
    id: 40,
    number: "64",
    title: "Check if a number is a power of 2",
    difficulty: "Easy",
    topic: "Bitwise Operations",
    description: `Return 1 if \`n\` is a power of 2 (1, 2, 4, 8, 16, ...), 0 otherwise. **No loops, no division — a single bitwise expression.**

The trick: a power of 2 has exactly one bit set, like \`0b001000\`. Subtracting 1 produces \`0b000111\` (all lower bits set, the original bit cleared). \`n & (n - 1)\` is therefore \`0\` only when \`n\` was a power of 2.

Edge case: \`n == 0\` also gives \`n & (n - 1) == 0\`, but 0 is *not* a power of 2. So the final test is \`n != 0 && (n & (n - 1)) == 0\`.`,
    examples: [
      { input: "n = 1",  output: "1", explanation: "2⁰." },
      { input: "n = 16", output: "1", explanation: "2⁴." },
      { input: "n = 18", output: "0", explanation: "Two bits set." },
      { input: "n = 0",  output: "0", explanation: "Zero is not a power of 2 — the edge case." }
    ],
    constraints: [
      "Single bitwise expression — no loops.",
      "Handle `n == 0` correctly (return 0).",
      "Use `unsigned` to avoid signed-shift issues."
    ],
    starterCode: `#include <stdio.h>

int is_power_of_two(unsigned n) {
    return n != 0 && (n & (n - 1)) == 0;
}

int main(void) {
    for (unsigned n = 0; n <= 20; n++)
        printf("%2u -> %d\\n", n, is_power_of_two(n));
    return 0;
}
`,
    references: [
      { title: "Sean Anderson — Bit Twiddling Hacks (power of 2)", url: "https://graphics.stanford.edu/~seander/bithacks.html#DetermineIfPowerOf2" },
      { title: "Wikipedia — Power of two", url: "https://en.wikipedia.org/wiki/Power_of_two" }
    ]
  },

  {
    id: 41,
    number: "65",
    title: "Permission flags using bitmasks",
    difficulty: "Medium",
    topic: "Bitwise Operations",
    description: `Define three flags as powers of two: \`READ = 1\`, \`WRITE = 2\`, \`EXEC = 4\`. Treat an \`unsigned\` integer as a permission set. Implement:

- \`unsigned grant (unsigned p, unsigned flag)\`  — turn the flag bit on.
- \`unsigned revoke(unsigned p, unsigned flag)\`  — turn the flag bit off.
- \`int      has   (unsigned p, unsigned flag)\`  — return 1 iff the flag bit is set.

Bonus: support multi-flag operations like \`grant(p, READ | WRITE)\`.

This pattern is *everywhere* in the kernel — \`O_RDONLY | O_CREAT\` for \`open\`, \`PROT_READ | PROT_WRITE\` for \`mprotect\`, page-table entry flags, capability bits, etc.`,
    examples: [
      { input: "p = 0, grant(READ)",                output: "1 (READ)",          explanation: "Bit 0 set." },
      { input: "p = 7, revoke(WRITE)",              output: "5 (READ | EXEC)",   explanation: "Bit 1 cleared." },
      { input: "p = 5, has(READ)",                  output: "1",                  explanation: "Bit 0 is set." },
      { input: "p = 5, has(WRITE)",                 output: "0",                  explanation: "Bit 1 is clear." }
    ],
    constraints: [
      "Flags must be powers of two.",
      "Each function is a one-liner.",
      "Multi-flag operations (`grant(p, READ | WRITE)`) should work without modification."
    ],
    starterCode: `#include <stdio.h>

#define READ  1u
#define WRITE 2u
#define EXEC  4u

unsigned grant (unsigned p, unsigned f) { return p | f; }
unsigned revoke(unsigned p, unsigned f) { return p & ~f; }
int      has   (unsigned p, unsigned f) { return (p & f) == f; }

int main(void) {
    unsigned p = 0;
    p = grant(p, READ | WRITE);
    printf("has READ:  %d\\n", has(p, READ));
    printf("has EXEC:  %d\\n", has(p, EXEC));
    p = revoke(p, WRITE);
    printf("perm bits: %u\\n", p);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Bitmasks", url: BEEJ },
      { title: "Linux man page — open(2) flags", url: "https://man7.org/linux/man-pages/man2/open.2.html" }
    ]
  },

  {
    id: 42,
    number: "66",
    title: "Swap two integers without a temp variable",
    difficulty: "Medium",
    topic: "Bitwise Operations",
    description: `Swap two integers \`a\` and \`b\` using only XOR — no temp, no addition tricks:

\`\`\`
a ^= b;
b ^= a;
a ^= b;
\`\`\`

Walk through *why* this works at the bit level. \`a ^ b\` on the first line gives a value where each bit is 1 iff the two original bits differed. The second XOR cancels \`a\`'s contribution, leaving \`b\`'s original bits in \`a\`. The third XOR does the symmetric thing. Net effect: original \`a\` and \`b\` are swapped.

**Caveat**: this trick fails if \`&a == &b\` (same memory address), because the first \`a ^= b\` makes \`a\` zero. Guard against this in production code; for this exercise just be aware of the trap.

The driver reads two integers \`a\` and \`b\` from stdin and prints \`x=B y=A\` after swapping. In real code, just use a temp. The XOR swap is a fun puzzle and a window into bit-level reasoning, not a recommended idiom.`,
    examples: [
      { input: "5 9",  output: "x=9 y=5",   explanation: "Three XOR steps swap the values." },
      { input: "0 0",  output: "x=0 y=0",   explanation: "Swapping equal values is a no-op." }
    ],
    constraints: [
      "No temporary variable.",
      "No arithmetic — only `^=`.",
      "Both `a` and `b` must hold their swapped values after."
    ],
    starterCode: `#include <stdio.h>

void swap_xor(int *a, int *b) {
    if (a == b) return;
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}

int main(void) {
    int x, y;
    if (scanf("%d %d", &x, &y) != 2) return 1;
    swap_xor(&x, &y);
    printf("x=%d y=%d\\n", x, y);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — XOR swap algorithm", url: "https://en.wikipedia.org/wiki/XOR_swap_algorithm" },
      { title: "Beej's Guide — Bitwise operators", url: BEEJ }
    ]
  },

  {
    id: 43,
    number: "67",
    title: "Extract bytes from an integer",
    difficulty: "Medium",
    topic: "Bitwise Operations",
    description: `Given a 32-bit unsigned integer \`n\`, extract each of its four bytes using shift + mask, print each as a two-digit hex value, then **reassemble** the original integer from the four bytes.

Extraction:
\`\`\`
b0 = (n >> 0)  & 0xFF;   // LSB
b1 = (n >> 8)  & 0xFF;
b2 = (n >> 16) & 0xFF;
b3 = (n >> 24) & 0xFF;   // MSB
\`\`\`

Reassembly:
\`\`\`
m = ((unsigned)b3 << 24) | ((unsigned)b2 << 16) | ((unsigned)b1 << 8) | b0;
assert(m == n);
\`\`\`

This same pattern is used everywhere in network code (parsing TCP/IP headers), filesystems (parsing on-disk records), and serialisation. Note that this extracts in *little-endian* logical order regardless of host endianness — the integer is treated as a logical value, not as bytes-in-memory.`,
    examples: [
      {
        input: "n = 0xDEADBEEF",
        output: `b0 = 0xEF
b1 = 0xBE
b2 = 0xAD
b3 = 0xDE
reassembled = 0xDEADBEEF`,
        explanation: "Each byte extracted, then OR'd back together to recover n."
      }
    ],
    constraints: [
      "Use shift + mask only — no `memcpy` or pointer aliasing.",
      "Print each byte as `0x%02X`.",
      "Reassembled value must equal the original."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n = 0xDEADBEEFu;

    uint8_t b0 = (n >> 0)  & 0xFFu;
    uint8_t b1 = (n >> 8)  & 0xFFu;
    uint8_t b2 = (n >> 16) & 0xFFu;
    uint8_t b3 = (n >> 24) & 0xFFu;

    printf("b0=0x%02X b1=0x%02X b2=0x%02X b3=0x%02X\\n", b0, b1, b2, b3);

    uint32_t m = ((uint32_t)b3 << 24) | ((uint32_t)b2 << 16)
               | ((uint32_t)b1 << 8)  |  (uint32_t)b0;
    printf("reassembled = 0x%08X\\n", m);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Bitwise operators", url: BEEJ },
      { title: "Wikipedia — Endianness", url: "https://en.wikipedia.org/wiki/Endianness" },
      { title: "Sean Anderson — Bit Twiddling Hacks", url: "https://graphics.stanford.edu/~seander/bithacks.html" }
    ]
  },

  // ===========================================================
  // SECTION 10 — Capstones
  // ===========================================================
  {
    id: 44,
    number: "71",
    title: "Implement a stack (dynamic, heap-allocated)",
    difficulty: "Hard",
    topic: "Capstones",
    description: `Build a generic LIFO **stack of \`int\`s** with the following API:

\`\`\`
typedef struct {
    int *data;
    size_t len;
    size_t cap;
} Stack;

void  stack_init   (Stack *s);
void  stack_push   (Stack *s, int x);  // doubles capacity when full
int   stack_pop    (Stack *s);          // undefined behaviour if empty
int   stack_peek   (const Stack *s);
int   stack_empty  (const Stack *s);
void  stack_destroy(Stack *s);
\`\`\`

Storage is a heap-allocated array that doubles when full (initial capacity 4). \`stack_destroy\` must \`free\` the array and reset the struct.

Run a representative sequence (push 100 ints, pop 100 ints) and verify under valgrind: zero leaks, zero invalid reads. This problem combines pointers, dynamic memory, and structs — and it's the foundation for every recursion-to-iteration conversion you'll do later.`,
    examples: [
      {
        input: "push 1, push 2, push 3, pop, peek, pop, pop",
        output: `pop -> 3
peek -> 2
pop -> 2
pop -> 1`,
        explanation: "LIFO order; capacity grows from 4 → 8 etc. as needed."
      }
    ],
    constraints: [
      "Initial capacity 4, doubling on grow.",
      "All heap memory freed before exit.",
      "Verify with `valgrind --leak-check=full`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
#include <string.h>

typedef struct { int *data; size_t len; size_t cap; } Stack;

void stack_init   (Stack *s);
void stack_push   (Stack *s, int x);
int  stack_pop    (Stack *s);
int  stack_peek   (const Stack *s);
int  stack_empty  (const Stack *s);
void stack_destroy(Stack *s);

/* ---- test driver: reads commands "push N" / "pop" / "peek" ---- */
int main(void) {
    Stack s; stack_init(&s);
    char cmd[64];
    int x;
    while (scanf("%63s", cmd) == 1) {
        if (strcmp(cmd, "push") == 0) {
            if (scanf("%d", &x) == 1) stack_push(&s, x);
        } else if (strcmp(cmd, "pop") == 0) {
            printf("pop=%d\\n", stack_pop(&s));
        } else if (strcmp(cmd, "peek") == 0) {
            printf("peek=%d\\n", stack_peek(&s));
        }
    }
    stack_destroy(&s);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Stack (abstract data type)", url: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)" },
      { title: "Beej's Guide — Dynamic memory & realloc", url: BEEJ },
      { title: "Valgrind quick start", url: VALGRIND_QS }
    ]
  },

  {
    id: 45,
    number: "72",
    title: "Implement a basic hash map",
    difficulty: "Hard",
    topic: "Capstones",
    description: `Build a hash map keyed by **C-strings** with **\`int\` values**. Resolve collisions with **separate chaining** — each bucket holds a singly linked list of entries.

\`\`\`
typedef struct Entry {
    char *key;
    int   value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t  n_buckets;
} HashMap;

void hashmap_init   (HashMap *m, size_t n_buckets);
void hashmap_put    (HashMap *m, const char *key, int value);
int  hashmap_get    (const HashMap *m, const char *key, int *out);
int  hashmap_delete (HashMap *m, const char *key);
void hashmap_destroy(HashMap *m);
\`\`\`

Use a simple string hash (e.g., djb2: \`hash = hash * 33 + c\`). \`hashmap_put\` should overwrite an existing key. \`hashmap_destroy\` must free **every** entry's \`key\`, the entry itself, and the bucket array. Run under valgrind — zero leaks.`,
    examples: [
      {
        input: 'put("one", 1); put("two", 2); get("two") → 2; delete("one"); get("one") → not found',
        output: "Round-trip works; deletes succeed; final destroy leaks nothing.",
        explanation: "Even with bucket collisions, the per-bucket chain handles them transparently."
      }
    ],
    constraints: [
      "Use separate chaining for collisions.",
      "Hash function must be deterministic.",
      "All allocations (keys, entries, bucket array) must be freed in `destroy`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    int   value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t  n_buckets;
} HashMap;

static unsigned long djb2(const char *s) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = h * 33 + c;
    return h;
}

void hashmap_init(HashMap *m, size_t n) {
    m->buckets = calloc(n, sizeof *m->buckets);
    m->n_buckets = n;
}

void hashmap_put(HashMap *m, const char *key, int value);
int  hashmap_get(const HashMap *m, const char *key, int *out);
int  hashmap_delete(HashMap *m, const char *key);
void hashmap_destroy(HashMap *m);

/* ---- test driver: reads "put K V", "get K", "del K" commands ---- */
int main(void) {
    HashMap m; hashmap_init(&m, 16);
    char cmd[64], key[256];
    int v;
    while (scanf("%63s", cmd) == 1) {
        if (strcmp(cmd, "put") == 0) {
            if (scanf("%255s %d", key, &v) == 2) hashmap_put(&m, key, v);
        } else if (strcmp(cmd, "get") == 0) {
            if (scanf("%255s", key) != 1) continue;
            int out;
            if (hashmap_get(&m, key, &out)) printf("get=%d\\n", out);
            else printf("miss\\n");
        } else if (strcmp(cmd, "del") == 0) {
            if (scanf("%255s", key) != 1) continue;
            int r = hashmap_delete(&m, key);
            if (r) printf("del=%d\\n", r);
            else printf("miss\\n");
        }
    }
    hashmap_destroy(&m);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Hash table", url: "https://en.wikipedia.org/wiki/Hash_table" },
      { title: "djb2 string hash explanation", url: "http://www.cse.yorku.ca/~oz/hash.html" },
      { title: "Beej's Guide — Linked lists & dynamic memory", url: BEEJ }
    ]
  },

  // ===========================================================
  // SECTION 3 (cont.) — Pointers (additional)
  // ===========================================================
  {
    id: 46,
    number: "16",
    title: "Pointer to pointer — modify a pointer through a function",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Write \`int allocate_and_fill(int **out, int n, int value)\` that:
1. Allocates an array of \`n\` \`int\`s on the heap with \`malloc\`.
2. Fills every element with \`value\`.
3. Stores the address of the new array in \`*out\` so the **caller's pointer** now points at the heap allocation.
4. Returns \`0\` on success, \`-1\` on allocation failure (without modifying \`*out\`).

This is the canonical "out-parameter" pattern in C. To change a caller's pointer you must take a pointer-to-pointer; passing a plain \`int *\` would only mutate a local copy.

The driver \`main\` reads \`n\` and \`value\` from stdin, calls the function, and prints the array followed by \`ok\`. Free the memory before exit so a Valgrind run is clean.`,
    examples: [
      { input: "5 7",  output: "7 7 7 7 7\nok",   explanation: "n=5, value=7 → array of five 7s." },
      { input: "1 0",  output: "0\nok",           explanation: "n=1 → single element." },
      { input: "3 -1", output: "-1 -1 -1\nok",    explanation: "Negative fill value works the same way." }
    ],
    constraints: [
      "Function signature must be `int allocate_and_fill(int **out, int n, int value)`.",
      "On success, write the new pointer to `*out` and return 0.",
      "On `malloc` failure, return -1 and leave `*out` unchanged.",
      "1 ≤ n ≤ 1000.",
      "Free the array in `main` before returning.",
      "Compile cleanly with `-Wall -Wextra`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int allocate_and_fill(int **out, int n, int value) {
    // 1. malloc n * sizeof(int)
    // 2. fill with value
    // 3. *out = ptr; return 0
    // On malloc failure: return -1 (do not touch *out)
    return -1;
}

int main(void) {
    int n, value;
    if (scanf("%d %d", &n, &value) != 2) return 1;

    int *arr = NULL;
    if (allocate_and_fill(&arr, n, value) != 0) {
        fprintf(stderr, "alloc failed\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], i + 1 == n ? "\\n" : " ");
    }
    puts("ok");

    free(arr);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Pointers to pointers", url: BEEJ_HTML + "pointers2.html" },
      { title: "cppreference — Pointer declaration", url: "https://en.cppreference.com/w/c/language/pointer" },
      { title: "Linux kernel — out-parameters & error returns", url: "https://www.kernel.org/doc/html/latest/process/coding-style.html" }
    ]
  },

  {
    id: 47,
    number: "17",
    title: "Array of pointers vs pointer to array",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Two declarations that look almost identical have very different layouts:

\`\`\`c
int *ap[3];      // array of 3 int pointers — 3 separate ints, one per pointer
int (*pa)[3];    // pointer to an array of 3 ints  — points at one contiguous block
\`\`\`

Build a tiny program that reads 3 integers from stdin, then exercises both forms:

1. \`ap\` — for each of the three integers, allocate a fresh \`int\` on the heap, store the value, and put its address into \`ap[i]\`.
2. \`pa\` — make a stack array \`int row[3]\` of the same three values and set \`pa = &row\`.

Print, on three separate lines:
- \`ap: a b c\` — values dereferenced via \`*ap[i]\`
- \`pa: a b c\` — values dereferenced via \`(*pa)[i]\`
- \`sizeof: ap=24 pa=8\` — for IDE Linux x86_64. Use \`%zu\` and don't hardcode; print \`sizeof(ap)\` and \`sizeof(pa)\`.

The point: \`sizeof(ap) == 3 * sizeof(int*)\` (one pointer per slot), while \`sizeof(pa) == sizeof(int*)\` — \`pa\` is a single pointer regardless of the array width.`,
    examples: [
      {
        input: "1 2 3",
        output: `ap: 1 2 3
pa: 1 2 3
sizeof: ap=24 pa=8`,
        explanation: "On Linux x86_64 a pointer is 8 bytes, so 3 pointers = 24."
      },
      {
        input: "10 -5 0",
        output: `ap: 10 -5 0
pa: 10 -5 0
sizeof: ap=24 pa=8`,
        explanation: "Sign and zero work the same way."
      }
    ],
    constraints: [
      "Declare `int *ap[3];` and `int (*pa)[3];` exactly.",
      "`ap[i]` must point at a separately `malloc`-ed `int`.",
      "`pa` must be set to `&row` where `row` is a 3-element stack array.",
      "Print sizes with `%zu`, not hardcoded values.",
      "Free everything `ap[i]` before returning."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;

    int *ap[3];           // array of 3 pointers
    int row[3] = { a, b, c };
    int (*pa)[3] = &row;  // pointer to an array of 3 ints

    // TODO: malloc 3 ints and assign to ap[0], ap[1], ap[2].

    // Print "ap: x y z"
    // Print "pa: x y z"   using (*pa)[i]
    // Print "sizeof: ap=%zu pa=%zu"

    // Free the malloc'd ints.
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Arrays vs pointers", url: BEEJ_HTML + "arrays.html" },
      { title: "cppreference — Array declaration", url: "https://en.cppreference.com/w/c/language/array" },
      { title: "C FAQ — \"What's the difference between (int *)[10] and int (*)[10]?\"", url: "https://c-faq.com/aryptr/" }
    ]
  },

  {
    id: 48,
    number: "18",
    title: "Endianness detection and byteswap",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Write a program that prints the host endianness and round-trips a 32-bit integer through a manual byteswap.

Implement these helpers:
- \`int is_little_endian(void)\` — returns 1 on little-endian hosts, 0 on big-endian. Use the classic union/cast trick: store \`1\` in a \`uint32_t\` and read its first byte through a \`uint8_t *\`.
- \`uint32_t bswap32(uint32_t x)\` — reverse the byte order: \`0xAABBCCDD\` → \`0xDDCCBBAA\`.

\`main\` reads a single unsigned 32-bit integer from stdin (decimal) and prints:
\`\`\`
endian=<little|big>
orig=<hex>
swap=<hex>
roundtrip=<hex>
\`\`\`
Each hex value is in \`0x%08x\` form (lowercase, 8 digits). \`roundtrip\` is \`bswap32(bswap32(x))\` and must equal \`orig\`.

Endianness is the difference between "the on-the-wire layout" and "what the CPU reads". Network protocols are big-endian, x86/ARM are little-endian, so kernel networking is full of \`htonl\`/\`ntohl\` calls — knowing exactly *what* gets swapped is core systems C.`,
    examples: [
      {
        input: "1",
        output: `endian=little
orig=0x00000001
swap=0x01000000
roundtrip=0x00000001`,
        explanation: "Bytes [00 00 00 01] reversed → [01 00 00 00] = 0x01000000."
      },
      {
        input: "305419896",
        output: `endian=little
orig=0x12345678
swap=0x78563412
roundtrip=0x12345678`,
        explanation: "0x12345678 byte-reversed is 0x78563412."
      }
    ],
    constraints: [
      "`is_little_endian` must inspect memory — do not rely on `__BYTE_ORDER__`.",
      "`bswap32` must use shifts and masks; do not call `__builtin_bswap32` or `htonl`.",
      "Print hex with `%08x` (lowercase, zero-padded to 8 digits).",
      "0 ≤ x ≤ 4294967295 (fits in `uint32_t`)."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

int is_little_endian(void) {
    // Hint: union { uint32_t i; uint8_t b[4]; } u = { .i = 1 };
    return 0;
}

uint32_t bswap32(uint32_t x) {
    // Reverse the 4 bytes of x.
    return 0;
}

int main(void) {
    uint32_t x;
    if (scanf("%u", &x) != 1) return 1;

    printf("endian=%s\\n", is_little_endian() ? "little" : "big");
    printf("orig=0x%08x\\n", x);
    printf("swap=0x%08x\\n", bswap32(x));
    printf("roundtrip=0x%08x\\n", bswap32(bswap32(x)));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Endianness", url: "https://en.wikipedia.org/wiki/Endianness" },
      { title: "Beej's Guide — Networking, htonl/ntohl", url: "https://beej.us/guide/bgnet/" },
      { title: "Linux kernel — byteorder.h", url: "https://elixir.bootlin.com/linux/latest/source/include/uapi/linux/byteorder/little_endian.h" }
    ]
  },

  {
    id: 49,
    number: "19",
    title: "Union type punning — decode an IPv4 header",
    difficulty: "Hard",
    topic: "Pointers",
    description: `Use a \`union\` to view the same 20 bytes as both a raw byte buffer and a structured IPv4 header. This is exactly how kernel network code parses packets off the wire.

Define:
\`\`\`c
typedef struct {
    uint8_t  ver_ihl;     // version (high 4) | IHL (low 4)
    uint8_t  tos;
    uint16_t total_len;   // network byte order
    uint16_t id;
    uint16_t flags_frag;
    uint8_t  ttl;
    uint8_t  protocol;
    uint16_t checksum;
    uint32_t src;         // network byte order
    uint32_t dst;         // network byte order
} ipv4_hdr_t;             // 20 bytes, packed

typedef union {
    uint8_t    raw[20];
    ipv4_hdr_t hdr;
} ipv4_packet_t;
\`\`\`
Use \`__attribute__((packed))\` on the struct so it is exactly 20 bytes with no padding.

\`main\` reads 20 hex bytes from stdin (space-separated, like \`45 00 00 3c ...\`), stores them in \`pkt.raw\`, then prints fields read from \`pkt.hdr\` — converting multi-byte fields from network order using your own \`ntohs\`/\`ntohl\` (or shifts):

\`\`\`
version=4
ihl=5
total_len=60
ttl=64
proto=6
src=192.168.1.10
dst=8.8.8.8
\`\`\`

Format the IP addresses as dotted-quad. The point of this problem is to *not* memcpy fields out — you read them directly through the union view, the way kernel \`skb\` code does.`,
    examples: [
      {
        input: "45 00 00 3c 1c 46 40 00 40 06 b1 e6 c0 a8 01 0a 08 08 08 08",
        output: `version=4
ihl=5
total_len=60
ttl=64
proto=6
src=192.168.1.10
dst=8.8.8.8`,
        explanation: "Standard TCP packet header from 192.168.1.10 to 8.8.8.8 (Google DNS)."
      },
      {
        input: "45 00 05 dc 00 00 40 00 40 11 00 00 0a 00 00 01 0a 00 00 02",
        output: `version=4
ihl=5
total_len=1500
ttl=64
proto=17
src=10.0.0.1
dst=10.0.0.2`,
        explanation: "1500-byte UDP packet (proto=17) on a LAN."
      }
    ],
    constraints: [
      "Define a packed `ipv4_hdr_t` struct of exactly 20 bytes.",
      "Use a `union` with `uint8_t raw[20]` and the struct.",
      "Verify `sizeof(ipv4_hdr_t) == 20` (use `_Static_assert` or assert).",
      "Convert multi-byte fields from network (big-endian) order yourself.",
      "Print `version` from the high nibble of `ver_ihl`, `ihl` from the low nibble."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>
#include <assert.h>

typedef struct __attribute__((packed)) {
    uint8_t  ver_ihl;
    uint8_t  tos;
    uint16_t total_len;
    uint16_t id;
    uint16_t flags_frag;
    uint8_t  ttl;
    uint8_t  protocol;
    uint16_t checksum;
    uint32_t src;
    uint32_t dst;
} ipv4_hdr_t;

_Static_assert(sizeof(ipv4_hdr_t) == 20, "IPv4 header must be 20 bytes");

typedef union {
    uint8_t    raw[20];
    ipv4_hdr_t hdr;
} ipv4_packet_t;

static uint16_t my_ntohs(uint16_t x) { return (uint16_t)((x >> 8) | (x << 8)); }
static uint32_t my_ntohl(uint32_t x) {
    return ((x & 0x000000ffu) << 24) |
           ((x & 0x0000ff00u) <<  8) |
           ((x & 0x00ff0000u) >>  8) |
           ((x & 0xff000000u) >> 24);
}

int main(void) {
    ipv4_packet_t pkt;
    for (int i = 0; i < 20; i++) {
        unsigned int b;
        if (scanf("%x", &b) != 1) return 1;
        pkt.raw[i] = (uint8_t)b;
    }

    // TODO: print fields using pkt.hdr — apply my_ntohs / my_ntohl as needed.
    // Format src/dst as dotted-quad.

    return 0;
}
`,
    references: [
      { title: "Wikipedia — IPv4 header", url: "https://en.wikipedia.org/wiki/IPv4#Header" },
      { title: "GCC manual — __attribute__((packed))", url: "https://gcc.gnu.org/onlinedocs/gcc/Common-Type-Attributes.html" },
      { title: "Linux kernel — struct iphdr", url: "https://elixir.bootlin.com/linux/latest/source/include/uapi/linux/ip.h" }
    ]
  },

  {
    id: 50,
    number: "20",
    title: "Bit-fields — page-table entry",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Model an x86 page-table entry (PTE) using **bit-fields**. A 32-bit PTE on a classic x86 CPU lays out as:

| bits   | field        | meaning                          |
|--------|--------------|----------------------------------|
| 0      | present      | 1 = page is in RAM               |
| 1      | rw           | 1 = writable                     |
| 2      | user         | 1 = user accessible (CPL=3)      |
| 3      | pwt          | write-through                    |
| 4      | pcd          | cache-disable                    |
| 5      | accessed     | set by CPU on access             |
| 6      | dirty        | set by CPU on write              |
| 7      | pat          | page-attribute table             |
| 8      | global       | survive TLB flush                |
| 9–11   | avail        | OS-defined (3 bits)              |
| 12–31  | pfn          | physical frame number (20 bits)  |

Define a packed struct of bit-fields with exactly that layout. Read one decimal \`uint32_t\` from stdin (the raw PTE), then print:

\`\`\`
present=<0|1>
rw=<0|1>
user=<0|1>
accessed=<0|1>
dirty=<0|1>
pfn=0x<5 hex digits>
\`\`\`

Include a \`_Static_assert\` that \`sizeof(pte_t) == 4\`.

Bit-fields are how the kernel describes hardware-defined layouts (page tables, descriptors, control registers) without manual masking. You learn one declaration of intent and the compiler does the shifts.`,
    examples: [
      {
        input: "3",
        output: `present=1
rw=1
user=0
accessed=0
dirty=0
pfn=0x00000`,
        explanation: "0b00000011 → present and rw set, no PFN."
      },
      {
        input: "4294963203",
        output: `present=1
rw=1
user=0
accessed=0
dirty=0
pfn=0xfffff`,
        explanation: "4294963203 = 0xfffff003 → top 20 bits = pfn (0xfffff), low bits = present|rw."
      },
      {
        input: "103",
        output: `present=1
rw=1
user=1
accessed=1
dirty=1
pfn=0x00000`,
        explanation: "0b01100111 → all five flags set, no PFN."
      }
    ],
    constraints: [
      "Use a `union` of `uint32_t raw` and a packed bit-field struct.",
      "Layout must match the table above (LSB → MSB).",
      "`_Static_assert(sizeof(pte_t) == 4)` must compile.",
      "Print the PFN as `%05x` (lowercase, 5 hex digits).",
      "Read input as `uint32_t` decimal (`%u`)."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

typedef union {
    uint32_t raw;
    struct {
        uint32_t present  : 1;
        uint32_t rw       : 1;
        uint32_t user     : 1;
        uint32_t pwt      : 1;
        uint32_t pcd      : 1;
        uint32_t accessed : 1;
        uint32_t dirty    : 1;
        uint32_t pat      : 1;
        uint32_t global   : 1;
        uint32_t avail    : 3;
        uint32_t pfn      : 20;
    };
} pte_t;

_Static_assert(sizeof(pte_t) == 4, "PTE must be 4 bytes");

int main(void) {
    pte_t pte;
    if (scanf("%u", &pte.raw) != 1) return 1;

    // TODO: print present, rw, user, accessed, dirty, pfn (as %05x).
    return 0;
}
`,
    references: [
      { title: "cppreference — Bit-fields", url: "https://en.cppreference.com/w/c/language/bit_field" },
      { title: "Intel SDM — paging structures (Vol. 3, Ch. 4)", url: "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html" },
      { title: "OSDev wiki — Paging", url: "https://wiki.osdev.org/Paging" }
    ]
  },

  {
    id: 51,
    number: "21",
    title: "Generic swap with void *",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Write \`void mem_swap(void *a, void *b, size_t size)\` that swaps the contents of two memory regions of arbitrary size, byte by byte. This is the \`qsort\`/\`memcpy\` style of generic programming in C — no templates, just \`void *\` and a size.

Constraints:
- The two regions are disjoint (no overlap).
- Use a stack buffer of fixed size (e.g. 64 bytes) and loop in chunks so memory usage is O(1) — do **not** \`malloc\`.

The driver reads:
1. An integer \`mode\` ∈ {0, 1, 2}.
2. If \`mode == 0\`: two \`int\`s, swap them, print \`a=<x> b=<y>\`.
3. If \`mode == 1\`: two \`double\`s, swap them, print \`a=<x> b=<y>\` with \`%g\`.
4. If \`mode == 2\`: two strings (each up to 31 chars), swap them as fixed 32-byte char arrays, print \`a=<s1> b=<s2>\`.

Same \`mem_swap\` call site for all three.`,
    examples: [
      { input: "0\n3 7",          output: "a=7 b=3",            explanation: "Two ints swapped — sizeof(int) bytes." },
      { input: "1\n1.5 2.5",      output: "a=2.5 b=1.5",        explanation: "Two doubles swapped — sizeof(double) bytes." },
      { input: "2\nhello world",  output: "a=world b=hello",    explanation: "Two 32-byte char arrays swapped — full buffer." }
    ],
    constraints: [
      "Function signature: `void mem_swap(void *a, void *b, size_t size)`.",
      "Must work for any `size`, including > 64 bytes (loop in fixed chunks).",
      "No `malloc` inside `mem_swap` — use a fixed-size stack buffer.",
      "Caller must ensure the regions don't overlap (assume true).",
      "Strings in mode 2 are stored in `char[32]` and you may assume they fit.",
      "Compile with `-Wall -Wextra` cleanly."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

void mem_swap(void *a, void *b, size_t size) {
    // Cast to unsigned char *.
    // Use a stack chunk buffer; loop while bytes remain.
    (void)a; (void)b; (void)size;
}

int main(void) {
    int mode;
    if (scanf("%d", &mode) != 1) return 1;

    if (mode == 0) {
        int x, y;
        if (scanf("%d %d", &x, &y) != 2) return 1;
        mem_swap(&x, &y, sizeof x);
        printf("a=%d b=%d\\n", x, y);
    } else if (mode == 1) {
        double x, y;
        if (scanf("%lf %lf", &x, &y) != 2) return 1;
        mem_swap(&x, &y, sizeof x);
        printf("a=%g b=%g\\n", x, y);
    } else if (mode == 2) {
        char x[32] = {0}, y[32] = {0};
        if (scanf("%31s %31s", x, y) != 2) return 1;
        mem_swap(x, y, sizeof x);
        printf("a=%s b=%s\\n", x, y);
    }
    return 0;
}
`,
    references: [
      { title: "cppreference — qsort", url: "https://en.cppreference.com/w/c/algorithm/qsort" },
      { title: "Beej's Guide — void pointers", url: BEEJ_HTML + "pointers.html" },
      { title: "Linux kernel — generic helpers", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/minmax.h" }
    ]
  },

  {
    id: 52,
    number: "22",
    title: "Alignment with _Alignof and _Alignas",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Print the alignment requirements of a few types and force a struct to be cache-line aligned (64 bytes).

Define:
\`\`\`c
typedef struct { char c; int i; } small_t;
typedef struct _Alignas(64) { int x; } cacheline_t;
\`\`\`

Then print:
\`\`\`
align char=<n>
align int=<n>
align double=<n>
align small_t=<n>
size  small_t=<n>
align cacheline_t=64
size  cacheline_t=64
ptr_aligned=<0|1>
\`\`\`

\`ptr_aligned\` is computed by allocating a \`cacheline_t\` on the stack and checking \`((uintptr_t)&v) % 64 == 0\`. With \`_Alignas(64)\` it must be 1.

Use \`_Alignof\` (or \`alignof\` from \`<stdalign.h>\`) for the alignment values and \`sizeof\` for sizes — do not hardcode.

Why this matters: kernel structs that share cache lines between CPUs cause "false sharing", a notorious performance bug. \`_Alignas(L1_CACHE_BYTES)\` is the fix; you'll see it everywhere in \`include/linux/cache.h\`.`,
    examples: [
      {
        input: "(no input)",
        output: `align char=1
align int=4
align double=8
align small_t=4
size  small_t=8
align cacheline_t=64
size  cacheline_t=64
ptr_aligned=1`,
        explanation: "On Linux x86_64. `small_t` has 3 bytes of padding after `c` to align `int`."
      }
    ],
    constraints: [
      "Use `_Alignof` (or `alignof`) — do not hardcode alignment.",
      "Use `_Alignas(64)` (or `alignas(64)`) on `cacheline_t`.",
      "`ptr_aligned` is a runtime check on a stack-allocated `cacheline_t`.",
      "Print using `%zu`."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>
#include <stdalign.h>

typedef struct {
    char c;
    int i;
} small_t;

typedef struct alignas(64) {
    int x;
} cacheline_t;

int main(void) {
    cacheline_t v;

    // TODO: print alignments and sizes; verify (uintptr_t)&v % 64 == 0.
    (void)v;
    return 0;
}
`,
    references: [
      { title: "cppreference — _Alignof / _Alignas", url: "https://en.cppreference.com/w/c/language/_Alignof" },
      { title: "Linux kernel — cache.h", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/cache.h" },
      { title: "Wikipedia — False sharing", url: "https://en.wikipedia.org/wiki/False_sharing" }
    ]
  },

  {
    id: 53,
    number: "23",
    title: "Const correctness: pointer-to-const vs const pointer",
    difficulty: "Medium",
    topic: "Pointers",
    description: `Two declarations every C programmer must read fluently:
\`\`\`c
const int *p;        // pointer to const int — *p cannot change, p can be reassigned
int * const q;       // const pointer to int — q cannot be reassigned, *q can change
const int * const r; // const pointer to const int — neither can change
\`\`\`

Implement these helpers — each must compile cleanly under \`-Wall -Wextra\`:
- \`int sum_const(const int *a, size_t n)\` — sum the array; **do not** mutate \`*a\`.
- \`void zero_through(int * const q, size_t n)\` — set every element to 0; \`q\` itself is const.
- \`const char *strchr_const(const char *s, int c)\` — return a pointer into \`s\` (or \`NULL\`) without losing const.

\`main\` reads \`n\`, then \`n\` integers, then a string and a single character (just the char as one token of length 1). Output:
\`\`\`
sum=<int>
zeroed: 0 0 0 ...
found=<index|-1>
\`\`\`
\`found\` is \`(int)(p - s)\` if \`strchr_const\` returned non-NULL, else \`-1\`.`,
    examples: [
      {
        input: "3\n1 2 3\nhello e",
        output: `sum=6
zeroed: 0 0 0
found=1`,
        explanation: "Sum is 6, then array zeroed, then 'e' is at index 1 in 'hello'."
      },
      {
        input: "5\n10 20 30 40 50\nworld z",
        output: `sum=150
zeroed: 0 0 0 0 0
found=-1`,
        explanation: "'z' is not in 'world', so found=-1."
      }
    ],
    constraints: [
      "Function signatures must be exactly as specified.",
      "`sum_const` must take `const int *` (compiler-enforced read-only).",
      "`strchr_const` must return `const char *` — no `(char *)` cast.",
      "Compile with `-Wall -Wextra` — no warnings.",
      "1 ≤ n ≤ 100. The string is one token, no spaces."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>

int sum_const(const int *a, size_t n) {
    // No writes through a.
    (void)a; (void)n;
    return 0;
}

void zero_through(int * const q, size_t n) {
    // q itself can't change, but *q can.
    (void)q; (void)n;
}

const char *strchr_const(const char *s, int c) {
    // Walk s; return a pointer into s or NULL.
    (void)s; (void)c;
    return NULL;
}

int main(void) {
    size_t n;
    if (scanf("%zu", &n) != 1) return 1;
    int a[100] = {0};
    for (size_t i = 0; i < n; i++) {
        if (scanf("%d", &a[i]) != 1) return 1;
    }

    char s[128];
    char ch[4];
    if (scanf("%127s %3s", s, ch) != 2) return 1;

    printf("sum=%d\\n", sum_const(a, n));

    zero_through(a, n);
    printf("zeroed:");
    for (size_t i = 0; i < n; i++) printf(" %d", a[i]);
    printf("\\n");

    const char *p = strchr_const(s, (unsigned char)ch[0]);
    printf("found=%d\\n", p ? (int)(p - s) : -1);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — const", url: BEEJ_HTML + "const.html" },
      { title: "C FAQ — const pointers", url: "https://c-faq.com/ansi/constptr.html" },
      { title: "ISO C — Type qualifiers", url: "https://en.cppreference.com/w/c/language/const" }
    ]
  },

  // ===========================================================
  // SECTION 11 — Preprocessor & Macros
  // ===========================================================
  {
    id: 54,
    number: "24",
    title: "Function-like macros and the do-while idiom",
    difficulty: "Easy",
    topic: "Preprocessor & Macros",
    description: `Define three function-like macros:

\`\`\`c
#define MAX(a, b)         /* greater of two values */
#define MIN(a, b)         /* lesser of two values */
#define SWAP(type, a, b)  /* swap two lvalues using a temp */
\`\`\`

All three must:
1. Wrap **every** parameter expansion in parentheses (\`((a) > (b) ? (a) : (b))\`) so operator precedence at the call site can't break them.
2. \`SWAP\` must use the \`do { ... } while (0)\` idiom so it behaves like a single statement — it has to work inside an unbraced \`if\` without a stray semicolon problem.

\`main\` reads three integers \`a b c\` and prints:
\`\`\`
max=<MAX(a, b+c)>
min=<MIN(a, b+c)>
swapped=<a> <b>   // after SWAP(int, a, b)
guarded=<n>       // see below
\`\`\`

For \`guarded\`, run this exact pattern (no braces):
\`\`\`c
int n = 0;
if (a > 0) SWAP(int, a, b); else n = 99;
\`\`\`
If you implement \`SWAP\` correctly with \`do { ... } while (0)\`, this compiles cleanly and \`n\` is set to the right branch value. If you used a brace block or single statement, this either fails to compile or silently runs the wrong branch.

Also double-check macro hygiene against double-evaluation: \`MAX(i++, j)\` would evaluate \`i++\` twice, which is the classic gotcha. You don't need to fix that here, but be aware.`,
    examples: [
      {
        input: "3 5 7",
        output: `max=12
min=3
swapped=5 3
guarded=0`,
        explanation: "MAX(3, 5+7) = MAX(3, 12) = 12. After SWAP(int, a, b), a=5 b=3. a>0 so SWAP fires again and n stays 0."
      },
      {
        input: "5 -3 7",
        output: `max=5
min=4
swapped=-3 5
guarded=99`,
        explanation: "MAX(5, 4)=5, MIN(5, 4)=4. SWAP makes a=-3 (now ≤ 0), so the unbraced `if` takes the else branch and n=99."
      }
    ],
    constraints: [
      "Every parameter use inside the macro must be parenthesised.",
      "`SWAP` must use `do { ... } while (0)` — verifiable by the unbraced-if test.",
      "No semicolon at the end of the `do { ... } while (0)` definition.",
      "Compile with `-Wall -Wextra` — no warnings."
    ],
    starterCode: `#include <stdio.h>

#define MAX(a, b) /* TODO */
#define MIN(a, b) /* TODO */
#define SWAP(type, a, b) /* TODO: do { ... } while (0) */

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;

    printf("max=%d\\n", MAX(a, b + c));
    printf("min=%d\\n", MIN(a, b + c));

    SWAP(int, a, b);
    printf("swapped=%d %d\\n", a, b);

    int n = 0;
    if (a > 0) SWAP(int, a, b); else n = 99;
    printf("guarded=%d\\n", n);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Preprocessor", url: BEEJ_HTML + "stdio.html" },
      { title: "GCC manual — Swallowing the semicolon", url: "https://gcc.gnu.org/onlinedocs/cpp/Swallowing-the-Semicolon.html" },
      { title: "Linux kernel — min/max macros", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/minmax.h" }
    ]
  },

  {
    id: 55,
    number: "25",
    title: "Stringification and token pasting — LOG macro",
    difficulty: "Medium",
    topic: "Preprocessor & Macros",
    description: `Build a tiny logging macro using the two preprocessor stringification operators \`#\` and token-pasting \`##\`.

Required macros:
\`\`\`c
#define STR(x)        /* turn the token x into a string literal */
#define XSTR(x)       /* expand x first, then stringify it */
#define CONCAT(a, b)  /* paste two tokens into one identifier */
#define LOG(level, fmt, ...)  /* prefix with [LEVEL] */
\`\`\`

Specifics:
- \`STR(hello)\` → \`"hello"\` (no expansion).
- \`XSTR(VERSION)\` where \`#define VERSION 42\` → \`"42"\` — the indirection trick \`#define XSTR(x) STR(x)\` forces \`x\` to be macro-expanded *before* \`#\` stringifies it.
- \`CONCAT(foo, 1)\` → token \`foo1\` — useful for generating unique identifiers.
- \`LOG(level, fmt, ...)\` prints \`[<LEVEL>] <fmt with args>\\n\` to stdout. \`level\` is one of the bare tokens \`INFO\`, \`WARN\`, \`ERROR\`. Use \`#level\` to stringify it; use \`__VA_ARGS__\` for the variadic tail.

\`main\` uses each macro once and emits known output. Read no input.`,
    examples: [
      {
        input: "(no input)",
        output: `s1=hello
s2=42
sum=7
[INFO] starting up
[WARN] x=3
[ERROR] failed code=-1`,
        explanation: "STR/XSTR/CONCAT each demonstrated once, then three LOG calls with different levels and argument shapes."
      }
    ],
    constraints: [
      "`STR` uses `#x` directly; `XSTR` defers to `STR` so its argument expands first.",
      "`CONCAT` uses `##` and creates a real identifier (`int CONCAT(foo, 1) = 7;`).",
      "`LOG` must use `#level` (stringification) and `__VA_ARGS__` (variadic).",
      "`LOG` output format: `[<LEVEL>] <message>` followed by a newline.",
      "No `<assert.h>` or external logging libraries.",
      "Compile with `-Wall -Wextra` cleanly."
    ],
    starterCode: `#include <stdio.h>

#define VERSION 42

#define STR(x)         /* TODO */
#define XSTR(x)        /* TODO — uses STR */
#define CONCAT(a, b)   /* TODO */
#define LOG(level, fmt, ...) \\
    /* TODO: printf("[%s] " fmt "\\n", #level, ##__VA_ARGS__) */

int main(void) {
    printf("s1=%s\\n", STR(hello));
    printf("s2=%s\\n", XSTR(VERSION));   /* expand VERSION → 42, then stringify */

    int CONCAT(foo, 1) = 3;
    int CONCAT(foo, 2) = 4;
    printf("sum=%d\\n", foo1 + foo2);

    LOG(INFO,  "starting up");
    LOG(WARN,  "x=%d", foo1);
    LOG(ERROR, "failed code=%d", -1);
    return 0;
}
`,
    references: [
      { title: "GCC manual — Stringification", url: "https://gcc.gnu.org/onlinedocs/cpp/Stringizing.html" },
      { title: "GCC manual — Concatenation", url: "https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html" },
      { title: "GCC manual — Variadic Macros", url: "https://gcc.gnu.org/onlinedocs/cpp/Variadic-Macros.html" }
    ]
  },

  {
    id: 56,
    number: "26",
    title: "X-macros — enum and matching name table",
    difficulty: "Medium",
    topic: "Preprocessor & Macros",
    description: `**X-macros** let you declare a list of items *once* and reuse it in multiple "shapes". Kernel sources use this for syscall tables, ioctl codes, register descriptions, and error code → string maps.

Define one master list:
\`\`\`c
#define LEVELS \\
    X(DEBUG) \\
    X(INFO)  \\
    X(WARN)  \\
    X(ERROR) \\
    X(FATAL)
\`\`\`

Use it twice — first to generate an \`enum\`, then to generate a parallel \`const char *\` table:
\`\`\`c
typedef enum {
#define X(name) LVL_##name,
    LEVELS
#undef X
} level_t;

static const char *level_name[] = {
#define X(name) #name,
    LEVELS
#undef X
};
\`\`\`

\`main\` reads an integer \`n\` and a sequence of \`n\` integers (each an enum value). For each, print \`<i>=<NAME>\` (or \`UNKNOWN\` if out of range). Then print \`count=<N>\` where \`N\` is computed as \`sizeof(level_name) / sizeof(level_name[0])\` — proves the two views stay in sync if you add a level later.`,
    examples: [
      {
        input: "3\n0 2 4",
        output: `0=DEBUG
2=WARN
4=FATAL
count=5`,
        explanation: "Enum values 0..4 map to DEBUG..FATAL."
      },
      {
        input: "4\n1 3 4 7",
        output: `1=INFO
3=ERROR
4=FATAL
7=UNKNOWN
count=5`,
        explanation: "7 is out of range so it prints UNKNOWN."
      }
    ],
    constraints: [
      "The master list must be defined exactly once.",
      "Both the enum and the name table must be generated from `LEVELS` — no duplication.",
      "`count` must be computed at compile time from `sizeof`.",
      "Out-of-range values print `UNKNOWN`.",
      "Compile with `-Wall -Wextra` cleanly."
    ],
    starterCode: `#include <stdio.h>

#define LEVELS  \\
    X(DEBUG)    \\
    X(INFO)     \\
    X(WARN)     \\
    X(ERROR)    \\
    X(FATAL)

typedef enum {
#define X(name) LVL_##name,
    LEVELS
#undef X
    LVL_COUNT
} level_t;

static const char *level_name[] = {
#define X(name) #name,
    LEVELS
#undef X
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        int v;
        if (scanf("%d", &v) != 1) return 1;
        if (v < 0 || v >= (int)(sizeof(level_name) / sizeof(level_name[0]))) {
            printf("%d=UNKNOWN\\n", v);
        } else {
            printf("%d=%s\\n", v, level_name[v]);
        }
    }
    printf("count=%zu\\n", sizeof(level_name) / sizeof(level_name[0]));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — X Macro", url: "https://en.wikipedia.org/wiki/X_macro" },
      { title: "Drepper — X-Macros in glibc", url: "https://www.akkadia.org/drepper/cpumemory.pdf" },
      { title: "Linux kernel — syscall table via X-macros (asm/unistd.h)", url: "https://elixir.bootlin.com/linux/latest/source/arch/x86/include/asm/syscalls_64.h" }
    ]
  },

  {
    id: 57,
    number: "27",
    title: "container_of — recover the parent struct",
    difficulty: "Hard",
    topic: "Preprocessor & Macros",
    description: `Implement the Linux kernel's two cornerstone macros:

\`\`\`c
#define offsetof(type, member)    ((size_t) &((type *)0)->member)
#define container_of(ptr, type, member) \\
    ((type *)((char *)(ptr) - offsetof(type, member)))
\`\`\`

\`offsetof(T, m)\` returns the byte offset of \`m\` inside \`T\`.
\`container_of(p, T, m)\` takes a pointer to a member \`m\` of some \`T\` and recovers the address of the enclosing \`T\`.

This pattern — embedding a generic node inside a domain struct and walking back from the node to the parent — is how the entire Linux \`list_head\`, \`hlist_node\`, and \`rb_node\` infrastructure works.

Define:
\`\`\`c
typedef struct { int dummy; } node_t;
typedef struct {
    int    id;
    char   name[16];
    node_t link;       // embedded — not first member
    int    extra;
} item_t;
\`\`\`

In \`main\`, build one \`item_t\` with \`id=42\`, \`name="answer"\`, \`extra=99\`, take a pointer to its \`.link\` member, and recover the \`item_t *\` via \`container_of\`. Print:
\`\`\`
offset=<offset of link>
id=42
name=answer
extra=99
\`\`\`
The offset prints as \`%zu\`. With a 4-byte \`int id\` plus 16-byte \`name\`, on Linux x86_64 the offset is \`20\` (no padding needed since \`node_t\` is 4-byte aligned).`,
    examples: [
      {
        input: "(no input)",
        output: `offset=20
id=42
name=answer
extra=99`,
        explanation: "id (4) + name[16] (16) = 20 bytes before .link, which is 4-byte aligned so no padding."
      }
    ],
    constraints: [
      "Implement `offsetof` and `container_of` yourself — do not include `<stddef.h>`'s `offsetof`.",
      "`container_of` must work for `.link` as a non-first member (proves it's not just identity).",
      "Use exactly the type/member names shown in the struct.",
      "Compile cleanly with `-Wall -Wextra`."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

#define my_offsetof(type, member)  /* TODO */

#define container_of(ptr, type, member) /* TODO */

typedef struct { int dummy; } node_t;

typedef struct {
    int    id;
    char   name[16];
    node_t link;
    int    extra;
} item_t;

int main(void) {
    item_t it = { .id = 42, .extra = 99 };
    strcpy(it.name, "answer");

    node_t *p = &it.link;
    item_t *back = container_of(p, item_t, link);

    printf("offset=%zu\\n", my_offsetof(item_t, link));
    printf("id=%d\\n", back->id);
    printf("name=%s\\n", back->name);
    printf("extra=%d\\n", back->extra);
    return 0;
}
`,
    references: [
      { title: "Linux kernel — container_of explained", url: "https://radek.io/2012/11/10/magical-container_of-macro/" },
      { title: "Linux kernel — list.h", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/list.h" },
      { title: "cppreference — offsetof", url: "https://en.cppreference.com/w/c/types/offsetof" }
    ]
  },

  // ===========================================================
  // SECTION 12 — Storage Classes & Qualifiers
  // ===========================================================
  {
    id: 58,
    number: "28",
    title: "static at function scope — call counter",
    difficulty: "Easy",
    topic: "Storage Classes & Qualifiers",
    description: `Write a function \`int next_id(void)\` that returns a monotonically increasing integer starting at \`1\`. The counter must be **kept in a function-scope \`static\` variable** — not a global, not a parameter.

A function-scope \`static\` is initialised once (at program load time) and persists across calls — the storage lives in BSS/.data, not on the stack. This is the C version of "private state inside a function".

\`main\` reads \`n\` from stdin and calls \`next_id()\` exactly \`n\` times, printing each result on its own line. Then it prints \`total=<last_returned>\`.`,
    examples: [
      { input: "3", output: "1\n2\n3\ntotal=3", explanation: "Three calls produce 1, 2, 3 — counter persists between calls." },
      { input: "1", output: "1\ntotal=1",        explanation: "Single call returns 1." },
      { input: "0", output: "total=0",            explanation: "Zero calls — counter never moves; total reports 0 by convention." }
    ],
    constraints: [
      "The counter MUST be a `static` local inside `next_id` — global variables are not allowed.",
      "Initial value must be 1 on the first call.",
      "0 ≤ n ≤ 100000.",
      "If `n == 0`, do not call `next_id` at all and print `total=0`.",
      "Compile with `-Wall -Wextra` cleanly — no unused-variable warnings."
    ],
    starterCode: `#include <stdio.h>

int next_id(void) {
    // TODO: function-scope static counter starting at 1.
    return 0;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;

    int last = 0;
    for (int i = 0; i < n; i++) {
        last = next_id();
        printf("%d\\n", last);
    }
    printf("total=%d\\n", last);
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Storage classes", url: BEEJ_HTML + "scope.html" },
      { title: "cppreference — Storage-class specifiers", url: "https://en.cppreference.com/w/c/language/storage_duration" },
      { title: "Wikipedia — Static variable", url: "https://en.wikipedia.org/wiki/Static_variable" }
    ]
  },

  {
    id: 59,
    number: "29",
    title: "volatile — simulating a memory-mapped device register",
    difficulty: "Medium",
    topic: "Storage Classes & Qualifiers",
    description: `Drivers talk to hardware by reading and writing **memory-mapped I/O registers**. The CPU sees a memory address; the device sees a register, and the value can change underneath the CPU between reads. Without \`volatile\`, the optimiser can cache the value in a register and the spin-wait never terminates.

In this problem, simulate that situation. You have:
\`\`\`c
volatile uint32_t reg;          // the "device register"
\`\`\`
A helper \`tick_device(uint32_t *r, int after, uint32_t value)\` (provided) sets \`*r = value\` after the CPU has executed roughly \`after\` polling iterations. It does this by being called from inside the loop with an external counter — you don't have to know the details.

Implement \`uint32_t spin_until(volatile uint32_t *r, uint32_t want)\` that busy-waits until \`*r == want\` and returns the number of iterations it waited.

\`main\` reads \`after\` and \`want\` from stdin, runs the spin loop, and prints \`iters=<n> final=<value>\`. With \`volatile\` the loop sees the update and terminates; without it, the optimiser is free to hoist \`*r\` out of the loop and you'd spin forever (but the test enforces a max iteration cap so the autograder doesn't hang).`,
    examples: [
      { input: "5 42",   output: "iters=5 final=42",   explanation: "Counter ticks the register to 42 after 5 polls; loop exits at iteration 5." },
      { input: "0 7",    output: "iters=0 final=7",    explanation: "Register already equals want at iteration 0 (handled by the provided tick helper)." },
      { input: "100 99", output: "iters=100 final=99", explanation: "Longer wait — still terminates correctly." }
    ],
    constraints: [
      "`spin_until`'s pointer parameter must be `volatile uint32_t *`.",
      "Maximum iterations: 1000000 (cap so a buggy loop doesn't run forever).",
      "Do not call `tick_device` yourself — it's invoked by the provided polling skeleton.",
      "Print iteration count and final register value as shown."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

static int  g_after = 0;
static uint32_t g_value = 0;

/* Provided: simulates a hardware tick — flips the register on the
 * 'after'-th call. Don't modify. */
static void tick_device(volatile uint32_t *r, int *poll_count) {
    if (*poll_count == g_after) *r = g_value;
    (*poll_count)++;
}

uint32_t spin_until(volatile uint32_t *r, uint32_t want) {
    uint32_t iters = 0;
    int poll_count = 0;
    while (*r != want && iters < 1000000) {
        tick_device(r, &poll_count);
        if (*r == want) break;
        iters++;
    }
    return iters;
}

int main(void) {
    if (scanf("%d %u", &g_after, &g_value) != 2) return 1;

    volatile uint32_t reg = 0;
    /* Edge case: device 'arrives' immediately. */
    if (g_after == 0) reg = g_value;

    uint32_t iters = spin_until(&reg, g_value);
    printf("iters=%u final=%u\\n", iters, reg);
    return 0;
}
`,
    references: [
      { title: "LWN — Why the volatile keyword should not be used", url: "https://www.kernel.org/doc/html/latest/process/volatile-considered-harmful.html" },
      { title: "cppreference — volatile", url: "https://en.cppreference.com/w/c/language/volatile" },
      { title: "OSDev wiki — MMIO", url: "https://wiki.osdev.org/MMIO" }
    ]
  },

  {
    id: 60,
    number: "30",
    title: "extern and static at file scope — internal vs external linkage",
    difficulty: "Medium",
    topic: "Storage Classes & Qualifiers",
    description: `Demonstrate the difference between a file-scope \`static\` (internal linkage — visible only in this translation unit) and a file-scope \`extern\` declaration (external linkage — refers to a definition elsewhere).

Single-file simulation (Wandbox is one TU):
\`\`\`c
static int  internal_count = 0;   // not visible to other TUs
       int  external_count = 0;   // default extern — would be visible
\`\`\`

Implement:
- \`void bump_internal(void)\` — increment \`internal_count\`.
- \`void bump_external(void)\` — increment \`external_count\`.
- \`int  get_internal(void)\` — return \`internal_count\`.
- \`int  get_external(void)\` — return \`external_count\`.

\`main\` reads two integers \`a b\`, calls \`bump_internal\` \`a\` times and \`bump_external\` \`b\` times, then prints:
\`\`\`
internal=<a>
external=<b>
\`\`\`

The point isn't behaviour (both look identical from one TU). The point is the **declaration shape**: a real multi-file build would link the second one across object files and the first would be private. In the kernel, \`static\` on every file-local helper is mandatory style — it stops other modules from accidentally calling private internals.`,
    examples: [
      { input: "3 5", output: "internal=3\nexternal=5", explanation: "Three increments to one counter, five to the other." },
      { input: "0 0", output: "internal=0\nexternal=0", explanation: "No increments — both stay 0." },
      { input: "1 0", output: "internal=1\nexternal=0", explanation: "Only one counter is touched." }
    ],
    constraints: [
      "`internal_count` must be declared with `static` at file scope.",
      "`external_count` must NOT have `static` (so it would have external linkage in a real build).",
      "Both must be initialised to 0 explicitly.",
      "Compile with `-Wall -Wextra` cleanly. With `extern int external_count;` declared but unused, you'd get a warning — keep the definition only.",
      "0 ≤ a, b ≤ 1000000."
    ],
    starterCode: `#include <stdio.h>

static int internal_count = 0;
       int external_count = 0;

void bump_internal(void) { /* TODO */ }
void bump_external(void) { /* TODO */ }
int  get_internal(void)  { return 0; }
int  get_external(void)  { return 0; }

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    for (int i = 0; i < a; i++) bump_internal();
    for (int i = 0; i < b; i++) bump_external();
    printf("internal=%d\\n", get_internal());
    printf("external=%d\\n", get_external());
    return 0;
}
`,
    references: [
      { title: "Beej's Guide — Storage classes & linkage", url: BEEJ_HTML + "scope.html" },
      { title: "cppreference — Storage-class specifiers", url: "https://en.cppreference.com/w/c/language/storage_duration" },
      { title: "Linux kernel coding style — `static`", url: "https://www.kernel.org/doc/html/latest/process/coding-style.html#functions" }
    ]
  },

  // ===========================================================
  // SECTION 4 (cont.) — Arrays & Strings (additional)
  // ===========================================================
  {
    id: 61,
    number: "39",
    title: "Implement memset",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Re-implement \`memset\`:
\`\`\`c
void *my_memset(void *dst, int value, size_t n);
\`\`\`
Write the low byte of \`value\` (\`(unsigned char)value\`) into the first \`n\` bytes of \`dst\` and return \`dst\`.

\`main\` reads:
1. \`n\` — number of bytes to set (1..256).
2. \`value\` — integer; only the low byte is used.

Allocate a buffer of \`n+2\` bytes initialised to zero, leave a sentinel byte at index \`n\` (still 0), call \`my_memset(buf, value, n)\`, then print the buffer in hex (\`%02x\`, space-separated) followed on the next line by the sentinel value:
\`\`\`
buf=<hex bytes>
sentinel=00
\`\`\`
The sentinel proves you didn't write past \`n\`.`,
    examples: [
      {
        input: "4 65",
        output: `buf=41 41 41 41
sentinel=00`,
        explanation: "ASCII 'A' = 0x41. Four bytes set, sentinel untouched."
      },
      {
        input: "1 0",
        output: `buf=00
sentinel=00`,
        explanation: "Single zero byte — looks like the initial state, but the call still ran."
      },
      {
        input: "5 257",
        output: `buf=01 01 01 01 01
sentinel=00`,
        explanation: "Only the low byte (257 & 0xff = 1) is written."
      }
    ],
    constraints: [
      "Function signature must be `void *my_memset(void *dst, int value, size_t n);`.",
      "Cast `dst` through `unsigned char *` and write `(unsigned char)value`.",
      "Must return `dst`.",
      "Do not write past byte `n` (sentinel test enforces this).",
      "1 ≤ n ≤ 256.",
      "Do not call `memset` from `<string.h>`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>

void *my_memset(void *dst, int value, size_t n) {
    // TODO
    (void)dst; (void)value; (void)n;
    return dst;
}

int main(void) {
    size_t n;
    int value;
    if (scanf("%zu %d", &n, &value) != 2) return 1;

    unsigned char *buf = calloc(n + 2, 1);
    if (!buf) return 1;
    my_memset(buf, value, n);

    printf("buf=");
    for (size_t i = 0; i < n; i++) {
        printf("%02x%s", buf[i], i + 1 == n ? "\\n" : " ");
    }
    printf("sentinel=%02x\\n", buf[n]);
    free(buf);
    return 0;
}
`,
    references: [
      { title: "cppreference — memset", url: "https://en.cppreference.com/w/c/string/byte/memset" },
      { title: "Beej's Guide — strings & memory", url: BEEJ_HTML + "stringref.html" },
      { title: "Linux kernel — lib/string.c memset", url: "https://elixir.bootlin.com/linux/latest/source/lib/string.c" }
    ]
  },

  {
    id: 62,
    number: "40",
    title: "Implement memcmp",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `Re-implement \`memcmp\`:
\`\`\`c
int my_memcmp(const void *a, const void *b, size_t n);
\`\`\`
Compare the first \`n\` bytes of \`a\` and \`b\` as **unsigned chars**, in order. Return:
- A negative number if the first differing byte in \`a\` is less than in \`b\`.
- A positive number if it is greater.
- 0 if all \`n\` bytes are equal.

The standard does not specify the exact magnitude — only the sign. Most implementations return \`(int)(*ua) - (int)(*ub)\`. Use that.

\`main\` reads two strings (each up to 63 chars), then \`n\` (number of bytes to compare). Print the **sign** of the result as one of \`-1\`, \`0\`, \`1\` so the test is platform-independent (use \`x < 0 ? -1 : x > 0 ? 1 : 0\`).`,
    examples: [
      { input: "abc abd 3",   output: "-1", explanation: "'c' (0x63) < 'd' (0x64), so memcmp returns negative." },
      { input: "abc abc 3",   output: "0",  explanation: "Equal." },
      { input: "abd abc 3",   output: "1",  explanation: "'d' > 'c'." },
      { input: "abc abd 2",   output: "0",  explanation: "First two bytes equal." }
    ],
    constraints: [
      "Function signature must be `int my_memcmp(const void *a, const void *b, size_t n);`.",
      "Cast through `const unsigned char *` — signed-char comparison gives wrong sign for high-bit bytes.",
      "Return as soon as a difference is found.",
      "Do not call `memcmp` from `<string.h>`.",
      "0 ≤ n ≤ 64.",
      "Print only the *sign* of the result (-1, 0, 1)."
    ],
    starterCode: `#include <stdio.h>
#include <stddef.h>

int my_memcmp(const void *a, const void *b, size_t n) {
    // Walk both as const unsigned char *.
    (void)a; (void)b; (void)n;
    return 0;
}

int main(void) {
    char a[64], b[64];
    size_t n;
    if (scanf("%63s %63s %zu", a, b, &n) != 3) return 1;

    int r = my_memcmp(a, b, n);
    int sign = (r < 0) ? -1 : (r > 0 ? 1 : 0);
    printf("%d\\n", sign);
    return 0;
}
`,
    references: [
      { title: "cppreference — memcmp", url: "https://en.cppreference.com/w/c/string/byte/memcmp" },
      { title: "POSIX — memcmp", url: "https://pubs.opengroup.org/onlinepubs/9699919799/functions/memcmp.html" },
      { title: "C FAQ — Why memcmp is unsigned", url: "https://c-faq.com/strings/memcmp.html" }
    ]
  },

  {
    id: 63,
    number: "41",
    title: "Implement strcat and strncat",
    difficulty: "Medium",
    topic: "Arrays & Strings",
    description: `Re-implement two ANSI string concat functions:
\`\`\`c
char *my_strcat(char *dst, const char *src);
char *my_strncat(char *dst, const char *src, size_t n);
\`\`\`

\`my_strcat\` appends the entire source string (up to and including the NUL terminator) onto the end of \`dst\`. The caller guarantees \`dst\` has room.

\`my_strncat\` appends at most \`n\` characters from \`src\`; it then **always** writes a final \`'\\0'\`. So if \`n == 0\`, no source characters are copied but the existing terminator stays where it is. If \`src\` is shorter than \`n\`, you stop at the source NUL (do not pad with zeros).

\`main\` reads:
1. A starting destination string (up to 31 chars).
2. A source string (up to 31 chars).
3. An integer \`n\`.
Then it reserves a 64-byte buffer, copies the start string in, and prints two outputs:
- \`cat=<my_strcat result>\` (using a fresh copy of the start string).
- \`ncat=<my_strncat result with n>\` (using another fresh copy).`,
    examples: [
      {
        input: "hello world 5",
        output: `cat=helloworld
ncat=helloworld`,
        explanation: "Full append, then ncat with n=5 also copies all 5 source bytes."
      },
      {
        input: "foo bar 2",
        output: `cat=foobar
ncat=fooba`,
        explanation: "ncat copies only 2 chars from 'bar' → 'ba'."
      },
      {
        input: "abc xyz 0",
        output: `cat=abcxyz
ncat=abc`,
        explanation: "ncat with n=0 copies nothing but still NUL-terminates."
      }
    ],
    constraints: [
      "Both functions must return `dst`.",
      "Walk to the existing NUL in `dst` before copying.",
      "`my_strncat` writes at most `n` source characters and exactly one terminating NUL.",
      "If `src` is shorter than `n`, stop at the source NUL — do not zero-pad.",
      "Do not call `strcat`, `strncat`, or `strlen` from `<string.h>`.",
      "`dst` capacity is 64 bytes; inputs are ≤ 31 chars each."
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

char *my_strcat(char *dst, const char *src) {
    // Walk dst to '\\0', then copy src including its '\\0'.
    (void)dst; (void)src;
    return dst;
}

char *my_strncat(char *dst, const char *src, size_t n) {
    // Same idea, but copy at most n source bytes, then write '\\0'.
    (void)dst; (void)src; (void)n;
    return dst;
}

int main(void) {
    char start[32], src[32];
    size_t n;
    if (scanf("%31s %31s %zu", start, src, &n) != 3) return 1;

    char a[64];
    strcpy(a, start);
    my_strcat(a, src);
    printf("cat=%s\\n", a);

    char b[64];
    strcpy(b, start);
    my_strncat(b, src, n);
    printf("ncat=%s\\n", b);
    return 0;
}
`,
    references: [
      { title: "cppreference — strcat", url: "https://en.cppreference.com/w/c/string/byte/strcat" },
      { title: "cppreference — strncat", url: "https://en.cppreference.com/w/c/string/byte/strncat" },
      { title: "Beej's Guide — strings", url: BEEJ_HTML + "strings.html" }
    ]
  },

  {
    id: 64,
    number: "42",
    title: "Implement strdup",
    difficulty: "Easy",
    topic: "Arrays & Strings",
    description: `\`strdup\` is "malloc + strcpy" in one call — extremely common in C programs that need a private copy of a string.

Implement:
\`\`\`c
char *my_strdup(const char *s);
\`\`\`
Behaviour:
1. Compute the length of \`s\` (excluding NUL).
2. \`malloc(len + 1)\` bytes.
3. Copy the string including the NUL terminator.
4. Return the new pointer, or \`NULL\` if \`malloc\` failed.

The caller is responsible for \`free\`-ing the returned buffer.

\`main\` reads up to 5 strings (one per line, ≤ 63 chars each), terminated by \`---\` on its own line. Each string is duplicated; print the duplicates back, one per line, then \`count=<n>\` where \`n\` is how many you stored. Free everything before exit.`,
    examples: [
      {
        input: "hello\nworld\n---",
        output: `hello
world
count=2`,
        explanation: "Two strings duplicated and printed."
      },
      {
        input: "---",
        output: "count=0",
        explanation: "Empty input — terminator on first line."
      },
      {
        input: "a\nbb\nccc\n---",
        output: `a
bb
ccc
count=3`,
        explanation: "Three strings of varying lengths."
      }
    ],
    constraints: [
      "Function signature must be `char *my_strdup(const char *s);`.",
      "Use `malloc` with size `len + 1`.",
      "Return `NULL` on allocation failure.",
      "Do not call `strdup` from `<string.h>`.",
      "Free each duplicate before exit (verifiable with Valgrind).",
      "Up to 5 strings, each ≤ 63 chars."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    // 1. compute len
    // 2. malloc(len + 1)
    // 3. copy including terminator
    (void)s;
    return NULL;
}

int main(void) {
    char *copies[5] = {0};
    int n = 0;
    char line[64];

    while (n < 5 && scanf("%63s", line) == 1) {
        if (strcmp(line, "---") == 0) break;
        copies[n] = my_strdup(line);
        if (!copies[n]) return 1;
        n++;
    }

    for (int i = 0; i < n; i++) printf("%s\\n", copies[i]);
    printf("count=%d\\n", n);

    for (int i = 0; i < n; i++) free(copies[i]);
    return 0;
}
`,
    references: [
      { title: "cppreference — strdup", url: "https://en.cppreference.com/w/c/experimental/dynamic/strdup" },
      { title: "POSIX — strdup", url: "https://pubs.opengroup.org/onlinepubs/9699919799/functions/strdup.html" },
      { title: "Beej's Guide — strings & memory", url: BEEJ_HTML + "strings.html" }
    ]
  },

  {
    id: 65,
    number: "43",
    title: "qsort with a comparator",
    difficulty: "Medium",
    topic: "Arrays & Strings",
    description: `Use the standard library's \`qsort\` to sort an array of integers two ways: ascending then descending, by passing different comparator functions.

You must:
1. Define \`int cmp_asc(const void *a, const void *b)\` — returns negative / zero / positive based on \`*x - *y\` (be careful of overflow; use \`(*x > *y) - (*x < *y)\`).
2. Define \`int cmp_desc(const void *a, const void *b)\` — flipped sign.
3. Read \`n\` then \`n\` integers from stdin.
4. Make a working copy of the array, sort ascending, print \`asc: ...\`.
5. Re-copy, sort descending, print \`desc: ...\`.

This is the "void * + size + comparator" generic-programming model in C — the same pattern used by kernel \`sort()\` in \`lib/sort.c\` and any sorted-set container.`,
    examples: [
      {
        input: "5\n3 1 4 1 5",
        output: `asc: 1 1 3 4 5
desc: 5 4 3 1 1`,
        explanation: "Standard ascending and descending sort. Equal elements preserved in count."
      },
      {
        input: "1\n42",
        output: `asc: 42
desc: 42`,
        explanation: "Single element — both orders identical."
      },
      {
        input: "4\n-3 -1 -2 0",
        output: `asc: -3 -2 -1 0
desc: 0 -1 -2 -3`,
        explanation: "Negative numbers handled correctly (no `a - b` overflow trap because we use `>` and `<`)."
      }
    ],
    constraints: [
      "Use `qsort` from `<stdlib.h>`.",
      "Comparators must take `const void *` and cast to `const int *`.",
      "Avoid `(*x) - (*y)` (signed overflow on `INT_MIN`); use `(a > b) - (a < b)`.",
      "1 ≤ n ≤ 1000.",
      "Compile cleanly with `-Wall -Wextra`."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp_asc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int cmp_desc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x < y) - (x > y);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int a[1000], buf[1000];
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;

    memcpy(buf, a, n * sizeof(int));
    qsort(buf, n, sizeof(int), cmp_asc);
    printf("asc:");
    for (int i = 0; i < n; i++) printf(" %d", buf[i]);
    printf("\\n");

    memcpy(buf, a, n * sizeof(int));
    qsort(buf, n, sizeof(int), cmp_desc);
    printf("desc:");
    for (int i = 0; i < n; i++) printf(" %d", buf[i]);
    printf("\\n");
    return 0;
}
`,
    references: [
      { title: "cppreference — qsort", url: "https://en.cppreference.com/w/c/algorithm/qsort" },
      { title: "Beej's Guide — qsort", url: BEEJ_HTML + "stringref.html" },
      { title: "Linux kernel — lib/sort.c", url: "https://elixir.bootlin.com/linux/latest/source/lib/sort.c" }
    ]
  },

  // ===========================================================
  // SECTION 13 — Data Structures (kernel-flavored)
  // ===========================================================
  {
    id: 66,
    number: "57",
    title: "Doubly linked list with sentinel head",
    difficulty: "Medium",
    topic: "Data Structures",
    description: `Build a doubly linked list with a **sentinel head node** — a dummy node whose \`next\` and \`prev\` form a closed circle when the list is empty. This is the data structure used by Linux \`list_head\`: every operation becomes branchless because there's never a NULL to check at the boundary.

Define:
\`\`\`c
typedef struct dnode {
    int            value;
    struct dnode  *prev;
    struct dnode  *next;
} dnode_t;

typedef struct {
    dnode_t head;   // sentinel — head.next = first real, head.prev = last real
} dlist_t;
\`\`\`

Implement:
- \`void dlist_init(dlist_t *l);\` — make \`head.next == head.prev == &head\`.
- \`void dlist_push_front(dlist_t *l, int v);\`
- \`void dlist_push_back(dlist_t *l, int v);\`
- \`int  dlist_pop_front(dlist_t *l, int *out);\` — return 1 / 0 if empty.
- \`int  dlist_pop_back(dlist_t *l, int *out);\` — return 1 / 0.
- \`void dlist_clear(dlist_t *l);\` — free all real nodes.
- Print helpers: forward and reverse traversal.

\`main\` reads commands one per line:
- \`pf <v>\` push front
- \`pb <v>\` push back
- \`pof\` pop front (print \`pof=<v>\` or \`empty\`)
- \`pob\` pop back  (print \`pob=<v>\` or \`empty\`)
- \`fwd\` print forward as \`fwd: a b c\` (or \`fwd: (empty)\`)
- \`rev\` print reverse as \`rev: c b a\` (or \`rev: (empty)\`)
- end of input → free everything

Forward and reverse traversals must be exact mirrors of each other — that's the easiest correctness proof for a doubly linked list.`,
    examples: [
      {
        input: "pf 1\npb 2\npb 3\nfwd\nrev",
        output: `fwd: 1 2 3
rev: 3 2 1`,
        explanation: "Push 1 front, then 2 and 3 to back. Forward = [1, 2, 3]; reverse mirrors it."
      },
      {
        input: "pof\npob\nfwd",
        output: `empty
empty
fwd: (empty)`,
        explanation: "Pop from empty list returns 'empty'; forward of empty list prints '(empty)'."
      },
      {
        input: "pb 10\npb 20\npof\nfwd\nrev",
        output: `pof=10
fwd: 20
rev: 20`,
        explanation: "Pop front removes first; single-element list reads the same forward and backward."
      }
    ],
    constraints: [
      "Use a sentinel head node — `head.next` and `head.prev` form the empty list.",
      "All operations are O(1).",
      "Forward and reverse traversal must always produce mirror sequences.",
      "Free every real node on shutdown (no leaks).",
      "Up to 1000 commands per run."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct dnode {
    int           value;
    struct dnode *prev;
    struct dnode *next;
} dnode_t;

typedef struct {
    dnode_t head;
} dlist_t;

static void dlist_init(dlist_t *l) {
    l->head.prev = &l->head;
    l->head.next = &l->head;
}

static int  dlist_empty(const dlist_t *l) { return l->head.next == &l->head; }

/* TODO: implement push_front, push_back, pop_front, pop_back, clear */

static void dlist_print_fwd(const dlist_t *l) {
    printf("fwd:");
    if (dlist_empty(l)) { printf(" (empty)\\n"); return; }
    for (const dnode_t *p = l->head.next; p != &l->head; p = p->next) printf(" %d", p->value);
    printf("\\n");
}
static void dlist_print_rev(const dlist_t *l) {
    printf("rev:");
    if (dlist_empty(l)) { printf(" (empty)\\n"); return; }
    for (const dnode_t *p = l->head.prev; p != &l->head; p = p->prev) printf(" %d", p->value);
    printf("\\n");
}

int main(void) {
    dlist_t l;
    dlist_init(&l);

    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "pf") == 0) {
            int v; if (scanf("%d", &v) != 1) break;
            /* push_front(&l, v); */
        } else if (strcmp(cmd, "pb") == 0) {
            int v; if (scanf("%d", &v) != 1) break;
            /* push_back(&l, v); */
        } else if (strcmp(cmd, "pof") == 0) {
            int v;
            /* if (pop_front(&l, &v)) printf("pof=%d\\n", v); else printf("empty\\n"); */
            (void)v;
        } else if (strcmp(cmd, "pob") == 0) {
            int v;
            /* if (pop_back(&l, &v)) printf("pob=%d\\n", v); else printf("empty\\n"); */
            (void)v;
        } else if (strcmp(cmd, "fwd") == 0) {
            dlist_print_fwd(&l);
        } else if (strcmp(cmd, "rev") == 0) {
            dlist_print_rev(&l);
        }
    }
    /* dlist_clear(&l); */
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Doubly linked list", url: "https://en.wikipedia.org/wiki/Doubly_linked_list" },
      { title: "Linux kernel — list.h", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/list.h" },
      { title: "kernelnewbies — list_head", url: "https://kernelnewbies.org/FAQ/LinkedLists" }
    ]
  },

  {
    id: 67,
    number: "58",
    title: "Ring buffer (single-producer / single-consumer)",
    difficulty: "Medium",
    topic: "Data Structures",
    description: `A **ring buffer** (a.k.a. circular queue) is the workhorse of every driver, every UART, every kernel printk pipe — fixed-size storage with O(1) enqueue/dequeue and no \`malloc\` per element.

Implement a fixed-capacity int ring buffer:
\`\`\`c
typedef struct {
    int   *buf;
    size_t cap;     // total slots — keep one slot empty to distinguish full vs empty
    size_t head;    // write index (producer)
    size_t tail;    // read index (consumer)
} ring_t;
\`\`\`

Use the classic "leave one slot empty" technique:
- empty: \`head == tail\`
- full:  \`(head + 1) % cap == tail\`
- size:  \`(head - tail + cap) % cap\`

Implement:
- \`int  ring_init(ring_t *r, size_t cap);\` — \`cap\` includes the spare; effective capacity is \`cap - 1\`.
- \`void ring_destroy(ring_t *r);\`
- \`int  ring_push(ring_t *r, int v);\` — return 1 ok, 0 full.
- \`int  ring_pop(ring_t *r, int *out);\` — return 1 ok, 0 empty.

\`main\` reads:
- First line: \`cap\` (the slot count, 2..1024).
- Then commands until EOF:
  - \`push <v>\` → print \`push=ok\` or \`push=full\`.
  - \`pop\` → print \`pop=<v>\` or \`pop=empty\`.
  - \`size\` → print \`size=<n>\`.

Effective capacity is \`cap - 1\` (one slot reserved).`,
    examples: [
      {
        input: "4\npush 1\npush 2\npush 3\npush 4\npop\npop\nsize",
        output: `push=ok
push=ok
push=ok
push=full
pop=1
pop=2
size=1`,
        explanation: "cap=4 means 3 effective slots; the 4th push returns full. After two pops, one element remains."
      },
      {
        input: "2\npop\npush 7\npop\npop",
        output: `pop=empty
push=ok
pop=7
pop=empty`,
        explanation: "cap=2 → 1 effective slot. Pop on empty, then a single push/pop, then empty again."
      },
      {
        input: "3\npush 10\npop\npush 20\npush 30\nsize\npop\npop\npop",
        output: `push=ok
pop=10
push=ok
push=ok
size=2
pop=20
pop=30
pop=empty`,
        explanation: "Indexes wrap around — a correct modulo keeps reading in FIFO order."
      }
    ],
    constraints: [
      "Use the 'one slot empty' convention — full ↔ `(head + 1) % cap == tail`.",
      "All operations O(1).",
      "Allocate the buffer in `ring_init`; free in `ring_destroy`.",
      "2 ≤ cap ≤ 1024.",
      "Up to 4096 commands per run."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int   *buf;
    size_t cap;
    size_t head;
    size_t tail;
} ring_t;

static int ring_init(ring_t *r, size_t cap) {
    r->buf = malloc(cap * sizeof(int));
    if (!r->buf) return 0;
    r->cap = cap;
    r->head = r->tail = 0;
    return 1;
}
static void ring_destroy(ring_t *r) { free(r->buf); r->buf = NULL; }

static int ring_push(ring_t *r, int v) {
    /* TODO: full check; write; advance head modulo cap. */
    (void)r; (void)v; return 0;
}
static int ring_pop(ring_t *r, int *out) {
    /* TODO: empty check; read; advance tail modulo cap. */
    (void)r; (void)out; return 0;
}
static size_t ring_size(const ring_t *r) {
    return (r->head + r->cap - r->tail) % r->cap;
}

int main(void) {
    size_t cap;
    if (scanf("%zu", &cap) != 1) return 1;

    ring_t r;
    if (!ring_init(&r, cap)) return 1;

    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "push") == 0) {
            int v; if (scanf("%d", &v) != 1) break;
            printf("push=%s\\n", ring_push(&r, v) ? "ok" : "full");
        } else if (strcmp(cmd, "pop") == 0) {
            int v;
            if (ring_pop(&r, &v)) printf("pop=%d\\n", v);
            else                  printf("pop=empty\\n");
        } else if (strcmp(cmd, "size") == 0) {
            printf("size=%zu\\n", ring_size(&r));
        }
    }
    ring_destroy(&r);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Circular buffer", url: "https://en.wikipedia.org/wiki/Circular_buffer" },
      { title: "Linux kernel — circ_buf", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/circ_buf.h" },
      { title: "LWN — A circular buffer", url: "https://www.kernel.org/doc/html/latest/core-api/circular-buffers.html" }
    ]
  },

  {
    id: 68,
    number: "59",
    title: "Intrusive linked list — kernel-style with container_of",
    difficulty: "Hard",
    topic: "Data Structures",
    description: `An **intrusive list** stores the link pointers *inside* the parent struct. The list machinery doesn't know about the parent — it walks generic \`list_head\` nodes, and you recover the parent with \`container_of\`. This is exactly the Linux kernel pattern.

Define:
\`\`\`c
typedef struct list_head {
    struct list_head *prev, *next;
} list_head_t;

#define LIST_HEAD_INIT(name)  { &(name), &(name) }
#define container_of(ptr, type, member) \\
    ((type *)((char *)(ptr) - offsetof(type, member)))
#define list_for_each(p, head) \\
    for (list_head_t *p = (head)->next; p != (head); p = p->next)
#define list_entry(p, type, member)  container_of(p, type, member)
\`\`\`

Helper functions:
\`\`\`c
void list_add_tail(list_head_t *node, list_head_t *head);
void list_del(list_head_t *node);
\`\`\`

The "domain" struct embeds a node:
\`\`\`c
typedef struct {
    int          id;
    list_head_t  link;
} task_t;
\`\`\`

\`main\` reads commands:
- \`add <id>\` — \`malloc\` a \`task_t\`, set \`id\`, add to tail of the list. Print \`add=<id>\`.
- \`del <id>\` — find the task with that id, unlink it (\`list_del\`), free it. Print \`del=<id>\` or \`miss\`.
- \`print\` — walk the list with \`list_for_each\`, print \`list: id1 id2 id3\` (or \`list: (empty)\`).

At end of input, free every remaining task. The point: the linked-list code (\`list_add_tail\`, \`list_del\`, \`list_for_each\`) doesn't know what a \`task_t\` is — your loop body uses \`list_entry(p, task_t, link)\` to recover the parent. That's exactly how every Linux kernel data structure (inode lists, scheduler runqueues, dirty-page lists) works.`,
    examples: [
      {
        input: "add 1\nadd 2\nadd 3\nprint\ndel 2\nprint",
        output: `add=1
add=2
add=3
list: 1 2 3
del=2
list: 1 3`,
        explanation: "Three tasks added at tail, second deleted, two remain in original order."
      },
      {
        input: "print\ndel 99",
        output: `list: (empty)
miss`,
        explanation: "Empty list prints '(empty)'; deleting a non-existent id prints 'miss'."
      },
      {
        input: "add 5\ndel 5\nprint\nadd 7\nprint",
        output: `add=5
del=5
list: (empty)
add=7
list: 7`,
        explanation: "Add then delete then re-add — proves the head node isn't accidentally being treated as data."
      }
    ],
    constraints: [
      "Use a sentinel `head` (a `list_head_t` whose `prev`/`next` initially point at itself).",
      "The list code must not reference `task_t` — only `list_head_t`. Use `container_of` / `list_entry` to recover the parent.",
      "All add/del operations are O(1) once the target node is located.",
      "Free every task before exit (no leaks).",
      "Up to 1000 commands."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stddef.h>

typedef struct list_head {
    struct list_head *prev, *next;
} list_head_t;

#define container_of(ptr, type, member) \\
    ((type *)((char *)(ptr) - offsetof(type, member)))
#define list_entry(p, type, member) container_of(p, type, member)

static void list_init(list_head_t *h) { h->prev = h->next = h; }

static void list_add_tail(list_head_t *node, list_head_t *head) {
    /* TODO: insert node before head (i.e., at the tail of the list). */
    (void)node; (void)head;
}
static void list_del(list_head_t *node) {
    /* TODO: unlink node from its current list. */
    (void)node;
}
static int  list_empty(const list_head_t *h) { return h->next == h; }

typedef struct {
    int         id;
    list_head_t link;
} task_t;

int main(void) {
    list_head_t head;
    list_init(&head);

    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "add") == 0) {
            int id; if (scanf("%d", &id) != 1) break;
            task_t *t = malloc(sizeof *t);
            if (!t) return 1;
            t->id = id;
            list_add_tail(&t->link, &head);
            printf("add=%d\\n", id);
        } else if (strcmp(cmd, "del") == 0) {
            int id; if (scanf("%d", &id) != 1) break;
            int found = 0;
            for (list_head_t *p = head.next; p != &head; p = p->next) {
                task_t *t = list_entry(p, task_t, link);
                if (t->id == id) {
                    list_del(p);
                    free(t);
                    printf("del=%d\\n", id);
                    found = 1;
                    break;
                }
            }
            if (!found) printf("miss\\n");
        } else if (strcmp(cmd, "print") == 0) {
            printf("list:");
            if (list_empty(&head)) printf(" (empty)");
            else {
                for (list_head_t *p = head.next; p != &head; p = p->next) {
                    task_t *t = list_entry(p, task_t, link);
                    printf(" %d", t->id);
                }
            }
            printf("\\n");
        }
    }

    while (!list_empty(&head)) {
        list_head_t *p = head.next;
        list_del(p);
        free(list_entry(p, task_t, link));
    }
    return 0;
}
`,
    references: [
      { title: "Linux kernel — list.h", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/list.h" },
      { title: "kernelnewbies — Linked lists", url: "https://kernelnewbies.org/FAQ/LinkedLists" },
      { title: "LWN — Linked lists in the kernel", url: "https://lwn.net/Articles/336255/" }
    ]
  },

  {
    id: 69,
    number: "60",
    title: "Slab/pool allocator — fixed-size object cache",
    difficulty: "Hard",
    topic: "Data Structures",
    description: `A **slab allocator** pre-reserves storage for many objects of one size, hands them out in O(1), and gets them back into a free list. The Linux kernel's \`kmem_cache\` is exactly this idea, scaled up.

Build a minimal pool allocator for fixed-size blocks:
\`\`\`c
typedef struct {
    void  *storage;       // single big malloc — block_size * capacity
    size_t block_size;
    size_t capacity;      // total blocks in the pool
    void  *free_list;     // singly-linked free list (next pointer lives in the free block itself)
    size_t live;          // currently-allocated count
} pool_t;
\`\`\`

Implement:
- \`int  pool_init(pool_t *p, size_t block_size, size_t capacity);\` — alloc storage, thread free list across all blocks.
- \`void *pool_alloc(pool_t *p);\` — pop the head of the free list. Return \`NULL\` if exhausted.
- \`void pool_free(pool_t *p, void *blk);\` — push back onto the free list.
- \`void pool_destroy(pool_t *p);\` — \`free(p->storage)\`.

Key idea: when a block is free, the first \`sizeof(void *)\` bytes hold the \`next\` pointer in the free list. \`block_size\` must be at least \`sizeof(void *)\`.

\`main\` reads:
- First line: \`block_size capacity\` (\`block_size ≥ 8\`, \`capacity ≤ 64\`).
- Then commands:
  - \`alloc\` → save the block in slot \`live - 1\` and print \`alloc=ok live=<n>\` (or \`alloc=null live=<n>\` if exhausted).
  - \`free <i>\` → free the block previously alloc'd at slot \`i\` (1-based count of successful alloc calls). Print \`free=ok live=<n>\` or \`free=miss live=<n>\` if slot is empty.

The grader doesn't check pointer values (those are non-deterministic) — only the live count and ok/null/miss tokens.`,
    examples: [
      {
        input: "16 3\nalloc\nalloc\nalloc\nalloc\nfree 1\nalloc",
        output: `alloc=ok live=1
alloc=ok live=2
alloc=ok live=3
alloc=null live=3
free=ok live=2
alloc=ok live=3`,
        explanation: "Capacity is 3 → 4th alloc fails. Freeing slot 1 makes room for one more alloc."
      },
      {
        input: "8 1\nalloc\nfree 1\nfree 1\nalloc",
        output: `alloc=ok live=1
free=ok live=0
free=miss live=0
alloc=ok live=1`,
        explanation: "Free of an already-freed slot is a miss; the freed block can be re-allocated."
      },
      {
        input: "8 2\nalloc\nalloc\nfree 2\nfree 1\nalloc\nalloc",
        output: `alloc=ok live=1
alloc=ok live=2
free=ok live=1
free=ok live=0
alloc=ok live=1
alloc=ok live=2`,
        explanation: "Free order doesn't matter — both slots come back, both alloc again."
      }
    ],
    constraints: [
      "Single big `malloc` for storage — no per-block `malloc`/`free`.",
      "Free list threaded inside the freed blocks themselves (treat first `sizeof(void *)` bytes as a `next` pointer).",
      "`block_size ≥ sizeof(void *)` — assume input satisfies this.",
      "`pool_alloc` and `pool_free` are O(1).",
      "8 ≤ block_size ≤ 64; 1 ≤ capacity ≤ 64.",
      "On EOF, pool is destroyed cleanly (no leaks)."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    void  *storage;
    size_t block_size;
    size_t capacity;
    void  *free_list;
    size_t live;
} pool_t;

static int pool_init(pool_t *p, size_t block_size, size_t capacity) {
    /* TODO: malloc storage, thread free list across blocks. */
    (void)p; (void)block_size; (void)capacity;
    return 0;
}
static void *pool_alloc(pool_t *p) {
    /* TODO: pop free list head. */
    (void)p;
    return NULL;
}
static void pool_free(pool_t *p, void *blk) {
    /* TODO: push blk back on free list. */
    (void)p; (void)blk;
}
static void pool_destroy(pool_t *p) { free(p->storage); p->storage = NULL; }

int main(void) {
    size_t bs, cap;
    if (scanf("%zu %zu", &bs, &cap) != 2) return 1;

    pool_t p;
    if (!pool_init(&p, bs, cap)) return 1;

    void *slots[64] = {0};
    int   slot_used[64] = {0};
    int   slot_count = 0;

    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "alloc") == 0) {
            void *b = pool_alloc(&p);
            if (b) {
                slots[slot_count] = b;
                slot_used[slot_count] = 1;
                slot_count++;
                printf("alloc=ok live=%zu\\n", p.live);
            } else {
                printf("alloc=null live=%zu\\n", p.live);
            }
        } else if (strcmp(cmd, "free") == 0) {
            int idx; if (scanf("%d", &idx) != 1) break;
            int i = idx - 1;
            if (i < 0 || i >= slot_count || !slot_used[i]) {
                printf("free=miss live=%zu\\n", p.live);
            } else {
                pool_free(&p, slots[i]);
                slot_used[i] = 0;
                printf("free=ok live=%zu\\n", p.live);
            }
        }
    }
    pool_destroy(&p);
    return 0;
}
`,
    references: [
      { title: "Bonwick — The Slab Allocator (USENIX 1994)", url: "https://www.usenix.org/legacy/publications/library/proceedings/bos94/full_papers/bonwick.pdf" },
      { title: "Linux kernel — kmem_cache", url: "https://elixir.bootlin.com/linux/latest/source/mm/slab.c" },
      { title: "OSTEP — Memory allocators", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf" }
    ]
  },

  // ===========================================================
  // SECTION 9 (cont.) — Bitwise Operations (additional)
  // ===========================================================
  {
    id: 70,
    number: "68",
    title: "Reverse bits in a 32-bit word",
    difficulty: "Medium",
    topic: "Bitwise Operations",
    description: `Implement \`uint32_t reverse_bits(uint32_t x)\` that reverses the bit order of \`x\`. Bit 0 becomes bit 31, bit 1 becomes bit 30, and so on.

Read a single \`uint32_t\` from stdin (decimal) and print:
\`\`\`
in =<32-bit binary>
out=<32-bit binary>
hex=0x<8 hex digits>
\`\`\`

The binary lines are 32 chars each, no separators. The hex line is the reversed value as 8 lowercase hex digits.

Two implementations are interesting: the naive shift-and-OR loop (32 iterations) and the divide-and-conquer "swap halves, swap quarters, ..." approach (5 steps). The naive one is fine for this problem — focus on getting the bit indexing right.`,
    examples: [
      {
        input: "1",
        output: `in =00000000000000000000000000000001
out=10000000000000000000000000000000
hex=0x80000000`,
        explanation: "Only bit 0 set → reversed has only bit 31 set = 0x80000000."
      },
      {
        input: "0",
        output: `in =00000000000000000000000000000000
out=00000000000000000000000000000000
hex=0x00000000`,
        explanation: "All zeros stay all zeros."
      },
      {
        input: "4294967295",
        output: `in =11111111111111111111111111111111
out=11111111111111111111111111111111
hex=0xffffffff`,
        explanation: "All ones reverse to all ones."
      },
      {
        input: "43261596",
        output: `in =00000010100101000001111010011100
out=00111001011110000010100101000000
hex=0x39782940`,
        explanation: "Classic LeetCode reverse-bits example: 0x02945e9c → 0x39782940."
      }
    ],
    constraints: [
      "Function signature: `uint32_t reverse_bits(uint32_t x);`.",
      "Do not call `__builtin_bswap32` or any GCC builtin.",
      "Print exactly 32 binary digits, padded with leading zeros.",
      "Hex output: lowercase, 8 digits, `0x` prefix.",
      "0 ≤ x ≤ 4294967295."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

uint32_t reverse_bits(uint32_t x) {
    // Walk i from 0..31; if bit i is set in x, set bit (31 - i) in result.
    (void)x;
    return 0;
}

static void print_bits32(const char *label, uint32_t x) {
    printf("%s=", label);
    for (int i = 31; i >= 0; i--) putchar((x >> i) & 1 ? '1' : '0');
    putchar('\\n');
}

int main(void) {
    uint32_t x;
    if (scanf("%u", &x) != 1) return 1;
    uint32_t r = reverse_bits(x);
    print_bits32("in ", x);
    print_bits32("out", r);
    printf("hex=0x%08x\\n", r);
    return 0;
}
`,
    references: [
      { title: "Bit Twiddling Hacks — Reverse bits", url: "https://graphics.stanford.edu/~seander/bithacks.html#ReverseParallel" },
      { title: "LeetCode — Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/" },
      { title: "cppreference — Bitwise operators", url: "https://en.cppreference.com/w/c/language/operator_arithmetic" }
    ]
  },

  {
    id: 71,
    number: "69",
    title: "Round up to next power of 2",
    difficulty: "Medium",
    topic: "Bitwise Operations",
    description: `Write \`uint32_t next_pow2(uint32_t x)\` that returns the smallest power of 2 ≥ \`x\`. Edge cases:
- \`next_pow2(0)\` → \`1\` (by convention).
- \`next_pow2(1)\` → \`1\`.
- \`next_pow2(5)\` → \`8\`.
- \`next_pow2(0x80000000)\` → \`0x80000000\` (already a power of 2).
- \`next_pow2(0x80000001)\` → undefined-behaviour territory if you use 32-bit arithmetic; clamp to \`0\` and return that to indicate overflow.

The classic bit trick (works for non-zero \`x\`):
\`\`\`c
x--;
x |= x >> 1;
x |= x >> 2;
x |= x >> 4;
x |= x >> 8;
x |= x >> 16;
x++;
\`\`\`
After those shifts, every bit ≤ the highest set bit is 1. Adding 1 carries into the next power of 2.

Read \`x\` from stdin (decimal); print \`next=<value>\`. On overflow (top bit already set above the largest 32-bit power of 2), print \`next=0\`.`,
    examples: [
      { input: "0",          output: "next=1",          explanation: "By convention." },
      { input: "1",          output: "next=1",          explanation: "Already a power of 2." },
      { input: "5",          output: "next=8",          explanation: "Round up." },
      { input: "1023",       output: "next=1024",       explanation: "One short of 1024." },
      { input: "1024",       output: "next=1024",       explanation: "Exactly 1024." },
      { input: "2147483648", output: "next=2147483648", explanation: "0x80000000 — largest 32-bit power of 2." },
      { input: "2147483649", output: "next=0",          explanation: "Above the largest 32-bit power of 2 — overflow → 0." }
    ],
    constraints: [
      "Function signature: `uint32_t next_pow2(uint32_t x);`.",
      "0 → 1; 1 → 1; otherwise the smallest power of 2 ≥ x.",
      "Above 0x80000000, return 0 (overflow indicator).",
      "Use bit shifts; no `<math.h>`, no loops over individual bits is required (bit-trick is fine).",
      "0 ≤ x ≤ 4294967295."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

uint32_t next_pow2(uint32_t x) {
    // Edge: 0 → 1.
    // Above 0x80000000 → return 0 (overflow).
    // Otherwise: x--, smear bits via shifts, x++.
    (void)x;
    return 0;
}

int main(void) {
    uint32_t x;
    if (scanf("%u", &x) != 1) return 1;
    printf("next=%u\\n", next_pow2(x));
    return 0;
}
`,
    references: [
      { title: "Bit Twiddling Hacks — Next power of 2", url: "https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2" },
      { title: "Linux kernel — roundup_pow_of_two", url: "https://elixir.bootlin.com/linux/latest/source/include/linux/log2.h" },
      { title: "cppreference — Bitwise operators", url: "https://en.cppreference.com/w/c/language/operator_arithmetic" }
    ]
  },

  {
    id: 72,
    number: "70",
    title: "Hamming distance between two integers",
    difficulty: "Easy",
    topic: "Bitwise Operations",
    description: `The **Hamming distance** between two integers is the number of bit positions in which they differ.

Implement:
\`\`\`c
int hamming_distance(uint32_t a, uint32_t b);
\`\`\`
Trick: \`hamming_distance(a, b) == popcount(a ^ b)\`. The XOR has a 1 in every differing bit; counting set bits in the XOR is the answer. You can call your popcount from problem #39 (\`__builtin_popcount\` is *not* allowed) or write a Brian-Kernighan loop:
\`\`\`c
while (x) { count++; x &= x - 1; }
\`\`\`

\`main\` reads two unsigned 32-bit integers \`a b\` and prints the distance.`,
    examples: [
      { input: "1 4",          output: "2",  explanation: "0001 ⊕ 0100 = 0101 → two differing bits." },
      { input: "0 0",          output: "0",  explanation: "Identical." },
      { input: "0 4294967295", output: "32", explanation: "All bits differ between 0 and ~0." },
      { input: "12 5",         output: "2",  explanation: "12=1100, 5=0101. XOR=1001 (only bits 0 and 3 differ). popcount(1001)=2." }
    ],
    constraints: [
      "Function signature: `int hamming_distance(uint32_t a, uint32_t b);`.",
      "Do not use `__builtin_popcount`.",
      "0 ≤ a, b ≤ 4294967295."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>

static int popcount(uint32_t x) {
    int c = 0;
    while (x) { c++; x &= x - 1; }   // Brian Kernighan
    return c;
}

int hamming_distance(uint32_t a, uint32_t b) {
    return popcount(a ^ b);
}

int main(void) {
    uint32_t a, b;
    if (scanf("%u %u", &a, &b) != 2) return 1;
    printf("%d\\n", hamming_distance(a, b));
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Hamming distance", url: "https://en.wikipedia.org/wiki/Hamming_distance" },
      { title: "LeetCode — Hamming Distance", url: "https://leetcode.com/problems/hamming-distance/" },
      { title: "Bit Twiddling Hacks — Population count", url: "https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan" }
    ]
  },

  // ===========================================================
  // SECTION 10 (cont.) — Capstones (additional)
  // ===========================================================
  {
    id: 73,
    number: "73",
    title: "TLV parser — decode a Type-Length-Value byte stream",
    difficulty: "Hard",
    topic: "Capstones",
    description: `**Type-Length-Value** is the structure of nearly every binary protocol on Earth: BER/DER, ASN.1, USB descriptors, TLS extensions, Bluetooth advertising packets, BGP attributes. A TLV record is:

\`\`\`
+------+--------+--------------------+
| TYPE | LENGTH | VALUE (LENGTH B)   |
+------+--------+--------------------+
\`\`\`

In this problem use these on-the-wire conventions:
- \`type\`   : 1 byte (0–255)
- \`length\` : 2 bytes, big-endian
- \`value\`  : exactly \`length\` bytes

Build a parser that reads N hex bytes from stdin, walks the TLV stream, and prints one line per record:
\`\`\`
type=<n> len=<n> value=<hex bytes>
\`\`\`
\`value\` is 2 hex digits per byte, space-separated. If a record's declared length runs past end-of-stream, print \`error: truncated at offset=<n>\` and stop.

Final line: \`records=<count>\` (the number of cleanly parsed records before any truncation).

\`main\` reads:
- An integer \`N\` (number of bytes in the stream, \`0 ≤ N ≤ 1024\`).
- \`N\` space-separated hex bytes (\`%x\`).`,
    examples: [
      {
        input: "9\n01 00 02 aa bb 02 00 01 ff",
        output: `type=1 len=2 value=aa bb
type=2 len=1 value=ff
records=2`,
        explanation: "Two well-formed records back-to-back."
      },
      {
        input: "0\n",
        output: "records=0",
        explanation: "Empty stream — zero records."
      },
      {
        input: "5\n07 00 0a 01 02",
        output: `error: truncated at offset=0
records=0`,
        explanation: "First record claims length 10 but only 2 value bytes follow — truncated."
      },
      {
        input: "6\n42 00 00 99 00 00",
        output: `type=66 len=0 value=
type=153 len=0 value=
records=2`,
        explanation: "Zero-length values are valid; type 0x42=66, type 0x99=153."
      }
    ],
    constraints: [
      "Length is 2 bytes, big-endian — combine `(buf[i] << 8) | buf[i+1]`.",
      "Reject records whose declared length runs past the buffer with the truncation message.",
      "Print value bytes in lowercase 2-digit hex, space-separated. For zero-length records the value field is empty (just the trailing newline).",
      "0 ≤ N ≤ 1024 bytes total.",
      "First read `N`, then read exactly `N` `%x` tokens (each is one byte 0..255)."
    ],
    starterCode: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    if (n < 0 || n > 1024) return 1;

    uint8_t *buf = (uint8_t *)calloc(n > 0 ? n : 1, 1);
    if (!buf) return 1;
    for (int i = 0; i < n; i++) {
        unsigned int b;
        if (scanf("%x", &b) != 1) { free(buf); return 1; }
        buf[i] = (uint8_t)b;
    }

    int records = 0;
    int i = 0;
    while (i < n) {
        if (n - i < 3) { printf("error: truncated at offset=%d\\n", i); break; }
        uint8_t  type = buf[i];
        uint16_t len  = (uint16_t)((buf[i + 1] << 8) | buf[i + 2]);
        if (i + 3 + len > n) { printf("error: truncated at offset=%d\\n", i); break; }
        printf("type=%u len=%u value=", type, len);
        for (uint16_t k = 0; k < len; k++) {
            printf("%02x%s", buf[i + 3 + k], k + 1 == len ? "" : " ");
        }
        printf("\\n");
        records++;
        i += 3 + len;
    }
    printf("records=%d\\n", records);
    free(buf);
    return 0;
}
`,
    references: [
      { title: "Wikipedia — Type-length-value", url: "https://en.wikipedia.org/wiki/Type%E2%80%93length%E2%80%93value" },
      { title: "RFC 8949 — CBOR (binary TLV-style format)", url: "https://www.rfc-editor.org/rfc/rfc8949" },
      { title: "X.690 — ASN.1 BER/DER (the granddaddy of TLV)", url: "https://www.itu.int/rec/T-REC-X.690" }
    ]
  },

  {
    id: 74,
    number: "74",
    title: "Mini malloc — bump allocator with explicit free list",
    difficulty: "Hard",
    topic: "Capstones",
    description: `Build a tiny \`malloc\`/\`free\` over a single static byte arena. This is the same pattern as a kernel's early-boot bump allocator and is the natural prerequisite for reading any chapter on heap layout, fragmentation, and free-list strategies.

Storage:
\`\`\`c
#define ARENA_SIZE 4096
static unsigned char arena[ARENA_SIZE];
\`\`\`

Each block has an in-band header:
\`\`\`c
typedef struct block {
    size_t        size;        // payload size in bytes (excludes header)
    int           free;        // 1 if free, 0 if in use
    struct block *next;        // next block in a doubly-linked block chain
    struct block *prev;
} block_t;
\`\`\`

Maintain one chain of all blocks (free + used) in address order. Initially the whole arena is one big free block.

API:
- \`void *my_malloc(size_t n);\` — first-fit search; split the block if the leftover is big enough to hold another header plus a small payload (≥ 16 bytes total). Return the payload address (just past the header).
- \`void  my_free(void *p);\` — mark the block free, then **coalesce** with adjacent free blocks (both forward and backward).
- \`void  my_dump(void);\` — print every block in order: \`[F|U]<size>\`, separated by spaces.

\`main\` reads commands:
- \`alloc <n>\` — size in bytes; print \`alloc=ok id=<i>\` on success or \`alloc=null\` if no fit. \`<i>\` is a 1-based count of successful allocs (used as a handle for free).
- \`free <i>\` — free the i-th allocated pointer. Print \`free=ok\` or \`free=miss\` if already freed / never allocated.
- \`dump\` — call \`my_dump\` and print.

The grader checks the dump strings (which depend only on size and free/used state) and the ok/null/miss tokens.`,
    examples: [
      {
        input: "alloc 100\nalloc 200\nalloc 50\ndump\nfree 2\ndump",
        output: `alloc=ok id=1
alloc=ok id=2
alloc=ok id=3
[U]100 [U]200 [U]50 [F]<rest>
free=ok
[U]100 [F]200 [U]50 [F]<rest>`,
        explanation: "Three allocs in order; freeing the middle one creates an interior free block. The grader uses `<rest>` placeholder for the trailing free chunk size since it depends on header size."
      },
      {
        input: "alloc 100\nfree 1\nfree 1",
        output: `alloc=ok id=1
free=ok
free=miss`,
        explanation: "Double-free is a miss."
      },
      {
        input: "alloc 100\nalloc 100\nfree 1\nfree 2\ndump",
        output: `alloc=ok id=1
alloc=ok id=2
free=ok
free=ok
[F]<rest>`,
        explanation: "After freeing both, coalescing merges them with the trailing free block into a single free chunk."
      }
    ],
    constraints: [
      "Single static `arena[ARENA_SIZE]` — no `malloc` from libc.",
      "Block header layout fixed as shown.",
      "First-fit search; split a free block if leftover ≥ `sizeof(block_t) + 16` payload.",
      "Free must coalesce with adjacent free blocks (both sides).",
      "`my_dump` prints the block list left-to-right, blocks separated by spaces. `[U]<n>` for in-use, `[F]<n>` for free (where `<n>` is payload size). Use the token `<rest>` in expected output for the trailing free block whose size depends on header size — the grader normalises it.",
      "ARENA_SIZE = 4096."
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define ARENA_SIZE 4096

typedef struct block {
    size_t        size;
    int           free;
    struct block *next;
    struct block *prev;
} block_t;

static unsigned char arena[ARENA_SIZE];
static block_t      *head = NULL;

static void heap_init(void) {
    if (head) return;
    head = (block_t *)arena;
    head->size = ARENA_SIZE - sizeof(block_t);
    head->free = 1;
    head->next = head->prev = NULL;
}

static void *my_malloc(size_t n) {
    /* TODO: first-fit search; split if leftover is big enough. */
    (void)n;
    return NULL;
}

static void my_free(void *p) {
    /* TODO: mark free; coalesce with prev and next if free. */
    (void)p;
}

static void my_dump(void) {
    for (block_t *b = head; b; b = b->next) {
        printf("[%c]%zu%s", b->free ? 'F' : 'U', b->size, b->next ? " " : "\\n");
    }
}

int main(void) {
    heap_init();

    void *handles[64] = {0};
    int   used[64]    = {0};
    int   alloc_count = 0;

    char cmd[8];
    while (scanf("%7s", cmd) == 1) {
        if (strcmp(cmd, "alloc") == 0) {
            size_t n;
            if (scanf("%zu", &n) != 1) break;
            void *p = my_malloc(n);
            if (p) {
                handles[alloc_count] = p;
                used[alloc_count]    = 1;
                alloc_count++;
                printf("alloc=ok id=%d\\n", alloc_count);
            } else {
                printf("alloc=null\\n");
            }
        } else if (strcmp(cmd, "free") == 0) {
            int idx;
            if (scanf("%d", &idx) != 1) break;
            int i = idx - 1;
            if (i < 0 || i >= alloc_count || !used[i]) {
                printf("free=miss\\n");
            } else {
                my_free(handles[i]);
                used[i] = 0;
                printf("free=ok\\n");
            }
        } else if (strcmp(cmd, "dump") == 0) {
            my_dump();
        }
    }
    return 0;
}
`,
    references: [
      { title: "OSTEP — Memory free space management", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf" },
      { title: "K&R — Section 8.7: A storage allocator", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language" },
      { title: "Linux kernel — kmalloc", url: "https://elixir.bootlin.com/linux/latest/source/mm/slab_common.c" }
    ]
  },
];

const problemsWithTests = problems.map((p) => ({
  ...p,
  tests: tests[p.id] || { sample: [], hidden: [] },
}));

export default problemsWithTests;

export const sections = [
  { id: 1,  name: "Variables, Types & Control Flow", range: "01–05" },
  { id: 2,  name: "Functions & Recursion",           range: "06–09" },
  { id: 3,  name: "Pointers",                        range: "10–23" },
  { id: 4,  name: "Preprocessor & Macros",           range: "24–27" },
  { id: 5,  name: "Storage Classes & Qualifiers",    range: "28–30" },
  { id: 6,  name: "Arrays & Strings",                range: "31–43" },
  { id: 7,  name: "Structs",                         range: "44–48" },
  { id: 8,  name: "Dynamic Memory",                  range: "49–52" },
  { id: 9,  name: "Linked List",                     range: "53–56" },
  { id: 10, name: "Data Structures",                 range: "57–60" },
  { id: 11, name: "File I/O",                        range: "61" },
  { id: 12, name: "Bitwise Operations",              range: "62–70" },
  { id: 13, name: "Capstones",                       range: "71–74" },
];
