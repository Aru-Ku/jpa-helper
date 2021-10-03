<script>
    import "carbon-components-svelte/css/g90.css";
    import { Header, HeaderNav, HeaderNavItem, SkipToContent } from "carbon-components-svelte";
</script>

<Header company="Mastrero" platformName="JPA Helper">
    <div slot="skip-to-content">
      <SkipToContent />
    </div>
    <HeaderNav>
        <HeaderNavItem target="_blank" href="https://github.com/mastrero/jpa-helper" text="GitHub" />
    </HeaderNav>
</Header>