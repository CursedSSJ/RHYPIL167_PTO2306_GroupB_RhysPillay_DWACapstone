import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tlnuilcktcmfqpqyhqjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbnVpbGNrdGNtZnFwcXlocWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MDU3MTcsImV4cCI6MjAzMTk4MTcxN30.gDYVfNnEWuwB1R7KIf9voKetig0tS4g2gApSCn_EToU"
);

export default supabase;
