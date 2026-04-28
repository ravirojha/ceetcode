#include <stdio.h>
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
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\0';
    buf[strcspn(buf, "\n")] = '\0';
    printf("%d\n", my_atoi(buf));
    return 0;
}
