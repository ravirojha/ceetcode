#include <stdio.h>
#include <stddef.h>
#include <string.h>

void *my_memmove(void *dest, const void *src, size_t n) {
    unsigned char       *d = (unsigned char *)dest;
    const unsigned char *s = (const unsigned char *)src;

    if (d < s) {
        for (size_t i = 0; i < n; i++) d[i] = s[i];
    } else if (d > s) {
        for (size_t i = n; i > 0; i--) d[i - 1] = s[i - 1];
    }
    return dest;
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin)) buf[0] = '\0';
    buf[strcspn(buf, "\n")] = '\0';
    int src_off, dst_off, n;
    if (scanf("%d %d %d", &src_off, &dst_off, &n) != 3) return 1;
    my_memmove(buf + dst_off, buf + src_off, (size_t)n);
    printf("%s\n", buf);
    return 0;
}
