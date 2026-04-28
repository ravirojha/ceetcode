#include <stdio.h>

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
    printf("x=%d y=%d\n", x, y);
    return 0;
}
