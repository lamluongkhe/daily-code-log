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
    
    def create_cycle_linked_list(self,values: list, pos: int) -> Optional[ListNode]:

        if not values:
            return None
        
        head = ListNode(values[0])
        curr = head
        nodes = [head]

        # Tạo danh sách
        for v in values[1:]:
            new_node = ListNode(v)
            curr.next = new_node
            curr = new_node
            nodes.append(new_node)

        # Tạo cycle nếu pos >= 0
        if pos >= 0:
            curr.next = nodes[pos]
        
        return head
    
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        fast = slow = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True

        return False



if __name__ == "__main__":
    sol = Solution()

    head = sol.create_cycle_linked_list([3, 2, 0, -4],1)
    head1 = None
    
    head1 = sol.insert_end(head1, 1)
    head1 = sol.insert_end(head1, 5)
    head1 = sol.insert_end(head1, 7)


    print(sol.hasCycle(head))
