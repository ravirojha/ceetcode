#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;

    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }

    printf("%d\n", sum);
    return 0;
}
