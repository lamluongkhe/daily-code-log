from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def insert_end(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        new_node = ListNode(val)
        if not head:
            return new_node
        curr = head
        while curr.next:
            curr = curr.next
        curr.next = new_node
        return head

    def insert_front(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        new_node = ListNode(val, head)
        return new_node

    def print_list(self, head: Optional[ListNode]) -> None:
        curr = head
        while curr:
            print(curr.val, end=" -> ")
            curr = curr.next
        print("None")

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        curr = head
        tmp = []
        while curr:
            tmp.append(curr.val)
            curr = curr.next

        new_head = None
        for val in tmp:
            new_node = ListNode(val, new_head)
            new_head = new_node
        return new_head

    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        curr1 = list1
        curr2 = list2
        dummy = curr3 = ListNode() #dummy node
        while curr1 and curr2:
            if curr1.val <= curr2.val:
                curr3.next = curr1
                curr1 = curr1.next
            else:
                curr3.next = curr2
                curr2 = curr2.next
            curr3 = curr3.next      


        curr3.next = curr1 if curr1 else curr2
        list3 = dummy.next
        return list3



if __name__ == "__main__":
    sol = Solution()

    head1 = None
    
    head1 = sol.insert_end(head1, 1)
    head1 = sol.insert_end(head1, 5)
    head1 = sol.insert_end(head1, 7)

    head2 = None
    
    head2 = sol.insert_end(head2, 3)
    head2 = sol.insert_end(head2, 6)
    head2 = sol.insert_end(head2, 10)


    head3 = None
    head3 = sol.mergeTwoLists(head1, head2)
    sol.print_list(head3)

    
