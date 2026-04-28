// Sample + hidden test cases per problem.
//
// `sample` is shown to the user and run by the Run button.
// `hidden` is run only by the Submit button — inputs are concealed in the UI
// but revealed for any failing case so the user can debug.
//
// For problems whose starter `main()` already does its own I/O (string funcs,
// stdin-driven functions), tests vary `stdin`. For problems with hardcoded
// mains, there is one sample test that matches the hardcoded run.

const T = {};

// ---------- Shared helpers (used by multiple sections below) ----------
const seq = (n, start = 0) =>
  Array.from({ length: n }, (_, i) => start + i).join(" ");
const squaresUpTo = (n) =>
  Array.from({ length: n }, (_, i) => i * i).join(" ");

// ---------- Section 1: Variables, Types & Control Flow ----------

// #1 Print sizes — Wandbox runs gcc on Linux x86_64, sizes are stable there.
T[1] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "char: 1 bytes\nshort: 2 bytes\nint: 4 bytes\nlong: 8 bytes\nlong long: 8 bytes\nfloat: 4 bytes\ndouble: 8 bytes",
      note: "Sizes are platform-defined. Wandbox runs Linux x86_64 where these are stable.",
    },
  ],
  hidden: [],
};

// #2 FizzBuzz — fully deterministic. One canonical test.
const fizzbuzz = () => {
  const out = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out.join("\n");
};
T[2] = {
  sample: [{ stdin: "", expectedStdout: fizzbuzz() }],
  hidden: [],
};

// #3 Number to binary
T[3] = {
  sample: [
    { stdin: "5", expectedStdout: "101" },
    { stdin: "0", expectedStdout: "0" },
    { stdin: "255", expectedStdout: "11111111" },
  ],
  hidden: [
    { stdin: "1", expectedStdout: "1" },
    { stdin: "2", expectedStdout: "10" },
    { stdin: "3", expectedStdout: "11" },
    { stdin: "4", expectedStdout: "100" },
    { stdin: "7", expectedStdout: "111" },
    { stdin: "8", expectedStdout: "1000" },
    { stdin: "16", expectedStdout: "10000" },
    { stdin: "31", expectedStdout: "11111" },
    { stdin: "32", expectedStdout: "100000", note: "power of two boundary" },
    { stdin: "63", expectedStdout: "111111" },
    { stdin: "64", expectedStdout: "1000000" },
    { stdin: "127", expectedStdout: "1111111" },
    { stdin: "128", expectedStdout: "10000000" },
    { stdin: "256", expectedStdout: "100000000" },
    { stdin: "511", expectedStdout: "111111111" },
    { stdin: "512", expectedStdout: "1000000000" },
    { stdin: "1024", expectedStdout: "10000000000" },
    { stdin: "12345", expectedStdout: "11000000111001" },
    { stdin: "65535", expectedStdout: "1111111111111111", note: "16-bit all ones" },
    { stdin: "65536", expectedStdout: "10000000000000000" },
    { stdin: "1073741823", expectedStdout: "111111111111111111111111111111", note: "2^30 - 1" },
    { stdin: "1073741824", expectedStdout: "1000000000000000000000000000000", note: "2^30" },
    { stdin: "2147483647", expectedStdout: "1111111111111111111111111111111", note: "INT_MAX" },
  ],
};

// #4 Sum of digits
T[4] = {
  sample: [
    { stdin: "1234", expectedStdout: "10" },
    { stdin: "0", expectedStdout: "0" },
    { stdin: "9999", expectedStdout: "36" },
  ],
  hidden: [
    { stdin: "1", expectedStdout: "1" },
    { stdin: "5", expectedStdout: "5" },
    { stdin: "9", expectedStdout: "9", note: "single largest digit" },
    { stdin: "10", expectedStdout: "1", note: "trailing zero" },
    { stdin: "11", expectedStdout: "2" },
    { stdin: "19", expectedStdout: "10" },
    { stdin: "20", expectedStdout: "2" },
    { stdin: "100", expectedStdout: "1" },
    { stdin: "101", expectedStdout: "2", note: "zeros sandwiched between digits" },
    { stdin: "1000", expectedStdout: "1" },
    { stdin: "10001", expectedStdout: "2" },
    { stdin: "11111", expectedStdout: "5" },
    { stdin: "10101", expectedStdout: "3" },
    { stdin: "555", expectedStdout: "15" },
    { stdin: "999", expectedStdout: "27" },
    { stdin: "1000000", expectedStdout: "1", note: "one million" },
    { stdin: "1000000000", expectedStdout: "1", note: "ten digits, only one nonzero" },
    { stdin: "999999999", expectedStdout: "81" },
    { stdin: "987654321", expectedStdout: "45" },
    { stdin: "123456789", expectedStdout: "45" },
    { stdin: "2147483647", expectedStdout: "46", note: "INT_MAX" },
  ],
};

// #5 Celsius→Fahrenheit table
const ctof = () => {
  const lines = [];
  for (let c = -40; c <= 100; c += 5) {
    const f = (c * 9) / 5 + 32;
    lines.push(`${c.toFixed(1).padStart(8)} ${f.toFixed(1).padStart(8)}`);
  }
  return lines.join("\n");
};
T[5] = {
  sample: [{ stdin: "", expectedStdout: ctof() }],
  hidden: [],
};

// ---------- Section 2: Functions & Recursion ----------

// #6 Recursive factorial — stdin n, prints rec=X iter=X.
const fact = (n) => {
  let r = 1n;
  for (let i = 1; i <= n; i++) r *= BigInt(i);
  return r;
};
const factLine = (n) => `rec=${fact(n)} iter=${fact(n)}`;
T[6] = {
  sample: [
    { stdin: "0", expectedStdout: factLine(0) },
    { stdin: "5", expectedStdout: factLine(5) },
    { stdin: "12", expectedStdout: factLine(12) },
  ],
  hidden: [
    { stdin: "1", expectedStdout: factLine(1) },
    { stdin: "2", expectedStdout: factLine(2) },
    { stdin: "3", expectedStdout: factLine(3) },
    { stdin: "4", expectedStdout: factLine(4) },
    { stdin: "6", expectedStdout: factLine(6) },
    { stdin: "7", expectedStdout: factLine(7) },
    { stdin: "8", expectedStdout: factLine(8) },
    { stdin: "9", expectedStdout: factLine(9) },
    { stdin: "10", expectedStdout: factLine(10) },
    { stdin: "11", expectedStdout: factLine(11) },
    { stdin: "13", expectedStdout: factLine(13), note: "exceeds 32-bit int — exercises ull" },
    { stdin: "15", expectedStdout: factLine(15) },
    { stdin: "17", expectedStdout: factLine(17) },
    { stdin: "19", expectedStdout: factLine(19) },
    { stdin: "20", expectedStdout: factLine(20), note: "max factorial that fits in ull" },
  ],
};

// #7 Recursive Fibonacci — fixed main calls fib(10) then fib(30).
T[7] = {
  sample: [
    {
      stdin: "",
      expectedStdout: "fib(10) = 55  (calls: 177)\nfib(30) = 832040  (calls: 2692537)",
    },
  ],
  hidden: [],
};

// #8 Power — stdin: base exp, output: %g of result.
T[8] = {
  sample: [
    { stdin: "2 10", expectedStdout: "1024" },
    { stdin: "2 -3", expectedStdout: "0.125" },
    { stdin: "5 0",  expectedStdout: "1" },
  ],
  hidden: [
    { stdin: "0 0",   expectedStdout: "1",      note: "0^0 = 1 by convention" },
    { stdin: "0 1",   expectedStdout: "0",      note: "0 to positive" },
    { stdin: "0 5",   expectedStdout: "0" },
    { stdin: "1 0",   expectedStdout: "1" },
    { stdin: "1 1",   expectedStdout: "1" },
    { stdin: "1 100", expectedStdout: "1",      note: "1 to anything" },
    { stdin: "1 -50", expectedStdout: "1",      note: "1 to negative is still 1" },
    { stdin: "-1 0",  expectedStdout: "1" },
    { stdin: "-1 1",  expectedStdout: "-1" },
    { stdin: "-1 2",  expectedStdout: "1",      note: "(-1)^even = 1" },
    { stdin: "-1 3",  expectedStdout: "-1" },
    { stdin: "-1 100",expectedStdout: "1" },
    { stdin: "-1 -1", expectedStdout: "-1",     note: "1/(-1) = -1" },
    { stdin: "-1 -2", expectedStdout: "1" },
    { stdin: "2 0",   expectedStdout: "1" },
    { stdin: "2 1",   expectedStdout: "2" },
    { stdin: "2 2",   expectedStdout: "4" },
    { stdin: "2 3",   expectedStdout: "8" },
    { stdin: "2 -1",  expectedStdout: "0.5" },
    { stdin: "2 -2",  expectedStdout: "0.25" },
    { stdin: "2 -4",  expectedStdout: "0.0625" },
    { stdin: "2 16",  expectedStdout: "65536" },
    { stdin: "0.5 4", expectedStdout: "0.0625" },
    { stdin: "0.5 -2",expectedStdout: "4" },
    { stdin: "10 0",  expectedStdout: "1" },
    { stdin: "10 5",  expectedStdout: "100000" },
    { stdin: "3 4",   expectedStdout: "81" },
    { stdin: "5 4",   expectedStdout: "625" },
    { stdin: "7 2",   expectedStdout: "49" },
    { stdin: "-2 3",  expectedStdout: "-8",     note: "negative base, odd exp" },
    { stdin: "-2 4",  expectedStdout: "16",     note: "negative base, even exp" },
    { stdin: "-3 3",  expectedStdout: "-27" },
    { stdin: "-2 -1", expectedStdout: "-0.5" },
    { stdin: "-2 -2", expectedStdout: "0.25" },
  ],
};

// #9 Function-pointer calculator — stdin driven.
T[9] = {
  sample: [
    { stdin: "10 0 3", expectedStdout: "13" },
    { stdin: "10 2 3", expectedStdout: "30" },
    { stdin: "10 3 4", expectedStdout: "2" },
  ],
  hidden: [
    { stdin: "0 0 0", expectedStdout: "0", note: "0 + 0" },
    { stdin: "0 1 0", expectedStdout: "0", note: "0 - 0" },
    { stdin: "0 2 0", expectedStdout: "0", note: "0 * 0" },
    { stdin: "5 0 -3", expectedStdout: "2", note: "add with negative" },
    { stdin: "-5 0 3", expectedStdout: "-2", note: "negative + positive" },
    { stdin: "-10 0 -10", expectedStdout: "-20", note: "negative + negative" },
    { stdin: "0 1 100", expectedStdout: "-100", note: "subtract from zero" },
    { stdin: "100 1 50", expectedStdout: "50" },
    { stdin: "10 1 10", expectedStdout: "0", note: "subtract to zero" },
    { stdin: "-50 1 -50", expectedStdout: "0", note: "negative - negative" },
    { stdin: "7 2 6", expectedStdout: "42" },
    { stdin: "1000 2 1000", expectedStdout: "1000000", note: "large product within int range" },
    { stdin: "-3 2 -4", expectedStdout: "12", note: "negative * negative" },
    { stdin: "-7 2 5", expectedStdout: "-35", note: "negative * positive" },
    { stdin: "0 2 12345", expectedStdout: "0", note: "zero * anything" },
    { stdin: "20 3 5", expectedStdout: "4" },
    { stdin: "1 3 1", expectedStdout: "1" },
    { stdin: "-7 3 2", expectedStdout: "-3", note: "C99+ truncates toward zero" },
    { stdin: "7 3 -2", expectedStdout: "-3" },
    { stdin: "0 3 5", expectedStdout: "0", note: "zero / nonzero" },
    { stdin: "1 3 1000000", expectedStdout: "0", note: "small / huge" },
    { stdin: "5 3 0", expectedStdout: "0", note: "divide-by-zero guard" },
    { stdin: "-5 3 0", expectedStdout: "0", note: "divide-by-zero with negative numerator" },
  ],
};

// ---------- Section 3: Pointers ----------

// #10 Swap — addresses normalised to <addr> by the runner.
T[10] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "Before: x = 5 @ <addr>, y = 10 @ <addr>\nAfter:  x = 10 @ <addr>, y = 5 @ <addr>",
    },
  ],
  hidden: [],
};

// #11 Pointer arithmetic on arrays — stdin: ints, prints two passes.
const dualPrint = (vals) => {
  const joined = vals.join(" ");
  return `Subscript: ${joined}\nPointer:   ${joined}`;
};
T[11] = {
  sample: [
    {
      stdin: "10 20 30 40 50",
      expectedStdout: dualPrint([10, 20, 30, 40, 50]),
    },
    { stdin: "1", expectedStdout: dualPrint([1]) },
    { stdin: "1 2 3", expectedStdout: dualPrint([1, 2, 3]) },
  ],
  hidden: [
    { stdin: "0", expectedStdout: dualPrint([0]) },
    { stdin: "42", expectedStdout: dualPrint([42]) },
    { stdin: "-1 -2 -3", expectedStdout: dualPrint([-1, -2, -3]), note: "negatives" },
    { stdin: "0 0 0 0 0", expectedStdout: dualPrint([0, 0, 0, 0, 0]) },
    { stdin: "5 5 5", expectedStdout: dualPrint([5, 5, 5]), note: "duplicates" },
    { stdin: "1 2 3 4 5 6 7 8 9 10", expectedStdout: dualPrint([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) },
    { stdin: "-100 100 -100 100", expectedStdout: dualPrint([-100, 100, -100, 100]) },
    { stdin: "2147483647 -2147483647", expectedStdout: dualPrint([2147483647, -2147483647]), note: "near INT_MAX/MIN" },
    { stdin: seq(20), expectedStdout: dualPrint(Array.from({length:20},(_,i)=>i)), note: "longer array" },
  ],
};

// #12 Array of pointers — stdin 5 ints, prints doubled values.
const doubled = (a, b, c, d, e) => `${a*2} ${b*2} ${c*2} ${d*2} ${e*2}`;
T[12] = {
  sample: [
    { stdin: "1 2 3 4 5", expectedStdout: "2 4 6 8 10" },
    { stdin: "0 0 0 0 0", expectedStdout: "0 0 0 0 0" },
    { stdin: "-1 -2 -3 -4 -5", expectedStdout: "-2 -4 -6 -8 -10" },
  ],
  hidden: [
    { stdin: "10 20 30 40 50", expectedStdout: doubled(10, 20, 30, 40, 50) },
    { stdin: "100 -100 50 -50 0", expectedStdout: doubled(100, -100, 50, -50, 0) },
    { stdin: "1 1 1 1 1", expectedStdout: "2 2 2 2 2", note: "duplicates" },
    { stdin: "0 0 0 0 1", expectedStdout: "0 0 0 0 2", note: "only last is nonzero" },
    { stdin: "1 0 0 0 0", expectedStdout: "2 0 0 0 0", note: "only first is nonzero" },
    { stdin: "1000 2000 3000 4000 5000", expectedStdout: "2000 4000 6000 8000 10000" },
    { stdin: "1073741823 0 0 0 0", expectedStdout: "2147483646 0 0 0 0", note: "doubling near INT_MAX" },
    { stdin: "-7 14 -21 28 -35", expectedStdout: "-14 28 -42 56 -70" },
  ],
};

// #13 Reverse array — stdin ints, prints reversed.
const revStr = (vals) => vals.slice().reverse().join(" ");
T[13] = {
  sample: [
    { stdin: "1 2 3 4 5", expectedStdout: "5 4 3 2 1" },
    { stdin: "1 2 3 4", expectedStdout: "4 3 2 1" },
    { stdin: "1", expectedStdout: "1" },
  ],
  hidden: [
    { stdin: "", expectedStdout: "", note: "empty input → empty output" },
    { stdin: "42", expectedStdout: "42" },
    { stdin: "1 2", expectedStdout: "2 1", note: "two-element swap" },
    { stdin: "1 2 3", expectedStdout: "3 2 1", note: "odd, middle pinned" },
    { stdin: "0 0 0", expectedStdout: "0 0 0", note: "all zeros — visually identical" },
    { stdin: "5 5 5 5", expectedStdout: "5 5 5 5", note: "all same" },
    { stdin: "1 2 2 1", expectedStdout: "1 2 2 1", note: "palindromic — unchanged" },
    { stdin: "1 2 3 2 1", expectedStdout: "1 2 3 2 1", note: "odd palindrome — unchanged" },
    { stdin: "-1 -2 -3", expectedStdout: "-3 -2 -1", note: "negatives" },
    { stdin: "10 -10 20 -20 30", expectedStdout: "30 -20 20 -10 10", note: "mixed signs" },
    { stdin: "1 2 3 4 5 6 7 8 9 10", expectedStdout: "10 9 8 7 6 5 4 3 2 1" },
    { stdin: seq(50), expectedStdout: revStr(Array.from({length:50},(_,i)=>i)), note: "longer array" },
    { stdin: "2147483647 0 -2147483647", expectedStdout: "-2147483647 0 2147483647", note: "near INT_MAX/MIN" },
  ],
};

// #14 my_memcpy — stdin: line, output: same line copied.
T[14] = {
  sample: [
    { stdin: "hello", expectedStdout: "hello" },
    { stdin: "", expectedStdout: "", note: "empty: only the trailing \\0 is copied" },
    { stdin: "ABCDEF", expectedStdout: "ABCDEF" },
  ],
  hidden: [
    { stdin: "a", expectedStdout: "a", note: "single byte + \\0" },
    { stdin: "ab", expectedStdout: "ab" },
    { stdin: "0123456789", expectedStdout: "0123456789" },
    { stdin: "Hello, World!", expectedStdout: "Hello, World!" },
    { stdin: "  spaces  ", expectedStdout: "  spaces  ", note: "whitespace bytes copy through" },
    { stdin: "tabs\there", expectedStdout: "tabs\there", note: "tab bytes copy through" },
    { stdin: "!@#$%^&*()", expectedStdout: "!@#$%^&*()", note: "punctuation" },
    { stdin: "x".repeat(100), expectedStdout: "x".repeat(100), note: "100 bytes" },
    { stdin: "x".repeat(500), expectedStdout: "x".repeat(500), note: "500 bytes — well within 1024" },
    { stdin: "MixedCASE123", expectedStdout: "MixedCASE123" },
  ],
};

// #15 my_memmove — stdin: buf line, then "src dst n".
T[15] = {
  sample: [
    { stdin: "ABCDEFGH\n0 2 5", expectedStdout: "ABABCDEH", note: "dst > src — backward copy" },
    { stdin: "ABCDEFGH\n2 0 5", expectedStdout: "CDEFGFGH", note: "dst < src — forward copy" },
    { stdin: "ABCDEFGH\n0 0 8", expectedStdout: "ABCDEFGH", note: "same region — unchanged" },
  ],
  hidden: [
    { stdin: "ABCDEFGH\n0 0 0", expectedStdout: "ABCDEFGH", note: "n=0 — no-op" },
    { stdin: "ABCDEFGH\n0 4 0", expectedStdout: "ABCDEFGH", note: "n=0 still no-op" },
    { stdin: "ABCDEFGH\n0 4 4", expectedStdout: "ABCDABCD", note: "no overlap, dst > src" },
    { stdin: "ABCDEFGH\n4 0 4", expectedStdout: "EFGHEFGH", note: "no overlap, dst < src" },
    { stdin: "ABCDEFGH\n0 1 7", expectedStdout: "AABCDEFG", note: "shift right by 1 (overlap, copy from end)" },
    { stdin: "ABCDEFGH\n1 0 7", expectedStdout: "BCDEFGHH", note: "shift left by 1 (overlap, forward copy)" },
    { stdin: "ABCDEFGH\n0 0 1", expectedStdout: "ABCDEFGH", note: "single byte to itself" },
    { stdin: "ABCDEFGH\n7 0 1", expectedStdout: "HBCDEFGH", note: "1-byte move from end to start" },
    { stdin: "ABCDEFGH\n0 7 1", expectedStdout: "ABCDEFGA", note: "1-byte move from start to end" },
    { stdin: "AAAAAAAA\n0 1 5", expectedStdout: "AAAAAAAA", note: "all-same buffer — overlap doesn't matter" },
    { stdin: "0123456789\n0 5 5", expectedStdout: "0123401234", note: "10-byte buffer, no overlap dst > src" },
    { stdin: "0123456789\n5 0 5", expectedStdout: "5678956789", note: "10-byte buffer, no overlap dst < src" },
    { stdin: "0123456789\n0 1 9", expectedStdout: "0012345678", note: "shift right by 1, full overlap" },
    { stdin: "0123456789\n1 0 9", expectedStdout: "1234567899", note: "shift left by 1, full overlap" },
    { stdin: "ABCDEFGH\n3 5 3", expectedStdout: "ABCDEDEF", note: "3-byte overlap, dst > src" },
    { stdin: "ABCDEFGH\n5 3 3", expectedStdout: "ABCFGHGH", note: "3-byte overlap, dst < src" },
  ],
};

// ---------- Section 4: Arrays & Strings ----------
// Starters rewritten to read a single line from stdin.

T[16] = {
  sample: [
    { stdin: "hello", expectedStdout: "5" },
    { stdin: "", expectedStdout: "0" },
    { stdin: "a", expectedStdout: "1" },
  ],
  hidden: [
    { stdin: "ab", expectedStdout: "2" },
    { stdin: "abc", expectedStdout: "3" },
    { stdin: "abcdefghij", expectedStdout: "10" },
    { stdin: " ", expectedStdout: "1", note: "single space" },
    { stdin: "    ", expectedStdout: "4", note: "spaces only" },
    { stdin: "spaces are fine", expectedStdout: "15" },
    { stdin: "Hello, World!", expectedStdout: "13", note: "punctuation + comma + space" },
    { stdin: "!@#$%^&*()", expectedStdout: "10", note: "special characters" },
    { stdin: "0123456789", expectedStdout: "10", note: "digits" },
    { stdin: "MixedCASE123", expectedStdout: "12" },
    { stdin: "x", expectedStdout: "1" },
    { stdin: "x".repeat(50), expectedStdout: "50" },
    { stdin: "z".repeat(100), expectedStdout: "100" },
    { stdin: "a".repeat(500), expectedStdout: "500", note: "long string" },
  ],
};

T[17] = {
  sample: [
    { stdin: "hello", expectedStdout: "hello" },
    { stdin: "", expectedStdout: "" },
    { stdin: "kernel grade C", expectedStdout: "kernel grade C" },
  ],
  hidden: [
    { stdin: "x", expectedStdout: "x" },
    { stdin: "ab", expectedStdout: "ab" },
    { stdin: "abc", expectedStdout: "abc" },
    { stdin: "0123456789", expectedStdout: "0123456789" },
    { stdin: "Hello, World!", expectedStdout: "Hello, World!" },
    { stdin: "MixedCASEcase", expectedStdout: "MixedCASEcase" },
    { stdin: "!@#$%^&*()", expectedStdout: "!@#$%^&*()" },
    { stdin: "  spaces  ", expectedStdout: "  spaces  ", note: "trailing spaces are normalised — both sides match" },
    { stdin: "a b c d e", expectedStdout: "a b c d e" },
    { stdin: "tabs\there", expectedStdout: "tabs\there", note: "tabs survive copy" },
    { stdin: "x".repeat(200), expectedStdout: "x".repeat(200), note: "long copy, well under 1024 buffer" },
  ],
};

T[18] = {
  sample: [
    { stdin: "abc\nabc", expectedStdout: "0" },
    { stdin: "abc\nabd", expectedStdout: "-1" },
    { stdin: "abc\nab", expectedStdout: "99", note: "After matching prefix, 'c' (99) - '\\0' (0) = 99." },
  ],
  hidden: [
    { stdin: "\n", expectedStdout: "0", note: "both empty" },
    { stdin: "a\na", expectedStdout: "0", note: "single char equal" },
    { stdin: "abc\nabc", expectedStdout: "0" },
    { stdin: "hello\nhello", expectedStdout: "0" },
    { stdin: "abd\nabc", expectedStdout: "1" },
    { stdin: "hello\nhellp", expectedStdout: "-1" },
    { stdin: "hello\nhellz", expectedStdout: "-11", note: "differ at last char: 'o'-'z'" },
    { stdin: "abz\nabc", expectedStdout: "23", note: "differ on third byte: 'z'-'c'" },
    { stdin: "ab\nabc", expectedStdout: "-99", note: "first is prefix of second" },
    { stdin: "abc\nab", expectedStdout: "99" },
    { stdin: "a\nab", expectedStdout: "-98", note: "single-char prefix" },
    { stdin: "ab\na", expectedStdout: "98" },
    { stdin: "\nx", expectedStdout: "-120", note: "empty vs non-empty: 0 - 'x'" },
    { stdin: "x\n", expectedStdout: "120" },
    { stdin: "z\na", expectedStdout: "25" },
    { stdin: "a\nz", expectedStdout: "-25" },
    { stdin: "A\na", expectedStdout: "-32", note: "case difference: ASCII 'A'=65 vs 'a'=97" },
    { stdin: "Z\nA", expectedStdout: "25", note: "uppercase Z vs uppercase A" },
    { stdin: "9\n0", expectedStdout: "9", note: "digit comparison" },
    { stdin: " \nA", expectedStdout: "-33", note: "space (32) vs 'A' (65)" },
  ],
};

T[19] = {
  sample: [
    { stdin: "hello", expectedStdout: "olleh" },
    { stdin: "abcd", expectedStdout: "dcba" },
    { stdin: "", expectedStdout: "" },
  ],
  hidden: [
    { stdin: "a", expectedStdout: "a", note: "single char unchanged" },
    { stdin: "ab", expectedStdout: "ba", note: "two-char swap" },
    { stdin: "abc", expectedStdout: "cba" },
    { stdin: "aa", expectedStdout: "aa", note: "two-char palindrome" },
    { stdin: "aba", expectedStdout: "aba", note: "odd-length palindrome unchanged" },
    { stdin: "abba", expectedStdout: "abba", note: "even-length palindrome unchanged" },
    { stdin: "noon", expectedStdout: "noon" },
    { stdin: "level", expectedStdout: "level" },
    { stdin: "12345", expectedStdout: "54321" },
    { stdin: "0123456789", expectedStdout: "9876543210" },
    { stdin: "race car", expectedStdout: "rac ecar" },
    { stdin: "Hello World", expectedStdout: "dlroW olleH" },
    { stdin: "!@#$%", expectedStdout: "%$#@!" },
    { stdin: "  ", expectedStdout: "  ", note: "two spaces — palindromic whitespace" },
    { stdin: "a b", expectedStdout: "b a" },
    { stdin: "x".repeat(100), expectedStdout: "x".repeat(100), note: "all-same-char unchanged" },
    { stdin: "abcdefghij", expectedStdout: "jihgfedcba" },
  ],
};

T[20] = {
  sample: [
    { stdin: "madam", expectedStdout: "1" },
    { stdin: "hello", expectedStdout: "0" },
    { stdin: "a", expectedStdout: "1" },
    { stdin: "", expectedStdout: "1" },
  ],
  hidden: [
    { stdin: "ab", expectedStdout: "0", note: "two-char non-palindrome" },
    { stdin: "aa", expectedStdout: "1", note: "two-char palindrome" },
    { stdin: "abc", expectedStdout: "0" },
    { stdin: "aba", expectedStdout: "1", note: "odd, mirrored" },
    { stdin: "abba", expectedStdout: "1" },
    { stdin: "abca", expectedStdout: "0", note: "first/last match but middle does not" },
    { stdin: "abcba", expectedStdout: "1" },
    { stdin: "abcd", expectedStdout: "0" },
    { stdin: "abcde", expectedStdout: "0" },
    { stdin: "noon", expectedStdout: "1" },
    { stdin: "level", expectedStdout: "1" },
    { stdin: "racecar", expectedStdout: "1" },
    { stdin: "race car", expectedStdout: "0", note: "with space — not palindromic" },
    { stdin: "Anna", expectedStdout: "0", note: "Case-sensitive: A != a" },
    { stdin: "ANNA", expectedStdout: "1", note: "all caps, palindromic" },
    { stdin: "anna", expectedStdout: "1" },
    { stdin: "12321", expectedStdout: "1" },
    { stdin: "12345", expectedStdout: "0" },
    { stdin: "1221", expectedStdout: "1" },
    { stdin: "1234", expectedStdout: "0" },
    { stdin: " ", expectedStdout: "1", note: "single space" },
    { stdin: "  ", expectedStdout: "1", note: "two spaces" },
    { stdin: " a ", expectedStdout: "1", note: "space-padded char is palindromic" },
    { stdin: "a b", expectedStdout: "0", note: "first/last differ" },
    { stdin: "!@#@!", expectedStdout: "1", note: "punctuation palindrome" },
    { stdin: "abcdefedcba", expectedStdout: "1", note: "long odd palindrome" },
    { stdin: "abcddcba", expectedStdout: "1", note: "long even palindrome" },
    { stdin: "abcdedcbx", expectedStdout: "0", note: "fails at last comparison" },
    { stdin: "z".repeat(100), expectedStdout: "1", note: "all-same-char long palindrome" },
  ],
};

T[21] = {
  sample: [
    { stdin: "hello world", expectedStdout: "2" },
    { stdin: "  hello   world  ", expectedStdout: "2" },
    { stdin: "", expectedStdout: "0" },
    { stdin: "   ", expectedStdout: "0" },
  ],
  hidden: [
    { stdin: "a", expectedStdout: "1", note: "single character" },
    { stdin: "one", expectedStdout: "1" },
    { stdin: " a", expectedStdout: "1", note: "leading space" },
    { stdin: "a ", expectedStdout: "1", note: "trailing space" },
    { stdin: "  a  ", expectedStdout: "1", note: "padded on both sides" },
    { stdin: "a b", expectedStdout: "2" },
    { stdin: "the quick brown fox", expectedStdout: "4" },
    { stdin: "the  quick  brown  fox", expectedStdout: "4", note: "double-space separators" },
    { stdin: "a b c d e", expectedStdout: "5" },
    { stdin: "a b c d e f g h i j", expectedStdout: "10" },
    { stdin: "\t\ttab\t\tseparated\twords\t", expectedStdout: "3" },
    { stdin: "\thello", expectedStdout: "1", note: "leading tab only" },
    { stdin: "hello\t", expectedStdout: "1", note: "trailing tab only" },
    { stdin: "one\ttwo three\tfour", expectedStdout: "4", note: "mixed tabs and spaces" },
    { stdin: "aaa bbb", expectedStdout: "2" },
    { stdin: "1 2 3", expectedStdout: "3", note: "digit words" },
    { stdin: "!@# $%^ &*()", expectedStdout: "3", note: "punctuation counts as word chars" },
    { stdin: "\t", expectedStdout: "0", note: "tab only" },
    { stdin: " \t \t ", expectedStdout: "0", note: "mix of space and tab, no words" },
  ],
};

T[22] = {
  sample: [
    { stdin: "1234", expectedStdout: "1234" },
    { stdin: "   -42abc", expectedStdout: "-42" },
    { stdin: "+0", expectedStdout: "0" },
    { stdin: "abc", expectedStdout: "0" },
  ],
  hidden: [
    { stdin: "", expectedStdout: "0", note: "empty input" },
    { stdin: "0", expectedStdout: "0" },
    { stdin: "-0", expectedStdout: "0", note: "negative zero" },
    { stdin: "1", expectedStdout: "1" },
    { stdin: "-1", expectedStdout: "-1" },
    { stdin: "9", expectedStdout: "9" },
    { stdin: "-9", expectedStdout: "-9" },
    { stdin: "+", expectedStdout: "0", note: "sign only" },
    { stdin: "-", expectedStdout: "0", note: "sign only" },
    { stdin: "  ", expectedStdout: "0", note: "whitespace only" },
    { stdin: "\t", expectedStdout: "0", note: "tab only" },
    { stdin: "abc", expectedStdout: "0" },
    { stdin: "  9", expectedStdout: "9" },
    { stdin: "\t42", expectedStdout: "42", note: "tab is whitespace" },
    { stdin: "00123", expectedStdout: "123", note: "leading zeros" },
    { stdin: "+9999", expectedStdout: "9999" },
    { stdin: "+007", expectedStdout: "7" },
    { stdin: "  +007", expectedStdout: "7", note: "whitespace + sign + leading zeros" },
    { stdin: "1000000000", expectedStdout: "1000000000", note: "10-digit value within int range" },
    { stdin: "-1000000000", expectedStdout: "-1000000000" },
    { stdin: "2147483647", expectedStdout: "2147483647", note: "INT_MAX exactly" },
    { stdin: "-2147483647", expectedStdout: "-2147483647" },
    { stdin: "12 34", expectedStdout: "12", note: "stop at internal whitespace" },
    { stdin: "12abc34", expectedStdout: "12" },
    { stdin: "123.456", expectedStdout: "123", note: "stop at '.'" },
    { stdin: "+100abc-99", expectedStdout: "100" },
    { stdin: "9999abc", expectedStdout: "9999" },
    { stdin: " - 5", expectedStdout: "0", note: "space between sign and digit defeats parse" },
    { stdin: "+-5", expectedStdout: "0", note: "second sign is not a digit" },
  ],
};

// #23 Matrix multiplication — hardcoded matrices.
T[23] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "  21   21   27 \n  57   57   72 \n  93   93  117 ",
    },
  ],
  hidden: [],
};

// ---------- Section 5: Structs ----------

T[24] = {
  sample: [{ stdin: "", expectedStdout: "Top: Bob 20 91.5" }],
  hidden: [],
};

T[25] = {
  sample: [
    { stdin: "", expectedStdout: "sizeof(A) = 12\nsizeof(B) = 8\nsizeof(C) = 8" },
  ],
  hidden: [],
};

T[26] = {
  sample: [{ stdin: "", expectedStdout: "(4, 1)" }],
  hidden: [],
};

// #27 Nested structs — starter reads tl.x tl.y br.x br.y, prints abs(dx)*abs(dy).
T[27] = {
  sample: [
    { stdin: "0 0 5 3", expectedStdout: "15" },
    { stdin: "10 10 3 4", expectedStdout: "42" },
  ],
  hidden: [
    { stdin: "0 0 0 0", expectedStdout: "0", note: "degenerate rectangle" },
    { stdin: "5 5 5 5", expectedStdout: "0", note: "single point" },
    { stdin: "0 0 1 1", expectedStdout: "1", note: "1x1" },
    { stdin: "0 0 1 0", expectedStdout: "0", note: "horizontal line, zero height" },
    { stdin: "0 0 0 1", expectedStdout: "0", note: "vertical line, zero width" },
    { stdin: "0 0 5 0", expectedStdout: "0" },
    { stdin: "1 2 3 4", expectedStdout: "4" },
    { stdin: "0 0 100 1", expectedStdout: "100", note: "thin wide strip" },
    { stdin: "0 0 1 100", expectedStdout: "100", note: "thin tall strip" },
    { stdin: "1 1 11 11", expectedStdout: "100" },
    { stdin: "10 20 30 40", expectedStdout: "400" },
    { stdin: "-3 -4 3 4", expectedStdout: "48", note: "spans origin" },
    { stdin: "-5 -5 5 5", expectedStdout: "100" },
    { stdin: "-10 -10 -5 -5", expectedStdout: "25", note: "fully in third quadrant" },
    { stdin: "10 10 0 0", expectedStdout: "100", note: "tl/br swapped — abs() handles it" },
    { stdin: "5 0 0 5", expectedStdout: "25", note: "diagonally swapped corners" },
    { stdin: "100 100 200 250", expectedStdout: "15000" },
    { stdin: "1000 1000 1100 1100", expectedStdout: "10000" },
  ],
};

T[28] = {
  sample: [
    { stdin: "", expectedStdout: "Rex says: Woof!\nWhiskers says: Meow!" },
  ],
  hidden: [],
};

// ---------- Section 6: Dynamic Memory ----------

T[29] = {
  sample: [
    { stdin: "5", expectedStdout: "0 1 4 9 16" },
    { stdin: "1", expectedStdout: "0" },
    { stdin: "10", expectedStdout: "0 1 4 9 16 25 36 49 64 81" },
  ],
  hidden: [
    { stdin: "2", expectedStdout: "0 1" },
    { stdin: "3", expectedStdout: "0 1 4" },
    { stdin: "4", expectedStdout: "0 1 4 9" },
    { stdin: "6", expectedStdout: squaresUpTo(6) },
    { stdin: "7", expectedStdout: squaresUpTo(7) },
    { stdin: "8", expectedStdout: squaresUpTo(8) },
    { stdin: "9", expectedStdout: squaresUpTo(9) },
    { stdin: "15", expectedStdout: squaresUpTo(15) },
    { stdin: "20", expectedStdout: squaresUpTo(20) },
    { stdin: "25", expectedStdout: squaresUpTo(25) },
    { stdin: "50", expectedStdout: squaresUpTo(50), note: "larger allocation" },
    { stdin: "100", expectedStdout: squaresUpTo(100), note: "stress allocation" },
  ],
};

// #30 my_strdup — stdin: line, prints duplicate.
T[30] = {
  sample: [
    { stdin: "hello", expectedStdout: "hello" },
    { stdin: "", expectedStdout: "", note: "empty: only the \\0 is allocated and copied" },
    { stdin: "world", expectedStdout: "world" },
  ],
  hidden: [
    { stdin: "a", expectedStdout: "a" },
    { stdin: "ab", expectedStdout: "ab" },
    { stdin: "0123456789", expectedStdout: "0123456789" },
    { stdin: "Hello, World!", expectedStdout: "Hello, World!" },
    { stdin: "  spaces  ", expectedStdout: "  spaces  " },
    { stdin: "tabs\there", expectedStdout: "tabs\there" },
    { stdin: "MixedCASE", expectedStdout: "MixedCASE" },
    { stdin: "!@#$%^&*()", expectedStdout: "!@#$%^&*()" },
    { stdin: "x".repeat(50), expectedStdout: "x".repeat(50) },
    { stdin: "x".repeat(200), expectedStdout: "x".repeat(200) },
    { stdin: "x".repeat(500), expectedStdout: "x".repeat(500), note: "500-byte allocation" },
  ],
};

T[31] = {
  sample: [
    { stdin: "1 2 3 4 5 6 7", expectedStdout: "1 2 3 4 5 6 7" },
    { stdin: "42", expectedStdout: "42" },
    { stdin: "", expectedStdout: "" },
  ],
  hidden: [
    { stdin: "0", expectedStdout: "0", note: "single zero element" },
    { stdin: "1", expectedStdout: "1" },
    { stdin: "1 2", expectedStdout: "1 2" },
    { stdin: "1 2 3", expectedStdout: "1 2 3", note: "below initial capacity" },
    { stdin: "1 2 3 4", expectedStdout: "1 2 3 4", note: "exactly initial capacity, no realloc" },
    { stdin: "1 2 3 4 5", expectedStdout: "1 2 3 4 5", note: "first realloc 4→8" },
    { stdin: "1 2 3 4 5 6 7 8", expectedStdout: "1 2 3 4 5 6 7 8", note: "fills cap=8 exactly" },
    { stdin: seq(9), expectedStdout: seq(9), note: "second realloc 8→16" },
    { stdin: seq(16), expectedStdout: seq(16), note: "fills cap=16 exactly" },
    { stdin: seq(17), expectedStdout: seq(17), note: "third realloc 16→32" },
    {
      stdin: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
      expectedStdout: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
      note: "two reallocs: 4→8→16→32",
    },
    { stdin: seq(33), expectedStdout: seq(33), note: "fourth realloc 32→64" },
    { stdin: seq(64), expectedStdout: seq(64), note: "exactly cap=64" },
    { stdin: seq(100), expectedStdout: seq(100), note: "stress: many reallocs" },
    { stdin: "-1 -2 -3", expectedStdout: "-1 -2 -3", note: "negatives" },
    { stdin: "100 -100 0 -42", expectedStdout: "100 -100 0 -42", note: "mixed signs" },
    { stdin: "5 5 5 5 5", expectedStdout: "5 5 5 5 5", note: "duplicates" },
    { stdin: "0 0 0 0 0 0 0 0 0", expectedStdout: "0 0 0 0 0 0 0 0 0", note: "all zeros across realloc" },
  ],
};

// #32 2D matrix — stdin: m n, prints mat[i][j] = i*j as grid.
const matIJ = (m, n) => {
  const lines = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) row.push(i * j);
    lines.push(row.join(" "));
  }
  return lines.join("\n");
};
T[32] = {
  sample: [
    { stdin: "3 4", expectedStdout: matIJ(3, 4) },
    { stdin: "1 1", expectedStdout: "0", note: "1x1 matrix" },
    { stdin: "2 2", expectedStdout: matIJ(2, 2) },
  ],
  hidden: [
    { stdin: "1 5", expectedStdout: matIJ(1, 5), note: "single row" },
    { stdin: "5 1", expectedStdout: matIJ(5, 1), note: "single column" },
    { stdin: "1 10", expectedStdout: matIJ(1, 10) },
    { stdin: "10 1", expectedStdout: matIJ(10, 1) },
    { stdin: "3 3", expectedStdout: matIJ(3, 3), note: "square 3x3" },
    { stdin: "4 3", expectedStdout: matIJ(4, 3), note: "tall rectangle" },
    { stdin: "3 5", expectedStdout: matIJ(3, 5), note: "wide rectangle" },
    { stdin: "5 5", expectedStdout: matIJ(5, 5) },
    { stdin: "6 7", expectedStdout: matIJ(6, 7) },
    { stdin: "10 10", expectedStdout: matIJ(10, 10), note: "100 cells" },
    { stdin: "2 8", expectedStdout: matIJ(2, 8) },
    { stdin: "8 2", expectedStdout: matIJ(8, 2) },
    { stdin: "1 100", expectedStdout: matIJ(1, 100), note: "long thin row" },
    { stdin: "100 1", expectedStdout: matIJ(100, 1), note: "long thin column" },
  ],
};

// ---------- Section 7: Linked List ----------

// #33 LL insert+print — stdin: "h V" / "t V" commands; prints final list.
const llStr = (vals) =>
  vals.length === 0 ? "NULL" : vals.map(String).join(" -> ") + " -> NULL";
T[33] = {
  sample: [
    {
      stdin: "h 3\nh 2\nh 1\nt 4",
      expectedStdout: "1 -> 2 -> 3 -> 4 -> NULL",
    },
    { stdin: "", expectedStdout: "NULL", note: "no commands → empty list" },
    { stdin: "t 1\nt 2\nt 3", expectedStdout: llStr([1, 2, 3]), note: "tail-only build" },
  ],
  hidden: [
    { stdin: "h 1", expectedStdout: llStr([1]), note: "single head insert" },
    { stdin: "t 1", expectedStdout: llStr([1]), note: "single tail insert" },
    { stdin: "h 0", expectedStdout: llStr([0]) },
    { stdin: "h 1\nh 2\nh 3", expectedStdout: llStr([3, 2, 1]), note: "head inserts reverse order" },
    { stdin: "t 1\nt 2\nt 3\nt 4\nt 5", expectedStdout: llStr([1, 2, 3, 4, 5]) },
    { stdin: "h 5\nt 6", expectedStdout: llStr([5, 6]), note: "head then tail" },
    { stdin: "t 5\nh 6", expectedStdout: llStr([6, 5]), note: "tail then head" },
    {
      stdin: "h 2\nh 1\nt 3\nt 4\nh 0",
      expectedStdout: llStr([0, 1, 2, 3, 4]),
      note: "interleaved",
    },
    { stdin: "t -1\nt -2\nt -3", expectedStdout: llStr([-1, -2, -3]), note: "negatives" },
    { stdin: "h 0\nh 0\nh 0", expectedStdout: llStr([0, 0, 0]), note: "duplicates at head" },
    { stdin: "t 0\nt 0\nt 0", expectedStdout: llStr([0, 0, 0]), note: "duplicates at tail" },
    {
      stdin: Array.from({ length: 10 }, (_, i) => `t ${i + 1}`).join("\n"),
      expectedStdout: llStr(Array.from({ length: 10 }, (_, i) => i + 1)),
      note: "10 tail inserts",
    },
    {
      stdin: Array.from({ length: 10 }, (_, i) => `h ${i + 1}`).join("\n"),
      expectedStdout: llStr(Array.from({ length: 10 }, (_, i) => 10 - i)),
      note: "10 head inserts in reverse",
    },
    {
      stdin: "h 10\nt 20\nh 5\nt 30\nh 1",
      expectedStdout: llStr([1, 5, 10, 20, 30]),
      note: "alternating head/tail",
    },
    { stdin: "t 100\nt 200\nt 300\nt 400", expectedStdout: llStr([100, 200, 300, 400]) },
  ],
};

// #34 delete — starter rewritten with a stdin-driven driver.
T[34] = {
  sample: [
    { stdin: "1 2 3 4\n2", expectedStdout: "deleted=1\n1 -> 3 -> 4 -> NULL" },
    { stdin: "1 2 3\n1", expectedStdout: "deleted=1\n2 -> 3 -> NULL" },
    { stdin: "1 2 3\n99", expectedStdout: "deleted=0\n1 -> 2 -> 3 -> NULL" },
  ],
  hidden: [
    { stdin: "\n5", expectedStdout: "deleted=0\nNULL", note: "empty list" },
    { stdin: "\n0", expectedStdout: "deleted=0\nNULL", note: "empty list, target 0" },
    { stdin: "5\n5", expectedStdout: "deleted=1\nNULL", note: "single-elem head match" },
    { stdin: "5\n6", expectedStdout: "deleted=0\n5 -> NULL", note: "single-elem no match" },
    { stdin: "0\n0", expectedStdout: "deleted=1\nNULL", note: "single-elem zero" },
    { stdin: "1 2\n1", expectedStdout: "deleted=1\n2 -> NULL", note: "two-elem head" },
    { stdin: "1 2\n2", expectedStdout: "deleted=1\n1 -> NULL", note: "two-elem tail" },
    { stdin: "1 2\n3", expectedStdout: "deleted=0\n1 -> 2 -> NULL", note: "two-elem no match" },
    { stdin: "10 20 30\n20", expectedStdout: "deleted=1\n10 -> 30 -> NULL", note: "single middle delete" },
    { stdin: "10 20 30\n30", expectedStdout: "deleted=1\n10 -> 20 -> NULL", note: "tail of three" },
    { stdin: "10 20 30\n10", expectedStdout: "deleted=1\n20 -> 30 -> NULL", note: "head of three" },
    { stdin: "1 2 3 4 5\n5", expectedStdout: "deleted=1\n1 -> 2 -> 3 -> 4 -> NULL", note: "tail delete" },
    { stdin: "1 2 3 4 5\n3", expectedStdout: "deleted=1\n1 -> 2 -> 4 -> 5 -> NULL", note: "middle delete" },
    { stdin: "1 2 3 4 5\n0", expectedStdout: "deleted=0\n1 -> 2 -> 3 -> 4 -> 5 -> NULL", note: "zero target not in list" },
    { stdin: "7 7 7\n7", expectedStdout: "deleted=1\n7 -> 7 -> NULL", note: "first match only — head" },
    { stdin: "1 2 2 3\n2", expectedStdout: "deleted=1\n1 -> 2 -> 3 -> NULL", note: "first dup match in middle" },
    { stdin: "1 2 3 2\n2", expectedStdout: "deleted=1\n1 -> 3 -> 2 -> NULL", note: "first dup, second remains" },
    { stdin: "5 1 5 1\n5", expectedStdout: "deleted=1\n1 -> 5 -> 1 -> NULL", note: "head match, dup later remains" },
    { stdin: "-1 -2 -3\n-2", expectedStdout: "deleted=1\n-1 -> -3 -> NULL", note: "negative values" },
    { stdin: "-1 -2 -3\n-1", expectedStdout: "deleted=1\n-2 -> -3 -> NULL", note: "negative head" },
    { stdin: "0 0 0\n0", expectedStdout: "deleted=1\n0 -> 0 -> NULL", note: "first of three zeros" },
    { stdin: "100 200 300 400 500\n300", expectedStdout: "deleted=1\n100 -> 200 -> 400 -> 500 -> NULL" },
  ],
};

// #35 reverse — stdin-driven driver.
T[35] = {
  sample: [
    { stdin: "1 2 3 4", expectedStdout: "4 -> 3 -> 2 -> 1 -> NULL" },
    { stdin: "", expectedStdout: "NULL" },
    { stdin: "1", expectedStdout: "1 -> NULL" },
  ],
  hidden: [
    { stdin: "0", expectedStdout: "0 -> NULL", note: "single zero" },
    { stdin: "1 2", expectedStdout: "2 -> 1 -> NULL", note: "two-elem swap" },
    { stdin: "1 2 3", expectedStdout: "3 -> 2 -> 1 -> NULL", note: "three-elem (middle pinned)" },
    { stdin: "1 2 3 4 5", expectedStdout: "5 -> 4 -> 3 -> 2 -> 1 -> NULL" },
    { stdin: "10 20 30 40 50", expectedStdout: "50 -> 40 -> 30 -> 20 -> 10 -> NULL" },
    { stdin: "5 5 5", expectedStdout: "5 -> 5 -> 5 -> NULL", note: "all same — reversed visually identical" },
    { stdin: "0 0 0 0", expectedStdout: "0 -> 0 -> 0 -> 0 -> NULL" },
    { stdin: "1 2 2 1", expectedStdout: "1 -> 2 -> 2 -> 1 -> NULL", note: "palindromic list" },
    { stdin: "1 2 3 2 1", expectedStdout: "1 -> 2 -> 3 -> 2 -> 1 -> NULL", note: "odd palindromic list" },
    { stdin: "1 2 3 4 5 6 7 8 9 10", expectedStdout: "10 -> 9 -> 8 -> 7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> NULL" },
    { stdin: "-1 -2 -3", expectedStdout: "-3 -> -2 -> -1 -> NULL", note: "negatives" },
    { stdin: "42 0 -42", expectedStdout: "-42 -> 0 -> 42 -> NULL", note: "mixed signs" },
    { stdin: "100 200 300 400", expectedStdout: "400 -> 300 -> 200 -> 100 -> NULL" },
  ],
};

// #36 cycle detection — stdin-driven driver: list values, then cycle index (-1 for none).
T[36] = {
  sample: [
    { stdin: "1 2 3 4\n1", expectedStdout: "1", note: "tail.next → node[1] (which holds 2)" },
    { stdin: "1 2 3\n-1", expectedStdout: "0", note: "no cycle" },
  ],
  hidden: [
    { stdin: "1\n0", expectedStdout: "1", note: "single-node self-loop" },
    { stdin: "1\n-1", expectedStdout: "0", note: "single node, no cycle" },
    { stdin: "1 2\n0", expectedStdout: "1", note: "two-node cycle to head" },
    { stdin: "1 2\n1", expectedStdout: "1", note: "two-node tail self-loop" },
    { stdin: "1 2\n-1", expectedStdout: "0", note: "two nodes, no cycle" },
    { stdin: "1 2 3\n0", expectedStdout: "1", note: "three-node cycle to head" },
    { stdin: "1 2 3\n1", expectedStdout: "1", note: "cycle to middle" },
    { stdin: "1 2 3\n2", expectedStdout: "1", note: "tail self-loop" },
    { stdin: "1 2 3 4 5\n0", expectedStdout: "1", note: "long, cycle to head" },
    { stdin: "1 2 3 4 5\n3", expectedStdout: "1" },
    { stdin: "1 2 3 4 5\n4", expectedStdout: "1", note: "tail self-loop in 5-node list" },
    { stdin: "1 2 3 4 5\n-1", expectedStdout: "0" },
    { stdin: "1 2 3 4 5 6 7 8 9 10\n0", expectedStdout: "1", note: "10-node cycle to head" },
    { stdin: "1 2 3 4 5 6 7 8 9 10\n5", expectedStdout: "1", note: "10-node cycle in middle" },
    { stdin: "1 2 3 4 5 6 7 8 9 10\n9", expectedStdout: "1", note: "10-node tail self-loop" },
    { stdin: "1 2 3 4 5 6 7 8 9 10\n-1", expectedStdout: "0", note: "10-node, no cycle" },
    { stdin: "5 5 5\n0", expectedStdout: "1", note: "duplicate values, cycle (Floyd uses pointer identity)" },
    { stdin: "5 5 5\n-1", expectedStdout: "0", note: "duplicate values, no cycle" },
    { stdin: "0\n0", expectedStdout: "1", note: "single zero, self-loop" },
    { stdin: "-1 -2 -3\n0", expectedStdout: "1", note: "negative values, cycle" },
  ],
};

// ---------- Section 8: File I/O ----------

// #37 Binary file — Wandbox gives each run its own /tmp, so this works.
T[37] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "Alice 19 88.0\nBob 20 91.5\nCarol 21 73.0\nDave 20 91.5\nEve 22 80.0",
    },
  ],
  hidden: [],
};

// ---------- Section 9: Bitwise Operations ----------

// #38 Bit toolkit — stdin: "n pos", prints set/clear/toggle/check.
const bitOps = (n, pos) => {
  const bit = (1 >>> 0) << pos;
  const set = (n | bit) >>> 0;
  const clear = (n & ~bit) >>> 0;
  const toggle = (n ^ bit) >>> 0;
  const check = (n >>> pos) & 1;
  return `set    : ${set}\nclear  : ${clear}\ntoggle : ${toggle}\ncheck  : ${check}`;
};
T[38] = {
  sample: [
    { stdin: "10 0", expectedStdout: bitOps(10, 0), note: "n=0b1010, bit 0 (off)" },
    { stdin: "10 1", expectedStdout: bitOps(10, 1), note: "n=0b1010, bit 1 (on)" },
    { stdin: "10 3", expectedStdout: bitOps(10, 3), note: "n=0b1010, bit 3 (on)" },
  ],
  hidden: [
    { stdin: "0 0", expectedStdout: bitOps(0, 0), note: "all zeros, bit 0" },
    { stdin: "0 31", expectedStdout: bitOps(0, 31), note: "all zeros, MSB" },
    { stdin: "1 0", expectedStdout: bitOps(1, 0), note: "single bit, set already" },
    { stdin: "1 1", expectedStdout: bitOps(1, 1), note: "single bit, neighbour off" },
    { stdin: "10 2", expectedStdout: bitOps(10, 2), note: "n=0b1010, bit 2 (off)" },
    { stdin: "10 4", expectedStdout: bitOps(10, 4), note: "n=0b1010, bit 4 (off, above)" },
    { stdin: "10 31", expectedStdout: bitOps(10, 31), note: "MSB on small value" },
    { stdin: "255 0", expectedStdout: bitOps(255, 0), note: "8-bit field, low" },
    { stdin: "255 7", expectedStdout: bitOps(255, 7), note: "8-bit field, top" },
    { stdin: "255 8", expectedStdout: bitOps(255, 8), note: "just past 8-bit field" },
    { stdin: "65535 15", expectedStdout: bitOps(65535, 15) },
    { stdin: "65535 16", expectedStdout: bitOps(65535, 16) },
    { stdin: "2147483648 31", expectedStdout: bitOps(2147483648, 31), note: "MSB only set" },
    { stdin: "2147483648 0", expectedStdout: bitOps(2147483648, 0), note: "MSB only, clear LSB" },
    { stdin: "4294967295 0", expectedStdout: bitOps(4294967295, 0), note: "all ones, LSB" },
    { stdin: "4294967295 31", expectedStdout: bitOps(4294967295, 31), note: "all ones, MSB" },
    { stdin: "4294967295 15", expectedStdout: bitOps(4294967295, 15), note: "all ones, mid" },
    { stdin: "2863311530 0", expectedStdout: bitOps(2863311530, 0), note: "0xAAAAAAAA, even bits" },
    { stdin: "2863311530 1", expectedStdout: bitOps(2863311530, 1), note: "0xAAAAAAAA, odd bits" },
  ],
};

// #39 popcount — stdin: unsigned values until EOF, line per value.
const pc = (n) => {
  let c = 0;
  let x = n >>> 0;
  while (x) { c++; x &= x - 1; x >>>= 0; }
  return c;
};
const pcLine = (n) => `${n} naive=${pc(n)} kernighan=${pc(n)}`;
const pcLines = (vals) => vals.map(pcLine).join("\n");
T[39] = {
  sample: [
    { stdin: "0", expectedStdout: pcLine(0) },
    { stdin: "7", expectedStdout: pcLine(7) },
    { stdin: "4294967295", expectedStdout: pcLine(4294967295), note: "all 32 bits set" },
  ],
  hidden: [
    { stdin: "1", expectedStdout: pcLine(1) },
    { stdin: "2", expectedStdout: pcLine(2) },
    { stdin: "3", expectedStdout: pcLine(3) },
    { stdin: "4", expectedStdout: pcLine(4) },
    { stdin: "8", expectedStdout: pcLine(8), note: "single power-of-two bit" },
    { stdin: "15", expectedStdout: pcLine(15), note: "low 4 bits set" },
    { stdin: "16", expectedStdout: pcLine(16), note: "single bit" },
    { stdin: "255", expectedStdout: pcLine(255), note: "low byte all set" },
    { stdin: "65535", expectedStdout: pcLine(65535), note: "low half-word set" },
    { stdin: "2147483648", expectedStdout: pcLine(2147483648), note: "MSB only (1<<31)" },
    { stdin: "2147483647", expectedStdout: pcLine(2147483647), note: "31 low bits (INT_MAX)" },
    { stdin: "4042322160", expectedStdout: pcLine(4042322160), note: "0xF0F0F0F0 — alternating nibbles" },
    { stdin: "2863311530", expectedStdout: pcLine(2863311530), note: "0xAAAAAAAA — alternating bits" },
    { stdin: "1431655765", expectedStdout: pcLine(1431655765), note: "0x55555555 — opposite alternation" },
    {
      stdin: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
      expectedStdout: pcLines([0,1,2,3,4,5,6,7,8,9,10]),
      note: "multi-input run",
    },
    {
      stdin: "0\n4294967295\n2863311530\n1431655765",
      expectedStdout: pcLines([0, 4294967295, 2863311530, 1431655765]),
      note: "edge values together",
    },
  ],
};

T[40] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        " 0 -> 0\n 1 -> 1\n 2 -> 1\n 3 -> 0\n 4 -> 1\n 5 -> 0\n 6 -> 0\n 7 -> 0\n 8 -> 1\n 9 -> 0\n10 -> 0\n11 -> 0\n12 -> 0\n13 -> 0\n14 -> 0\n15 -> 0\n16 -> 1\n17 -> 0\n18 -> 0\n19 -> 0\n20 -> 0",
    },
  ],
  hidden: [],
};

T[41] = {
  sample: [
    {
      stdin: "",
      expectedStdout: "has READ:  1\nhas EXEC:  0\nperm bits: 1",
    },
  ],
  hidden: [],
};

// #42 XOR swap — stdin: "a b", prints "x=B y=A".
T[42] = {
  sample: [
    { stdin: "5 9", expectedStdout: "x=9 y=5" },
    { stdin: "0 0", expectedStdout: "x=0 y=0", note: "equal zeros — no-op" },
    { stdin: "1 -1", expectedStdout: "x=-1 y=1" },
  ],
  hidden: [
    { stdin: "1 0", expectedStdout: "x=0 y=1" },
    { stdin: "0 1", expectedStdout: "x=1 y=0" },
    { stdin: "5 5", expectedStdout: "x=5 y=5", note: "equal positives — no-op" },
    { stdin: "-7 -7", expectedStdout: "x=-7 y=-7", note: "equal negatives — no-op" },
    { stdin: "100 -100", expectedStdout: "x=-100 y=100" },
    { stdin: "-1 -2", expectedStdout: "x=-2 y=-1" },
    { stdin: "42 -42", expectedStdout: "x=-42 y=42" },
    { stdin: "1 2", expectedStdout: "x=2 y=1" },
    { stdin: "1000000 -1000000", expectedStdout: "x=-1000000 y=1000000" },
    { stdin: "2147483647 0", expectedStdout: "x=0 y=2147483647", note: "INT_MAX with zero" },
    { stdin: "2147483647 -2147483647", expectedStdout: "x=-2147483647 y=2147483647", note: "extreme range" },
    { stdin: "0 -1", expectedStdout: "x=-1 y=0" },
    { stdin: "-2147483647 1", expectedStdout: "x=1 y=-2147483647" },
    { stdin: "12345 67890", expectedStdout: "x=67890 y=12345" },
  ],
};

T[43] = {
  sample: [
    {
      stdin: "",
      expectedStdout: "b0=0xEF b1=0xBE b2=0xAD b3=0xDE\nreassembled = 0xDEADBEEF",
    },
  ],
  hidden: [],
};

// ---------- Section 10: Capstones ----------

// #44 stack — rewritten driver: read commands "push N", "pop", "peek" — print outputs.
const pushSeq = (n) =>
  Array.from({ length: n }, (_, i) => `push ${i + 1}`).join("\n");
const popSeq = (n) => Array(n).fill("pop").join("\n");
const popOutDesc = (n) =>
  Array.from({ length: n }, (_, i) => `pop=${n - i}`).join("\n");
T[44] = {
  sample: [
    {
      stdin: "push 1\npush 2\npush 3\npop\npeek\npop\npop",
      expectedStdout: "pop=3\npeek=2\npop=2\npop=1",
    },
  ],
  hidden: [
    { stdin: "push 42\npop", expectedStdout: "pop=42", note: "single push/pop" },
    { stdin: "push 0\npop", expectedStdout: "pop=0", note: "pop of zero" },
    { stdin: "push -1\npop", expectedStdout: "pop=-1", note: "negative value" },
    { stdin: "push -1\npush -2\npop\npop", expectedStdout: "pop=-2\npop=-1", note: "negatives, LIFO" },
    { stdin: "push 5\npeek\npop", expectedStdout: "peek=5\npop=5", note: "peek then pop returns same value" },
    {
      stdin: "push 1\npush 2\npush 3\npeek\npeek\npeek",
      expectedStdout: "peek=3\npeek=3\npeek=3",
      note: "peek does not mutate",
    },
    {
      stdin: "push 1\npush 2\npush 3\npush 4\npush 5\npop\npop\npop",
      expectedStdout: "pop=5\npop=4\npop=3",
    },
    {
      stdin: "push 10\npush 20\npeek\npush 30\npeek\npop\npeek",
      expectedStdout: "peek=20\npeek=30\npop=30\npeek=20",
    },
    {
      stdin: "push 1\npop\npush 2\npop\npush 3\npop",
      expectedStdout: "pop=1\npop=2\npop=3",
      note: "interleaved push/pop returns each immediately",
    },
    {
      stdin: pushSeq(4) + "\n" + popSeq(4),
      expectedStdout: popOutDesc(4),
      note: "fills initial cap=4 exactly, then drains",
    },
    {
      stdin: pushSeq(5) + "\n" + popSeq(5),
      expectedStdout: popOutDesc(5),
      note: "first capacity grow 4→8",
    },
    {
      stdin: pushSeq(10) + "\n" + popSeq(10),
      expectedStdout: popOutDesc(10),
      note: "growth across 4→8→16",
    },
    {
      stdin: pushSeq(20) + "\n" + popSeq(20),
      expectedStdout: popOutDesc(20),
      note: "growth across 4→8→16→32",
    },
    {
      stdin: pushSeq(50) + "\n" + popSeq(50),
      expectedStdout: popOutDesc(50),
      note: "stress: many growths, full drain",
    },
    {
      stdin: "push 1\npush 2\npop\npush 3\npush 4\npop\npush 5\npop\npop\npop",
      expectedStdout: "pop=2\npop=4\npop=5\npop=3\npop=1",
      note: "complex interleaving",
    },
    {
      stdin: "push 100\npush 200\npush 300\npush 400\npush 500\npeek\npop\npeek\npop\npeek",
      expectedStdout: "peek=500\npop=500\npeek=400\npop=400\npeek=300",
    },
  ],
};

// #45 hashmap — stdin driver: "put K V", "get K", "del K".
const hmPutMany = (n) =>
  Array.from({ length: n }, (_, i) => `put k${i} ${i}`).join("\n");
const hmGetMany = (n) =>
  Array.from({ length: n }, (_, i) => `get k${i}`).join("\n");
const hmGetOut = (n) =>
  Array.from({ length: n }, (_, i) => `get=${i}`).join("\n");
T[45] = {
  sample: [
    {
      stdin: "put one 1\nput two 2\nget two\ndel one\nget one",
      expectedStdout: "get=2\ndel=1\nmiss",
    },
  ],
  hidden: [
    { stdin: "get nope", expectedStdout: "miss", note: "get on empty map" },
    { stdin: "del nope", expectedStdout: "miss", note: "delete on empty map" },
    { stdin: "put a 1\nget a", expectedStdout: "get=1", note: "single round-trip" },
    { stdin: "put a 0\nget a", expectedStdout: "get=0", note: "zero value" },
    { stdin: "put a -5\nget a", expectedStdout: "get=-5", note: "negative value" },
    { stdin: "put a 2147483647\nget a", expectedStdout: "get=2147483647", note: "INT_MAX" },
    { stdin: "put a -2147483647\nget a", expectedStdout: "get=-2147483647" },
    { stdin: "put a 5\nput a 6\nget a", expectedStdout: "get=6", note: "single overwrite" },
    {
      stdin: "put k 100\nput k 200\nput k 300\nget k",
      expectedStdout: "get=300",
      note: "multiple overwrites",
    },
    {
      stdin: "put a 1\nput b 2\nget a\nget b",
      expectedStdout: "get=1\nget=2",
      note: "two distinct keys",
    },
    {
      stdin: "put x 1\nput y 2\nput z 3\nget y\nget x\nget z",
      expectedStdout: "get=2\nget=1\nget=3",
      note: "lookup independent of insertion order",
    },
    {
      stdin: "put a 1\ndel a\nget a",
      expectedStdout: "del=1\nmiss",
      note: "delete then miss",
    },
    {
      stdin: "put a 1\ndel a\nput a 2\nget a",
      expectedStdout: "del=1\nget=2",
      note: "re-insert after delete",
    },
    {
      stdin: "put a 1\ndel a\ndel a",
      expectedStdout: "del=1\nmiss",
      note: "double delete — second is miss",
    },
    {
      stdin: "put a 1\nput b 2\nput c 3\ndel b\nget a\nget b\nget c",
      expectedStdout: "del=1\nget=1\nmiss\nget=3",
      note: "middle delete preserves siblings",
    },
    {
      stdin: "put a 1\nput b 2\nput c 3\ndel a\nget a\nget b\nget c",
      expectedStdout: "del=1\nmiss\nget=2\nget=3",
    },
    {
      stdin: "put a 1\nput b 2\nput c 3\ndel c\nget a\nget b\nget c",
      expectedStdout: "del=1\nget=1\nget=2\nmiss",
    },
    {
      stdin: "put hello 1\nput world 2\nget hello\nget world\ndel hello\nget hello\nget world",
      expectedStdout: "get=1\nget=2\ndel=1\nmiss\nget=2",
      note: "longer string keys",
    },
    {
      stdin: "put A 1\nput a 2\nget A\nget a",
      expectedStdout: "get=1\nget=2",
      note: "case-sensitive keys",
    },
    {
      stdin: "put k0 1\nput k1 2\nput k2 3\nput k0 99\nget k0\nget k1\nget k2",
      expectedStdout: "get=99\nget=2\nget=3",
      note: "overwrite among multiple",
    },
    {
      stdin: hmPutMany(20) + "\n" + hmGetMany(20),
      expectedStdout: hmGetOut(20),
      note: "20 keys, 16 buckets — guarantees collision chains",
    },
    {
      stdin:
        hmPutMany(20) +
        "\ndel k5\ndel k10\ndel k15\nget k5\nget k10\nget k15\nget k0\nget k19",
      expectedStdout: "del=1\ndel=1\ndel=1\nmiss\nmiss\nmiss\nget=0\nget=19",
      note: "delete inside chains, surviving entries still found",
    },
    {
      stdin: hmPutMany(50) + "\n" + hmGetMany(50),
      expectedStdout: hmGetOut(50),
      note: "stress: 50 entries across 16 buckets",
    },
  ],
};

// ---------- Section 3 (cont.) — Pointers (additional) ----------

// #46 allocate_and_fill — out-parameter via int **
const repeat = (v, n) => Array.from({ length: n }, () => String(v)).join(" ");
T[46] = {
  sample: [
    { stdin: "5 7",  expectedStdout: "7 7 7 7 7\nok" },
    { stdin: "1 0",  expectedStdout: "0\nok" },
    { stdin: "3 -1", expectedStdout: "-1 -1 -1\nok" },
  ],
  hidden: [
    { stdin: "1 2147483647",  expectedStdout: "2147483647\nok",                 note: "INT_MAX" },
    { stdin: "1 -2147483648", expectedStdout: "-2147483648\nok",                note: "INT_MIN" },
    { stdin: "10 0",          expectedStdout: repeat(0, 10) + "\nok" },
    { stdin: "2 -1",          expectedStdout: "-1 -1\nok" },
    { stdin: "100 5",         expectedStdout: repeat(5, 100) + "\nok",          note: "100-element fill" },
    { stdin: "1 1",           expectedStdout: "1\nok",                          note: "single element" },
    { stdin: "8 42",          expectedStdout: repeat(42, 8) + "\nok" },
    { stdin: "1000 7",        expectedStdout: repeat(7, 1000) + "\nok",         note: "large array" },
  ],
};

// #47 array of pointers vs pointer to array
const apOut = (a, b, c) =>
  `ap: ${a} ${b} ${c}\npa: ${a} ${b} ${c}\nsizeof: ap=24 pa=8`;
T[47] = {
  sample: [
    { stdin: "1 2 3",   expectedStdout: apOut(1, 2, 3) },
    { stdin: "10 -5 0", expectedStdout: apOut(10, -5, 0) },
  ],
  hidden: [
    { stdin: "0 0 0",                      expectedStdout: apOut(0, 0, 0) },
    { stdin: "100 200 300",                expectedStdout: apOut(100, 200, 300) },
    { stdin: "-1 -2 -3",                   expectedStdout: apOut(-1, -2, -3) },
    { stdin: "2147483647 -2147483648 0",   expectedStdout: apOut(2147483647, -2147483648, 0), note: "INT_MAX/INT_MIN" },
    { stdin: "1 1 1",                      expectedStdout: apOut(1, 1, 1),                    note: "duplicates" },
    { stdin: "999999 -999999 12345",       expectedStdout: apOut(999999, -999999, 12345) },
  ],
};

// #48 endianness + bswap32
const swapHex = (n) => {
  const h = (n >>> 0).toString(16).padStart(8, "0");
  return "0x" + h.slice(6, 8) + h.slice(4, 6) + h.slice(2, 4) + h.slice(0, 2);
};
const origHex = (n) => "0x" + (n >>> 0).toString(16).padStart(8, "0");
const bswapBlock = (x) =>
  `endian=little\norig=${origHex(x)}\nswap=${swapHex(x)}\nroundtrip=${origHex(x)}`;
T[48] = {
  sample: [
    { stdin: "1",         expectedStdout: bswapBlock(1) },
    { stdin: "305419896", expectedStdout: bswapBlock(0x12345678), note: "0x12345678" },
  ],
  hidden: [
    { stdin: "0",          expectedStdout: bswapBlock(0),          note: "all zero" },
    { stdin: "4294967295", expectedStdout: bswapBlock(0xffffffff), note: "all ones" },
    { stdin: "256",        expectedStdout: bswapBlock(0x100),      note: "single mid-byte" },
    { stdin: "65536",      expectedStdout: bswapBlock(0x10000) },
    { stdin: "16777216",   expectedStdout: bswapBlock(0x1000000),  note: "high byte only" },
    { stdin: "2863311530", expectedStdout: bswapBlock(0xaaaaaaaa), note: "0xaaaaaaaa palindrome" },
    { stdin: "1431655765", expectedStdout: bswapBlock(0x55555555), note: "0x55555555 palindrome" },
    { stdin: "16909060",   expectedStdout: bswapBlock(0x01020304), note: "increasing bytes" },
    { stdin: "67305985",   expectedStdout: bswapBlock(0x04030201), note: "decreasing bytes" },
  ],
};

// #49 IPv4 header decode
const ipv4Out = (ver, ihl, tlen, ttl, proto, src, dst) =>
  `version=${ver}\nihl=${ihl}\ntotal_len=${tlen}\nttl=${ttl}\nproto=${proto}\nsrc=${src}\ndst=${dst}`;
T[49] = {
  sample: [
    {
      stdin: "45 00 00 3c 1c 46 40 00 40 06 b1 e6 c0 a8 01 0a 08 08 08 08",
      expectedStdout: ipv4Out(4, 5, 60, 64, 6, "192.168.1.10", "8.8.8.8"),
    },
    {
      stdin: "45 00 05 dc 00 00 40 00 40 11 00 00 0a 00 00 01 0a 00 00 02",
      expectedStdout: ipv4Out(4, 5, 1500, 64, 17, "10.0.0.1", "10.0.0.2"),
    },
  ],
  hidden: [
    {
      stdin: "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
      expectedStdout: ipv4Out(0, 0, 0, 0, 0, "0.0.0.0", "0.0.0.0"),
      note: "all zeros",
    },
    {
      stdin: "45 00 00 54 00 00 00 00 ff 01 00 00 0a 0a 0a 01 c0 a8 00 01",
      expectedStdout: ipv4Out(4, 5, 84, 255, 1, "10.10.10.1", "192.168.0.1"),
      note: "ICMP, max TTL",
    },
    {
      stdin: "46 00 00 18 00 00 00 00 01 11 00 00 ff ff ff ff 00 00 00 00",
      expectedStdout: ipv4Out(4, 6, 24, 1, 17, "255.255.255.255", "0.0.0.0"),
      note: "ihl=6 (options), ttl=1",
    },
    {
      stdin: "45 00 ff ff ab cd 00 00 80 06 12 34 7f 00 00 01 7f 00 00 02",
      expectedStdout: ipv4Out(4, 5, 65535, 128, 6, "127.0.0.1", "127.0.0.2"),
      note: "max total_len, loopback",
    },
    {
      stdin: "4f 00 00 50 12 34 56 78 20 11 00 00 c0 00 02 01 c0 00 02 02",
      expectedStdout: ipv4Out(4, 15, 80, 32, 17, "192.0.2.1", "192.0.2.2"),
      note: "max ihl=15",
    },
  ],
};

// #50 PTE bit-fields
const pteOut = (present, rw, user, accessed, dirty, pfn) =>
  `present=${present}\nrw=${rw}\nuser=${user}\naccessed=${accessed}\ndirty=${dirty}\npfn=0x${pfn.toString(16).padStart(5, "0")}`;
T[50] = {
  sample: [
    { stdin: "3",          expectedStdout: pteOut(1, 1, 0, 0, 0, 0x00000) },
    { stdin: "4294963203", expectedStdout: pteOut(1, 1, 0, 0, 0, 0xfffff), note: "0xfffff003" },
    { stdin: "103",        expectedStdout: pteOut(1, 1, 1, 1, 1, 0x00000), note: "0x67 — flags but no PFN" },
  ],
  hidden: [
    { stdin: "0",          expectedStdout: pteOut(0, 0, 0, 0, 0, 0x00000), note: "fully cleared PTE" },
    { stdin: "1",          expectedStdout: pteOut(1, 0, 0, 0, 0, 0x00000), note: "present only" },
    { stdin: "4097",       expectedStdout: pteOut(1, 0, 0, 0, 0, 0x00001), note: "0x1001 → present + pfn 1" },
    { stdin: "8195",       expectedStdout: pteOut(1, 1, 0, 0, 0, 0x00002), note: "0x2003 → present + rw + pfn 2" },
    { stdin: "4294967295", expectedStdout: pteOut(1, 1, 1, 1, 1, 0xfffff), note: "all bits set" },
    { stdin: "33",         expectedStdout: pteOut(1, 0, 0, 1, 0, 0x00000), note: "0x21 — present + accessed" },
    { stdin: "64",         expectedStdout: pteOut(0, 0, 0, 0, 1, 0x00000), note: "dirty only (without present)" },
    { stdin: "12288",      expectedStdout: pteOut(0, 0, 0, 0, 0, 0x00003), note: "PFN only, page not present" },
  ],
};

// #51 mem_swap (generic)
T[51] = {
  sample: [
    { stdin: "0\n3 7",         expectedStdout: "a=7 b=3" },
    { stdin: "1\n1.5 2.5",     expectedStdout: "a=2.5 b=1.5" },
    { stdin: "2\nhello world", expectedStdout: "a=world b=hello" },
  ],
  hidden: [
    { stdin: "0\n0 0",                          expectedStdout: "a=0 b=0",                       note: "ints — equal values" },
    { stdin: "0\n-2147483648 2147483647",       expectedStdout: "a=2147483647 b=-2147483648",    note: "ints — INT_MIN/MAX" },
    { stdin: "0\n1 -1",                         expectedStdout: "a=-1 b=1" },
    { stdin: "0\n100 100",                      expectedStdout: "a=100 b=100",                   note: "swap equal values is no-op" },
    { stdin: "1\n0 0",                          expectedStdout: "a=0 b=0",                       note: "doubles — both zero" },
    { stdin: "1\n-1.5 2.75",                    expectedStdout: "a=2.75 b=-1.5" },
    { stdin: "1\n100 200",                      expectedStdout: "a=200 b=100" },
    { stdin: "2\na b",                          expectedStdout: "a=b b=a",                       note: "single-char strings" },
    { stdin: "2\nABC XYZ",                      expectedStdout: "a=XYZ b=ABC" },
    { stdin: "2\nfoo bar",                      expectedStdout: "a=bar b=foo" },
    { stdin: "2\nthe quick",                    expectedStdout: "a=quick b=the",                 note: "different-length strings" },
    { stdin: "2\nthirty1charstring1234567890abc shortone", expectedStdout: "a=shortone b=thirty1charstring1234567890abc", note: "near 31-char limit" },
  ],
};

// #52 alignment — fully deterministic on Linux x86_64
T[52] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "align char=1\nalign int=4\nalign double=8\nalign small_t=4\nsize  small_t=8\nalign cacheline_t=64\nsize  cacheline_t=64\nptr_aligned=1",
    },
  ],
  hidden: [],
};

// #53 const correctness
T[53] = {
  sample: [
    { stdin: "3\n1 2 3\nhello e",          expectedStdout: "sum=6\nzeroed: 0 0 0\nfound=1" },
    { stdin: "5\n10 20 30 40 50\nworld z", expectedStdout: "sum=150\nzeroed: 0 0 0 0 0\nfound=-1" },
  ],
  hidden: [
    { stdin: "1\n42\nabc a",                  expectedStdout: "sum=42\nzeroed: 0\nfound=0",                   note: "first char match" },
    { stdin: "2\n-1 -2\nxyz x",               expectedStdout: "sum=-3\nzeroed: 0 0\nfound=0" },
    { stdin: "3\n100 200 300\naa b",          expectedStdout: "sum=600\nzeroed: 0 0 0\nfound=-1" },
    { stdin: "4\n1000 1000 1000 1000\nabc c", expectedStdout: "sum=4000\nzeroed: 0 0 0 0\nfound=2",            note: "last char match" },
    { stdin: "1\n0\nh h",                     expectedStdout: "sum=0\nzeroed: 0\nfound=0" },
    { stdin: "10\n1 2 3 4 5 6 7 8 9 10\nabcdefghij j", expectedStdout: "sum=55\nzeroed: 0 0 0 0 0 0 0 0 0 0\nfound=9", note: "long string, end match" },
    { stdin: "5\n-100 200 -300 400 -500\nmiddle d", expectedStdout: "sum=-300\nzeroed: 0 0 0 0 0\nfound=2" },
    { stdin: "1\n2147483647\nabc x",          expectedStdout: "sum=2147483647\nzeroed: 0\nfound=-1",            note: "INT_MAX sum" },
  ],
};

// ---------- Section 11 — Preprocessor & Macros ----------

// #54 do-while macros
T[54] = {
  sample: [
    { stdin: "3 5 7",   expectedStdout: "max=12\nmin=3\nswapped=5 3\nguarded=0",       note: "after swap a=5 > 0 → SWAP fires again, n stays 0" },
    { stdin: "5 -3 7",  expectedStdout: "max=5\nmin=4\nswapped=-3 5\nguarded=99",      note: "after swap a=-3 → else branch, n=99" },
  ],
  hidden: [
    { stdin: "10 0 0",        expectedStdout: "max=10\nmin=0\nswapped=0 10\nguarded=99",       note: "after swap a=0, not > 0 → n=99" },
    { stdin: "1 1 1",         expectedStdout: "max=2\nmin=1\nswapped=1 1\nguarded=0",          note: "MAX(1, 2)=2; SWAP no-op visually but state still > 0" },
    { stdin: "100 200 300",   expectedStdout: "max=500\nmin=100\nswapped=200 100\nguarded=0",  note: "after swap a=200 > 0" },
    { stdin: "-5 -10 -15",    expectedStdout: "max=-5\nmin=-25\nswapped=-10 -5\nguarded=99",   note: "all negative" },
    { stdin: "0 0 0",         expectedStdout: "max=0\nmin=0\nswapped=0 0\nguarded=99",         note: "0 is not > 0" },
    { stdin: "7 -1 1",        expectedStdout: "max=7\nmin=0\nswapped=-1 7\nguarded=99",        note: "after swap a=-1" },
    { stdin: "-3 4 -5",       expectedStdout: "max=-1\nmin=-3\nswapped=4 -3\nguarded=0",       note: "MAX(-3, -1)=-1; after swap a=4" },
    { stdin: "1 2 3",         expectedStdout: "max=5\nmin=1\nswapped=2 1\nguarded=0",          note: "after swap a=2" },
  ],
};

// #55 LOG macro (no __LINE__ — output reproducible)
T[55] = {
  sample: [
    {
      stdin: "",
      expectedStdout:
        "s1=hello\ns2=42\nsum=7\n[INFO] starting up\n[WARN] x=3\n[ERROR] failed code=-1",
    },
  ],
  hidden: [],
};

// #56 X-macros
T[56] = {
  sample: [
    { stdin: "3\n0 2 4", expectedStdout: "0=DEBUG\n2=WARN\n4=FATAL\ncount=5" },
    { stdin: "4\n1 3 4 7", expectedStdout: "1=INFO\n3=ERROR\n4=FATAL\n7=UNKNOWN\ncount=5" },
  ],
  hidden: [
    { stdin: "0",                    expectedStdout: "count=5",                                                         note: "no values" },
    { stdin: "1\n-1",                expectedStdout: "-1=UNKNOWN\ncount=5",                                              note: "negative is UNKNOWN" },
    { stdin: "5\n0 1 2 3 4",         expectedStdout: "0=DEBUG\n1=INFO\n2=WARN\n3=ERROR\n4=FATAL\ncount=5",               note: "every level once" },
    { stdin: "2\n100 5",             expectedStdout: "100=UNKNOWN\n5=UNKNOWN\ncount=5",                                  note: "both out of range" },
    { stdin: "3\n4 4 4",             expectedStdout: "4=FATAL\n4=FATAL\n4=FATAL\ncount=5",                               note: "repeats" },
    { stdin: "1\n0",                 expectedStdout: "0=DEBUG\ncount=5",                                                 note: "first level" },
    { stdin: "6\n0 1 2 3 4 5",       expectedStdout: "0=DEBUG\n1=INFO\n2=WARN\n3=ERROR\n4=FATAL\n5=UNKNOWN\ncount=5",    note: "first OOB is exactly count" },
  ],
};

// #57 container_of — fully deterministic
T[57] = {
  sample: [
    {
      stdin: "",
      expectedStdout: "offset=20\nid=42\nname=answer\nextra=99",
      note: "id (4) + name[16] (16) = 20 bytes before .link",
    },
  ],
  hidden: [],
};

// ---------- Section 12 — Storage Classes & Qualifiers ----------

// #58 static counter
const staticCounter = (n) => {
  if (n === 0) return "total=0";
  const lines = [];
  for (let i = 1; i <= n; i++) lines.push(String(i));
  lines.push(`total=${n}`);
  return lines.join("\n");
};
T[58] = {
  sample: [
    { stdin: "3", expectedStdout: staticCounter(3) },
    { stdin: "1", expectedStdout: staticCounter(1) },
    { stdin: "0", expectedStdout: staticCounter(0), note: "no calls" },
  ],
  hidden: [
    { stdin: "5",   expectedStdout: staticCounter(5) },
    { stdin: "10",  expectedStdout: staticCounter(10) },
    { stdin: "2",   expectedStdout: staticCounter(2) },
    { stdin: "100", expectedStdout: staticCounter(100), note: "100 calls in a row" },
  ],
};

// #59 volatile MMIO
T[59] = {
  sample: [
    { stdin: "5 42",   expectedStdout: "iters=5 final=42" },
    { stdin: "0 7",    expectedStdout: "iters=0 final=7", note: "device arrives immediately" },
    { stdin: "100 99", expectedStdout: "iters=100 final=99" },
  ],
  hidden: [
    { stdin: "1 1",          expectedStdout: "iters=1 final=1" },
    { stdin: "10 12345",     expectedStdout: "iters=10 final=12345" },
    { stdin: "50 4294967295",expectedStdout: "iters=50 final=4294967295", note: "UINT32_MAX" },
    { stdin: "0 1",          expectedStdout: "iters=0 final=1",            note: "after=0 path" },
    { stdin: "1000 7",       expectedStdout: "iters=1000 final=7" },
    { stdin: "999 1",        expectedStdout: "iters=999 final=1" },
  ],
};

// #60 extern/static linkage demo
T[60] = {
  sample: [
    { stdin: "3 5", expectedStdout: "internal=3\nexternal=5" },
    { stdin: "0 0", expectedStdout: "internal=0\nexternal=0" },
    { stdin: "1 0", expectedStdout: "internal=1\nexternal=0" },
  ],
  hidden: [
    { stdin: "0 1",            expectedStdout: "internal=0\nexternal=1" },
    { stdin: "1000 1000",      expectedStdout: "internal=1000\nexternal=1000" },
    { stdin: "999 1",          expectedStdout: "internal=999\nexternal=1" },
    { stdin: "1 999",          expectedStdout: "internal=1\nexternal=999" },
    { stdin: "1000000 0",      expectedStdout: "internal=1000000\nexternal=0", note: "1M increments" },
    { stdin: "0 1000000",      expectedStdout: "internal=0\nexternal=1000000" },
    { stdin: "500000 500000",  expectedStdout: "internal=500000\nexternal=500000" },
  ],
};

// ---------- Section 4 (cont.) — Arrays & Strings (additional) ----------

// #61 memset
const memsetOut = (n, byte) => {
  const hex = (byte & 0xff).toString(16).padStart(2, "0");
  const bytes = Array.from({ length: n }, () => hex).join(" ");
  return `buf=${bytes}\nsentinel=00`;
};
T[61] = {
  sample: [
    { stdin: "4 65",  expectedStdout: memsetOut(4, 65),  note: "ASCII 'A'" },
    { stdin: "1 0",   expectedStdout: memsetOut(1, 0),   note: "single zero" },
    { stdin: "5 257", expectedStdout: memsetOut(5, 1),   note: "low byte of 257 = 1" },
  ],
  hidden: [
    { stdin: "1 255",   expectedStdout: memsetOut(1, 255),   note: "max byte" },
    { stdin: "1 -1",    expectedStdout: memsetOut(1, 0xff),  note: "low byte of -1 is 0xff" },
    { stdin: "8 171",   expectedStdout: memsetOut(8, 171),   note: "0xab pattern" },
    { stdin: "256 0",   expectedStdout: memsetOut(256, 0),   note: "biggest n with zero" },
    { stdin: "10 65",   expectedStdout: memsetOut(10, 65) },
    { stdin: "16 170",  expectedStdout: memsetOut(16, 170),  note: "0xaa pattern" },
    { stdin: "32 255",  expectedStdout: memsetOut(32, 255) },
    { stdin: "256 170", expectedStdout: memsetOut(256, 170), note: "stress: 256 * 0xaa" },
    { stdin: "3 -2",    expectedStdout: memsetOut(3, 0xfe),  note: "low byte of -2" },
    { stdin: "5 128",   expectedStdout: memsetOut(5, 128),   note: "high bit set" },
    { stdin: "20 1",    expectedStdout: memsetOut(20, 1) },
  ],
};

// #62 memcmp
T[62] = {
  sample: [
    { stdin: "abc abd 3", expectedStdout: "-1" },
    { stdin: "abc abc 3", expectedStdout: "0" },
    { stdin: "abd abc 3", expectedStdout: "1" },
    { stdin: "abc abd 2", expectedStdout: "0",  note: "first 2 bytes equal" },
  ],
  hidden: [
    { stdin: "a a 1",         expectedStdout: "0" },
    { stdin: "a b 1",         expectedStdout: "-1" },
    { stdin: "b a 1",         expectedStdout: "1" },
    { stdin: "abcde abcde 5", expectedStdout: "0",  note: "full equal" },
    { stdin: "abcde abcdf 5", expectedStdout: "-1" },
    { stdin: "abcdf abcde 5", expectedStdout: "1" },
    { stdin: "AAAA aaaa 4",   expectedStdout: "-1", note: "ASCII case: A < a" },
    { stdin: "aaaa AAAA 4",   expectedStdout: "1" },
    { stdin: "abc abc 0",     expectedStdout: "0",  note: "n=0 always equal" },
    { stdin: "x y 0",         expectedStdout: "0",  note: "n=0 even with different inputs" },
    { stdin: "abc Abc 1",     expectedStdout: "1",  note: "case at first byte" },
    { stdin: "z a 1",         expectedStdout: "1" },
  ],
};

// #63 strcat / strncat
T[63] = {
  sample: [
    { stdin: "hello world 5", expectedStdout: "cat=helloworld\nncat=helloworld" },
    { stdin: "foo bar 2",     expectedStdout: "cat=foobar\nncat=fooba" },
    { stdin: "abc xyz 0",     expectedStdout: "cat=abcxyz\nncat=abc",         note: "n=0 — no source bytes copied" },
  ],
  hidden: [
    { stdin: "x y 1",          expectedStdout: "cat=xy\nncat=xy" },
    { stdin: "x y 100",        expectedStdout: "cat=xy\nncat=xy",          note: "n exceeds source — stop at NUL" },
    { stdin: "ab cd 1",        expectedStdout: "cat=abcd\nncat=abc" },
    { stdin: "ab cd 5",        expectedStdout: "cat=abcd\nncat=abcd",      note: "n exceeds source" },
    { stdin: "12345 67890 3",  expectedStdout: "cat=1234567890\nncat=12345678" },
    { stdin: "a bcdef 4",      expectedStdout: "cat=abcdef\nncat=abcde",   note: "n smaller than source" },
    { stdin: "hello x 1",      expectedStdout: "cat=hellox\nncat=hellox",  note: "n equals source length" },
    { stdin: "test ing 0",     expectedStdout: "cat=testing\nncat=test",   note: "n=0 with non-empty source" },
  ],
};

// #64 strdup
T[64] = {
  sample: [
    { stdin: "hello\nworld\n---", expectedStdout: "hello\nworld\ncount=2" },
    { stdin: "---",               expectedStdout: "count=0",               note: "empty input" },
    { stdin: "a\nbb\nccc\n---",   expectedStdout: "a\nbb\nccc\ncount=3" },
  ],
  hidden: [
    { stdin: "single\n---",                     expectedStdout: "single\ncount=1" },
    { stdin: "1\n2\n3\n4\n5\n---",              expectedStdout: "1\n2\n3\n4\n5\ncount=5",     note: "max 5 strings" },
    { stdin: "x\ny\n---",                       expectedStdout: "x\ny\ncount=2" },
    { stdin: "abcdef\n---",                     expectedStdout: "abcdef\ncount=1" },
    { stdin: "longer_string_with_underscores\n---", expectedStdout: "longer_string_with_underscores\ncount=1" },
    { stdin: "a\nb\nc\nd\ne\n---",              expectedStdout: "a\nb\nc\nd\ne\ncount=5" },
    { stdin: "first\nsecond\nthird\n---",       expectedStdout: "first\nsecond\nthird\ncount=3" },
  ],
};

// #65 qsort
const qsortBlock = (arr) => {
  const asc = [...arr].sort((a, b) => a - b);
  const desc = [...arr].sort((a, b) => b - a);
  return `asc: ${asc.join(" ")}\ndesc: ${desc.join(" ")}`;
};
const qsInput = (arr) => `${arr.length}\n${arr.join(" ")}`;
T[65] = {
  sample: [
    { stdin: qsInput([3, 1, 4, 1, 5]),  expectedStdout: qsortBlock([3, 1, 4, 1, 5]) },
    { stdin: qsInput([42]),             expectedStdout: qsortBlock([42]),                note: "single element" },
    { stdin: qsInput([-3, -1, -2, 0]),  expectedStdout: qsortBlock([-3, -1, -2, 0]) },
  ],
  hidden: [
    { stdin: qsInput([5, 2]),                              expectedStdout: qsortBlock([5, 2]) },
    { stdin: qsInput([7, 7, 7]),                           expectedStdout: qsortBlock([7, 7, 7]),                   note: "all duplicates" },
    { stdin: qsInput([5, 4, 3, 2, 1]),                     expectedStdout: qsortBlock([5, 4, 3, 2, 1]),             note: "reverse sorted" },
    { stdin: qsInput([1, 2, 3, 4, 5]),                     expectedStdout: qsortBlock([1, 2, 3, 4, 5]),             note: "already sorted" },
    { stdin: qsInput([0, 0, 0, 0]),                        expectedStdout: qsortBlock([0, 0, 0, 0]) },
    { stdin: qsInput([-2147483648, 0, 2147483647]),        expectedStdout: qsortBlock([-2147483648, 0, 2147483647]),note: "INT_MIN..MAX" },
    { stdin: qsInput([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]),      expectedStdout: qsortBlock([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]) },
    { stdin: qsInput([1, 1, 1, 2, 2, 2, 3]),               expectedStdout: qsortBlock([1, 1, 1, 2, 2, 2, 3]),       note: "many duplicates" },
    {
      stdin: qsInput(Array.from({ length: 100 }, (_, i) => 100 - i)),
      expectedStdout: qsortBlock(Array.from({ length: 100 }, (_, i) => 100 - i)),
      note: "100 elements reverse sorted",
    },
  ],
};

// ---------- Section 13 — Data Structures (kernel-flavored) ----------

// #66 doubly linked list
T[66] = {
  sample: [
    { stdin: "pf 1\npb 2\npb 3\nfwd\nrev",     expectedStdout: "fwd: 1 2 3\nrev: 3 2 1" },
    { stdin: "pof\npob\nfwd",                  expectedStdout: "empty\nempty\nfwd: (empty)" },
    { stdin: "pb 10\npb 20\npof\nfwd\nrev",    expectedStdout: "pof=10\nfwd: 20\nrev: 20" },
  ],
  hidden: [
    { stdin: "fwd\nrev",                        expectedStdout: "fwd: (empty)\nrev: (empty)" },
    { stdin: "pf 5\npf 4\npf 3\nfwd\nrev",      expectedStdout: "fwd: 3 4 5\nrev: 5 4 3",                 note: "push_front order" },
    { stdin: "pb 1\npb 2\npb 3\npob\npob\npob\npob", expectedStdout: "pob=3\npob=2\npob=1\nempty",       note: "pop_back drains and underflows" },
    { stdin: "pf 1\npb 2\npf 3\npb 4\nfwd",     expectedStdout: "fwd: 3 1 2 4",                          note: "alternating push_front/back" },
    { stdin: "pb 1\nfwd\nrev",                  expectedStdout: "fwd: 1\nrev: 1",                        note: "single element" },
    { stdin: "pf 1\npob\npof",                  expectedStdout: "pob=1\nempty",                          note: "pop_back of single, then empty pop_front" },
    { stdin: "pb 100\npb 200\npb 300\npof\nfwd\nrev", expectedStdout: "pof=100\nfwd: 200 300\nrev: 300 200" },
    { stdin: "pf 0\npb 0\nfwd\npof\nfwd\npof\nfwd", expectedStdout: "fwd: 0 0\npof=0\nfwd: 0\npof=0\nfwd: (empty)" },
    { stdin: "pb -1\npb -2\npb -3\nfwd\nrev",   expectedStdout: "fwd: -1 -2 -3\nrev: -3 -2 -1",          note: "negative values" },
  ],
};

// #67 ring buffer
T[67] = {
  sample: [
    {
      stdin: "4\npush 1\npush 2\npush 3\npush 4\npop\npop\nsize",
      expectedStdout: "push=ok\npush=ok\npush=ok\npush=full\npop=1\npop=2\nsize=1",
      note: "cap=4 → 3 effective slots",
    },
    {
      stdin: "2\npop\npush 7\npop\npop",
      expectedStdout: "pop=empty\npush=ok\npop=7\npop=empty",
      note: "cap=2 → 1 effective slot",
    },
    {
      stdin: "3\npush 10\npop\npush 20\npush 30\nsize\npop\npop\npop",
      expectedStdout: "push=ok\npop=10\npush=ok\npush=ok\nsize=2\npop=20\npop=30\npop=empty",
      note: "wrap-around — head and tail both modulo cap",
    },
  ],
  hidden: [
    { stdin: "2\npush 5",                                                                                expectedStdout: "push=ok" },
    { stdin: "2\npush 1\npush 2",                                                                        expectedStdout: "push=ok\npush=full",                                              note: "1 slot, second push fails" },
    { stdin: "5\npush 1\npush 2\npush 3\npush 4\npush 5\nsize",                                          expectedStdout: "push=ok\npush=ok\npush=ok\npush=ok\npush=full\nsize=4" },
    { stdin: "3\npush 1\npush 2\npop\npop\npop",                                                         expectedStdout: "push=ok\npush=ok\npop=1\npop=2\npop=empty" },
    {
      stdin: "4\npush 1\npush 2\npush 3\npop\npush 4\npush 5\nsize\npop\npop\npop",
      expectedStdout: "push=ok\npush=ok\npush=ok\npop=1\npush=ok\npush=full\nsize=3\npop=2\npop=3\npop=4",
      note: "wrap-around with full check",
    },
    { stdin: "3\nsize\npush 1\nsize\npop\nsize",                                                         expectedStdout: "size=0\npush=ok\nsize=1\npop=1\nsize=0" },
    {
      stdin: "5\npush 0\npush 0\npush 0\npush 0\npop\npop\npop\npop",
      expectedStdout: "push=ok\npush=ok\npush=ok\npush=ok\npop=0\npop=0\npop=0\npop=empty",
      note: "duplicate values; cap=5 → 4 slots",
    },
    {
      stdin: "10\npush 1\npush 2\npush 3\npush 4\npush 5\npop\npop\npop\npush 6\npush 7\npush 8\nsize",
      expectedStdout:
        "push=ok\npush=ok\npush=ok\npush=ok\npush=ok\npop=1\npop=2\npop=3\npush=ok\npush=ok\npush=ok\nsize=5",
    },
    { stdin: "2\npush -1\npop",                                                                          expectedStdout: "push=ok\npop=-1",                                                  note: "negative value" },
  ],
};

// #68 intrusive list
T[68] = {
  sample: [
    {
      stdin: "add 1\nadd 2\nadd 3\nprint\ndel 2\nprint",
      expectedStdout: "add=1\nadd=2\nadd=3\nlist: 1 2 3\ndel=2\nlist: 1 3",
    },
    {
      stdin: "print\ndel 99",
      expectedStdout: "list: (empty)\nmiss",
    },
    {
      stdin: "add 5\ndel 5\nprint\nadd 7\nprint",
      expectedStdout: "add=5\ndel=5\nlist: (empty)\nadd=7\nlist: 7",
    },
  ],
  hidden: [
    {
      stdin: "add 10\nadd 20\nadd 30\ndel 30\ndel 20\ndel 10\nprint",
      expectedStdout: "add=10\nadd=20\nadd=30\ndel=30\ndel=20\ndel=10\nlist: (empty)",
    },
    {
      stdin: "add 1\nadd 1\nprint\ndel 1\nprint\ndel 1\nprint",
      expectedStdout: "add=1\nadd=1\nlist: 1 1\ndel=1\nlist: 1\ndel=1\nlist: (empty)",
      note: "duplicate ids — delete removes first match",
    },
    {
      stdin: "add 5\nadd 10\nadd 15\ndel 10\nprint",
      expectedStdout: "add=5\nadd=10\nadd=15\ndel=10\nlist: 5 15",
      note: "interior delete preserves neighbours",
    },
    {
      stdin: "add 1\ndel 2\ndel 1\nprint",
      expectedStdout: "add=1\nmiss\ndel=1\nlist: (empty)",
    },
    {
      stdin: "add 100\nadd 200\nprint\ndel 100\nprint\ndel 200\nprint",
      expectedStdout: "add=100\nadd=200\nlist: 100 200\ndel=100\nlist: 200\ndel=200\nlist: (empty)",
      note: "head and tail deletes",
    },
    {
      stdin: "add 0\nadd -1\nadd -2\nprint",
      expectedStdout: "add=0\nadd=-1\nadd=-2\nlist: 0 -1 -2",
      note: "zero and negative ids",
    },
    {
      stdin: "add 1\nadd 2\nadd 3\nadd 4\nadd 5\ndel 1\ndel 5\ndel 3\nprint",
      expectedStdout: "add=1\nadd=2\nadd=3\nadd=4\nadd=5\ndel=1\ndel=5\ndel=3\nlist: 2 4",
    },
  ],
};

// #69 slab/pool allocator
T[69] = {
  sample: [
    {
      stdin: "16 3\nalloc\nalloc\nalloc\nalloc\nfree 1\nalloc",
      expectedStdout:
        "alloc=ok live=1\nalloc=ok live=2\nalloc=ok live=3\nalloc=null live=3\nfree=ok live=2\nalloc=ok live=3",
    },
    {
      stdin: "8 1\nalloc\nfree 1\nfree 1\nalloc",
      expectedStdout: "alloc=ok live=1\nfree=ok live=0\nfree=miss live=0\nalloc=ok live=1",
      note: "double-free of same handle is miss",
    },
    {
      stdin: "8 2\nalloc\nalloc\nfree 2\nfree 1\nalloc\nalloc",
      expectedStdout:
        "alloc=ok live=1\nalloc=ok live=2\nfree=ok live=1\nfree=ok live=0\nalloc=ok live=1\nalloc=ok live=2",
      note: "free order independence",
    },
  ],
  hidden: [
    {
      stdin: "16 1\nalloc\nalloc",
      expectedStdout: "alloc=ok live=1\nalloc=null live=1",
      note: "exhaust capacity 1",
    },
    {
      stdin: "8 4\nalloc\nalloc\nalloc\nalloc\nfree 2\nfree 4\nalloc\nalloc",
      expectedStdout:
        "alloc=ok live=1\nalloc=ok live=2\nalloc=ok live=3\nalloc=ok live=4\nfree=ok live=3\nfree=ok live=2\nalloc=ok live=3\nalloc=ok live=4",
    },
    {
      stdin: "32 2\nfree 1",
      expectedStdout: "free=miss live=0",
      note: "free of unknown slot",
    },
    {
      stdin: "8 3\nalloc\nfree 1\nalloc\nfree 1\nalloc",
      expectedStdout:
        "alloc=ok live=1\nfree=ok live=0\nalloc=ok live=1\nfree=ok live=0\nalloc=ok live=1",
      note: "alloc/free ping-pong",
    },
    {
      stdin: "16 5\nalloc\nalloc\nalloc\nfree 2\nalloc\nalloc\nalloc",
      expectedStdout:
        "alloc=ok live=1\nalloc=ok live=2\nalloc=ok live=3\nfree=ok live=2\nalloc=ok live=3\nalloc=ok live=4\nalloc=ok live=5",
    },
    {
      stdin:
        "8 8\nalloc\nalloc\nalloc\nalloc\nalloc\nalloc\nalloc\nalloc\nalloc\nfree 5\nfree 7\nalloc\nalloc",
      expectedStdout:
        "alloc=ok live=1\nalloc=ok live=2\nalloc=ok live=3\nalloc=ok live=4\nalloc=ok live=5\nalloc=ok live=6\nalloc=ok live=7\nalloc=ok live=8\nalloc=null live=8\nfree=ok live=7\nfree=ok live=6\nalloc=ok live=7\nalloc=ok live=8",
      note: "exhaust then refill",
    },
  ],
};

// ---------- Section 9 (cont.) — Bitwise Operations (additional) ----------

// #70 reverse bits
const bin32 = (x) => (x >>> 0).toString(2).padStart(32, "0");
const reverseBits = (x) => {
  let r = 0;
  x = x >>> 0;
  for (let i = 0; i < 32; i++) {
    r = ((r << 1) | (x & 1)) >>> 0;
    x = x >>> 1;
  }
  return r >>> 0;
};
const revBlock = (x) => {
  const r = reverseBits(x);
  return `in =${bin32(x)}\nout=${bin32(r)}\nhex=0x${r.toString(16).padStart(8, "0")}`;
};
T[70] = {
  sample: [
    { stdin: "1",          expectedStdout: revBlock(1) },
    { stdin: "0",          expectedStdout: revBlock(0) },
    { stdin: "4294967295", expectedStdout: revBlock(0xffffffff) },
    { stdin: "43261596",   expectedStdout: revBlock(0x02945e9c), note: "Classic reverse-bits example" },
  ],
  hidden: [
    { stdin: "2",          expectedStdout: revBlock(2),          note: "single bit at position 1" },
    { stdin: "2147483648", expectedStdout: revBlock(0x80000000), note: "MSB only" },
    { stdin: "65535",      expectedStdout: revBlock(0xffff),     note: "low 16 bits" },
    { stdin: "4294901760", expectedStdout: revBlock(0xffff0000), note: "high 16 bits" },
    { stdin: "2863311530", expectedStdout: revBlock(0xaaaaaaaa), note: "alternating high" },
    { stdin: "1431655765", expectedStdout: revBlock(0x55555555), note: "alternating low" },
    { stdin: "4",          expectedStdout: revBlock(4) },
    { stdin: "1024",       expectedStdout: revBlock(1024) },
    { stdin: "16777216",   expectedStdout: revBlock(0x01000000) },
    { stdin: "305419896",  expectedStdout: revBlock(0x12345678), note: "0x12345678" },
  ],
};

// #71 next_pow2
const nextPow2 = (x) => {
  if (x === 0) return 1;
  if (x > 0x80000000) return 0;
  if (x === 0x80000000) return 0x80000000;
  let p = 1;
  while (p < x) p <<= 1;
  return p >>> 0;
};
T[71] = {
  sample: [
    { stdin: "0",          expectedStdout: "next=1",          note: "convention" },
    { stdin: "1",          expectedStdout: "next=1" },
    { stdin: "5",          expectedStdout: "next=8" },
    { stdin: "1023",       expectedStdout: "next=1024" },
    { stdin: "1024",       expectedStdout: "next=1024" },
    { stdin: "2147483648", expectedStdout: "next=2147483648", note: "0x80000000 — largest 32-bit power of 2" },
    { stdin: "2147483649", expectedStdout: "next=0",          note: "above 0x80000000 → overflow → 0" },
  ],
  hidden: [
    { stdin: "2",           expectedStdout: "next=2" },
    { stdin: "3",           expectedStdout: "next=4" },
    { stdin: "7",           expectedStdout: "next=8" },
    { stdin: "9",           expectedStdout: "next=16" },
    { stdin: "16",          expectedStdout: "next=16" },
    { stdin: "17",          expectedStdout: "next=32" },
    { stdin: "100",         expectedStdout: "next=128" },
    { stdin: "1000",        expectedStdout: "next=1024" },
    { stdin: "1000000",     expectedStdout: `next=${nextPow2(1000000)}` },
    { stdin: "1073741824",  expectedStdout: "next=1073741824", note: "2^30" },
    { stdin: "1073741825",  expectedStdout: "next=2147483648", note: "2^30 + 1 → 2^31" },
    { stdin: "4294967295",  expectedStdout: "next=0",          note: "UINT32_MAX → overflow" },
    { stdin: "256",         expectedStdout: "next=256" },
    { stdin: "65535",       expectedStdout: "next=65536" },
    { stdin: "65536",       expectedStdout: "next=65536" },
  ],
};

// #72 hamming distance
const popcount = (x) => {
  x = x >>> 0;
  let c = 0;
  while (x) { x = x & (x - 1); x = x >>> 0; c++; }
  return c;
};
const hamming = (a, b) => popcount((a ^ b) >>> 0);
T[72] = {
  sample: [
    { stdin: "1 4",          expectedStdout: "2" },
    { stdin: "0 0",          expectedStdout: "0" },
    { stdin: "0 4294967295", expectedStdout: "32",  note: "0 vs ~0 → all bits differ" },
    { stdin: "12 5",         expectedStdout: "2",   note: "1100 ⊕ 0101 = 1001 → 2 bits" },
  ],
  hidden: [
    { stdin: "1 0",                  expectedStdout: String(hamming(1, 0)) },
    { stdin: "3 1",                  expectedStdout: String(hamming(3, 1)) },
    { stdin: "7 0",                  expectedStdout: String(hamming(7, 0)) },
    { stdin: "255 0",                expectedStdout: String(hamming(255, 0)),                 note: "8 bits" },
    { stdin: "65535 0",              expectedStdout: String(hamming(65535, 0)),               note: "16 bits" },
    { stdin: "4294967295 4294967295",expectedStdout: "0",                                     note: "identical" },
    { stdin: "4294967295 0",         expectedStdout: "32" },
    { stdin: "1 2",                  expectedStdout: String(hamming(1, 2)) },
    { stdin: "85 170",               expectedStdout: String(hamming(85, 170)),                note: "0x55 vs 0xaa → 8 bits differ" },
    { stdin: "2863311530 1431655765",expectedStdout: String(hamming(0xaaaaaaaa, 0x55555555)), note: "every bit differs" },
    { stdin: "100 100",              expectedStdout: "0" },
    { stdin: "1024 2048",            expectedStdout: String(hamming(1024, 2048)),             note: "two single-bit values" },
  ],
};

// ---------- Section 10 (cont.) — Capstones (additional) ----------

// #73 TLV parser
T[73] = {
  sample: [
    {
      stdin: "9\n01 00 02 aa bb 02 00 01 ff",
      expectedStdout: "type=1 len=2 value=aa bb\ntype=2 len=1 value=ff\nrecords=2",
    },
    {
      stdin: "0\n",
      expectedStdout: "records=0",
      note: "empty stream",
    },
    {
      stdin: "5\n07 00 0a 01 02",
      expectedStdout: "error: truncated at offset=0\nrecords=0",
      note: "declared length 10 but only 2 value bytes",
    },
    {
      stdin: "6\n42 00 00 99 00 00",
      expectedStdout: "type=66 len=0 value=\ntype=153 len=0 value=\nrecords=2",
      note: "zero-length records are valid",
    },
  ],
  hidden: [
    {
      stdin: "1\nff",
      expectedStdout: "error: truncated at offset=0\nrecords=0",
      note: "header itself doesn't fit",
    },
    {
      stdin: "2\nff 00",
      expectedStdout: "error: truncated at offset=0\nrecords=0",
      note: "missing 1 length byte",
    },
    {
      stdin: "3\n01 00 00",
      expectedStdout: "type=1 len=0 value=\nrecords=1",
      note: "single zero-length record",
    },
    {
      stdin: "4\n02 00 01 ff",
      expectedStdout: "type=2 len=1 value=ff\nrecords=1",
    },
    {
      stdin: "12\n01 00 03 aa bb cc 02 00 02 dd ee 00",
      expectedStdout:
        "type=1 len=3 value=aa bb cc\ntype=2 len=2 value=dd ee\nerror: truncated at offset=11\nrecords=2",
      note: "two records then 1 stray byte → truncation at offset 11",
    },
    {
      stdin: "10\n05 00 03 11 22 33 06 00 01 ff",
      expectedStdout: "type=5 len=3 value=11 22 33\ntype=6 len=1 value=ff\nrecords=2",
    },
    {
      stdin: "8\nff 00 05 01 02 03 04 05",
      expectedStdout: "type=255 len=5 value=01 02 03 04 05\nrecords=1",
      note: "max type",
    },
    {
      stdin:
        "20\n10 00 04 de ad be ef 20 00 04 ca fe ba be 30 00 04 fe ed fa",
      expectedStdout: "type=16 len=4 value=de ad be ef\ntype=32 len=4 value=ca fe ba be\nerror: truncated at offset=14\nrecords=2",
      note: "third record claims 4 bytes but only 3 follow",
    },
    {
      stdin: "9\n01 01 00 00 00 00 00 00 00",
      expectedStdout: "error: truncated at offset=0\nrecords=0",
      note: "len=256 declared but only 6 value bytes follow → truncated before printing",
    },
  ],
};

// #74 mini malloc — uses fixed sizeof(block_t)=32 on Linux x86_64
T[74] = {
  sample: [
    {
      stdin: "alloc 100\nalloc 200\nalloc 50\ndump\nfree 2\ndump",
      expectedStdout:
        "alloc=ok id=1\nalloc=ok id=2\nalloc=ok id=3\n[U]100 [U]200 [U]50 [F]3618\nfree=ok\n[U]100 [F]200 [U]50 [F]3618",
    },
  ],
  hidden: [
    {
      stdin: "alloc 100\nfree 1\nfree 1",
      expectedStdout: "alloc=ok id=1\nfree=ok\nfree=miss",
      note: "double-free of handle is miss",
    },
    {
      stdin: "alloc 100\nalloc 100\nfree 1\nfree 2\ndump",
      expectedStdout:
        "alloc=ok id=1\nalloc=ok id=2\nfree=ok\nfree=ok\n[F]4064",
      note: "coalesce restores the whole arena",
    },
    {
      stdin: "alloc 50\ndump",
      expectedStdout: "alloc=ok id=1\n[U]50 [F]3982",
      note: "first-fit split: 4064 - 50 - 32 = 3982",
    },
    {
      stdin: "alloc 16\nalloc 16\nfree 1\nfree 2\ndump",
      expectedStdout:
        "alloc=ok id=1\nalloc=ok id=2\nfree=ok\nfree=ok\n[F]4064",
      note: "smallest sensible alloc, then full coalesce",
    },
    {
      stdin: "dump",
      expectedStdout: "[F]4064",
      note: "fresh arena",
    },
    {
      stdin: "alloc 1000\ndump",
      expectedStdout: "alloc=ok id=1\n[U]1000 [F]3032",
      note: "1000-byte alloc",
    },
    {
      stdin: "alloc 10000\ndump",
      expectedStdout: "alloc=null\n[F]4064",
      note: "request bigger than arena",
    },
    {
      stdin:
        "alloc 100\nalloc 100\nalloc 100\nfree 2\ndump\nfree 1\ndump\nfree 3\ndump",
      expectedStdout:
        "alloc=ok id=1\nalloc=ok id=2\nalloc=ok id=3\nfree=ok\n[U]100 [F]100 [U]100 [F]3668\nfree=ok\n[F]232 [U]100 [F]3668\nfree=ok\n[F]4064",
      note: "left + right coalescing in stages",
    },
  ],
};

export default T;
