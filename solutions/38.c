#include <stdio.h>

unsigned set_bit   (unsigned n, int pos) { return n | (1u << pos); }
unsigned clear_bit (unsigned n, int pos) { return n & ~(1u << pos); }
unsigned toggle_bit(unsigned n, int pos) { return n ^ (1u << pos); }
int      check_bit (unsigned n, int pos) { return (n >> pos) & 1u; }

int main(void) {
    unsigned n;
    int pos;
    if (scanf("%u %d", &n, &pos) != 2) return 1;
    printf("set    : %u\n", set_bit(n, pos));
    printf("clear  : %u\n", clear_bit(n, pos));
    printf("toggle : %u\n", toggle_bit(n, pos));
    printf("check  : %d\n", check_bit(n, pos));
    return 0;
}
