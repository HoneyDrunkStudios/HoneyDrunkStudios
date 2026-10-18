import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is static or a route handler over bundled JSON, so no
// incremental cache (R2/KV) is configured. Add one before introducing ISR.
export default defineCloudflareConfig({});
