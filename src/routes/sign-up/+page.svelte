<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
	import type { User } from "$lib/types/user";
  import { superForm } from "sveltekit-superforms/client"
  
  export let data: User;

  const { form, constraints, enhance } = superForm(data.form);
</script>

<section class="h-[80vh] flex items-center justify-center mx-5">
  <div class="w-[500px] container grid items-center mt-4 gap-2">
    <h3 class="scroll-m-20 text-2xl text-primary font-semibold tracking-tight">
      Sign <span class="text-white">up</span> 
    </h3>
    <span class="text-md mb-2">Get access to <span class="text-primary">watchlist</span> and <span class="text-primary">continue watching</span> features!</span>
    <form method="POST" use:enhance>
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autocapitalize="none"
            autocomplete="email"
            autocorrect="off"
            bind:value={$form.email}
            {...$constraints.email}
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            bind:value={$form.password}
            {...$constraints.password}
          />
        </div>
        <Button>
          Sign in
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button">
      Google
    </Button>
    <p class="text-sm text-center mt-2">Have an account already?
      <a href="/sign-in" class="ml-1 text-decoration-line: underline hover:text-primary">Sign in</a>
    </p>
  </div>
</section>