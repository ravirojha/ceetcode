#include <stdio.h>
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

int main(void) {
    struct Node *head = NULL, *tail = NULL;
    struct Node *nodes[1024];
    int count = 0;

    char line[1024];
    if (!fgets(line, sizeof line, stdin)) line[0] = '\0';
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

    printf("%d\n", has_cycle(head));
    return 0;
}
