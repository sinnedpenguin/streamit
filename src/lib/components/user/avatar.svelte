<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { User } from "lucide-svelte";
	import { Button } from "../ui/button";
</script>

<div>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="ghost" class="p-3">
        <Avatar.Root class="h-7 w-7 bg-secondary">
          <Avatar.Image src="https://avatars.githubusercontent.com/u/133164950?v=4" alt="sinnedpenguin" />
          <Avatar.Fallback>
            <User class="h-7 w-7" />
          </Avatar.Fallback>
        </Avatar.Root>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Sign in</DropdownMenu.Item>
        <DropdownMenu.Item>Sign up</DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>